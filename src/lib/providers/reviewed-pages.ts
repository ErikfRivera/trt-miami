// Source of truth for "reviewed by" state per YMYL page.
// Read by:
//   - /medical-reviewer/ auto-list (STR-105)
//   - Top-of-page byline component (STR-61, pending)
// reviewer slug references a ProviderRecord slug from the registry.

import type { SitePath } from "@/lib/site";
import { DEFAULT_LAST_REVIEWED } from "@/lib/citations/default-sources";

export type ReviewedPage = {
  path: SitePath;
  title: string;
  reviewerSlug: string;
  lastReviewed: string;
};

const R = DEFAULT_LAST_REVIEWED;
const REVIEWER = "dr-angel-rivera";

export const reviewedPages: readonly ReviewedPage[] = [
  { path: "/", title: "TRT Therapy Miami — Home", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/trt-clinic-miami/", title: "TRT Clinic Miami", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/trt-injections/", title: "TRT Injections in Miami", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/trt-pellets/", title: "TRT Pellets in Miami", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/trt-gels/", title: "TRT Gels in Miami", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/hrt-miami/", title: "HRT Miami", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/bioidentical-hormones-miami/", title: "Bioidentical Hormones Miami", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/peptide-therapy/", title: "Peptide Therapy Miami", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/trt-cost/", title: "TRT Cost in Miami", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/does-insurance-cover-trt/", title: "Does Insurance Cover TRT?", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/is-trt-safe/", title: "Is TRT Safe?", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/trt-side-effects/", title: "TRT Side Effects", reviewerSlug: REVIEWER, lastReviewed: R },
  { path: "/trt-before-and-after/", title: "TRT Before & After", reviewerSlug: REVIEWER, lastReviewed: R },
] as const;

export function reviewedPagesByReviewer(reviewerSlug: string): readonly ReviewedPage[] {
  return reviewedPages.filter((p) => p.reviewerSlug === reviewerSlug);
}
