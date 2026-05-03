"use client";

import Link from "next/link";

import { HomeScrollShell } from "@/components/home-scroll-shell";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { SectionShell } from "@/components/section-shell";
import { useTheme } from "@/components/theme-provider";
import { featuredProjects } from "@/content/projects";
import {
  contactMethods,
  experienceEntries,
  experienceSidebar,
  footerCopy,
  homeSectionIds,
  homeSections,
  sectionCopy,
  skillCategories
} from "@/content/site";
import type { SiteThemeMode } from "@/content/types";

function pickModeValue<TFocus, TPlay>(value: { focus: TFocus; play: TPlay }, mode: SiteThemeMode) {
  return mode === "focus" ? value.focus : value.play;
}

export default function Home() {
  const { mode } = useTheme();
  const [introSection, aboutSection, experienceSection, skillsSection, projectsSection, contactSection] = homeSections;
  const aboutHeading = pickModeValue(sectionCopy.about.heading, mode);
  const aboutParagraphs = pickModeValue(sectionCopy.about.paragraphs, mode);
  const experienceHeading = pickModeValue(sectionCopy.experience.heading, mode);
  const experienceIntro = pickModeValue(sectionCopy.experience.intro, mode);
  const skillsHeading = pickModeValue(sectionCopy.skills.heading, mode);
  const skillsIntro = pickModeValue(sectionCopy.skills.intro, mode);
  const projectsHeading = pickModeValue(sectionCopy.projects.heading, mode);
  const contactHeading = pickModeValue(sectionCopy.contact.heading, mode);
  const contactBody = pickModeValue(sectionCopy.contact.body, mode);
  const footerBody = pickModeValue(footerCopy, mode);

  return (
    <HomeScrollShell sectionIds={homeSectionIds}>
      <SectionShell
        id={introSection.id}
        variant="snap"
        contentClassName="mx-auto flex h-full w-full max-w-7xl flex-col justify-center overflow-y-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-12"
      >
        <HeroSection />
      </SectionShell>

      <SectionShell
        id={aboutSection.id}
        variant="snap"
        contentClassName="mx-auto grid h-full w-full max-w-7xl gap-8 overflow-y-auto px-4 py-10 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8 lg:py-12"
      >
        <div>
          <p className="section-kicker">{sectionCopy.about.kicker}</p>
          <h2 className="section-heading">{aboutHeading}</h2>
        </div>
        <div className="space-y-5">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-[color:var(--copy)] sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id={experienceSection.id}
        variant="snap"
        contentClassName="mx-auto flex h-full w-full max-w-7xl flex-col gap-8 overflow-y-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">{sectionCopy.experience.kicker}</p>
            <h2 className="section-heading">{experienceHeading}</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--copy)]">{experienceIntro}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {experienceEntries.map((entry) => (
              <article
                key={`${entry.company}-${entry.period}`}
                className="rounded-[2rem] bg-[color:var(--panel)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_48px_rgba(0,0,0,0.18)]"
              >
                <div className="flex flex-col gap-4 border-b border-[color:var(--border-subtle)] pb-5 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--accent)]">{entry.company}</p>
                    <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-[color:var(--foreground)]">
                      {entry.role}
                    </h3>
                    <p className="text-sm leading-6 text-[color:var(--copy)]">{entry.summary}</p>
                  </div>
                  <div className="space-y-2 text-sm text-[color:var(--muted)] md:text-right">
                    <p>{entry.period}</p>
                    <p>{entry.location}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-[1.4rem] bg-[color:var(--panel-muted)] px-4 py-3 text-sm leading-6 text-[color:var(--copy)]">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {Object.values(experienceSidebar).map((section) => (
              <aside
                key={section.title}
                className="rounded-[2rem] bg-[color:var(--panel)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_48px_rgba(0,0,0,0.18)]"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--accent)]">{section.title}</p>
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm leading-6 text-[color:var(--copy)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id={skillsSection.id}
        variant="snap"
        contentClassName="mx-auto flex h-full w-full max-w-7xl flex-col gap-8 overflow-y-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">{sectionCopy.skills.kicker}</p>
            <h2 className="section-heading">{skillsHeading}</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--copy)]">{skillsIntro}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category) => (
            <article
              key={category.id}
              className="rounded-[2rem] bg-[color:var(--panel)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_48px_rgba(0,0,0,0.18)]"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--accent)]">{category.label}</p>
              <ul className="mt-5 space-y-3">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-[color:var(--panel-muted)] px-4 py-3 text-sm text-[color:var(--copy)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id={projectsSection.id}
        variant="snap"
        contentClassName="mx-auto flex h-full w-full max-w-7xl flex-col gap-8 overflow-y-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">{sectionCopy.projects.kicker}</p>
            <h2 className="section-heading">{projectsHeading}</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact" className="secondary-cta">
              Contact Me
            </Link>
            <Link href="/Nikan-Resume.txt" download className="secondary-cta">
              Download Resume
            </Link>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id={contactSection.id}
        variant="snap"
        contentClassName="mx-auto flex h-full w-full max-w-7xl flex-col gap-10 overflow-y-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="section-kicker">{sectionCopy.contact.kicker}</p>
            <h2 className="section-heading">{contactHeading}</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--copy)] sm:text-lg">{contactBody}</p>
          </div>

          <div className="rounded-[2rem] bg-[color:var(--panel)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_52px_rgba(0,0,0,0.2)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">Direct Contact</p>
            <div className="mt-5 space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="flex items-center justify-between rounded-[1.4rem] bg-[color:var(--panel-muted)] px-4 py-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="uppercase tracking-[0.28em] text-[color:var(--muted)]">{method.label}</span>
                  <span className="text-right text-[color:var(--foreground)]">{method.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-auto py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-2xl uppercase tracking-[0.2em] text-[color:var(--foreground)]">NIKAN OS</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{footerBody}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
              <Link href={introSection.href}>Intro</Link>
              <Link href={experienceSection.href}>Experience</Link>
              <Link href={projectsSection.href}>Projects</Link>
              <Link href={contactSection.href}>Contact</Link>
            </div>
          </div>
        </footer>
      </SectionShell>
    </HomeScrollShell>
  );
}
