"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useHomeSections } from "@/components/home-sections-provider";
import { navItems } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { activeSection, isHomePage } = useHomeSections();
  const activeHref = isHomePage ? `/#${activeSection}` : pathname.startsWith("/projects/") ? "/#projects" : "";

  return (
    <header className="site-header-shell fixed inset-x-0 top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/#intro"
          className="text-sm font-semibold uppercase tracking-[0.45em] text-[color:var(--foreground)] transition hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        >
          Nikan
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === activeHref ? "location" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-xs uppercase tracking-[0.28em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                item.href === activeHref
                  ? "bg-[color:var(--panel-muted)] text-[color:var(--foreground)] shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
                  : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#projects"
            className="hidden rounded-full bg-[color:var(--panel-muted)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[color:var(--foreground)] shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] sm:inline-flex"
          >
            View Projects
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
