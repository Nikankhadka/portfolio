"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = PropsWithChildren<{
  id: string;
  /** Two-digit section index, e.g. "01". Pass null to hide. */
  index?: string | null;
  className?: string;
  contentClassName?: string;
  /** Snap-center layout for the homepage shell. Off => normal scrolling block. */
  snap?: boolean;
  /** Alternating background — 'odd' sections get the cream variant so adjacent never bleed. */
  tone?: "even" | "odd";
}>;

export function SectionShell({
  children,
  id,
  index = null,
  className,
  contentClassName,
  snap = true,
  tone = "even"
}: SectionShellProps) {
  const reduceMotion = useReducedMotion();
  const bg = tone === "odd" ? "var(--section-bg-odd)" : "var(--section-bg-even)";

  if (snap) {
    return (
      <motion.section
        id={id}
        className={cn("snap-shell-section", className)}
        style={{
          minHeight: "100%",
          scrollSnapAlign: "center",
          scrollSnapStop: "normal",
          display: "grid",
          placeItems: "center",
          padding: "var(--section-y) 0",
          background: bg,
          overflow: "clip",
          isolation: "isolate"
        }}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", contentClassName)}>
          {index ? <SectionIndex index={index} /> : null}
          {children}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn("scroll-mt-[calc(var(--header-height)+1.25rem)]", className)}
      style={{ background: bg, isolation: "isolate" }}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", contentClassName)}>
        {index ? <SectionIndex index={index} /> : null}
        {children}
      </div>
    </motion.section>
  );
}

function SectionIndex({ index }: { index: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="section-index">{index}</span>
      <span className="h-px w-12 bg-[color:var(--accent-light)] opacity-60" />
    </div>
  );
}