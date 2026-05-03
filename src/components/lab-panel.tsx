"use client";

import dynamic from "next/dynamic";

import { labItems } from "@/content/site";

const LabConsole = dynamic(() => import("@/components/lab-console"), {
  ssr: false,
  loading: () => (
    <div className="rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--panel)] p-6 text-sm text-[color:var(--muted)]">
      Loading lab systems...
    </div>
  )
});

export function LabPanel() {
  return <LabConsole items={labItems} />;
}
