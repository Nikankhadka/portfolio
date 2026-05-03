import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionShell } from "@/components/section-shell";
import { getProjectBySlug, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | NIKAN OS"
    };
  }

  return {
    title: `${project.title} | NIKAN OS`,
    description: project.summary
  };
}

export default async function ProjectCaseStudyPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SectionShell id="project-overview" className="space-y-8">
        <Link href="/#projects" className="secondary-cta inline-flex">
          Back to Projects
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <p className="section-kicker">Case Study</p>
            <h1 className="section-heading">{project.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-[color:var(--copy)]">
              {project.summary}
            </p>
          </div>

          <aside className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--muted)]">Role</dt>
                <dd className="mt-2 text-base text-[color:var(--foreground)]">{project.role}</dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--muted)]">Timeline</dt>
                <dd className="mt-2 text-base text-[color:var(--foreground)]">{project.year}</dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--muted)]">Status</dt>
                <dd className="mt-2 text-base text-[color:var(--foreground)]">{project.status}</dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--muted)]">Stack</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[color:var(--border-subtle)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </SectionShell>

      <SectionShell id="project-detail" className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
          <p className="section-kicker">Problem</p>
          <p className="mt-5 text-base leading-8 text-[color:var(--copy)]">{project.problem}</p>
        </article>
        <article className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
          <p className="section-kicker">Approach</p>
          <p className="mt-5 text-base leading-8 text-[color:var(--copy)]">{project.approach}</p>
        </article>
        <article className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
          <p className="section-kicker">Outcome</p>
          <p className="mt-5 text-base leading-8 text-[color:var(--copy)]">{project.outcome}</p>
        </article>
      </SectionShell>

      {project.highlights?.length || project.results?.length ? (
        <SectionShell id="project-highlights" className="grid gap-5 lg:grid-cols-2">
          {project.highlights?.length ? (
            <article className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
              <p className="section-kicker">Highlights</p>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="text-base leading-8 text-[color:var(--copy)]">
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {project.results?.length ? (
            <article className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
              <p className="section-kicker">Results</p>
              <ul className="mt-5 space-y-3">
                {project.results.map((result) => (
                  <li key={result} className="text-base leading-8 text-[color:var(--copy)]">
                    {result}
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </SectionShell>
      ) : null}

      {project.links?.length ? (
        <SectionShell id="project-links" className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
          <p className="section-kicker">External Links</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} className="secondary-cta inline-flex" target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </SectionShell>
      ) : null}
    </main>
  );
}
