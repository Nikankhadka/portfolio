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
  if (!project) return { title: "Project Not Found | Nikan Khadka" };
  return { title: `${project.title} | Nikan Khadka`, description: project.summary };
}

export default async function ProjectCaseStudyPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8"
      style={{ paddingTop: "calc(var(--header-height) + var(--section-y))", paddingBottom: "var(--section-y)" }}
    >
      <Link href="/#projects" className="btn btn-ghost mb-10">
        ← Back to Projects
      </Link>

      <SectionShell id="project-overview" snap={false} index="CS">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <p className="section-kicker">Case Study</p>
            <h1 className="section-heading !text-[clamp(2rem,1.4rem+2.4vw,3.2rem)]">{project.title}</h1>
            <span className="accent-rule" />
            <p className="max-w-3xl text-lg leading-8 text-[color:var(--copy)]">{project.summary}</p>
          </div>

          <aside className="panel panel-soft h-fit p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--muted)]">Role</dt>
                <dd className="mt-2 text-base text-[color:var(--foreground)]">{project.role}</dd>
              </div>
              <div>
                <dt className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--muted)]">Timeline</dt>
                <dd className="mt-2 text-base text-[color:var(--foreground)]">{project.year}</dd>
              </div>
              <div>
                <dt className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--muted)]">Status</dt>
                <dd className="mt-2 text-base text-[color:var(--foreground)]">{project.status}</dd>
              </div>
              <div>
                <dt className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--muted)]">Stack</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </SectionShell>

      <SectionShell id="project-detail" snap={false} className="mt-12" contentClassName="grid gap-5 lg:grid-cols-3">
        <article className="panel panel-soft p-6">
          <p className="section-kicker">Problem</p>
          <p className="mt-5 text-base leading-8 text-[color:var(--copy)]">{project.problem}</p>
        </article>
        <article className="panel panel-soft p-6">
          <p className="section-kicker">Approach</p>
          <p className="mt-5 text-base leading-8 text-[color:var(--copy)]">{project.approach}</p>
        </article>
        <article className="panel panel-soft p-6">
          <p className="section-kicker">Outcome</p>
          <p className="mt-5 text-base leading-8 text-[color:var(--copy)]">{project.outcome}</p>
        </article>
      </SectionShell>

      {project.highlights?.length || project.results?.length ? (
        <SectionShell id="project-highlights" snap={false} className="mt-8" contentClassName="grid gap-5 lg:grid-cols-2">
          {project.highlights?.length ? (
            <article className="panel panel-soft p-6">
              <p className="section-kicker">Highlights</p>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="text-base leading-8 text-[color:var(--copy)]">{highlight}</li>
                ))}
              </ul>
            </article>
          ) : null}
          {project.results?.length ? (
            <article className="panel panel-soft p-6">
              <p className="section-kicker">Results</p>
              <ul className="mt-5 space-y-3">
                {project.results.map((result) => (
                  <li key={result} className="text-base leading-8 text-[color:var(--copy)]">{result}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </SectionShell>
      ) : null}

      {project.links?.length ? (
        <SectionShell id="project-links" snap={false} className="mt-8" contentClassName="space-y-4">
          <p className="section-kicker">External links</p>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} className="btn btn-secondary" target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        </SectionShell>
      ) : null}
    </main>
  );
}