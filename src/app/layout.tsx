import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

import { HomeSectionsProvider } from "@/components/home-sections-provider";
import { PetalDrift } from "@/components/sakura/petal-drift";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Nikan Khadka | Full-Stack Software Engineer",
  description:
    "Portfolio of Nikan Khadka, a Sydney-based full-stack software engineer building production web applications with React, Next.js, Node.js, TypeScript, and AI-assisted workflows. Live GitHub contributions and current work in sync."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[color:var(--background)] text-[color:var(--foreground)] antialiased">
        <HomeSectionsProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-[color:var(--accent-contrast)]"
          >
            Skip to content
          </a>
          <div className="relative min-h-screen">
            <PetalDrift />
            <SiteHeader />
            <div className="relative z-10">{children}</div>
          </div>
        </HomeSectionsProvider>
      </body>
    </html>
  );
}