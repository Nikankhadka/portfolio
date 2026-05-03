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
  eyebrow: "NIKAN OS / Developer Interface",
  name: "NIKAN",
  title: {
    focus: "AI Software Engineer / Full-Stack Developer",
    play: "Full-Stack Builder for SaaS, AI Workflows, and Product Systems"
  },
  description: {
    focus:
      "Full-stack JavaScript and TypeScript developer from Nepal, based in Sydney, building practical web applications across React, Next.js, Node.js, PostgreSQL, MongoDB, testing, CI/CD, and AI-assisted SaaS workflows.",
    play:
      "Full-stack JavaScript and TypeScript developer from Nepal, now based in Sydney, building product-minded web systems where clean UI, reliable APIs, automation, and AI-assisted workflows work as one stack."
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
      focus: "Available for junior software, full-stack, implementation, QA automation, and AI product roles in Australia.",
      play: "ONLINE for junior software, full-stack, implementation, QA automation, and AI product teams across Australia."
    }
  },
  {
    label: "Current Mission",
    value: {
      focus: "Placement student at Paypipe, building and testing AI-assisted concierge workflows for trade-service SaaS.",
      play: "Running live AI concierge experiments at Paypipe, turning messy service conversations into scoped jobs, pricing, and next-step offers."
    }
  },
  {
    label: "Core Stack",
    value: {
      focus: "React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, REST APIs, testing, Docker, CI/CD.",
      play: "React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, automation, testing, and product-ready AI workflow glue."
    }
  }
] as const satisfies ReadonlyArray<{ label: string; value: ModeValue<string> }>;

export const sectionCopy = {
  about: {
    kicker: "About",
    heading: {
      focus: "A professional full-stack developer with product instincts and strong implementation range.",
      play: "A grounded engineer in focus mode, with a little extra product energy in the system."
    },
    paragraphs: {
      focus: [
        "I am a full-stack JavaScript and TypeScript developer from Nepal, currently based in Sydney, Australia. I build practical web applications that balance clean UI, reliable APIs, strong workflow design, and maintainable implementation.",
        "I enjoy working on products that solve real workflow problems, whether that means building a full-stack platform, improving developer experience, automating business processes, or turning AI outputs into useful product features."
      ],
      play: [
        "I build software for real workflows, not just demo screens. The work I enjoy most sits where product clarity, dependable engineering, and a bit of interface craft all help the same user get unstuck faster.",
        "NIKAN OS is the public version of that mindset: professional enough for hiring teams, but still expressive enough to show how I think about momentum, automation, and useful digital products."
      ]
    }
  },
  experience: {
    kicker: "Experience",
    heading: {
      focus: "Hands-on delivery across SaaS platforms, AI-assisted workflows, and full-stack product teams.",
      play: "From SaaS platforms to AI concierge flows, this is the timeline behind the current build."
    },
    intro: {
      focus:
        "My recent work spans AI-assisted trade-service workflows, internal business systems, learning platforms, project-generation SaaS, and backend-heavy product features.",
      play:
        "The path runs through multi-product SaaS delivery, internal workflow systems, learning tools, and now AI-assisted business concierge work that has to be useful outside the lab."
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
      focus: "Open to junior, graduate, and early-career engineering opportunities across Australia.",
      play: "Open to teams building practical software, clean workflows, and useful AI-assisted products."
    },
    body: {
      focus:
        "I am currently looking for junior software engineering, graduate software engineering, full-stack development, implementation engineering, QA automation, and AI product or web development opportunities.",
      play:
        "If your team values clear product thinking, dependable full-stack execution, and someone who enjoys turning rough workflow problems into software people can actually use, I would love to connect."
    }
  }
} as const;

export const footerCopy = {
  focus: "Built to feel credible, clear, and ready for real product work.",
  play: "Built to stay reliable first, then add a little signal, motion, and personality on top."
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
    role: "AI Software Engineer / Full-Stack Developer Placement Student",
    period: "Feb 2026 - Present",
    location: "Sydney, Australia",
    summary:
      "Building and testing AI-assisted business concierge workflows for a trade-services SaaS platform.",
    highlights: [
      "Worked on chat-driven flows that generate job scopes, pricing, and milestone-based offers.",
      "Refined prompts and output structures using Azure OpenAI and GPT-4o mini.",
      "Tested offer generation using chat context, manual inputs, PDF summarisation, and voice or audio translation.",
      "Worked across React, Next.js, TypeScript, Node.js, PostgreSQL, and AI product workflows."
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
      "Built across TypeScript, React, Fastify, PostgreSQL, Docker, GitLab, Playwright, Jest, Socket.IO, and Make.com.",
      "Contributed to Dzango-HQ Legal for approvals, documents, leave, calendars, reviews, and notifications.",
      "Worked on Dzango LMS workflows for courses, skills, students, companies, invitations, grading, certification, and onboarding.",
      "Helped build 12deg features including collaborative markdown editing, release graphing, Docker service controls, GitLab webhooks, and Playwright E2E coverage."
    ]
  },
  {
    company: "Softechtonic",
    role: "Full Stack Developer Intern",
    period: "Feb 2023 - Jul 2023",
    location: "Kathmandu, Nepal",
    summary:
      "Built backend and admin features for healthcare and course-management products while strengthening API and architecture fundamentals.",
    highlights: [
      "Implemented REST APIs with Node.js, Express-TS, MongoDB, JWT or OAuth, Swagger, Jest, and Postman.",
      "Contributed to doctor and medicine management plus Codynn course-management workflows.",
      "Supported early migration work toward a more type-safe backend architecture."
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
      "AI-assisted business concierge workflows for trade-service SaaS",
      "React Native, Expo, Supabase, and Go",
      "Technical case studies, portfolio refinement, and product engineering"
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
