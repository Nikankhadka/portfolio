"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useHomeSections } from "@/components/home-sections-provider";
import { navItems } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { activeSection, isHomePage } = useHomeSections();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeHref = isHomePage ? `/#${activeSection}` : pathname.startsWith("/projects/") ? "/#projects" : "";

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="site-header-shell fixed inset-x-0 top-0 z-50 backdrop-blur-xl">
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-7xl items-center justify-between gap-4 px-6 sm:gap-6 sm:px-6 lg:px-8">
          <Link
            href="/#intro"
            onClick={() => setIsMobileMenuOpen(false)}
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
              className="hidden rounded-full bg-[color:var(--panel-muted)] px-4 py-2 text-xs uppercase tracking-[0.25em] shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] sm:inline-flex"
              style={{ color: "var(--offline)" }}
            >
              View Projects
            </Link>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--panel-muted)] text-[color:var(--foreground)] shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] md:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <span className="flex w-5 flex-col gap-1.5">
                <span
                  className={cn(
                    "h-0.5 w-full rounded-full bg-current transition-transform duration-200",
                    isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-full rounded-full bg-current transition-opacity duration-200",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-full rounded-full bg-current transition-transform duration-200",
                    isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.button
              key="mobile-nav-backdrop"
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-[55] bg-black/55 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              key="mobile-nav-panel"
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="fixed inset-y-0 right-0 z-[60] flex w-[min(22rem,calc(100vw-1.5rem))] flex-col border-l border-[color:var(--border-subtle)] bg-[color:var(--background)]/95 px-6 pb-6 pt-5 shadow-[-20px_0_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--muted)]">Navigation</p>
                  <p className="mt-2 font-display text-lg uppercase tracking-[0.14em] text-[color:var(--foreground)]">
                    Browse Sections
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--panel-muted)] text-[color:var(--foreground)] transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>

              <nav aria-label="Mobile primary" className="mt-8 flex flex-1 flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.href === activeHref ? "location" : undefined}
                    className={cn(
                      "rounded-[1.4rem] px-4 py-4 text-sm uppercase tracking-[0.28em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                      item.href === activeHref
                        ? "bg-[color:var(--panel-muted)] text-[color:var(--foreground)] shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
                        : "text-[color:var(--muted)] hover:bg-[color:var(--panel-muted)] hover:text-[color:var(--foreground)]"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-[color:var(--border-subtle)] pt-5">
                <p className="mb-3 text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--muted)]">Display Mode</p>
                <ThemeToggle />
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
