import type { Metadata } from "next";
import { absoluteUrl, routes, type SitePath } from "@/lib/site";

export type LangPair = { en: SitePath; es: SitePath };

// EN ↔ ES canonical pairs. Per STR-51 §3.2, this is the single source of truth
// for bidirectional hreflang. A pair only goes live (i.e. emits en/es links) when
// both sides are indexable in `routes`; until then `alternatesFor` falls back to
// self-reference + x-default so we never point hreflang at a noindex URL
// (STR-51 §3.3).
export const hreflangPairs: readonly LangPair[] = [
  { en: "/", es: "/es/" },
  { en: "/trt-clinic-miami/", es: "/es/clinica-trt-miami/" },
  { en: "/delray-beach-trt-therapy/", es: "/es/delray-beach-trt-therapy/" },
  { en: "/contact/", es: "/es/contacto/" },
  // STR-67 — Fort Lauderdale area page (EN ↔ ES) ships with both sides
  // indexable, so the pair emits hreflang from day one.
  { en: "/locations/fort-lauderdale-trt/", es: "/es/locations/fort-lauderdale-trt/" },
] as const;

function isIndexable(path: SitePath): boolean {
  const route = routes.find((r) => r.path === path);
  return route != null && !route.noindex;
}

function isSpanish(path: SitePath): boolean {
  return path === "/es/" || path.startsWith("/es/");
}

// Returns the EN↔ES pair touching `path` only when both sides are indexable;
// per STR-51 §3.3, hreflang must not point at a noindex URL.
export function activePairFor(path: SitePath): LangPair | null {
  const pair = hreflangPairs.find((p) => p.en === path || p.es === path);
  if (!pair) return null;
  if (!isIndexable(pair.en) || !isIndexable(pair.es)) return null;
  return pair;
}

type Alternates = NonNullable<Metadata["alternates"]>;

export function alternatesFor(path: SitePath): Alternates {
  const pair = activePairFor(path);
  if (pair) {
    const enUrl = absoluteUrl(pair.en);
    return {
      canonical: path,
      languages: {
        en: enUrl,
        es: absoluteUrl(pair.es),
        "x-default": enUrl,
      },
    };
  }

  // Per STR-51 §3.3, do not emit hreflang on noindex URLs.
  if (!isIndexable(path)) {
    return { canonical: path };
  }

  const selfUrl = absoluteUrl(path);
  return {
    canonical: path,
    languages: {
      [isSpanish(path) ? "es" : "en"]: selfUrl,
      "x-default": selfUrl,
    },
  };
}
