import type {
  ContactMethod,
  ExperienceEntry,
  GitHubConfig,
  HomeSection,
  HomeSectionId,
  SkillGroup
} from "@/content/types";

export const homeSections: HomeSection[] = [
  { id: "about", label: "About", href: "/#about" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "contact", label: "Contact", href: "/#contact" }
];

export const navItems = homeSections;

export const homeSectionIds = homeSections.map((section) => section.id) as HomeSectionId[];

export function isHomeSectionId(value: string): value is HomeSectionId {
  return homeSectionIds.includes(value as HomeSectionId);
}

/* ---------- Identity ---------- */

export const hero = {
  eyebrow: "Sydney, Australia",
  name: "Nikan Khadka",
  role: "Full-Stack Software Engineer",
  tagline: "I build production-ready web applications with clean architecture, dependable APIs, and modern tooling.",
  description:
    "Full-stack developer focusing on scalable products, practical delivery, and AI-assisted workflows that actually improve how teams ship.",
  availability: "Available for full-stack software engineering roles in Sydney and remote.",
  resumeHref: "/Nikan-Khadka-Resume.pdf"
} as const;

export const heroHighlights = [
  { label: "Status", value: "Open to junior & mid-level full-stack roles" },
  { label: "Current Mission", value: "Placement student at Paypipe, building AI-assisted concierge features." },
  { label: "Core Stack", value: "Node.js · React · Next.js · TypeScript · PostgreSQL · Docker" }
];

/* ---------- Section copy ---------- */

export const sectionCopy = {
  about: {
    kicker: "About",
    heading: "Full-stack developer grounded in clean code and practical delivery.",
    paragraphs: [
      "I'm a Sydney-based full-stack software engineer who enjoys turning ambiguous problems into reliable, well-structured products. My work usually sits where clean UI meets dependable APIs and maintainable architecture.",
      "I care about code quality, developer productivity, and shipping things that hold up past the first demo. Lately I've been deepening my DevOps, cloud, and AI-assisted delivery muscles."
    ]
  },
  skills: {
    kicker: "Skills",
    heading: "A working stack for shipping full-stack products end to end.",
    intro:
      "The tools below reflect what I actually reach for across product delivery, integrations, testing, and AI-assisted workflows."
  },
  work: {
    kicker: "Current Work",
    heading: "Live from GitHub — contributions and what I'm building right now.",
    intro:
      "Synced directly from my public repositories: contribution activity, recent pushes, and the project I'm actively working on."
  },
  projects: {
    kicker: "Projects",
    heading: "Selected work that shows product thinking and implementation depth."
  },
  experience: {
    kicker: "Experience",
    heading: "Hands-on delivery across SaaS products, internal systems, and AI-assisted workflows."
  },
  contact: {
    kicker: "Contact",
    heading: "Let's build something dependable together.",
    body:
      "I'm open to full-time, part-time, and remote opportunities in junior to mid-level full-stack software engineering and IT support roles. Especially interested in teams that value engineering standards and modern tooling."
  }
} as const;

export const footerCopy = "Built with Next.js, TypeScript, and a live GitHub sync.";

/* ---------- Skills ---------- */

export const skillGroups: SkillGroup[] = [
  {
    label: "Core Stack",
    items: ["TypeScript", "JavaScript", "Node.js", "React", "Next.js", "Express", "NestJS", "Fastify"]
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS", "HTML/CSS"]
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "JWT / OAuth"]
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"]
  },
  {
    label: "Tools & Delivery",
    items: ["Docker", "GitHub Actions", "Playwright", "Jest", "GitLab", "Vercel", "Render"]
  },
  {
    label: "AI & Productivity",
    items: ["Azure OpenAI", "ChatGPT", "Claude", "Codex", "Cursor", "Workflow Automation"]
  }
];

export const currentlyLearning: string[] = [
  "Cloud deployment & CI/CD depth on Docker-based workflows",
  "Applied AI engineering for production product features",
  "System design for scalable full-stack products"
];

export const skillCategories = skillGroups;

/* ---------- Experience ---------- */

export const experienceEntries: ExperienceEntry[] = [
  {
    company: "Paypipe",
    role: "AI Software Engineer",
    period: "Feb 2026 - Present",
    location: "Sydney, Australia",
    summary:
      "Building AI-assisted concierge workflows for a trade-services SaaS platform used by ~20 traders and ~50 clients.",
    highlights: [
      "Built AI-assisted workflows integrating LLM-powered assistants into client-facing chat for job scoping, quotation drafting, and milestone-based offer generation.",
      "Engineered RAG-style conversation grounding so AI outputs use active customer-provider chat history as context, improving relevance for job scopes, pricing, and service-provider responses.",
      "Designed a practical agentic offer workflow where structured inputs, PDF summaries, voice/audio translation, and prompt-controlled AI responses reduce manual quotation effort.",
      "Added human edit/confirmation steps around AI-generated outputs, keeping providers in control before quotes or milestone offers are sent to clients.",
      "Helped reduce manual messaging and quotation preparation effort by an estimated 70%+ for ~20 traders and ~50 clients through AI-assisted concierge workflows."
    ]
  },
  {
    company: "Eightbit / Dzangolab",
    role: "Software Developer",
    period: "Sep 2023 - Mar 2025",
    location: "Kathmandu, Nepal",
    summary:
      "Shipped full-stack SaaS features across Dzango-HQ Legal, Dzango LMS, and 12deg in an 8-developer team.",
    highlights: [
      "Dzango-HQ Legal: built UI/API/automation for contracts/documents, leave, payslips, calendar, performance reviews, bank/SSF details, and approvals; used Make.com notifications, cutting email/paper steps by 50%+ for 20+ staff.",
      "Dzango LMS: modelled and built modules for courses, skills, students, companies, invitations, teacher assignments, grading, certifications, and markdown resources.",
      "Improved LMS onboarding visibility by replacing untracked resource sharing with structured progress, submissions, and grading — personal onboarding testing showed completion in under half the usual time.",
      "12deg: built a collaborative markdown editor from scratch with Milkdown/ProseMirror and Socket.IO; contributed release-dashboard graphing with Chart.js and service-dependency visualisation.",
      "Implemented GitLab/Docker event-driven release workflows with branch-to-release mapping, service deploy/stop controls, webhook status sync, and release graph updates — tested across 5+ branches and 30+ service instances.",
      "Wrote ~20 Playwright E2E tests for authentication and release workflows; added test database fixtures and supported CI/test environment setup, production YAML/env fixes, and SMTP configuration."
    ]
  },
  {
    company: "Softechtonic",
    role: "Full-Stack Developer Intern",
    period: "Feb 2023 - Jul 2023",
    location: "Kathmandu, Nepal",
    summary:
      "Built backend and admin features for healthcare and course-management products; designed 40+ REST APIs.",
    highlights: [
      "Built backend/admin web features for Doctor/Medicine Management and Codynn course-management systems using Node.js, Express-TS, MongoDB, JWT/OAuth, and REST APIs.",
      "Designed schemas and implemented 40+ REST APIs covering CRUD, validation, authentication, and course/healthcare workflows; documented all APIs with Swagger/OpenAPI for frontend/mobile integration.",
      "Contributed to Codynn features used in Herald College/testing contexts and worked with another developer on early migration toward a type-safe NestJS-based architecture."
    ]
  }
];

export const experienceSidebar = {
  education: {
    title: "Education",
    items: [
      "M.I.T. — Artificial Intelligence · Charles Darwin University, Sydney · Mar 2025 – Oct 2026",
      "BSc (Hons) Computer Science · University of Wolverhampton / Herald College Kathmandu · Graduated Nov 2023"
    ]
  },
  focus: {
    title: "Current Focus",
    items: [
      "Production-ready full-stack web applications",
      "AI-assisted development: RAG, agentic workflows, LLM systems",
      "DevOps through Docker, CI/CD, and cloud fundamentals"
    ]
  },
  leadership: {
    title: "Awards & Leadership",
    items: [
      "2nd Place, Herald Expo/Hackathon (Jul 2022) — disease-prediction prototype (MERN + Python)",
      "Mentor, Herald Developer Corps — mentored 40+ juniors; supported Codynn LMS project",
      "Coding Workshop Facilitator, Reliance Public School (May 2024) — 8 sessions, grades 6–10",
      "Highest achiever in Java coursework — scored 96% (Java Swing/MySQL course-management system)"
    ]
  }
} as const;

/* ---------- GitHub live sync ---------- */

export const github: GitHubConfig = {
  username: "Nikankhadka",
  allowlist: [
    "Nikankhadka/fyp",
    "Nikankhadka/nlp-as2",
    "Nikankhadka/portfolio",
    "Nikankhadka/GroupD-g5",
    "Nikankhadka/rug"
    // TODO: add disease prediction repo (owner/name) once known
  ],
  currentProject: "Nikankhadka/rug"
};

/* ---------- Contact ---------- */

export const contactMethods: ContactMethod[] = [
  { label: "Email", href: "mailto:nikan.khadka.2002@gmail.com", value: "nikan.khadka.2002@gmail.com" },
  { label: "GitHub", href: "https://github.com/Nikankhadka", value: "github.com/Nikankhadka" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nikan-khadka-6b9340212/", value: "linkedin.com/in/nikan-khadka-6b9340212" },
  { label: "Location", href: "https://maps.google.com/?q=Sydney%2C%20Australia", value: "Sydney, Australia" }
];