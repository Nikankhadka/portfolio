"use client";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const isPlay = mode === "play";

  return (
    <button
      type="button"
      aria-pressed={isPlay}
      aria-label={`Switch to ${isPlay ? "Focus" : "Play"} mode`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full px-2 py-2 text-xs uppercase tracking-[0.3em] shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition",
        "bg-[color:var(--panel-muted)] text-[color:var(--foreground)]",
        "hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)] focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
      )}
      onClick={toggleMode}
    >
      <span className="px-2">{isPlay ? "Play" : "Focus"}</span>
      <span className="relative flex h-7 w-14 items-center rounded-full bg-[color:var(--panel)] px-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <span
          className={cn(
            "absolute h-5 w-5 rounded-full bg-[color:var(--accent)] shadow-[0_0_18px_var(--accent-soft)] transition-transform duration-300",
            isPlay ? "translate-x-7" : "translate-x-0"
          )}
        />
      </span>
    </button>
  );
}
