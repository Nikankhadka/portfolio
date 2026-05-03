"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren
} from "react";

import type { SiteThemeMode } from "@/content/types";

type ThemeContextValue = {
  mode: SiteThemeMode;
  setMode: (mode: SiteThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "nikan-os-theme";

function getInitialMode(): SiteThemeMode {
  if (typeof document !== "undefined") {
    return document.documentElement.dataset.theme === "play" ? "play" : "focus";
  }

  return "focus";
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setModeState] = useState<SiteThemeMode>(getInitialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = (nextMode: SiteThemeMode) => {
    startTransition(() => {
      setModeState(nextMode);
    });
  };

  const toggleMode = () => {
    setMode(mode === "focus" ? "play" : "focus");
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
