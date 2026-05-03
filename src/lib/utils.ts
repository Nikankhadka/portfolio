import type { SiteThemeMode } from "@/content/types";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function getThemeLabel(mode: SiteThemeMode) {
  return mode === "focus" ? "Focus Mode" : "Play Mode";
}
