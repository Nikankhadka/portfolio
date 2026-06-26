"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import type { ProjectEntry, RepoStat } from "@/content/types";
import { cn, formatRelativeTime } from "@/lib/utils";

export function ProjectCard({
  project,
  repoStat
}: {
  project: ProjectEntry;
  repoStat?: RepoStat | null;
}) {
  const reduceMotion = useReducedMotion();
  const githubLink = project.links?.find((l) => l.label.toLowerCase() === "github") ?? null;

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full flex-col panel panel-hover p-5 sm:p-6"
    >
      <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.26em] text-[color:var(--muted)]">
        <span>{project.year}</span>
        <span className={cn(project.status === "Live project" ? "text-[color:var(--accent-light)]" : "")}>
          {project.status}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
          Featured
        </p>
        <h3 className="font-display text-2xl tracking-[-0.015em] text-[color:var(--foreground)]">
          {project.title}
        </h3>
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--muted-strong)]">
          {project.role}
        </p>
      </div>

      <p className="mt-4 text-sm leading-7 text-[color:var(--copy)]">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="chip">{item}</span>
        ))}
      </div>

      {repoStat ? (
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[color:var(--muted-strong)]">
          <span>★ {repoStat.stars}</span>
          <span>PRs {repoStat.openPulls}</span>
          <span>Pushed {formatRelativeTime(repoStat.pushedAt)}</span>
          {repoStat.primaryLanguage ? <span>· {repoStat.primaryLanguage}</span> : null}
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <Link
          href={`/projects/${project.slug}`}
          className="link-accent text-sm font-medium uppercase tracking-[0.18em]"
        >
          Open case study <span aria-hidden="true">→</span>
        </Link>
        {githubLink ? (
          <a
            href={githubLink.href}
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] transition hover:text-[color:var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            GitHub ↗
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}