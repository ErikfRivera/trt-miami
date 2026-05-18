// Redirect registry. Add entries here, not in next.config.ts.
//
// Why:
// - One source of truth for permanent URL moves (301/308) so we never
//   double-hop and so SEO equity from old paths follows the move.
// - Each entry quotes the GSC signal we are preserving so the next person
//   knows whether removal is safe.
//
// Source vs destination convention:
// - With `trailingSlash: true` in next.config.ts, every indexable URL ends in
//   a slash. Next.js applies the trailing-slash redirect BEFORE checking this
//   registry, so sources here must end in `/` to match in a single hop.
//   Sources without `/` produced an extra 308 hop (trailing-slash add) before
//   landing on the destination — verified at smoke-test against next start.
//   Brief STR-51 §6.5 mandates no redirect chains.

import type { Redirect } from "next/dist/lib/load-custom-routes";

export type RedirectEntry = Redirect & {
  /** Why this redirect exists. Quote impressions/clicks if preserving SEO equity. */
  reason: string;
};

export const redirectRegistry: readonly RedirectEntry[] = [
  // STR-13: collapse the two obvious homepage-variant slugs. Without these,
  // Vercel/Next resolves `/index/` to the homepage body with a 200 (we saw
  // `x-matched-path: /` in prod headers), which lets a crawler treat it as a
  // soft-duplicate even with a canonical pointing home. `/home/` 404s today.
  // Sources end in `/` per the convention below; naked `/index` and `/home`
  // are first 308'd to the slashed form by Next's trailing-slash module, then
  // matched here. Two-hop chain on naked URLs is the documented trade-off.
  {
    source: "/index/",
    destination: "/",
    permanent: true,
    reason: "Prevent /index/ from being indexed as a homepage duplicate (currently 200s).",
  },
  {
    source: "/home/",
    destination: "/",
    permanent: true,
    reason: "Obvious homepage variant; current behavior 404s — make it a single 301.",
  },
  // Scaffold → canonical IA migration (STR-57).
  // NOTE: /fl/miami/trt-therapy/ redirect removed — STR-9 built the real page there.
  {
    source: "/fl/miami/hialeah/",
    destination: "/locations/hialeah-trt/",
    permanent: true,
    reason: "Move scaffold to canonical locations IA. 0 GSC impressions but linked from sitemap.",
  },
  {
    source: "/fl/miami/",
    destination: "/",
    permanent: true,
    reason: "Preserve 112 impressions / 4 clicks (90d). No standalone hub for /fl/miami/ in flat IA.",
  },
  {
    // Negative lookahead excludes /fl/miami/trt-therapy/ — a real page added in STR-9.
    // Next.js redirects run before filesystem routing so we must explicitly carve it out.
    source: "/fl/:path((?!miami\\/trt-therapy).*)/",
    destination: "/",
    permanent: true,
    reason: "Catch-all for any other /fl/* requests. Keeps crawlers off 404s during migration.",
  },
] as const;

export function toNextRedirects(): Redirect[] {
  return redirectRegistry.map(({ reason: _reason, ...rule }) => rule);
}
