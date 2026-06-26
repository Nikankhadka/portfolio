"use client";

import type { GitHubData } from "@/content/types";

const FALLBACK_COLORS = ["#e8a87c", "#9aa6b8", "#c98d63", "#7d8a9c", "#f2b593", "#5f6d82", "#d8a890", "#42526b"];

export function LanguageStats({ stats }: { stats: GitHubData["languageStats"] }) {
  if (!stats.length) {
    return (
      <div className="flex min-h-[4rem] items-center justify-center px-2 text-sm text-[color:var(--muted-strong)]">
        Language stats unavailable.
      </div>
    );
  }

  const total = stats.reduce((sum, lang) => sum + lang.size, 0) || 1;

  return (
    <div className="space-y-3">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full border border-[color:var(--border-faint)]">
        {stats.map((lang, i) => (
          <span
            key={lang.name}
            className="h-full transition-[flex-grow] duration-500"
            style={{
              flexGrow: lang.size,
              background: lang.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length]
            }}
            title={`${lang.name} · ${Math.round((lang.size / total) * 100)}%`}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[color:var(--muted-strong)]">
        {stats.map((lang, i) => (
          <li key={lang.name} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: lang.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length] }}
            />
            <span className="text-[color:var(--copy)]">{lang.name}</span>
            <span className="text-[color:var(--muted)]">{Math.round((lang.size / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}