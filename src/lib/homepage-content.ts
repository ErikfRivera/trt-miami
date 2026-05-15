import type { FaqItem, ReviewInput } from "@/lib/schema/types";

// TODO: STR-2 — replace these scaffolding answers with copy approved by the
// medical reviewer. Questions are pinned to the homepage cluster from the
// SEO brief (cost / insurance / safety) and should not change without a
// content sign-off.
export const homepageFaqs: readonly FaqItem[] = [
  {
    question: "How much does TRT cost in Miami?",
    answer:
      "Pricing depends on your treatment plan and is reviewed during your consultation. We are a self-pay clinic with transparent quarterly pricing that includes labs and physician visits.",
  },
  {
    question: "Is TRT covered by insurance?",
    answer:
      "Strong Health operates as a self-pay clinic. We provide an itemized superbill on request so you can pursue out-of-network reimbursement with your insurer.",
  },
  {
    question: "Is TRT safe?",
    answer:
      "When prescribed and monitored by a licensed physician with quarterly bloodwork, testosterone replacement therapy is generally well tolerated for the indications it is approved for. Risks, contraindications, and benefits are reviewed in detail during your initial consultation.",
  },
];

// TODO: STR-2 — homepage reviews must come from the moderated on-site review
// submission flow. The schema package supports `buildReview` and aggregate
// rating, but per brief §2.10 we ship NO fabricated Review items. Replace
// the empty array once the first real, attributed reviews are approved.
export const homepageReviews: readonly ReviewInput[] = [];
