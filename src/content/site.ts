import type {
  ContactMethod,
  ExperienceEntry,
  HomeSection,
  HomeSectionId,
  LabItem,
  ModeValue,
  SkillCategory
} from "@/content/types";

export const homeSections: HomeSection[] = [
  { id: "intro", label: "Intro", href: "/#intro" },
  { id: "about", label: "About", href: "/#about" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "contact", label: "Contact", href: "/#contact" }
];

export const navItems = homeSections;

export const homeSectionIds = homeSections.map((section) => section.id) as HomeSectionId[];

export function isHomeSectionId(value: string): value is HomeSectionId {
  return homeSectionIds.includes(value as HomeSectionId);
}

export const heroContent = {
  eyebrow: "Sydney, Australia / Full-Stack Software Engineer",
  name: "NIKAN",
  title: {
    focus: "Full-Stack Software Engineer",
    play: "Full-Stack Developer for Scalable Web Products and Modern Delivery Workflows"
  },
  description: {
    focus:
      "Sydney-based full-stack software developer with hands-on experience building production-ready web applications using React, Next.js, Node.js, and TypeScript, with practical exposure to AI-assisted tools, APIs, databases, testing, Docker, and CI/CD.",
    play:
      "Full-stack developer based in Sydney, building scalable and user-friendly web applications with strong attention to clean architecture, dependable APIs, modern tooling, and AI-assisted workflows that improve delivery."
  }
} as const satisfies {
  eyebrow: string;
  name: string;
  title: ModeValue<string>;
  description: ModeValue<string>;
};

export const heroPanel = [
  {
    label: "Status",
    value: {
      focus: "Available for junior and mid-level full-stack software engineer and IT support roles across Sydney, Australia, including full-time, part-time, and remote opportunities.",
      play: "Open to junior and mid-level full-stack software engineering and IT support roles, with flexibility for full-time, part-time, and remote teams."
    }
  },
  {
    label: "Current Mission",
    value: {
      focus: "Placement student at Paypipe, contributing to full-stack product workflows and testing AI-assisted concierge features for a trade-services SaaS platform.",
      play: "Currently supporting product delivery at Paypipe through React, Next.js, TypeScript, Node.js, PostgreSQL, and AI-assisted workflow experiments for trade-service operations."
    }
  },
  {
    label: "Core Stack",
    value: {
      focus: "Node.js, TypeScript, React, Next.js, Express, NestJS, PostgreSQL, Docker, REST APIs, testing, and CI/CD, with MongoDB used in projects such as MeroGhar.",
      play: "React, Next.js, Node.js, TypeScript, Express, NestJS, PostgreSQL, Docker, testing, and AI-assisted tools, with MongoDB experience through MeroGhar and earlier full-stack builds."
    }
  }
] as const satisfies ReadonlyArray<{ label: string; value: ModeValue<string> }>;

export const sectionCopy = {
  about: {
    kicker: "About",
    heading: {
      focus: "Full-stack software developer building scalable products with strong engineering fundamentals.",
      play: "Full-stack developer focused on scalable products, practical delivery, and modern engineering workflows."
    },
    paragraphs: {
      focus: [
        "I build production-ready, scalable web applications with a strong focus on code quality, performance, and long-term maintainability. I am a full-stack software developer based in Sydney, Australia, with hands-on experience delivering user-friendly products across the frontend and backend.",
        "My core stack includes Node.js, TypeScript, React, Next.js, Express, NestJS, MongoDB, PostgreSQL, and Docker. I also use modern AI tools to improve developer productivity and support product workflows while staying grounded in practical software engineering fundamentals.",
        "I am passionate about clean code, developer productivity, and learning modern frameworks. I am currently expanding my DevOps and cloud deployment knowledge through Docker and CI/CD-focused workflows."
      ],
      play: [
        "I enjoy building software that solves real workflow problems and holds up beyond the first demo. My work usually sits at the intersection of clean UI, reliable APIs, maintainable architecture, and delivery practices that help teams move with confidence.",
        "Alongside full-stack product work, I stay current with AI-assisted tools, testing, and delivery workflows so I can contribute across implementation, iteration, and continuous improvement."
      ]
    }
  },
  experience: {
    kicker: "Experience",
    heading: {
      focus: "Hands-on delivery across SaaS products, full-stack systems, and AI-assisted workflows.",
      play: "Experience across product delivery, backend systems, testing, and AI-assisted workflow implementation."
    },
    intro: {
      focus:
        "My recent work includes full-stack SaaS delivery, internal business systems, learning platforms, role-based workflows, REST APIs, and AI-assisted product features.",
      play:
        "The experience below reflects a mix of implementation, testing, workflow design, and delivery across business systems, learning products, and production-oriented web applications."
    }
  },
  skills: {
    kicker: "Skills",
    heading: {
      focus: "A practical stack for shipping full-stack products, integrations, and workflow automation.",
      play: "A working loadout built for products that need UI clarity, dependable APIs, and automation that actually lands."
    },
    intro: {
      focus:
        "The stack below reflects the technologies I use most across product delivery, integrations, testing, deployment, and AI-assisted workflows.",
      play:
        "Same stack, different lens: frontend polish, backend contracts, testing discipline, delivery tooling, and the AI workflow pieces that make software more useful."
    }
  },
  projects: {
    kicker: "Projects",
    heading: {
      focus: "Selected work that shows product thinking, implementation depth, and measurable improvement.",
      play: "Featured builds where product thinking, systems work, and shipping discipline all show up in the same screen."
    }
  },
  contact: {
    kicker: "Contact",
    heading: {
      focus: "Open to full-stack software engineering and IT support opportunities in Sydney and remote.",
      play: "Open to practical engineering teams hiring for full-stack software development and IT support work."
    },
    body: {
      focus:
        "Based in Sydney, Australia, I am open to full-time, part-time, and remote opportunities in junior to mid-level full-stack software engineering and IT support roles. I am especially interested in teams building production-ready web applications with strong engineering standards.",
      play:
        "If your team values dependable full-stack delivery, clean code, practical problem solving, and engineers who stay current with modern tools and workflows, I would be glad to connect."
    }
  }
} as const;

export const footerCopy = {
  focus: "Built to feel credible, clear, and ready for real product work.",
  play: "Built to showcase reliable engineering, thoughtful product work, and modern full-stack capability."
} as const satisfies ModeValue<string>;

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java"]
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS", "HTML/CSS"]
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: ["Node.js", "Express", "Fastify", "NestJS", "REST APIs", "JWT / OAuth"]
  },
  {
    id: "databases",
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"]
  },
  {
    id: "testing-devops",
    label: "Testing & DevOps",
    items: ["Playwright", "Jest", "Docker", "GitHub Actions", "GitLab", "Vercel / Render"]
  },
  {
    id: "ai-productivity",
    label: "AI & Productivity",
    items: ["Azure OpenAI", "ChatGPT", "Claude", "Codex", "Cursor", "Workflow Automation"]
  }
];

export const experienceEntries: ExperienceEntry[] = [
  {
    company: "Paypipe",
    role: "Full-Stack Developer Placement Student",
    period: "Feb 2026 - Present",
    location: "Sydney, Australia",
    summary:
      "Contributing to full-stack product delivery and testing AI-assisted business concierge workflows for a trade-services SaaS platform.",
    highlights: [
      "Implemented and tested chat-driven workflows that generate job scopes, pricing, and milestone-based offers.",
      "Improved prompt structures and output quality using Azure OpenAI and GPT-4o mini for production-oriented workflow scenarios.",
      "Tested offer generation using chat context, manual inputs, PDF summarisation, and voice or audio translation flows.",
      "Worked across React, Next.js, TypeScript, Node.js, PostgreSQL, and AI-assisted product workflows."
    ]
  },
  {
    company: "Eightbit / Dzangolab",
    role: "Software Developer",
    period: "Sep 2023 - Jan 2025",
    location: "Kathmandu, Nepal",
    summary:
      "Delivered features across multiple full-stack SaaS products covering business workflows, learning systems, and developer tooling.",
    highlights: [
      "Delivered features across TypeScript, React, Fastify, PostgreSQL, Docker, GitLab, Playwright, Jest, Socket.IO, and Make.com.",
      "Implemented business workflow features in Dzango-HQ Legal covering approvals, documents, leave, calendars, reviews, and notifications.",
      "Built LMS workflows for courses, skills, students, companies, invitations, grading, certification, and onboarding.",
      "Contributed to 12deg features including collaborative markdown editing, release graphing, Docker service controls, GitLab webhooks, and Playwright end-to-end coverage."
    ]
  },
  {
    company: "Softechtonic",
    role: "Full Stack Developer Intern",
    period: "Feb 2023 - Jul 2023",
    location: "Kathmandu, Nepal",
    summary:
      "Built backend and admin features for healthcare and course-management products while strengthening API design and architecture fundamentals.",
    highlights: [
      "Implemented REST APIs with Node.js, Express-TS, MongoDB, JWT or OAuth, Swagger, Jest, and Postman.",
      "Contributed to doctor and medicine management plus Codynn course-management workflows.",
      "Supported early migration work toward a more type-safe backend architecture and maintainable service structure."
    ]
  }
];

export const experienceSidebar = {
  education: {
    title: "Education",
    items: [
      "Master of Information Technology in Artificial Intelligence",
      "Charles Darwin University, Sydney Campus",
      "Expected completion: October 2026"
    ]
  },
  focus: {
    title: "Current Focus",
    items: [
      "Production-ready full-stack web applications and scalable product workflows",
      "AI-assisted development tools, testing, and modern delivery practices",
      "DevOps learning through Docker, CI/CD, and cloud deployment fundamentals"
    ]
  },
  leadership: {
    title: "Leadership & Community",
    items: [
      "2nd Place, Herald Expo/Hackathon 2022",
      "Mentor, Herald Developer Corps for 40+ junior students",
      "Coding workshop facilitator for grades 6-10",
      "Highest achiever in Java coursework with 96%"
    ]
  }
} as const;

export const labItems: LabItem[] = [
  {
    id: "command-deck",
    title: "Command Deck",
    description: "Open a keyboard-friendly command palette to jump through the portfolio like a developer console.",
    interaction: "command-palette"
  },
  {
    id: "theme-easter-egg",
    title: "Theme Pulse",
    description: "Tap the system pulse to see the interface react differently in Focus and Play mode.",
    interaction: "theme-easter-egg"
  },
  {
    id: "mini-toggle-demo",
    title: "Loadout Mixer",
    description: "Toggle small UI states to preview how I think about motion, state, and interface polish.",
    interaction: "mini-toggle-demo"
  }
];

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    href: "mailto:nikan.khadka.2002@gmail.com",
    value: "nikan.khadka.2002@gmail.com"
  },
  {
    label: "GitHub",
    href: "https://github.com/Nikankhadka",
    value: "github.com/Nikankhadka"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nikan-khadka-6b9340212/",
    value: "linkedin.com/in/nikan-khadka-6b9340212"
  },
  {
    label: "Location",
    href: "https://maps.google.com/?q=Sydney%2C%20Australia",
    value: "Sydney, Australia"
  }
];
