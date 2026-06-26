"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";

import type { HomeSectionId } from "@/content/types";

type HomeSectionsContextValue = {
  activeSection: HomeSectionId | null;
  setActiveSection: (section: HomeSectionId | null) => void;
};

const HomeSectionsContext = createContext<HomeSectionsContextValue | null>(null);

export function HomeSectionsProvider({ children }: PropsWithChildren) {
  const [activeSection, setActiveSection] = useState<HomeSectionId | null>(null);

  const value = useMemo<HomeSectionsContextValue>(
    () => ({ activeSection, setActiveSection }),
    [activeSection]
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