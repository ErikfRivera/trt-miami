import { absoluteUrl, type SitePath } from "@/lib/site";
import { drAngelRivera } from "@/lib/physician";
import { physicianId } from "./ids";
import type { SchemaNode } from "./types";

export type MedicalWebPageInput = {
  pagePath: SitePath;
  /** ISO date (YYYY-MM-DD) of last medical review. Required for YMYL trust. */
  lastReviewed: string;
  /** Specialty taxonomy term, e.g. "Endocrine", "Urologic". */
  specialty: string;
  /** Physician URL whose `@id` is referenced as the page's medical reviewer. */
  reviewerPhysicianUrl?: string;
};

export const buildMedicalWebPage = (input: MedicalWebPageInput): SchemaNode => {
  const reviewerUrl = input.reviewerPhysicianUrl ?? drAngelRivera.url;
  return {
    "@type": "MedicalWebPage",
    "@id": `${absoluteUrl(input.pagePath)}#medical-page`,
    url: absoluteUrl(input.pagePath),
    lastReviewed: input.lastReviewed,
    reviewedBy: { "@id": physicianId(reviewerUrl) },
    specialty: input.specialty,
  } as SchemaNode;
};
