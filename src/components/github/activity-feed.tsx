"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { GitHubEvent } from "@/content/types";
import { formatRelativeTime } from "@/lib/utils";
import { github } from "@/content/site";

const TYPE_LABEL: Record<string, string> = {
  PushEvent: "pushed to",
  PullRequestEvent: "opened PR in",
  IssuesEvent: "updated issue in",
  IssueCommentEvent: "commented in",
  CreateEvent: "created",
  ReleaseEvent: "released",
  ForkEvent: "forked",
  WatchEvent: "starred"
};

export function ActivityFeed({ events }: { events: GitHubEvent[] }) {
  const reduceMotion = useReducedMotion();

  if (!events.length) {
    return (
      <div className="flex min-h-[6rem] items-center justify-center px-2 py-3 text-sm text-[color:var(--muted-strong)]">
        No recent public activity from tracked repos.
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {events.map((event, i) => {
        const repoHref = `https://github.com/${github.username}/${event.repo}`;
        return (
          <motion.a
            key={event.id}
            href={event.url ?? repoHref}
            target="_blank"
            rel="noreferrer"
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
            className="group flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-[color:var(--accent-light-soft)] hover:bg-[color:var(--background-elevated)]"
          >
            <span className="mt-1.5 flex h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent-light)] opacity-80 transition group-hover:opacity-100" />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-6 text-[color:var(--copy)]">
                <span className="text-[color:var(--accent-light)]">
                  {TYPE_LABEL[event.type] ?? event.type.replace(/Event$/, "")}
                </span>{" "}
                <span className="font-medium text-[color:var(--foreground)]">{event.repo}</span>
              </p>
              <p className="truncate text-xs leading-5 text-[color:var(--muted)]">
                {event.payloadSummary}
              </p>
            </div>
            <span className="flex-none text-xs text-[color:var(--muted)]">
              {formatRelativeTime(event.created)}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}