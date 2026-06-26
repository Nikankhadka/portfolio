export type HomeSectionId =
  | "about"
  | "skills"
  | "work"
  | "projects"
  | "experience"
  | "contact";

export type HomeSection = {
  id: HomeSectionId;
  label: string;
  href: `/#${HomeSectionId}`;
};

export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

/** GitHub repo identifier in `owner/name` form. */
export type RepoRef = string;

export type ProjectEntry = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  impact: string;
  status: string;
  year: string;
  /** Optional GitHub repo (owner/name) used to pull live stats. */
  githubRepo?: RepoRef;
  featured: boolean;
  links?: ProjectLink[];
  problem: string;
  approach: string;
  outcome: string;
  highlights?: string[];
  results?: string[];
  gallery?: string[];
};

export type ContactMethod = {
  label: string;
  href: string;
  value: string;
};

/* ---------- GitHub live sync types ---------- */

export type GitHubConfig = {
  username: string;
  /** Repos to surface in stats + activity feed + spotlight. */
  allowlist: RepoRef[];
  /** Repo (owner/name) to feature in the Current Project Spotlight. */
  currentProject: RepoRef;
};

export type DayLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: DayLevel;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type RepoStat = {
  nameWithOwner: string;
  name: string;
  url: string;
  description: string | null;
  stars: number;
  openIssues: number;
  openPulls: number;
  pushedAt: string;
  updatedAt: string;
  primaryLanguage: string | null;
  languages: { name: string; size: number; color?: string | null }[];
  /** Brief excerpt of the repo README (first ~200 chars). */
  readmeExcerpt: string | null;
  /** Latest commit message on default branch, if available. */
  lastCommitMessage: string | null;
};

export type RepoStatWithActivity = RepoStat & {
  recentActivity: GitHubEvent[];
};

export type GitHubEvent = {
  id: string;
  type:
    | "PushEvent"
    | "PullRequestEvent"
    | "IssuesEvent"
    | "IssueCommentEvent"
    | "CreateEvent"
    | "ReleaseEvent"
    | "ForkEvent"
    | "WatchEvent"
    | string;
  repo: string;
  created: string;
  payloadSummary: string;
  url: string | null;
};

export type GitHubData = {
  user: {
    login: string;
    name: string | null;
    avatarUrl: string;
    url: string;
    followers: number;
    publicRepos: number;
  };
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
  allowlistRepos: RepoStat[];
  currentProject: RepoStatWithActivity | null;
  recentEvents: GitHubEvent[];
  /** Aggregated language usage across allowlist repos. */
  languageStats: { name: string; size: number; color?: string | null }[];
  fetchedAt: string;
  /** Set when GITHUB_TOKEN env is missing or any upstream failed gracefully. */
  partial?: boolean;
};