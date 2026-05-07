"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/components/theme-provider";
import type { LabItem } from "@/content/types";
import { cn } from "@/lib/utils";

type LabConsoleProps = {
  items: LabItem[];
};

const commands = [
  { label: "Jump to Intro", href: "/#intro" },
  { label: "Open Experience", href: "/#experience" },
  { label: "Open Projects", href: "/#projects" },
  { label: "Open Contact", href: "/#contact" },
  { label: "Open MeroGhar case study", href: "/projects/meroghar" }
];

export default function LabConsole({ items }: LabConsoleProps) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [loadoutState, setLoadoutState] = useState({
    motion: true,
    compact: false,
    contrast: true
  });
  const { mode, toggleMode } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-[1.8rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-5"
          >
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[color:var(--accent)]">
              {item.interaction.replaceAll("-", " ")}
            </p>
            <h3 className="mt-4 font-display text-xl uppercase tracking-[0.12em] text-[color:var(--foreground)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[color:var(--copy)]">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                Command Deck
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--copy)]">
                Press <kbd className="rounded border border-[color:var(--border-subtle)] px-2 py-1">Ctrl</kbd>
                /
                <kbd className="rounded border border-[color:var(--border-subtle)] px-2 py-1">Cmd</kbd>
                +
                <kbd className="rounded border border-[color:var(--border-subtle)] px-2 py-1">K</kbd>
                to jump through the site.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              Open Palette
            </button>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                Theme Pulse
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--copy)]">
                {mode === "focus"
                  ? "Focus Mode stays calm and precise."
                  : "Play Mode wakes up the neon edges and HUD energy."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPulseCount((current) => current + 1)}
              className={cn(
                "h-14 w-14 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                mode === "play"
                  ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] shadow-[0_0_26px_var(--accent-soft)]"
                  : "border-[color:var(--led)] bg-[color:var(--led)] shadow-[0_0_16px_var(--led)]"
              )}
              aria-label="Pulse the system"
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Pulse Count / {pulseCount}
          </p>
        </section>
      </div>

      <section className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
              Loadout Mixer
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--copy)]">
              Small state changes, readable controls, and motion that supports the interface instead of fighting it.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleMode}
            className="rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            Sync With Theme
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {Object.entries(loadoutState).map(([key, active]) => (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() =>
                setLoadoutState((current) => ({
                  ...current,
                  [key]: !current[key as keyof typeof current]
                }))
              }
              className={cn(
                "rounded-[1.5rem] border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                active
                  ? "border-[color:var(--accent)] bg-[color:var(--panel-muted)]"
                  : "border-[color:var(--border-subtle)] bg-transparent"
              )}
            >
              <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[color:var(--muted)]">
                Module
              </p>
              <p className="mt-3 font-display text-xl uppercase tracking-[0.12em] text-[color:var(--foreground)]">
                {key}
              </p>
              <p className="mt-2 text-sm text-[color:var(--copy)]">
                {active ? "Enabled" : "Idle"}
              </p>
            </button>
          ))}
        </div>
      </section>

      {commandOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="command-palette-title"
        >
          <div className="w-full max-w-2xl rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p
                  id="command-palette-title"
                  className="font-display text-xl uppercase tracking-[0.15em] text-[color:var(--foreground)]"
                >
                  Command Palette
                </p>
                <p className="mt-2 text-sm text-[color:var(--copy)]">
                  Fast navigation, system-style.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCommandOpen(false)}
                className="rounded-full border border-[color:var(--border-strong)] px-3 py-2 text-xs uppercase tracking-[0.25em] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {commands.map((command) => (
                <a
                  key={command.href}
                  href={command.href}
                  className="flex items-center justify-between rounded-[1.25rem] border border-[color:var(--border-subtle)] px-4 py-4 text-sm uppercase tracking-[0.22em] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                  onClick={() => setCommandOpen(false)}
                >
                  <span>{command.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
