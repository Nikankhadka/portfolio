"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionShell } from "@/components/section-shell";
import { ProjectCard } from "@/components/sections/project-card";
import { featuredProjects } from "@/content/projects";
import type { RepoStat } from "@/content/types";
import { sectionCopy } from "@/content/site";
import { useGitHubData } from "@/lib/github";

export function ProjectsSection({ tone = "even" }: { tone?: "even" | "odd" }) {
  const reduceMotion = useReducedMotion();
  const { data } = useGitHubData();
  const { projects } = sectionCopy;

  const repoStatByName = new Map<string, RepoStat>();
  for (const repo of data?.allowlistRepos ?? []) {
    repoStatByName.set(repo.nameWithOwner.toLowerCase(), repo);
  }

  return (
    <SectionShell id="projects" index="04" tone={tone}>
      <div className="space-y-4">
        <p className="section-kicker">{projects.kicker}</p>
        <h2 className="section-heading">{projects.heading}</h2>
        <span className="accent-rule" />
      </div>

      <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project, i) => {
          const repoStat = project.githubRepo
            ? repoStatByName.get(project.githubRepo.toLowerCase()) ?? null
            : null;
          return (
            <motion.div
              key={project.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.07, 0.28) }}
              className="h-full"
            >
              <ProjectCard project={project} repoStat={repoStat} />
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}