import { absoluteUrl, type SitePath } from "@/lib/site";
import { drAngelRivera } from "@/lib/physician";
import { hasVerifiedMedicalDirector } from "@/lib/medical-director";
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
  const node: Record<string, unknown> = {
    "@type": "MedicalWebPage",
    "@id": `${absoluteUrl(input.pagePath)}#medical-page`,
    url: absoluteUrl(input.pagePath),
    lastReviewed: input.lastReviewed,
    specialty: input.specialty,
  };
  // STR-137 — only emit `reviewedBy` while a real medical director is
  // published. The Physician/Person node is gated by the same flag; emitting
  // the @id reference without the target node would create a dangling
  // identifier in the JSON-LD graph and tell Google the page was reviewed
  // by an entity it cannot resolve.
  if (hasVerifiedMedicalDirector) {
    const reviewerUrl = input.reviewerPhysicianUrl ?? drAngelRivera.url;
    node.reviewedBy = { "@id": physicianId(reviewerUrl) };
    if (input.mainEntityId) node.mainEntity = { "@id": input.mainEntityId };
  }
  if (input.dateModified) node.dateModified = input.dateModified;
  return node as SchemaNode;
};
