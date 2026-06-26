import type { ProjectEntry } from "@/content/types";

export const projects: ProjectEntry[] = [
  {
    slug: "meroghar",
    title: "MeroGhar",
    summary:
      "An Airbnb-style multi-vendor rental management platform built for Nepal's rental and property market.",
    role: "Full-Stack Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "Playwright"
    ],
    impact:
      "Improved performance, delivery confidence, and production readiness across a feature-rich rental platform with multi-role workflows.",
    status: "Live project",
    year: "Recent",
    githubRepo: "Nikankhadka/fyp",
    featured: true,
    links: [
      { label: "Live", href: "https://fyp-pi-sand.vercel.app/Home" },
      { label: "GitHub", href: "https://github.com/Nikankhadka/fyp" }
    ],
    problem:
      "The platform needed to support Nepal-specific rental workflows with booking, trust, payments, and role-based operations in one system.",
    approach:
      "I built and improved features across the full stack, including dashboards, verification flows, payment integrations, CI/CD, test coverage, and developer-facing documentation.",
    outcome:
      "The project matured into a stronger portfolio-grade product with better Lighthouse performance, leaner packages, improved API responsiveness, and more reliable testing workflows.",
    highlights: [
      "Tenant, property owner, and admin roles with listing, booking, check-in, and check-out flows.",
      "Real KYC workflow, phone or email verification, social login, and verified reviews.",
      "PayPal and Khalti payment integration with Zoho Mail notification support.",
      "Dockerised monorepo structure with GitHub Actions CI/CD and Playwright coverage."
    ],
    results: [
      "Improved Lighthouse score from 57 to 89.",
      "Reduced bundle or package size by more than 20%.",
      "Improved selected API response performance by about 20%.",
      "Added seed data, fixtures, documentation, and around 15 Playwright tests."
    ]
  },
  {
    slug: "agriculture-management-system",
    title: "Agriculture Management System",
    summary:
      "An academic team project focused on farmer workflows, crop records, and admin-managed operations.",
    role: "Team Lead / Full-Stack Developer",
    stack: ["Next.js", "Node.js", "MongoDB", "JWT Authentication", "File Uploads"],
    impact:
      "Showed end-to-end ownership by leading a small team while building most of the application and core workflow features.",
    status: "Academic team project",
    year: "Academic",
    githubRepo: "Nikankhadka/GroupD-g5",
    featured: true,
    problem:
      "The project needed a usable way to manage farmer information, crop data, authentication, and admin or user workflows inside one web application.",
    approach:
      "I led a four-member team and built most of the system, covering key data flows, authentication, CRUD operations, and admin-facing screens.",
    outcome:
      "The result was a complete academic platform that demonstrated leadership, full-stack delivery, and the ability to translate requirements into working product flows.",
    highlights: [
      "Led a four-member team through planning, delivery, and implementation.",
      "Built farmer profiles, crop categories, CRUD workflows, and admin or user views.",
      "Implemented JWT authentication plus image and file upload support."
    ],
    results: [
      "Delivered a complete academic full-stack project with role-aware workflows.",
      "Demonstrated team leadership alongside hands-on implementation ownership."
    ]
  },
  {
    slug: "himalayan-threads",
    title: "Himalayan Threads",
    summary:
      "A rug website showcasing Himalayan handwoven textiles — a storefront-style product catalogue with a focus on craft, origin, and story.",
    role: "Full-Stack Developer",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Docker"],
    impact:
      "A focused product catalogue concept for a Nepali textile brand, built to make handwoven rugs easy to browse and present their provenance clearly.",
    status: "Live project",
    year: "Recent",
    githubRepo: "Nikankhadka/rug",
    featured: true,
    links: [{ label: "GitHub", href: "https://github.com/Nikankhadka/rug" }],
    problem:
      "Handwoven Himalayan rugs needed a clean, story-driven storefront that surfaces product origin, materials, and craft without overwhelming the visitor.",
    approach:
      "I built a Next.js storefront with a typographic, image-led catalogue: product cards, collection views, and a minimal editorial layout that lets the textiles lead.",
    outcome:
      "A polished, fast storefront foundation that presents a small rug catalogue with room to grow into cart and checkout flows.",
    highlights: [
      "Next.js + TypeScript storefront with a typographic editorial layout.",
      "Product catalogue and collection views sized for a small handmade catalogue.",
      "Dockerised for repeatable local development and future deployment.",
      "Designed to extend cleanly toward cart, checkout, and CMS-driven product entries."
    ],
    results: [
      "A focused, performant rug catalogue foundation ready for production polish.",
      "Clean editorial visual language that elevates craft and provenance over noise."
    ]
  },
  {
    slug: "portfolio",
    title: "Portfolio Site",
    summary:
      "This portfolio — an editorial Swiss-minimal site with a live GitHub contribution sync, contribution heatmap, current-project spotlight, and a sakura motif tying sections together.",
    role: "Designer & Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GitHub GraphQL API"],
    impact:
      "A portfolio that doubles as an engineering demonstration: server-side GitHub data fetching, ISR-cached API route, reduced-motion-aware animation, snap-scroll UX, and a Vercel-friendly deploy.",
    status: "Live project",
    year: "2026",
    githubRepo: "Nikankhadka/portfolio",
    featured: true,
    links: [{ label: "GitHub", href: "https://github.com/Nikankhadka/portfolio" }],
    problem:
      "A software engineer's portfolio should show, not just tell, that the engineer can ship a polished product with real integration and thoughtful UX.",
    approach:
      "I built a Next.js 16 app-router site: a single `/api/github` route handler with ISR (30-min revalidate) fetches user, contribution calendar, allowlist repo stats, and an activity feed via GitHub GraphQL + REST APIs, keeps the token server-only, and ships a curated JSON payload to client components.",
    outcome:
      "A clean, minimal, animated single-page site that surfaces real work in sync with GitHub, with a snap-scroll editorial layout and a sakura branch + petal motif for visual character.",
    highlights: [
      "Single server-side `/api/github` route with ISR revalidate; token never shipped to browser.",
      "Live contribution heatmap, current-project spotlight, recent-activity feed, and language-usage bar.",
      "Snap-to-center scroll with proximity snapping, alternating section backgrounds, and reduced-motion support.",
      "Editorial Swiss-minimal palette: cream canvas, coral-apricot panels, light-teal accents.",
      "Designed and coded end-to-end — including the sakura SVG branches and petals."
    ],
    results: [
      "Live sync of contributions, repos, and activity across 5 tracked repositories.",
      "Full accessibility: skip-link, reduced-motion, keyboard nav, focus styles."
    ]
  }
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
