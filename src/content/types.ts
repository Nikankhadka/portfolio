export type SiteThemeMode = "focus" | "play";

export type ModeValue<T> = {
  focus: T;
  play: T;
};

export type HomeSectionId = "intro" | "about" | "experience" | "skills" | "projects" | "contact";

export type HomeSection = {
  id: HomeSectionId;
  label: string;
  href: `/#${HomeSectionId}`;
};

export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectEntry = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  impact: string;
  status: string;
  year: string;
  coverVariant: "system" | "mission" | "terminal";
  featured: boolean;
  links?: ProjectLink[];
  problem: string;
  approach: string;
  outcome: string;
  highlights?: string[];
  results?: string[];
  gallery?: string[];
};

export type LabItem = {
  id: string;
  title: string;
  description: string;
  interaction: "command-palette" | "theme-easter-egg" | "mini-toggle-demo";
};

export type ContactMethod = {
  label: string;
  href: string;
  value: string;
};
