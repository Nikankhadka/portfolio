"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionShell } from "@/components/section-shell";
import { LanguageStats } from "@/components/github/language-stats";
import { currentlyLearning, sectionCopy, skillGroups } from "@/content/site";
import { useGitHubData } from "@/lib/github";

const marqueeSkills = [
  "TypeScript", "React", "Next.js", "Node.js", "NestJS", "Express", "Fastify",
  "PostgreSQL", "MongoDB", "Docker", "Playwright", "Tailwind CSS", "Azure OpenAI",
  "GitHub Actions", "NestJS", "JWT / OAuth", "Supabase"
];

export function SkillsSection({ tone = "even" }: { tone?: "even" | "odd" }) {
  const reduceMotion = useReducedMotion();
  const { data, loading } = useGitHubData();
  const { skills } = sectionCopy;

  return (
    <SectionShell id="skills" index="02" tone={tone}>
      <div className="space-y-4">
        <p className="section-kicker">{skills.kicker}</p>
        <h2 className="section-heading">{skills.heading}</h2>
        <span className="accent-rule" />
        <p className="section-intro text-base">{skills.intro}</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
            className="panel panel-hover p-5"
          >
            <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
              {group.label}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="chip">{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Marquee */}
      <div className="mt-8 marquee">
        <div className="marquee__track">
          {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="font-display text-[clamp(1.2rem,0.9rem+1.4vw,1.8rem)] font-medium tracking-[-0.015em] text-[color:var(--muted)] opacity-70"
            >
              {skill}
              <span className="ml-6 text-[color:var(--accent)] opacity-50">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Currently learning — highlighted teal-bordered card */}
      <div className="mt-8 panel border-[color:var(--accent-soft)] p-5" style={{ background: "var(--accent-softer)" }}>
        <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
          Currently learning
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {currentlyLearning.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-7 text-[color:var(--foreground)]">
              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Live language stats */}
      <div className="mt-6 panel panel-card p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
            Language usage · across tracked repos
          </p>
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            {loading ? "Syncing…" : "Synced live"}
          </span>
        </div>
        <div className="mt-4">
          <LanguageStats stats={data?.languageStats ?? []} />
        </div>
      </div>
    </SectionShell>
  );
}