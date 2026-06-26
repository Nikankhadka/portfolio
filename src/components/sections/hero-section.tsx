"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";

import { hero, heroHighlights } from "@/content/site";
import { useGitHubData } from "@/lib/github";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: "easeOut" }
  })
};

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { data } = useGitHubData();
  const totalContributions = data?.contributionCalendar.totalContributions ?? null;
  const words = hero.name.split(" ");

  return (
    <section
      id="home"
      className="snap-shell-section"
      style={{
        minHeight: "100%",
        scrollSnapAlign: "center",
        scrollSnapStop: "normal",
        display: "grid",
        placeItems: "center",
        padding: "var(--section-y) 0",
        background: "var(--section-bg-even)",
        overflow: "clip",
        isolation: "isolate"
      }}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.5fr_0.9fr] lg:items-center lg:gap-16 lg:px-8">
        {/* Editorial left column */}
        <div className="space-y-7">
          <motion.p
            variants={fade}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            className="section-eyebrow flex items-center gap-2.5"
          >
            <span className="status-dot" />
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-display font-medium leading-[0.95] tracking-[-0.03em] text-[color:var(--foreground)] text-[clamp(2.8rem,1.5rem+6.2vw,6.5rem)]">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.06em]">
                <motion.span
                  className="inline-block"
                  custom={i}
                  variants={reduceMotion ? undefined : wordVariants}
                  initial={reduceMotion ? false : "hidden"}
                  animate={reduceMotion ? undefined : "show"}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
              </span>
            ))}
          </h1>

          <motion.p
            variants={reduceMotion ? undefined : fade}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            transition={{ delay: 0.4 }}
            className="font-display text-[clamp(1.1rem,0.95rem+0.9vw,1.5rem)] tracking-[-0.01em] text-[color:var(--accent-light)]"
          >
            {hero.role}
          </motion.p>

          <motion.span
            variants={reduceMotion ? undefined : fade}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            transition={{ delay: 0.5 }}
            className="accent-rule"
          />

          <motion.p
            variants={reduceMotion ? undefined : fade}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            transition={{ delay: 0.6 }}
            className="max-w-xl text-base leading-7 text-[color:var(--copy)]"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            variants={reduceMotion ? undefined : fade}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            transition={{ delay: 0.72 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link href="/#work" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>
              See current work
            </Link>
            <Link href="/#projects" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>
              View projects
            </Link>
            <Link href={hero.resumeHref} download className="btn btn-ghost">
              Download résumé
            </Link>
          </motion.div>
        </div>

        {/* Live status panel */}
        <motion.aside
          variants={reduceMotion ? undefined : fade}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="panel panel-card relative overflow-hidden p-6 sm:p-7"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[color:var(--apricot-soft)] opacity-60 blur-3xl" />
          <div className="relative space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--muted-strong)]">
                Live status
              </p>
              <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--accent-light)]">
                <span className="status-dot" />
                Available
              </span>
            </div>

            <dl className="space-y-4">
              {heroHighlights.map((entry) => (
                <div key={entry.label} className="space-y-1.5">
                  <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    {entry.label}
                  </dt>
                  <dd className="text-sm leading-6 text-[color:var(--copy)]">{entry.value}</dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-[color:var(--border-faint)] pt-4">
              {totalContributions != null ? (
                <p className="text-sm text-[color:var(--copy)]">
                  <span className="font-display text-2xl text-[color:var(--accent-light)]">
                    {totalContributions}
                  </span>
                  <span className="ml-2 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    GitHub contributions · last yr
                  </span>
                </p>
              ) : (
                <p className="text-xs text-[color:var(--muted)]">
                  Live GitHub sync waiting for <code className="text-[color:var(--accent-light)]">GITHUB_TOKEN</code>.
                </p>
              )}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}