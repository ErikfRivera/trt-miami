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
  /**
   * Optional `mainEntity` `@id`. For editorial pages whose subject is the
   * reviewer (e.g. `/medical-reviewer/`), pass the reviewer's `@id` so the
   * page is self-evidently a record of the named clinician. For clinical
   * pages whose subject is a condition or therapy, omit and let the page's
   * Procedure / MedicalTherapy node carry the medical-subject signal.
   */
  mainEntityId?: string;
  /** ISO date (YYYY-MM-DD) the page itself was last modified. */
  dateModified?: string;
};

export const buildMedicalWebPage = (input: MedicalWebPageInput): SchemaNode => {
  const reviewerUrl = input.reviewerPhysicianUrl ?? drAngelRivera.url;
  const reviewerNodeId = physicianId(reviewerUrl);
  const node: Record<string, unknown> = {
    "@type": "MedicalWebPage",
    "@id": `${absoluteUrl(input.pagePath)}#medical-page`,
    url: absoluteUrl(input.pagePath),
    lastReviewed: input.lastReviewed,
    reviewedBy: { "@id": reviewerNodeId },
    specialty: input.specialty,
  };
  if (input.mainEntityId) node.mainEntity = { "@id": input.mainEntityId };
  if (input.dateModified) node.dateModified = input.dateModified;
  return node as SchemaNode;
};
