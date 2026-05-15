// FAQ source content per STR-79 brief
// (/STR/issues/STR-79#document-plan). Each entry tags whether it is eligible
// for FAQPage JSON-LD — promotional/CTA/pricing items are visible on-page but
// excluded from schema per Google's FAQPage policy (Aug-2023 guidance).
//
// Medical reviewer attribution + the disclaimer footer are required wherever
// these run; the consuming page is responsible for rendering them.
// CEO sign-off on medical copy and pricing band is required before any of
// these pages move from noindex placeholder to publicly indexable. The
// existing host is already gated to `noindex` on non-production hosts via
// STR-35.

import type { FaqItem } from "@/lib/schema/types";

export type FaqEntry = FaqItem & {
  /** Stable id used for DOM anchors and FAQPage `@id` references. */
  id: string;
  /** Include this Q&A in FAQPage JSON-LD. Promotional/CTA items are false. */
  inSchema: boolean;
};

// Brief item 1.
export const faqWhatIsTrt: FaqEntry = {
  id: "what-is-trt",
  inSchema: true,
  question: "What is testosterone replacement therapy (TRT)?",
  answer:
    "Testosterone replacement therapy (TRT) is a prescription medical treatment that restores testosterone to a normal range in men diagnosed with clinically low testosterone (hypogonadism). At our Miami clinic, TRT is delivered as injections, topical gels, or implanted pellets after blood work confirms a deficiency. The FDA approves TRT only for men with low testosterone caused by a documented medical condition — not as a general anti-aging or performance treatment.",
};

// Brief item 2.
export const faqLowTSymptoms: FaqEntry = {
  id: "signs-of-low-testosterone",
  inSchema: true,
  question: "How do I know if I have low testosterone?",
  answer:
    "Low testosterone often shows up as fatigue, low libido, erectile difficulty, reduced muscle mass, mood changes, brain fog, and unexplained weight gain. Diagnosis cannot be made on symptoms alone — the American Urological Association requires two separate early-morning blood tests showing total testosterone below 300 ng/dL, combined with consistent symptoms. Our Miami clinic uses this two-test protocol before any testosterone replacement therapy is recommended.",
};

// Brief item 3.
export const faqHowAdministered: FaqEntry = {
  id: "how-is-trt-administered",
  inSchema: true,
  question: "How is TRT administered?",
  answer:
    "TRT is given in several FDA-approved forms: weekly intramuscular or subcutaneous injections of testosterone cypionate or enanthate, daily topical gels or solutions, subdermal pellets implanted every 3–6 months, transdermal patches, buccal tablets, and a long-acting injection (testosterone undecanoate) every 10 weeks. Each form has trade-offs in convenience, cost, and how steady the testosterone levels stay. Our Miami clinicians match the form to the patient's goals and lifestyle.",
};

// Brief item 4.
export const faqBloodTests: FaqEntry = {
  id: "trt-blood-tests",
  inSchema: true,
  question: "What blood tests are needed before starting TRT?",
  answer:
    "Before starting TRT, our Miami clinic orders two early-morning total testosterone tests on separate days, free testosterone, a complete blood count (CBC) to check hematocrit, a lipid panel, PSA (men 40+ or with risk factors), estradiol, LH and FSH, and a comprehensive metabolic panel. These tests confirm the diagnosis, identify any underlying cause, and establish baseline values that we monitor at 30 days and every 6–12 months after starting therapy.",
};

// Brief item 5.
export const faqHowLongResults: FaqEntry = {
  id: "how-long-trt-takes",
  inSchema: true,
  question: "How long does it take to feel results from TRT?",
  answer:
    "Most men notice early changes — better energy, mood, and libido — within 3–4 weeks of starting TRT. Improvements in muscle mass, body composition, and erectile function typically build over 3–6 months. Cleveland Clinic notes that providers usually re-check testosterone levels 30 days into therapy and reassess overall response at 3–6 months. If symptoms have not improved by then, therapy may be adjusted or discontinued.",
};

// Brief item 6.
export const faqSideEffects: FaqEntry = {
  id: "trt-side-effects",
  inSchema: true,
  question: "What are the side effects of TRT?",
  answer:
    "Common side effects of testosterone replacement therapy include acne, oily skin, fluid retention, mild breast tenderness, testicular shrinkage, and reduced sperm production. Lab-detected effects can include elevated red blood cell counts (polycythemia) — reported in roughly 20% of men on TRT — and a small rise in PSA. Serious risks are rare in monitored patients, but TRT is contraindicated in untreated prostate or male breast cancer, untreated severe sleep apnea, recent heart attack or stroke, and men actively trying to conceive.",
};

// Brief item 7.
export const faqProstateCancer: FaqEntry = {
  id: "trt-prostate-cancer",
  inSchema: true,
  question: "Does TRT cause prostate cancer?",
  answer:
    "Current evidence does not show that TRT causes prostate cancer. The American Urological Association advises clinicians to inform patients of the absence of evidence linking testosterone therapy to the development of prostate cancer. TRT can temporarily elevate PSA, which is why our Miami clinic checks PSA and conducts a baseline screening before starting therapy and monitors PSA periodically. TRT is contraindicated in men with active, untreated prostate cancer.",
};

// Brief item 8.
export const faqFertility: FaqEntry = {
  id: "trt-and-fertility",
  inSchema: true,
  question: "Will TRT affect my fertility?",
  answer:
    "Yes — exogenous testosterone suppresses the body's own testosterone production and reduces sperm count, which can cause temporary or sometimes longer-lasting infertility. The American Urological Association strongly recommends against starting TRT in men currently trying to conceive. Men in Miami who want to preserve fertility have alternatives such as clomiphene citrate or hCG, which can raise testosterone without shutting down sperm production. We screen for fertility goals before any prescription is written.",
};

// Brief item 9.
export const faqForLife: FaqEntry = {
  id: "is-trt-for-life",
  inSchema: true,
  question: "Do I have to stay on TRT for life?",
  answer:
    "For men with primary hypogonadism (testicular failure), TRT is typically lifelong because the body cannot resume normal testosterone production on its own. For men with secondary or reversible causes — opioid-related, severe obesity, certain medications — addressing the root cause can sometimes restore testosterone without long-term therapy. Stopping TRT abruptly causes symptoms to return, so our Miami clinic discusses long-term commitment and exit strategies before starting treatment.",
};

// Brief item 10.
export const faqVsSteroids: FaqEntry = {
  id: "trt-vs-steroids",
  inSchema: true,
  question: "What's the difference between TRT and steroids?",
  answer:
    "TRT replaces testosterone to a normal physiological range in men diagnosed with deficiency, under medical supervision with monitored labs. Anabolic steroid use refers to supra-physiological doses of testosterone or related androgens for muscle building, typically without medical oversight. Doses, intent, and clinical monitoring are the differences. Our Miami clinic does not provide therapy for performance enhancement, athletic edge, or bodybuilding — only medically indicated treatment for diagnosed low testosterone.",
};

// Brief item 11.
export const faqWeightLoss: FaqEntry = {
  id: "trt-weight-loss",
  inSchema: true,
  question: "Can TRT help with weight loss or improve metabolic health?",
  answer:
    "Restoring testosterone to a normal range can improve body composition — lean muscle gain and modest reductions in fat mass — over 6–12 months, particularly in men with documented hypogonadism. TRT is not a weight-loss drug and is not appropriate for men with normal testosterone seeking cosmetic results. The evidence base for using TRT solely to improve metabolic markers such as A1c in non-deficient men is limited. Our Miami clinicians treat deficiency, not body composition goals.",
};

// Brief item 12 — placement is "FAQ block only" on a future page, not on
// /trt-clinic-miami. Exported for reuse when that block lands.
export const faqWomen: FaqEntry = {
  id: "trt-for-women",
  inSchema: true,
  question: "Can women receive testosterone therapy at this clinic?",
  answer:
    "Testosterone therapy for women is a separate, off-label use sometimes prescribed for low libido after other causes are ruled out, typically by hormone replacement specialists. There are no FDA-approved testosterone preparations for women in the U.S., so dosing differs significantly from male TRT. Our Miami clinic currently provides TRT for men only. Women seeking hormone therapy should ask about referrals to a female hormone specialist.",
};

// Brief item 13 — promotional pricing answer, excluded from FAQPage JSON-LD
// per Google FAQPage policy.
export const faqCost: FaqEntry = {
  id: "trt-cost-miami",
  inSchema: false,
  question: "How much does TRT cost in Miami?",
  answer:
    "TRT costs in Miami typically range from $150 to $400 per month depending on the form of therapy (injection, gel, pellet) and whether labs are bundled. Most clinics, including ours, offer transparent flat-rate monthly programs that cover medication, labs, and follow-up visits. Insurance coverage varies; many men pay out of pocket through HSA/FSA funds. Our exact pricing is on our /trt-cost page.",
};

// Brief item 14.
export const faqInsurance: FaqEntry = {
  id: "is-trt-covered-by-insurance",
  inSchema: true,
  question: "Is TRT covered by insurance?",
  answer:
    "TRT can be covered by insurance when prescribed for diagnosed hypogonadism documented by two early-morning serum testosterone tests and consistent symptoms. Coverage depends on your plan, deductible, and the form of testosterone prescribed — generic injectable testosterone is most often covered, while gels and pellets are frequently excluded. Many Miami patients use HSA/FSA funds or pay cash for membership programs that bundle labs, medication, and visits.",
};

// Brief item 15 — promotional/CTA answer, excluded from FAQPage JSON-LD.
export const faqHowToStart: FaqEntry = {
  id: "how-to-start-trt",
  inSchema: false,
  question: "How do I start TRT at your Miami clinic?",
  answer:
    "You can book a consultation directly — no referral is required. We order the diagnostic blood work (two early-morning tests), review your symptoms and full medical history, screen for cardiovascular and prostate risk factors, and confirm whether you meet the medical criteria for testosterone replacement therapy before any prescription is written. Established Florida patients can complete follow-up visits via telehealth.",
};

// Placement per STR-79 §3. Order is intentional — foundation → diagnosis →
// safety → commitment → CTA.
export const trtClinicMiamiFaqs: readonly FaqEntry[] = [
  faqWhatIsTrt,
  faqLowTSymptoms,
  faqBloodTests,
  faqHowAdministered,
  faqHowLongResults,
  faqSideEffects,
  faqProstateCancer,
  faqFertility,
  faqForLife,
  faqVsSteroids,
  faqWeightLoss,
  faqHowToStart,
] as const;

export const trtCostFaqs: readonly FaqEntry[] = [faqCost, faqInsurance] as const;

export const schemaEligible = (
  entries: readonly FaqEntry[],
): readonly FaqItem[] =>
  entries
    .filter((e) => e.inSchema)
    .map(({ question, answer }) => ({ question, answer }));

// ISO date for the FAQ block's `lastReviewed`. Update when the brief or
// medical reviewer re-validates copy (target cadence: every 6 months).
// 2026-05-15 = day the STR-79 brief was authored and accepted.
export const TRT_FAQ_LAST_REVIEWED = "2026-05-15" as const;

export const TRT_FAQ_DISCLAIMER =
  "This page is for general education and does not replace a consultation with a licensed clinician. Decisions about testosterone replacement therapy must be made with a qualified medical provider based on your individual lab results and medical history." as const;
