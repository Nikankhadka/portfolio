import { SectionShell } from "@/components/section-shell";
import { experienceEntries, sectionCopy } from "@/content/site";

export function ExperienceSection({ tone = "even" }: { tone?: "even" | "odd" }) {
  const { experience } = sectionCopy;

  return (
    <SectionShell id="experience" index="05" tone={tone}>
      <div className="space-y-4">
        <p className="section-kicker">{experience.kicker}</p>
        <h2 className="section-heading">{experience.heading}</h2>
        <span className="accent-rule" />
      </div>

      <ol className="mt-10 space-y-4">
        {experienceEntries.map((entry) => (
          <li
            key={`${entry.company}-${entry.period}`}
            className="panel panel-hover relative pl-7 sm:pl-9"
          >
            <span className="absolute left-3.5 top-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_4px_var(--accent-softer)] sm:left-4" />
            <span className="absolute left-[13px] top-12 bottom-0 w-px -translate-x-1/2 bg-[color:var(--border-faint)] sm:left-[15px]" />
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1.5">
                  <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
                    {entry.company}
                  </p>
                  <h3 className="font-display text-lg tracking-[-0.005em] text-[color:var(--foreground)]">
                    {entry.role}
                  </h3>
                  <p className="text-sm leading-6 text-[color:var(--copy)]">{entry.summary}</p>
                </div>
                <div className="space-y-1 text-xs text-[color:var(--muted)] sm:text-right">
                  <p>{entry.period}</p>
                  <p>{entry.location}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-lg bg-[color:var(--background-elevated)] px-3.5 py-2.5 text-sm leading-6 text-[color:var(--copy)]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}