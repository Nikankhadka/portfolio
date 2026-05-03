"use client";

import { useEffect, useEffectEvent, useRef, type PropsWithChildren } from "react";
import { useReducedMotion } from "framer-motion";

import { useHomeSections } from "@/components/home-sections-provider";
import { isHomeSectionId } from "@/content/site";
import type { HomeSectionId } from "@/content/types";
import { cn } from "@/lib/utils";

type HomeScrollShellProps = PropsWithChildren<{
  sectionIds: readonly HomeSectionId[];
  className?: string;
}>;

function getSectionFromHash(): HomeSectionId {
  if (typeof window === "undefined") {
    return "intro";
  }

  const hashValue = window.location.hash.replace("#", "");

  return isHomeSectionId(hashValue) ? hashValue : "intro";
}

function easeInOutCubic(progress: number) {
  return progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function HomeScrollShell({
  children,
  className,
  sectionIds
}: HomeScrollShellProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const restoreSnapTypeRef = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();
  const { setActiveSection } = useHomeSections();

  const commitActiveSection = useEffectEvent((sectionId: HomeSectionId, updateHash: boolean) => {
    setActiveSection(sectionId);

    if (!updateHash) {
      return;
    }

    const nextUrl = new URL(window.location.href);

    if (nextUrl.hash === `#${sectionId}`) {
      return;
    }

    nextUrl.hash = sectionId;
    window.history.replaceState(window.history.state, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  });

  const syncToHashTarget = useEffectEvent((behavior: ScrollBehavior) => {
    const container = containerRef.current;
    const sectionId = getSectionFromHash();
    const target = document.getElementById(sectionId);

    if (container && target) {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (restoreSnapTypeRef.current !== null) {
        container.style.scrollSnapType = restoreSnapTypeRef.current;
        restoreSnapTypeRef.current = null;
      }

      const nextScrollTop = Math.max(
        0,
        Math.min(
          target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop,
          container.scrollHeight - container.clientHeight
        )
      );

      if (behavior === "auto" || reduceMotion) {
        container.scrollTo({ top: nextScrollTop, behavior: "auto" });
      } else {
        const startScrollTop = container.scrollTop;
        const distance = nextScrollTop - startScrollTop;

        if (Math.abs(distance) < 2) {
          container.scrollTo({ top: nextScrollTop, behavior: "auto" });
        } else {
          const duration = Math.min(900, Math.max(480, Math.abs(distance) * 0.45));
          const startedAt = window.performance.now();

          restoreSnapTypeRef.current = container.style.scrollSnapType;
          container.style.scrollSnapType = "none";

          const animate = (timestamp: number) => {
            const progress = Math.min((timestamp - startedAt) / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            container.scrollTop = startScrollTop + distance * easedProgress;

            if (progress < 1) {
              animationFrameRef.current = window.requestAnimationFrame(animate);
              return;
            }

            container.scrollTop = nextScrollTop;
            animationFrameRef.current = null;

            if (restoreSnapTypeRef.current !== null) {
              container.style.scrollSnapType = restoreSnapTypeRef.current;
              restoreSnapTypeRef.current = null;
            }
          };

          animationFrameRef.current = window.requestAnimationFrame(animate);
        }
      }
    }

    commitActiveSection(sectionId, false);
  });

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (!visibleEntries.length) {
          return;
        }

        const nextEntry = visibleEntries.reduce((bestEntry, entry) =>
          entry.intersectionRatio > bestEntry.intersectionRatio ? entry : bestEntry
        );

        if (isHomeSectionId(nextEntry.target.id)) {
          commitActiveSection(nextEntry.target.id, true);
        }
      },
      {
        root: container,
        threshold: [0.35, 0.5, 0.7, 0.9]
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      syncToHashTarget(reduceMotion ? "auto" : "smooth");
    };

    window.addEventListener("hashchange", handleHashChange);

    const syncFrame = window.requestAnimationFrame(() => {
      syncToHashTarget("auto");
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
      window.cancelAnimationFrame(syncFrame);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (restoreSnapTypeRef.current !== null) {
        container.style.scrollSnapType = restoreSnapTypeRef.current;
        restoreSnapTypeRef.current = null;
      }
    };
  }, [reduceMotion, sectionIds]);

  return (
    <main
      id="main-content"
      ref={containerRef}
      className={cn(
        "home-scroll-shell relative isolate h-[calc(100svh-var(--header-height))] overflow-y-auto overflow-x-hidden",
        className
      )}
    >
      {children}
    </main>
  );
}
