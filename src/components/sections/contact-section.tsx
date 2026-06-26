import Link from "next/link";

import { SectionShell } from "@/components/section-shell";
import { contactMethods, footerCopy, homeSections, sectionCopy } from "@/content/site";

export function ContactSection({ tone = "even" }: { tone?: "even" | "odd" }) {
  const { contact } = sectionCopy;

  return (
    <SectionShell id="contact" index="06" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="space-y-4">
          <p className="section-kicker">{contact.kicker}</p>
          <h2 className="section-heading font-display !text-[clamp(2rem,1.4rem+2.6vw,3.4rem)]">
            {contact.heading}
          </h2>
          <span className="accent-rule" />
          <p className="section-intro text-base">{contact.body}</p>

          <div className="pt-4">
            <a href="mailto:nikan.khadka.2002@gmail.com" className="btn btn-primary">
              Say hello →
            </a>
          </div>
        </div>

        <div className="panel panel-card p-6">
          <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--muted-strong)]">
            Direct contact
          </p>
          <div className="mt-5 space-y-2">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5 text-sm transition hover:border-[color:var(--accent-soft)] hover:bg-[color:var(--background-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
              >
                <span className="text-[0.66rem] uppercase tracking-[0.26em] text-[color:var(--muted)]">
                  {method.label}
                </span>
                <span className="text-right text-[color:var(--foreground)]">{method.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-[color:var(--border-faint)] pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg tracking-[-0.005em] text-[color:var(--foreground)]">
              Nikan Khadka
            </p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{footerCopy}</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {homeSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="transition hover:text-[color:var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </SectionShell>
  );
}