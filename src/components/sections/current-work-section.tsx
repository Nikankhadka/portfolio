"use client";

import { SectionShell } from "@/components/section-shell";
import { CurrentProjectSpotlight } from "@/components/github/current-project-spotlight";
import { GitHubHeatmap } from "@/components/github/github-heatmap";
import { ActivityFeed } from "@/components/github/activity-feed";
import { sectionCopy } from "@/content/site";
import { useGitHubData } from "@/lib/github";

function EmptyState({ note }: { note: string }) {
  return (
    <div className="panel panel-card flex min-h-[10rem] items-center justify-center p-6 text-sm text-[color:var(--muted-strong)]">
      {note}
    </div>
  );
}

export function CurrentWorkSection({ tone = "even" }: { tone?: "even" | "odd" }) {
  const { data, loading } = useGitHubData();
  const { work } = sectionCopy;

  return (
    <SectionShell id="work" index="03" tone={tone}>
      <div className="space-y-4">
        <p className="section-kicker">{work.kicker}</p>
        <h2 className="section-heading">{work.heading}</h2>
        <span className="accent-rule" />
        <p className="section-intro text-base">{work.intro}</p>
      </div>

      <div className="mt-10">
        {loading && !data ? (
          <EmptyState note="Syncing contribution data from GitHub…" />
        ) : data?.currentProject ? (
          <CurrentProjectSpotlight project={data.currentProject} />
        ) : (
          <EmptyState note="Current project data unavailable. Add GITHUB_TOKEN to enable live sync." />
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {data ? (
          <GitHubHeatmap weeks={data.contributionCalendar.weeks} />
        ) : (
          <EmptyState note="Contribution calendar will appear here once synced." />
        )}

        <div className="panel panel-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
              Recent activity
            </p>
            {data?.contributionCalendar ? (
              <span className="text-sm font-medium text-[color:var(--foreground)]">
                {data.contributionCalendar.totalContributions}
                <span className="ml-1 text-xs text-[color:var(--muted)]">/ yr</span>
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <ActivityFeed events={data?.recentEvents ?? []} />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}