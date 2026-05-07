"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import type { ProjectEntry } from "@/content/types";
import { cn } from "@/lib/utils";

const coverVariantClassName: Record<ProjectEntry["coverVariant"], string> = {
  system:
    "bg-[radial-gradient(circle_at_top_left,var(--accent-soft),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_70%)]",
  mission:
    "bg-[radial-gradient(circle_at_center,rgba(0,255,240,0.18),transparent_48%),linear-gradient(135deg,rgba(195,255,86,0.12),transparent_72%)]",
  terminal:
    "bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.18),transparent_48%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_72%)]"
};

export function ProjectCard({ project }: { project: ProjectEntry }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full flex-col rounded-[2rem] bg-[color:var(--panel)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_60px_rgba(0,0,0,0.25)]"
    >
      <div
        className={cn(
          "mb-6 flex min-h-40 flex-col justify-between rounded-[1.4rem] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
          coverVariantClassName[project.coverVariant]
        )}
      >
        <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.32em] text-[color:var(--muted)]">
          <span>{project.year}</span>
          <span>{project.status}</span>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[color:var(--accent)]">
            Featured Build
          </p>
          <h3 className="font-display text-xl uppercase tracking-[0.12em] text-[color:var(--foreground)]">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="flex h-full flex-col space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">
          {project.role}
        </p>
        <p className="text-base leading-7 text-[color:var(--copy)]">
          {project.summary}
        </p>
        <p className="text-sm leading-6 text-[color:var(--copy)]">
          {project.impact}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[color:var(--panel-muted)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--muted)]"
            >
              {item}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium uppercase tracking-[0.25em] text-[color:var(--foreground)] transition group-hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        >
          Open Case Study
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </motion.article>
  );
}
