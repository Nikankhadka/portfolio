# Nikan Khadka — Portfolio

Clean, minimal personal portfolio built with Next.js, TypeScript, Tailwind v4,
and Framer Motion. Live GitHub sync surfaces contributions, recent activity,
and the project I'm currently shipping — pulled server-side through a single
`/api/github` route and revalidated every 30 minutes.

## Stack

- **Next.js 16** (app router, webpack build)
- **TypeScript** strict
- **Tailwind CSS v4**
- **Framer Motion** for subtle, reduced-motion-aware animation
- Design palette: deep navy base (`#0a1628`) + apricot accent (`#e8a87c`)

## Sections

1. **Hero** — name, role, one-line positioning, contribution counts
2. **About** — short intro + education / current focus / leadership sidebar
3. **Skills** — core stack, frontend, backend, tools, AI · plus a "currently
   learning" card and a live language-usage bar aggregated from tracked repos
4. **Current Work** — spotlight on the project I'm actively shipping
   (README excerpt, last commit, open PRs/issues, recent activity) + a
   52-week contribution heatmap + a recent-activity feed across tracked repos
5. **Projects** — featured case studies with live repo stats where available
6. **Experience** — vertical timeline
7. **Contact** — direct channels + footer

## Live GitHub sync

Tracked repositories and the spotlight repo are configured in
`src/content/site.ts` under `github`:

```ts
export const github: GitHubConfig = {
  username: "Nikankhadka",
  allowlist: [
    "Nikankhadka/fyp",
    "Nikankhadka/nlp-as2",
    "Nikankhadka/portfolio",
    "Nikankhadka/GroupD-g5",
    "Nikankhadka/rug"
  ],
  currentProject: "Nikankhadka/fyp"
};
```

To enable the live data:

1. Create a fine-grained personal access token at
   <https://github.com/settings/personal-access-tokens/new> scoped to
   public read of the repos above.
2. Set `GITHUB_TOKEN` in `.env.local` for development, and in your Vercel
   project settings for production.
3. Restart `pnpm dev`.

If `GITHUB_TOKEN` is unset, the GitHub sections still render — they fall back
to a graceful empty state. No token is ever shipped to the browser; only the
aggregated JSON from `/api/github` is.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build
```

## Deploy

Optimised for Vercel. Add `GITHUB_TOKEN` to the Vercel project's Environment
Variables. No database or external server is required.