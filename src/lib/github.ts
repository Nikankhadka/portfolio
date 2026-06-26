"use client";

import { useEffect, useState } from "react";

import type { GitHubData } from "@/content/types";

const CACHE_KEY = "nikan-os-github-data";
const CACHE_TTL = 60 * 60 * 1000;

type CacheEntry = { data: GitHubData; at: number };

function readCache(): GitHubData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (Date.now() - parsed.at > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: GitHubData) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ data, at: Date.now() } satisfies CacheEntry));
  } catch {
    /* ignore quota errors */
  }
}

export function useGitHubData() {
  const [data, setData] = useState<GitHubData | null>(() => readCache());
  const [loading, setLoading] = useState<boolean>(data === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then(async (res) => {
        if (!res.ok) throw new Error(`GitHub route ${res.status}`);
        return (await res.json()) as GitHubData;
      })
      .then((fresh) => {
        if (cancelled) return;
        setData(fresh);
        writeCache(fresh);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load GitHub data");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error } as const;
}