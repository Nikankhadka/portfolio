"use client";

import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

import { isHomeSectionId } from "@/content/site";
import type { HomeSectionId } from "@/content/types";

type HomeSectionsContextValue = {
  activeSection: HomeSectionId;
  isHomePage: boolean;
  setActiveSection: (section: HomeSectionId) => void;
};

const HomeSectionsContext = createContext<HomeSectionsContextValue | null>(null);

function getHashSection(): HomeSectionId {
  if (typeof window === "undefined") {
    return "intro";
  }

  const hashValue = window.location.hash.replace("#", "");

  return isHomeSectionId(hashValue) ? hashValue : "intro";
}

export function HomeSectionsProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeSection, setActiveSection] = useState<HomeSectionId>(getHashSection);

  const value = useMemo(
    () => ({
      activeSection: isHomePage ? activeSection : "intro",
      isHomePage,
      setActiveSection
    }),
    [activeSection, isHomePage]
  );

  return <HomeSectionsContext.Provider value={value}>{children}</HomeSectionsContext.Provider>;
}

export function useHomeSections() {
  const context = useContext(HomeSectionsContext);

  if (!context) {
    throw new Error("useHomeSections must be used within HomeSectionsProvider");
  }

  return context;
}
