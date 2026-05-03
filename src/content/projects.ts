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
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Playwright"
    ],
    impact:
      "Improved performance, delivery confidence, and production readiness across a feature-rich rental platform with multi-role workflows.",
    status: "Live project",
    year: "Recent",
    coverVariant: "system",
    featured: true,
    links: [
      { label: "Live", href: "https://fyp-web-inky.vercel.app/Home" },
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
    coverVariant: "mission",
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
    slug: "disease-prediction-prototype",
    title: "Disease Prediction Prototype",
    summary:
      "A hackathon prototype that used symptom inputs and a Python-backed model flow to predict likely conditions.",
    role: "Full-Stack Team Contributor",
    stack: ["MongoDB", "Express", "React", "Node.js", "Python"],
    impact:
      "Combined application delivery with an applied ML-style prototype in a competitive event setting.",
    status: "Hackathon prototype",
    year: "2022",
    coverVariant: "terminal",
    featured: true,
    problem:
      "The challenge was to turn symptom inputs into a fast, understandable prediction flow within the time pressure of a hackathon environment.",
    approach:
      "Our team built a MERN-style application and connected it to a Python dataset and model workflow so user inputs could produce likely-condition predictions.",
    outcome:
      "The prototype placed second at Herald Expo / Hackathon 2022 and remains a strong example of rapid collaboration under constraints.",
    highlights: [
      "Built during Herald Expo / Hackathon 2022.",
      "Combined a MERN-style application with a Python dataset or model flow.",
      "Focused on symptom-input prediction in a fast prototype format."
    ],
    results: ["Placed 2nd at Herald Expo / Hackathon 2022."]
  }
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
