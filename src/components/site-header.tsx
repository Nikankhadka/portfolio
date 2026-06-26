"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useHomeSections } from "@/components/home-sections-provider";
import { navItems } from "@/content/site";
import { cn } from "@/lib/utils";

function scrollToSection(href: string) {
  const id = href.split("#")[1];
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function SiteHeader() {
  const pathname = usePathname();
  const { activeSection } = useHomeSections();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const handleNav = (href: string) => (e: React.MouseEvent) => {
    if (!isHome || !href.startsWith("/#")) return;
    e.preventDefault();
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="site-header-shell fixed inset-x-0 top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="text-sm font-medium uppercase tracking-[0.32em] text-[color:var(--foreground)] transition hover:text-[color:var(--accent-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            Nikan<span className="text-[color:var(--accent)]">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={handleNav(item.href)}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-xs uppercase tracking-[0.22em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                    isActive
                      ? "text-[color:var(--accent-deep)]"
                      : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-[color:var(--accent)] transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  scrollToSection("/#contact");
                }
              }}
              className="hidden rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[color:var(--accent-contrast)] transition hover:bg-[color:var(--accent-bright)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] sm:inline-flex"
            >
              Get in touch
            </button>
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-faint)] bg-[color:var(--background-elevated)] text-[color:var(--foreground)] transition hover:border-[color:var(--accent-soft)] hover:text-[color:var(--accent-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] md:hidden"
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
              className="fixed inset-0 z-[55] bg-[color:var(--foreground)]/30 backdrop-blur-sm md:hidden"
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
              className="fixed inset-y-0 right-0 z-[60] flex w-[min(22rem,calc(100vw-1.5rem))] flex-col border-l border-[color:var(--border-faint)] bg-[color:var(--background-elevated)] px-6 pb-6 pt-5 shadow-[-20px_0_50px_rgba(201,121,74,0.18)] backdrop-blur-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-lg tracking-[-0.005em] text-[color:var(--foreground)]">
                  Navigate
                </p>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-faint)] bg-[color:var(--background)] text-[color:var(--foreground)] transition hover:text-[color:var(--accent-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>

              <nav aria-label="Mobile primary" className="mt-8 flex flex-1 flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = isHome && activeSection === item.id;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "rounded-xl px-4 py-3.5 text-sm uppercase tracking-[0.22em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                        isActive
                          ? "bg-[color:var(--accent-softer)] text-[color:var(--accent-deep)]"
                          : "text-[color:var(--muted-strong)] hover:bg-[color:var(--panel-muted)] hover:text-[color:var(--foreground)]"
                      )}
                      onClick={handleNav(item.href)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={() => {
                  scrollToSection("/#contact");
                  setIsMobileMenuOpen(false);
                }}
              >
                Get in touch
              </button>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}