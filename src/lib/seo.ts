import type { Metadata } from "next";
import { business } from "@/lib/business";
import { alternatesFor } from "@/lib/hreflangMap";
import { absoluteUrl, type SitePath } from "@/lib/site";

const INDEXABLE_HOSTS = new Set([
  "stronghealth.com",
  "www.stronghealth.com",
  "miami.stronghealth.com",
  "trt-miami.vercel.app",
]);

export function normalizeHost(host: string | null | undefined): string | null {
  if (!host) return null;
  return host.toLowerCase().split(":")[0];
}

export function isIndexableHost(host: string | null | undefined): boolean {
  const normalized = normalizeHost(host);
  if (!normalized) return false;
  return INDEXABLE_HOSTS.has(normalized);
}

export type PageMetaInput = {
  path: SitePath;
  /** The <title>. Always emitted as `title.absolute` so the layout `%s · Brand` template doesn't suffix and double-brand. */
  title: string;
  description: string;
  /** og:title / twitter:title. Defaults to `title`. */
  socialTitle?: string;
  /** og:description / twitter:description. Defaults to `description`. */
  socialDescription?: string;
  /**
   * When true, the page emits `<meta name="robots" content="noindex,nofollow">`.
   * Used by routes that surface placeholder identity (e.g. /providers/ while
   * `hasVerifiedMedicalDirector` is false) so search engines don't index the
   * scaffolding state. Omit / false for normal indexable routes.
   */
  noindex?: boolean;
};

// Single producer for per-route page metadata. Always emits `openGraph` and
// `twitter` so non-trivial routes never fall through to the homepage defaults
// in `app/layout.tsx` — that fall-through made 13/17 pages share the
// homepage's og:title / og:url before STR-135.
//
// Next.js shallow-replaces `openGraph` at the page segment, so this helper
// re-declares `siteName` / `locale` to keep the sitewide brand chrome intact.
export function pageMetadata(input: PageMetaInput): Metadata {
  const {
    path,
    title,
    description,
    socialTitle = title,
    socialDescription = description,
    noindex,
  } = input;
  const metadata: Metadata = {
    title: { absolute: title },
    description,
    alternates: alternatesFor(path),
    openGraph: {
      type: "website",
      siteName: business.name,
      url: absoluteUrl(path),
      title: socialTitle,
      description: socialDescription,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
    },
  };
  if (noindex) metadata.robots = { index: false, follow: false };
  return metadata;
}
