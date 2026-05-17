import { business } from "@/lib/business";
import { absoluteUrl, type SitePath } from "@/lib/site";
import type { SchemaNode } from "./types";

export type ArticleInput = {
  pagePath: SitePath;
  headline: string;
  /** ISO date (YYYY-MM-DD) the article was first published. */
  datePublished: string;
  /** ISO date (YYYY-MM-DD) of the last substantive edit. */
  dateModified: string;
};

// Path of the editorial standards page that owns YMYL review on stronghealth.com.
// Owned by STR-163 (CMO). Every Article's `reviewedBy.url` points here so the
// editorial-review chain is auditable. If STR-163's URL slot changes, update
// this single constant — no per-article edits needed.
export const EDITORIAL_STANDARDS_PATH = "/about/editorial-standards/" as const;
const EDITORIAL_STANDARDS_NAME = "Strong Health Editorial Standards" as const;

// STR-56 / STR-162 — stronghealth.com is an editorial publisher under
// scenario (b); no clinic or named-MD claims attach to TRT YMYL content.
// `author` and `publisher` resolve to Strong Health as a plain Organization.
// `reviewedBy` resolves to the editorial-standards Organization owned by
// STR-163, replacing the prior named-reviewer (Person) dependency that
// STR-159 was gating before it was cancelled.
export const buildArticle = (input: ArticleInput): SchemaNode => {
  const publisher: Record<string, unknown> = {
    "@type": "Organization",
    name: business.legalName,
    url: business.url,
    logo: { "@type": "ImageObject", url: business.logo },
  };
  const reviewer: Record<string, unknown> = {
    "@type": "Organization",
    name: EDITORIAL_STANDARDS_NAME,
    url: `${business.url}${EDITORIAL_STANDARDS_PATH}`,
  };
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(input.pagePath)}#article`,
    mainEntityOfPage: { "@id": `${absoluteUrl(input.pagePath)}#medical-page` },
    headline: input.headline,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: publisher,
    publisher,
    reviewedBy: reviewer,
  } as SchemaNode;
};
