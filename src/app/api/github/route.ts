import { github } from "@/content/site";
import type {
  ContributionWeek,
  DayLevel,
  GitHubData,
  GitHubEvent,
  RepoStat,
  RepoStatWithActivity
} from "@/content/types";

export const revalidate = 1800;
export const dynamic = "force-static";

const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const REST_BASE = "https://api.github.com";
const API_VERSION = "2022-11-28";
const FETCH_REVALIDATE = 1800;

let cached: { at: number; data: GitHubData } | null = null;
let inflight: Promise<GitHubData> | null = null;

type BackendUser = {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  followers: { totalCount: number };
  repositories: { totalCount: number };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          contributionLevel: string;
        }>;
      }>;
    };
  };
};

type RepoNode = {
  nameWithOwner: string;
  name: string;
  url: string;
  description: string | null;
  stargazerCount: number;
  pushedAt: string;
  updatedAt: string;
  primaryLanguage: { name: string } | null;
  languages: {
    totalSize: number;
    edges: Array<{ size: number; node: { name: string; color: string | null } }>;
  } | null;
  openIssues: { totalCount: number };
  openPulls: { totalCount: number };
  defaultBranchRef: {
    target: { message: string | null } | null;
  } | null;
};

type RawEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, unknown>;
  html_url?: string;
};

function getToken(): string | null {
  const value = process.env.GITHUB_TOKEN;
  if (!value || value.trim().length === 0) return null;
  return value;
}

function levelForCount(count: number): DayLevel {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

function summarizeEvent(payloadType: string, payload: Record<string, unknown>): string {
  switch (payloadType) {
    case "PushEvent": {
      const commits = Array.isArray(payload.commits) ? payload.commits : [];
      const count = commits.length || 1;
      const head = commits[0] as { message?: string } | undefined;
      const firstMessage = head?.message?.split("\n")[0] ?? "pushed commits";
      return `${count} commit${count > 1 ? "s" : ""} — ${firstMessage}`;
    }
    case "PullRequestEvent": {
      const action = payload.action ?? "updated";
      const number = (payload.pull_request as { number?: number } | undefined)?.number;
      return `${action} pull request${number ? ` #${number}` : ""}`;
    }
    case "IssuesEvent": {
      const action = payload.action ?? "updated";
      const number = (payload.issue as { number?: number } | undefined)?.number;
      return `${action} issue${number ? ` #${number}` : ""}`;
    }
    case "IssueCommentEvent":
      return "commented on an issue";
    case "CreateEvent": {
      const refType = payload.ref_type ?? "ref";
      const ref = payload.ref ?? "";
      return ref ? `created ${refType} ${ref}` : `created ${refType}`;
    }
    case "ReleaseEvent":
      return "released a new version";
    case "ForkEvent":
      return "forked a repository";
    case "WatchEvent":
      return "starred a repository";
    default:
      return payloadType.replace(/Event$/, "");
  }
}

async function gql<T>(query: string, token: string): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json"
    },
    body: JSON.stringify({ query }),
    next: { revalidate: FETCH_REVALIDATE }
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) throw new Error("GitHub GraphQL errors");
  return json.data as T;
}

async function rest<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${REST_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": API_VERSION
    },
    next: { revalidate: FETCH_REVALIDATE }
  });
  if (!res.ok) throw new Error(`GitHub REST ${res.status} ${path}`);
  return (await res.json()) as T;
}

function splitRepo(ref: string): [string, string] {
  const [owner, name] = ref.split("/");
  if (!owner || !name) throw new Error(`Invalid repo ref: ${ref}`);
  return [owner, name];
}

function repoFragment(alias: string, owner: string, name: string): string {
  return `
    ${alias}: repository(owner: "${owner}", name: "${name}") {
      nameWithOwner
      name
      url
      description
      stargazerCount
      pushedAt
      updatedAt
      primaryLanguage { name }
      languages(first: 8, orderBy: {field: SIZE, direction: DESC}) {
        totalSize
        edges { size node { name color } }
      }
      openIssues: issues(states: OPEN) { totalCount }
      openPulls: pullRequests(states: OPEN) { totalCount }
      defaultBranchRef { target { ... on Commit { message } } }
    }
  `;
}

function buildReposQuery(allowlist: string[]): string {
  const fragments = allowlist.map((ref, i) => {
    const [owner, name] = splitRepo(ref);
    return repoFragment(`r${i}`, owner, name);
  });
  return `query { ${fragments.join("\n")} }`;
}

const USER_QUERY = `
  query {
    user(login: "${github.username}") {
      login
      name
      avatarUrl
      url
      followers { totalCount }
      repositories { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function transformRepo(node: RepoNode): RepoStat {
  const langs = node.languages?.edges ?? [];
  return {
    nameWithOwner: node.nameWithOwner,
    name: node.name,
    url: node.url,
    description: node.description ?? null,
    stars: node.stargazerCount,
    openIssues: node.openIssues?.totalCount ?? 0,
    openPulls: node.openPulls?.totalCount ?? 0,
    pushedAt: node.pushedAt,
    updatedAt: node.updatedAt,
    primaryLanguage: node.primaryLanguage?.name ?? null,
    languages: langs.map((edge) => ({
      name: edge.node.name,
      size: edge.size,
      color: edge.node.color ?? null
    })),
    readmeExcerpt: null,
    lastCommitMessage: node.defaultBranchRef?.target?.message ?? null
  };
}

async function fetchReadmeExcerpt(repoRef: string, token: string): Promise<string | null> {
  const [owner, name] = splitRepo(repoRef);
  try {
    const data = await rest<{ content: string; download_url: string | null }>(
      `/repos/${owner}/${name}/readme`,
      token
    );
    let text = "";
    if (data.download_url) {
      const raw = await fetch(data.download_url, { next: { revalidate: FETCH_REVALIDATE } });
      if (raw.ok) text = await raw.text();
    }
    if (!text) text = Buffer.from(data.content, "base64").toString("utf-8");
    return text
      .replace(/^#.*$/gm, "")
      .replace(/`{1,3}[^`]*`{1,3}/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#>*_]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 200);
  } catch {
    return null;
  }
}

async function fetchRecentEvents(token: string): Promise<GitHubEvent[]> {
  try {
    const events = await rest<RawEvent[]>(
      `/users/${github.username}/events/public?per_page=100`,
      token
    );
    const allowlist = github.allowlist;
    return events
      .filter((event) =>
        allowlist.some((ref) => ref.toLowerCase().endsWith(`/${event.repo.name}`))
      )
      .slice(0, 15)
      .map((event) => ({
        id: event.id,
        type: event.type as GitHubEvent["type"],
        repo: event.repo.name,
        created: event.created_at,
        payloadSummary: summarizeEvent(event.type, event.payload),
        url: event.html_url ?? null
      }));
  } catch {
    return [];
  }
}

function aggregateLanguages(repos: RepoStat[]): GitHubData["languageStats"] {
  const totals = new Map<string, { size: number; color: string | null }>();
  for (const repo of repos) {
    for (const lang of repo.languages) {
      const existing = totals.get(lang.name);
      if (existing) existing.size += lang.size;
      else totals.set(lang.name, { size: lang.size, color: lang.color ?? null });
    }
  }
  return [...totals.entries()]
    .map(([name, { size, color }]) => ({ name, size, color }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 8);
}

function emptyData(partial = true): GitHubData {
  return {
    user: {
      login: github.username,
      name: null,
      avatarUrl: "",
      url: `https://github.com/${github.username}`,
      followers: 0,
      publicRepos: 0
    },
    contributionCalendar: { totalContributions: 0, weeks: [] },
    allowlistRepos: [],
    currentProject: null,
    recentEvents: [],
    languageStats: [],
    fetchedAt: new Date().toISOString(),
    partial
  };
}

async function buildData(token: string): Promise<GitHubData> {
  const [userResp, reposResp, events] = await Promise.all([
    gql<{ user: BackendUser }>(USER_QUERY, token).catch(() => null),
    gql<Record<string, RepoNode | null>>(buildReposQuery(github.allowlist), token).catch(() => null),
    fetchRecentEvents(token)
  ]);

  const allowlistRepos: RepoStat[] = [];
  if (reposResp) {
    for (let i = 0; i < github.allowlist.length; i += 1) {
      const node = reposResp[`r${i}`];
      if (node) allowlistRepos.push(transformRepo(node));
    }
  }

  let currentProject: RepoStatWithActivity | null = null;
  const currentBase = allowlistRepos.find((r) => r.nameWithOwner === github.currentProject);
  if (currentBase) {
    const excerpt = await fetchReadmeExcerpt(github.currentProject, token);
    const recentActivity = events.filter((e) => e.repo === currentBase.name);
    currentProject = { ...currentBase, readmeExcerpt: excerpt, recentActivity };
  }

  const languageStats = aggregateLanguages(allowlistRepos);

  let weeks: ContributionWeek[] = [];
  let totalContributions = 0;
  const user = userResp?.user;
  if (user) {
    weeks = user.contributionsCollection.contributionCalendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelForCount(day.contributionCount)
      }))
    }));
    totalContributions = user.contributionsCollection.contributionCalendar.totalContributions;
  }

  return {
    user: user
      ? {
          login: user.login,
          name: user.name,
          avatarUrl: user.avatarUrl,
          url: user.url,
          followers: user.followers.totalCount,
          publicRepos: user.repositories.totalCount
        }
      : emptyData().user,
    contributionCalendar: { totalContributions, weeks },
    allowlistRepos,
    currentProject,
    recentEvents: events,
    languageStats,
    fetchedAt: new Date().toISOString(),
    partial: !(user && reposResp && currentProject)
  };
}

export async function GET() {
  if (cached && Date.now() - cached.at < FETCH_REVALIDATE * 1000) {
    return Response.json(cached.data);
  }

  const token = getToken();
  if (!token) {
    return Response.json(emptyData());
  }

  if (!inflight) {
    inflight = buildData(token)
      .then((data) => {
        cached = { at: Date.now(), data };
        return data;
      })
      .catch(() => emptyData())
      .finally(() => {
        inflight = null;
      });
  }

  const data = await inflight;
  return Response.json(data);
}