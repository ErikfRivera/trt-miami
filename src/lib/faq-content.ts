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

// Delray Beach-specific variants (per STR-100 brief §5 + STR-116 M1).
// Five answers needed Delray rewording to remove "Miami clinic" geo leakage
// — Q1 and Q4 use "our clinic"/"our clinicians" (modality discussion is
// generic), Q2/Q3/Q5 are made Delray-specific for local relevance.

export const faqWhatIsTrtDelray: FaqEntry = {
  id: "what-is-trt-delray",
  inSchema: true,
  question: "What is testosterone replacement therapy (TRT)?",
  answer:
    "Testosterone replacement therapy (TRT) is a prescription medical treatment that restores testosterone to a normal range in men diagnosed with clinically low testosterone (hypogonadism). At our clinic, TRT is delivered as injections, topical gels, or implanted pellets after blood work confirms a deficiency. The FDA approves TRT only for men with low testosterone caused by a documented medical condition — not as a general anti-aging or performance treatment.",
};

export const faqLowTSymptomsDelray: FaqEntry = {
  id: "signs-of-low-testosterone-delray",
  inSchema: true,
  question: "How do I know if I have low testosterone?",
  answer:
    "Low testosterone often shows up as fatigue, low libido, erectile difficulty, reduced muscle mass, mood changes, brain fog, and unexplained weight gain. Diagnosis cannot be made on symptoms alone — the American Urological Association requires two separate early-morning blood tests showing total testosterone below 300 ng/dL, combined with consistent symptoms. Strong Health uses this two-test protocol for every Delray Beach patient before any testosterone replacement therapy is recommended.",
};

export const faqBloodTestsDelray: FaqEntry = {
  id: "trt-blood-tests-delray",
  inSchema: true,
  question: "What blood tests are needed before starting TRT?",
  answer:
    "Before starting TRT, Strong Health orders two early-morning total testosterone tests on separate days, free testosterone, a complete blood count (CBC) to check hematocrit, a lipid panel, PSA (men 40+ or with risk factors), estradiol, LH and FSH, and a comprehensive metabolic panel. Delray Beach patients can draw locally and the results are reviewed by a Florida-licensed physician. These tests confirm the diagnosis, identify any underlying cause, and establish baseline values that we monitor at 30 days and every 6–12 months after starting therapy.",
};

export const faqHowAdministeredDelray: FaqEntry = {
  id: "how-is-trt-administered-delray",
  inSchema: true,
  question: "How is TRT administered?",
  answer:
    "TRT is given in several FDA-approved forms: weekly intramuscular or subcutaneous injections of testosterone cypionate or enanthate, daily topical gels or solutions, subdermal pellets implanted every 3–6 months, transdermal patches, buccal tablets, and a long-acting injection (testosterone undecanoate) every 10 weeks. Each form has trade-offs in convenience, cost, and how steady the testosterone levels stay. Our clinicians match the form to the patient's goals and lifestyle.",
};

export const faqFertilityDelray: FaqEntry = {
  id: "trt-and-fertility-delray",
  inSchema: true,
  question: "Will TRT affect my fertility?",
  answer:
    "Yes — exogenous testosterone suppresses the body's own testosterone production and reduces sperm count, which can cause temporary or sometimes longer-lasting infertility. The American Urological Association strongly recommends against starting TRT in men currently trying to conceive. Delray Beach patients who want to preserve fertility have alternatives such as clomiphene citrate or hCG, which can raise testosterone without shutting down sperm production. We screen for fertility goals before any prescription is written.",
};

export const faqSideEffectsDelray: FaqEntry = {
  id: "trt-side-effects-delray",
  inSchema: true,
  question: "What are the side effects of TRT?",
  answer:
    "Common side effects of testosterone replacement therapy include acne, oily skin, fluid retention, mild breast tenderness, testicular shrinkage, and reduced sperm production. Lab-detected effects can include elevated red blood cell counts (polycythemia) — reported in roughly 20% of men on TRT — and a small rise in PSA. Serious risks are rare in monitored patients, but TRT is contraindicated in untreated prostate or male breast cancer, untreated severe sleep apnea, recent heart attack or stroke, and men actively trying to conceive. Our Delray Beach patients are monitored with quarterly bloodwork to catch and manage these changes early.",
};

export const faqCostDelray: FaqEntry = {
  id: "trt-cost-delray-beach",
  inSchema: false,
  question: "How much does TRT cost in Delray Beach?",
  answer:
    "TRT costs in Delray Beach typically range from $150 to $400 per month depending on the delivery method (injection, gel, or pellet) and whether labs are bundled. Strong Health offers transparent flat-rate monthly programs that cover medication, labs, and follow-up visits — the same pricing model we use in Miami. Many Palm Beach County patients use HSA/FSA funds or pay out of pocket. Exact pricing is available on our /trt-cost page.",
};

// 8-item FAQ set for /delray-beach-trt-therapy/ per STR-100 brief §5.
// Order: foundation → diagnosis → safety → fertility → commitment → cost.
// Per STR-116 M1, the five Miami-leak answers are swapped for Delray variants;
// faqHowLongResults is city-agnostic so reused as-is.
export const trtClinicDelrayFaqs: readonly FaqEntry[] = [
  faqWhatIsTrtDelray,
  faqLowTSymptomsDelray,
  faqBloodTestsDelray,
  faqHowAdministeredDelray,
  faqHowLongResults,
  faqSideEffectsDelray,
  faqFertilityDelray,
  faqCostDelray,
] as const;

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

// Editorial FAQ set for /fl/miami/trt-therapy/ (scenario-b, no clinic framing).
// Follows the STR-22 v3 brief, 12 questions, third-person educational copy only.
export const trtMiamiGuideFaqs: readonly FaqEntry[] = [
  {
    id: "guide-what-is-trt",
    inSchema: true,
    question: "What is testosterone replacement therapy (TRT)?",
    answer:
      "Testosterone replacement therapy (TRT) is a prescription medical treatment that restores serum testosterone to a normal physiological range in men diagnosed with clinically low testosterone (hypogonadism). It is FDA-approved only for men with documented testosterone deficiency caused by a medical condition — not as a general anti-aging or performance treatment. Delivery forms include injections, topical gels, transdermal patches, buccal tablets, and subcutaneous pellets.",
  },
  {
    id: "guide-diagnosis",
    inSchema: true,
    question: "How is low testosterone diagnosed?",
    answer:
      "The American Urological Association requires at least two early-morning serum testosterone measurements on separate days, both showing total testosterone below 300 ng/dL, combined with consistent clinical symptoms (fatigue, low libido, reduced muscle mass, mood changes, or erectile difficulty). Because testosterone follows a diurnal rhythm and fluctuates with illness or stress, a single low reading is insufficient for diagnosis. Free testosterone measurement is recommended when total testosterone is borderline or SHBG is abnormal.",
  },
  {
    id: "guide-cost",
    inSchema: true,
    question: "What does TRT cost in Miami?",
    answer:
      "TRT costs in Miami typically range from $150 to $400 per month depending on the delivery method (injectable testosterone is least expensive; pellet implantation is most), the frequency of monitoring labs, and whether care is billed through insurance or a cash-pay membership program. Generic injectable testosterone cypionate — the most widely prescribed form — costs under $30/month in medication alone; total program costs vary by provider model. See our detailed TRT cost guide for a full Miami price breakdown.",
  },
  {
    id: "guide-insurance",
    inSchema: true,
    question: "Does insurance cover TRT in Miami?",
    answer:
      "TRT can be covered by insurance when prescribed for documented hypogonadism confirmed by qualifying lab values and symptoms. Coverage depends on plan formulary, deductible, and the specific testosterone formulation — generic injectable testosterone is most commonly covered, while long-acting pellets and branded gels are frequently excluded or require prior authorization. Many Miami patients pay out of pocket through HSA/FSA funds or cash-pay programs. Our does-insurance-cover-TRT guide walks through how to verify your benefits.",
  },
  {
    id: "guide-safety",
    inSchema: true,
    question: "Is TRT safe?",
    answer:
      "For men with confirmed hypogonadism who are monitored with regular blood work, TRT has a well-characterized safety profile. The landmark 2023 TRAVERSE trial (NEJM) found no significant increase in major adverse cardiovascular events in men with or at high risk for cardiovascular disease. Risks that require monitoring include polycythemia (elevated red cell count, roughly 20% of treated men), PSA elevation, sleep apnea worsening, and reduced fertility. TRT is contraindicated in untreated prostate or male breast cancer, recent MI or stroke, and men trying to conceive.",
  },
  {
    id: "guide-timeline",
    inSchema: true,
    question: "How long does it take for TRT to work?",
    answer:
      "Most men report early improvements in energy, mood, and libido within 3–4 weeks of starting TRT. Improvements in muscle mass and body composition typically build over 3–6 months; sexual function benefits accumulate over a similar timeframe. The Endocrine Society recommends re-checking testosterone levels 30–90 days after initiation and reassessing clinical response at 3–6 months. If symptoms have not improved by 6 months on adequate doses, the diagnosis should be reconsidered.",
  },
  {
    id: "guide-side-effects",
    inSchema: true,
    question: "What are the most common side effects of TRT?",
    answer:
      "Common side effects include acne, oily skin, fluid retention, mild breast tenderness, and testicular atrophy from suppression of the HPG axis. Lab abnormalities include elevated hematocrit (polycythemia, ~20% of treated men), modest PSA rise, and suppressed LH/FSH. Fertility impairment is expected with exogenous testosterone. Rare but serious effects — cardiovascular events, deep vein thrombosis, hepatotoxicity with oral formulations — are monitored via regular labs. Monitoring protocols typically include CBC, testosterone level, PSA, and hematocrit at 30 days, then every 6–12 months.",
  },
  {
    id: "guide-fertility",
    inSchema: true,
    question: "Will TRT affect fertility?",
    answer:
      "Yes. Exogenous testosterone suppresses LH and FSH, which reduces intratesticular testosterone and shuts down spermatogenesis. The AUA strongly advises against starting TRT in men who are currently trying to conceive. Men who want to preserve fertility while treating low testosterone have alternatives — clomiphene citrate, hCG, or a combination — that stimulate endogenous testosterone production without the suppressive effect on sperm. Recovery of spermatogenesis after stopping TRT can take 6–18+ months and is not guaranteed.",
  },
  {
    id: "guide-modalities",
    inSchema: true,
    question: "What is the difference between TRT injections, pellets, and gels?",
    answer:
      "Injections (testosterone cypionate or enanthate, weekly) produce the largest serum swings but are inexpensive and allow dose titration. Gels and solutions (applied daily) provide stable levels but carry a small transfer risk to partners or children, and are often not covered by insurance. Subdermal pellets (implanted every 3–6 months) offer the most stable levels with no daily administration but require a minor office procedure and cannot be easily dose-adjusted once implanted. Buccal tablets and nasal gels are niche options with specific adherence or transfer profiles. The best delivery method depends on lifestyle, insurance, and individual hormone kinetics.",
  },
  {
    id: "guide-hrt-vs-trt",
    inSchema: true,
    question: "Is HRT the same as TRT?",
    answer:
      "TRT is a subset of hormone replacement therapy (HRT). HRT is a broader term that includes estrogen therapy for menopausal women, thyroid hormone replacement, and other endocrine treatments. When used in the context of men's health, HRT and TRT are often used interchangeably to describe testosterone supplementation, though TRT is the more precise clinical term for testosterone-specific treatment. Women's hormone therapy — estrogen with or without progesterone — is a distinct treatment class. Some men also pursue broader 'male HRT' that includes DHEA, growth hormone secretagogues, or thyroid optimization alongside testosterone.",
  },
  {
    id: "guide-weight-loss",
    inSchema: true,
    question: "Can TRT help with weight loss or muscle gain?",
    answer:
      "Restoring testosterone to a normal range in genuinely deficient men produces measurable changes in body composition: modest lean mass gains and reductions in fat mass, typically over 6–12 months. A 2011 systematic review (Saad et al., Obesity Reviews) found significant reductions in waist circumference and BMI in hypogonadal men treated with testosterone. The effect is modest compared with diet and resistance training and is not a substitute for them. TRT is not indicated for men with normal testosterone who want to improve body composition — the risk-benefit calculation is unfavorable in eugonadal men.",
  },
  {
    id: "guide-evaluate-provider",
    inSchema: true,
    question: "How do you evaluate a TRT provider in Miami?",
    answer:
      "A qualified TRT provider should require two early-morning testosterone blood tests before prescribing, conduct a complete baseline evaluation (CBC, lipid panel, PSA, estradiol, LH/FSH, comprehensive metabolic panel), have a Florida-licensed physician supervise or directly provide care, monitor labs at 30 days and every 6–12 months thereafter, and be willing to adjust or discontinue therapy if response is inadequate. Red flags include prescribing based on symptoms alone, skipping pre-treatment labs, offering testosterone for athletic performance, or not monitoring hematocrit and PSA regularly. A Florida licensed physician must be involved in prescribing; telehealth-only models are legal in Florida but must include laboratory oversight.",
  },
] as const;
