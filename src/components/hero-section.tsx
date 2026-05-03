"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { useTheme } from "@/components/theme-provider";
import { heroContent, heroPanel } from "@/content/site";
import { cn } from "@/lib/utils";

function pickModeValue<TFocus, TPlay>(value: { focus: TFocus; play: TPlay }, mode: "focus" | "play") {
  return mode === "focus" ? value.focus : value.play;
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { mode, setMode } = useTheme();
  const isPlay = mode === "play";
  const heroTitle = pickModeValue(heroContent.title, mode);
  const heroDescription = pickModeValue(heroContent.description, mode);

  return (
    <div className="relative overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:items-end">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] text-[color:var(--muted)]">
              {heroContent.eyebrow}
            </p>
            <div className="space-y-3">
              <h1 className="font-display text-6xl uppercase tracking-[0.18em] text-[color:var(--foreground)] sm:text-7xl lg:text-8xl">
                {heroContent.name}
              </h1>
              <div className="max-w-2xl space-y-3">
                <p className="text-xl uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  {heroTitle}
                </p>
                <p className="max-w-xl text-base leading-7 text-[color:var(--copy)] sm:text-lg">
                  {heroDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-[color:var(--accent-contrast)] shadow-[0_14px_40px_var(--accent-soft)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              View Projects
            </Link>
            <Link
              href="/Nikan-Resume.txt"
              download
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--panel-muted)] px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-[color:var(--foreground)] shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              Download Resume
            </Link>
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                isPlay
                  ? "bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                  : "bg-[color:var(--panel-muted)] text-[color:var(--foreground)] hover:-translate-y-0.5 hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)]"
              )}
              onClick={() => setMode("play")}
            >
              Open Play Mode
            </button>
          </div>
        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-[color:var(--panel)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-80" />
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-[color:var(--muted)]">
                {isPlay ? "Player Card" : "Status Panel"}
              </p>
              <p className="mt-2 font-display text-2xl uppercase tracking-[0.2em] text-[color:var(--foreground)]">
                {isPlay ? "Session Live" : "System Ready"}
              </p>
            </div>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--led)] shadow-[0_0_16px_var(--accent-soft)]" />
              {isPlay ? "Online" : "Available"}
            </span>
          </div>

          <div className="space-y-5">
            {heroPanel.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-[color:var(--panel-muted)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--copy)]">
                  {pickModeValue(item.value, mode)}
                </p>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
