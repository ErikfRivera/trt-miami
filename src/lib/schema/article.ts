import { business } from "@/lib/business";
import { hasVerifiedMedicalDirector } from "@/lib/medical-director";
import { drAngelRivera } from "@/lib/physician";
import { absoluteUrl, type SitePath } from "@/lib/site";
import { physicianId } from "./ids";
import type { SchemaNode } from "./types";

export type ArticleInput = {
  pagePath: SitePath;
  headline: string;
  /** ISO date (YYYY-MM-DD) the article was first published. */
  datePublished: string;
  /** ISO date (YYYY-MM-DD) of the last substantive edit. */
  dateModified: string;
  /**
   * Physician URL for the `reviewedBy` Person reference. Only emitted while
   * a verified medical director exists (gated on `hasVerifiedMedicalDirector`);
   * otherwise the slot is omitted entirely so no dangling @id ships.
   */
  reviewerPhysicianUrl?: string;
};

// STR-56 / STR-160 scenario (b) — stronghealth.com is an editorial publisher,
// not a clinic. The Article node carries the page's editorial identity. Both
// `author` and `publisher` reference Strong Health as a generic Organization
// (no `MedicalBusiness` / `LocalBusiness` claims). The `reviewedBy` Person
// reference is gated on `hasVerifiedMedicalDirector`: scaffolded today as a
// null/omitted slot, wired to the real reviewer once STR-159 consent closes
// and the reviewer Person node is published.
export const buildArticle = (input: ArticleInput): SchemaNode => {
  const publisher: Record<string, unknown> = {
    "@type": "Organization",
    name: business.legalName,
    url: business.url,
    logo: { "@type": "ImageObject", url: business.logo },
  };
  const node: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${absoluteUrl(input.pagePath)}#article`,
    mainEntityOfPage: { "@id": `${absoluteUrl(input.pagePath)}#medical-page` },
    headline: input.headline,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: publisher,
    publisher,
  };
  if (hasVerifiedMedicalDirector) {
    const reviewerUrl = input.reviewerPhysicianUrl ?? drAngelRivera.url;
    node.reviewedBy = { "@id": physicianId(reviewerUrl) };
  }
  return node as SchemaNode;
};
