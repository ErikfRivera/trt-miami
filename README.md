# Miami TRT

Marketing site for a Miami testosterone replacement therapy clinic. The single
goal of this site is to rank #1 for "TRT Therapy" in the Miami area and convert
that organic demand into qualified leads.

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui (`base-nova` style, Lucide icons)
- **Hosting:** Vercel
- **Source dir:** `src/`

## Run locally

Requires Node 20+ (Node 22 LTS recommended). Install dependencies and start the
dev server:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Local dev server (Turbopack)          |
| `npm run build` | Production build + type-check + lint  |
| `npm run start` | Serve the production build            |
| `npm run lint`  | ESLint (Next.js + TypeScript presets) |

## Deploy

The repo is linked to the Vercel project **`trt-miami`** in the
`Erik's projects` team.

- **Production** branch: `main` → auto-deploys on every push
- **Preview** deploys: every PR against `main` gets its own `*-preview.vercel.app` URL
- **Manual deploy from CLI:**

  ```bash
  npx vercel             # preview deploy
  npx vercel --prod      # production deploy
  ```

To run a one-off deploy from a fresh clone, install the Vercel CLI and authenticate first (`npx vercel login`), then run `npx vercel link` to attach the working tree to the existing project.

## Environment variables

Use one of:

- **`.env.local`** — never committed, used in `npm run dev`.
- **Vercel project env vars** — set in the Vercel dashboard; available in
  preview and production deploys.

| Variable               | Where             | Why                                                                                 |
| ---------------------- | ----------------- | ----------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | dev / prev / prod | Canonical absolute URL used by `metadataBase`, sitemap, and OG links. Required in production once a custom domain is attached. |

Conventions:

- `NEXT_PUBLIC_*` is the only namespace that ships to the browser. Anything
  secret must NOT use this prefix.
- Commit a `.env.example` alongside any new variable so future devs (and
  preview builds) know what to set.
- Never commit `.env*` files. `.gitignore` already excludes them.

## SEO baseline

The site ships with the following SEO defaults — keep them in mind when adding
new pages:

- `metadataBase` is set from `NEXT_PUBLIC_SITE_URL` (falls back to the
  `trt-miami.vercel.app` preview URL).
- Each page defines its own `<title>` and `<meta name="description">` via the
  `metadata` export.
- Default Open Graph image is generated at `/opengraph-image` (Next.js
  `ImageResponse`).
- Canonical URLs are declared via `metadata.alternates.canonical` on each page.
- `robots: { index: true, follow: true }` site-wide. If you ever add a route
  that should not be indexed (e.g. admin), opt it out at the route level.

Sitemap, robots.txt, GA4, GSC, and schema.org markup are tracked as separate
follow-up tickets — do not roll them into UI feature work.

## Repo layout

```
src/
  app/
    layout.tsx          # root layout + site metadata + viewport
    page.tsx            # homepage
    opengraph-image.tsx # default 1200×630 OG image
    globals.css         # Tailwind v4 + shadcn theme tokens
  components/
    ui/                 # shadcn primitives
  lib/
    utils.ts            # cn() helper
```
