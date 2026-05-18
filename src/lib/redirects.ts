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
