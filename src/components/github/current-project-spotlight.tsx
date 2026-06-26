"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { RepoStatWithActivity } from "@/content/types";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { ActivityFeed } from "@/components/github/activity-feed";

export function CurrentProjectSpotlight({ project }: { project: RepoStatWithActivity }) {
  const reduceMotion = useReducedMotion();
  const lastCommit = project.lastCommitMessage?.split("\n")[0];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="panel panel-hover relative overflow-hidden p-6 sm:p-7"
      style={{ background: "var(--section-bg-card)" }}
    >
      <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[color:var(--accent-light-softer)] opacity-70 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
            Currently shipping
          </p>
          <h3 className="font-display text-2xl tracking-[-0.01em] text-[color:var(--foreground)]">
            {project.nameWithOwner}
          </h3>
          {project.description ? (
            <p className="max-w-xl text-sm leading-6 text-[color:var(--copy)]">
              {project.description}
            </p>
          ) : null}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary flex-none"
        >
          View repo ↗
        </a>
      </div>

      {project.readmeExcerpt ? (
        <p className="relative mt-5 border-l border-[color:var(--accent-light-soft)] pl-4 text-sm italic leading-7 text-[color:var(--muted-strong)]">
          {project.readmeExcerpt}
          {project.readmeExcerpt.length >= 200 ? "…" : ""}
        </p>
      ) : null}

<dl className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Stars" value={project.stars} />
        <Stat label="Open PRs" value={project.openPulls} />
        <Stat label="Open issues" value={project.openIssues} />
        <Stat label="Primary" value={project.primaryLanguage ?? "—" } />
      </dl>

      <div className="relative mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[color:var(--muted)]">
        <span>Last push · {formatRelativeTime(project.pushedAt)}</span>
        <span>Updated · {formatDate(project.updatedAt)}</span>
        {lastCommit ? (
          <span className="max-w-[30rem] truncate">
            Latest commit: <span className="text-[color:var(--copy)]">{lastCommit}</span>
          </span>
        ) : null}
      </div>

      {project.recentActivity.length ? (
        <div className="relative mt-7">
          <p className="mb-3 text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Recent activity · {project.name}
          </p>
          <ActivityFeed events={project.recentActivity} />
        </div>
      ) : null}
    </motion.article>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-[color:var(--border-faint)] bg-[color:var(--background-elevated)] px-4 py-3">
      <dt className="text-[0.62rem] uppercase tracking-[0.26em] text-[color:var(--muted)]">{label}</dt>
      <dd className="mt-1 font-display text-lg text-[color:var(--foreground)]">{value}</dd>
    </div>
  );
}