import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

import { HomeSectionsProvider } from "@/components/home-sections-provider";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Nikan Khadka | Full-Stack Software Engineer",
  description:
    "Portfolio of Nikan Khadka, a Sydney-based full-stack software engineer building production-ready web applications with React, Next.js, Node.js, TypeScript, modern tooling, and AI-assisted workflows."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (() => {
      const storedTheme = window.localStorage.getItem("nikan-os-theme");
      const theme = storedTheme === "play" ? "play" : "focus";
      document.documentElement.dataset.theme = theme;
    })();
  `;

  return (
    <html lang="en" data-theme="focus" suppressHydrationWarning>
      <Script id="theme-bootstrap" strategy="beforeInteractive">
        {themeScript}
      </Script>
      <body className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] antialiased">
        <ThemeProvider>
          <HomeSectionsProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[color:var(--accent)] focus:px-4 focus:py-2 focus:text-[color:var(--accent-contrast)]"
            >
              Skip to content
            </a>
            <div className="relative min-h-screen overflow-hidden">
              <div className="page-glow" aria-hidden="true" />
              <div className="page-grid" aria-hidden="true" />
              <SiteHeader />
              <div className="relative z-10 pt-[var(--header-height)]">{children}</div>
            </div>
          </HomeSectionsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
