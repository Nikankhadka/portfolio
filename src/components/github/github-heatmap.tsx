"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ContributionWeek, DayLevel } from "@/content/types";

const LEVEL_BG: Record<DayLevel, string> = {
  0: "rgba(26, 34, 48, 0.06)",
  1: "rgba(63, 160, 176, 0.28)",
  2: "rgba(63, 160, 176, 0.52)",
  3: "rgba(63, 160, 176, 0.78)",
  4: "rgba(31, 122, 140, 0.95)"
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GitHubHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const reduceMotion = useReducedMotion();

  if (!weeks.length) {
    return (
      <div className="panel flex min-h-[10rem] items-center justify-center p-6 text-sm text-[color:var(--muted-strong)]" style={{ background: "var(--section-bg-card)" }}>
        Contribution calendar unavailable.
      </div>
    );
  }

  return (
    <div className="panel p-5" style={{ background: "var(--section-bg-card)" }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
          Contribution calendar · last 12 months
        </p>
        <Legend />
      </div>

      <div className="mt-4 overflow-x-auto pb-2">
        <div className="inline-grid min-w-full auto-rows-[10px] grid-flow-col grid-rows-[repeat(7,10px)] gap-[3px]">
          {weeks.map((week: ContributionWeek, wIdx: number) =>
            week.days.map((day) => (
              <motion.span
                key={day.date}
                title={`${day.date} · ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={reduceMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(wIdx * 0.004, 0.5) }}
                className="h-[10px] w-[10px] rounded-[2px] hover:outline hover:outline-1 hover:outline-[color:var(--accent-soft)]"
                style={{ background: LEVEL_BG[day.level] }}
              />
            ))
          )}
        </div>
        <div className="mt-1 flex gap-[3px] text-[0.6rem] tracking-[0.18em] text-[color:var(--muted)]">
          {weeks.map((week, wIdx) => {
            const firstDay = week.days[0];
            if (!firstDay) return null;
            const month = new Date(firstDay.date).getMonth();
            const isFirstOccurrence =
              weeks.findIndex((w) => w.days[0] && new Date(w.days[0].date).getMonth() === month) === wIdx;
            return (
              <span key={wIdx} className="w-[10px] text-center">
                {isFirstOccurrence && wIdx % 4 === 0 ? MONTHS[month].slice(0, 1) : ""}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-1.5 text-[0.6rem] tracking-[0.14em] text-[color:var(--muted-strong)]">
      <span>Less</span>
      {([0, 1, 2, 3, 4] as DayLevel[]).map((level) => (
        <span
          key={level}
          className="h-[10px] w-[10px] rounded-[2px]"
          style={{ background: LEVEL_BG[level] }}
        />
      ))}
      <span>More</span>
    </div>
  );
}