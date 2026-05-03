"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

import { useHomeSections } from "@/components/home-sections-provider";
import { cn } from "@/lib/utils";

type SectionShellProps = PropsWithChildren<{
  id: string;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "snap";
}>;

export function SectionShell({
  children,
  className,
  contentClassName,
  id,
  variant = "default"
}: SectionShellProps) {
  const reduceMotion = useReducedMotion();
  const { activeSection } = useHomeSections();

  if (variant === "snap") {
    const isActive = activeSection === id;

    return (
      <motion.section
        id={id}
        data-active={isActive ? "true" : "false"}
        className={cn("home-snap-section relative", className)}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: isActive ? 1 : 0.9,
                y: 0
              }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.div
          className={cn("home-snap-panel", contentClassName)}
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: isActive ? 1 : 0.985
                }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn("scroll-mt-[calc(var(--header-height)+1rem)]", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
