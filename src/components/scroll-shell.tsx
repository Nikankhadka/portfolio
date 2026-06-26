"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";

import { useHomeSections } from "@/components/home-sections-provider";
import { homeSectionIds } from "@/content/site";
import { isHomeSectionId } from "@/content/site";

const OBSERVED_IDS = ["home", ...homeSectionIds];

export function ScrollShell({ children }: PropsWithChildren) {
  const ref = useRef<HTMLElement | null>(null);
  const { setActiveSection } = useHomeSections();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const sections = OBSERVED_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const best = visible.reduce((a, b) => (b.intersectionRatio > a.intersectionRatio ? b : a));
        const id = (best.target as HTMLElement).id;
        if (id === "home") {
          setActiveSection("about");
        } else if (isHomeSectionId(id)) {
          setActiveSection(id);
        }
      },
      { root: container, rootMargin: "-35% 0px -35% 0px", threshold: [0.05, 0.15, 0.3, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div
      ref={ref as never}
      className="scroll-shell"
      style={{
        height: "calc(100svh - var(--header-height))",
        overflowY: "auto",
        scrollSnapType: "y proximity",
        scrollPaddingTop: "0px",
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch"
      }}
    >
      {children}
    </div>
  );
}