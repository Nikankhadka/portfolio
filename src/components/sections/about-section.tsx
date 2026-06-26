import { SectionShell } from "@/components/section-shell";
import { sectionCopy, experienceSidebar } from "@/content/site";

export function AboutSection({ tone = "even" }: { tone?: "even" | "odd" }) {
  const { about } = sectionCopy;

  return (
    <SectionShell id="about" index="01" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
        <div className="space-y-4">
          <p className="section-kicker">{about.kicker}</p>
          <h2 className="section-heading">{about.heading}</h2>
          <span className="accent-rule" />
        </div>

        <div className="space-y-7">
          <div className="space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-[color:var(--copy)] sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {Object.values(experienceSidebar).map((section) => (
              <div key={section.title} className="panel panel-card p-5">
                <p className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--accent-light)]">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm leading-6 text-[color:var(--copy)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}