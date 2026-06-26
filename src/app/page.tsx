import { ScrollShell } from "@/components/scroll-shell";
import { SideRail } from "@/components/side-rail";
import { SakuraDivider } from "@/components/sakura/sakura-divider";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { CurrentWorkSection } from "@/components/sections/current-work-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <SideRail />
      <ScrollShell>
        <main id="main-content">
          <HeroSection />
          <SakuraDivider rotate={-4} />
          <AboutSection tone="odd" />
          <SakuraDivider rotate={3} flip />
          <SkillsSection tone="even" />
          <SakuraDivider rotate={-2} />
          <CurrentWorkSection tone="odd" />
          <SakuraDivider rotate={4} flip />
          <ProjectsSection tone="even" />
          <SakuraDivider rotate={-3} />
          <ExperienceSection tone="odd" />
          <SakuraDivider rotate={2} flip />
          <ContactSection tone="even" />
        </main>
      </ScrollShell>
    </>
  );
}