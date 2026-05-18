// Per-page citation map — CMO owns this file's content via PR review.
// Every YMYL route must have an entry here. The CI validator (scripts/validate-citations.ts)
// fails the build if any entry has < 3 citations or a non-allowlisted host.
// Routes not yet live (e.g. /fl/miami/trt-therapy/) are included as forward declarations.

import type { PageCitations } from "./types";
import { DEFAULT_CITATIONS, DEFAULT_LAST_REVIEWED } from "./default-sources";
import type { SitePath } from "@/lib/site";

const REVIEWED = DEFAULT_LAST_REVIEWED;

export const PAGE_CITATIONS: Partial<Record<SitePath, PageCitations>> = {
  "/": {
    lastReviewed: REVIEWED,
    citations: DEFAULT_CITATIONS,
  },
  "/trt-clinic-miami/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
        url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
        publisher: "Endocrine Society",
        year: 2018,
        pmid: "29562364",
      },
      {
        title: "American Urological Association: Evaluation and Management of Testosterone Deficiency",
        url: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
        publisher: "American Urological Association",
        year: 2022,
      },
      {
        title: "FDA-Approved Testosterone Drug Products",
        url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=202723",
        publisher: "U.S. Food & Drug Administration",
        year: 2024,
      },
      {
        title: "Testosterone Therapy Overview",
        url: "https://www.mayoclinic.org/tests-procedures/testosterone-therapy/about/pac-20385001",
        publisher: "Mayo Clinic",
        year: 2024,
      },
    ],
  },
  "/trt-injections/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "Depo-Testosterone (testosterone cypionate injection) — FDA Label",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/011275s069lbl.pdf",
        publisher: "U.S. Food & Drug Administration",
        year: 2018,
      },
      {
        title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
        url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
        publisher: "Endocrine Society",
        year: 2018,
        pmid: "29562364",
      },
      {
        title: "Pharmacokinetics of testosterone esters in clinical practice",
        url: "https://pubmed.ncbi.nlm.nih.gov/19627190/",
        publisher: "PubMed / Endocrine Reviews",
        year: 2009,
        pmid: "19627190",
      },
    ],
  },
  "/trt-pellets/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "Testopel (testosterone pellets) — FDA Label",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2012/088164s010lbl.pdf",
        publisher: "U.S. Food & Drug Administration",
        year: 2012,
      },
      {
        title: "Pharmacokinetics of testosterone pellets in hypogonadal men",
        url: "https://pubmed.ncbi.nlm.nih.gov/22129082/",
        publisher: "PubMed / Journal of Sexual Medicine",
        year: 2012,
        pmid: "22129082",
      },
      {
        title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
        url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
        publisher: "Endocrine Society",
        year: 2018,
        pmid: "29562364",
      },
    ],
  },
  "/trt-gels/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "AndroGel (testosterone gel) — FDA Label",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2011/021015s034lbl.pdf",
        publisher: "U.S. Food & Drug Administration",
        year: 2011,
      },
      {
        title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
        url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
        publisher: "Endocrine Society",
        year: 2018,
        pmid: "29562364",
      },
      {
        title: "FDA Drug Safety Communication: Secondary Exposure to Testosterone",
        url: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-drug-safety-communication-fda-warning-about-serious-pulmonary-oil-microembolism-reactions",
        publisher: "U.S. Food & Drug Administration",
        year: 2014,
      },
    ],
  },
  "/hrt-miami/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "Menopausal Hormone Therapy: An Endocrine Society Scientific Statement",
        url: "https://pubmed.ncbi.nlm.nih.gov/26446310/",
        publisher: "Endocrine Society",
        year: 2015,
        pmid: "26446310",
      },
      {
        title: "Hormone Therapy — Menopause",
        url: "https://www.mayoclinic.org/diseases-conditions/menopause/in-depth/hormone-therapy/art-20046372",
        publisher: "Mayo Clinic",
        year: 2024,
      },
      {
        title: "FDA Estrogen Labeling Resources",
        url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/estrogen-and-estrogen-progestin-labeling",
        publisher: "U.S. Food & Drug Administration",
        year: 2024,
      },
    ],
  },
  "/bioidentical-hormones-miami/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "Bioidentical Hormones: A Statement of the Endocrine Society",
        url: "https://pubmed.ncbi.nlm.nih.gov/16720668/",
        publisher: "Endocrine Society",
        year: 2006,
        pmid: "16720668",
      },
      {
        title: "FDA Position on Compounded Bioidentical Hormone Therapy",
        url: "https://www.fda.gov/drugs/guidance-compliance-regulatory-information/bio-identical-hormones",
        publisher: "U.S. Food & Drug Administration",
        year: 2024,
      },
      {
        title: "Bioidentical Hormone Therapy",
        url: "https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/bioidentical-hormones/art-20446613",
        publisher: "Mayo Clinic",
        year: 2024,
      },
    ],
  },
  "/peptide-therapy/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "FDA Guidance on Compounding and Drug Approval",
        url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
        publisher: "U.S. Food & Drug Administration",
        year: 2024,
      },
      {
        title: "Growth hormone secretagogues: mechanism of action and use in clinical research",
        url: "https://pubmed.ncbi.nlm.nih.gov/17427958/",
        publisher: "PubMed / European Journal of Endocrinology",
        year: 2007,
        pmid: "17427958",
      },
      {
        title: "Testosterone Therapy Overview",
        url: "https://www.mayoclinic.org/tests-procedures/testosterone-therapy/about/pac-20385001",
        publisher: "Mayo Clinic",
        year: 2024,
      },
    ],
  },
  "/trt-cost/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "Testosterone Therapy Overview",
        url: "https://www.mayoclinic.org/tests-procedures/testosterone-therapy/about/pac-20385001",
        publisher: "Mayo Clinic",
        year: 2024,
      },
      {
        title: "FDA-Approved Testosterone Drug Products",
        url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=202723",
        publisher: "U.S. Food & Drug Administration",
        year: 2024,
      },
      {
        title: "American Urological Association: Evaluation and Management of Testosterone Deficiency",
        url: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
        publisher: "American Urological Association",
        year: 2022,
      },
    ],
  },
  "/does-insurance-cover-trt/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "American Urological Association: Evaluation and Management of Testosterone Deficiency",
        url: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
        publisher: "American Urological Association",
        year: 2022,
      },
      {
        title: "FDA-Approved Testosterone Drug Products",
        url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=202723",
        publisher: "U.S. Food & Drug Administration",
        year: 2024,
      },
      {
        title: "Testosterone Therapy Overview",
        url: "https://www.mayoclinic.org/tests-procedures/testosterone-therapy/about/pac-20385001",
        publisher: "Mayo Clinic",
        year: 2024,
      },
    ],
  },
  "/is-trt-safe/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
        url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
        publisher: "Endocrine Society",
        year: 2018,
        pmid: "29562364",
      },
      {
        title: "FDA-Approved Testosterone Drug Products",
        url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=202723",
        publisher: "U.S. Food & Drug Administration",
        year: 2024,
      },
      {
        title: "Cardiovascular safety of testosterone therapy in older men",
        url: "https://pubmed.ncbi.nlm.nih.gov/37549061/",
        publisher: "PubMed / NEJM",
        year: 2023,
        pmid: "37549061",
      },
    ],
  },
  "/trt-side-effects/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "FDA Testosterone Drug Safety Communication",
        url: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-drug-safety-communication-fda-cautions-about-using-testosterone-products-low-testosterone-due",
        publisher: "U.S. Food & Drug Administration",
        year: 2015,
      },
      {
        title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
        url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
        publisher: "Endocrine Society",
        year: 2018,
        pmid: "29562364",
      },
      {
        title: "Safety of testosterone therapy in elderly men with hypogonadism: a systematic review",
        url: "https://pubmed.ncbi.nlm.nih.gov/25549637/",
        publisher: "PubMed",
        year: 2015,
        pmid: "25549637",
      },
    ],
  },
  "/trt-before-and-after/": {
    lastReviewed: REVIEWED,
    citations: [
      {
        title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
        url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
        publisher: "Endocrine Society",
        year: 2018,
        pmid: "29562364",
      },
      {
        title: "Effects of testosterone treatment in adult men: systematic review and meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/31296975/",
        publisher: "PubMed / European Journal of Endocrinology",
        year: 2019,
        pmid: "31296975",
      },
      {
        title: "Testosterone Therapy Overview",
        url: "https://www.mayoclinic.org/tests-procedures/testosterone-therapy/about/pac-20385001",
        publisher: "Mayo Clinic",
        year: 2024,
      },
    ],
  },
  "/fl/miami/trt-therapy/": {
    lastReviewed: "2026-05-17",
    citations: [
      {
        title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
        url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
        publisher: "Endocrine Society",
        year: 2018,
        pmid: "29562364",
      },
      {
        title: "American Urological Association: Evaluation and Management of Testosterone Deficiency",
        url: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
        publisher: "American Urological Association",
        year: 2022,
      },
      {
        title: "Cardiovascular Safety of Testosterone-Replacement Therapy (TRAVERSE Trial)",
        url: "https://www.nejm.org/doi/10.1056/NEJMoa2212906",
        publisher: "New England Journal of Medicine",
        year: 2023,
      },
      {
        title: "Effects of Testosterone Treatment in Older Men (T-Trials)",
        url: "https://www.nejm.org/doi/10.1056/NEJMoa1506119",
        publisher: "New England Journal of Medicine",
        year: 2016,
      },
      {
        title: "Testosterone Therapy Overview",
        url: "https://www.mayoclinic.org/tests-procedures/testosterone-therapy/about/pac-20385001",
        publisher: "Mayo Clinic",
        year: 2024,
      },
      {
        title: "Testosterone deficiency — NIDDK",
        url: "https://www.niddk.nih.gov/health-information/urologic-diseases/testosterone-deficiency",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
        year: 2024,
      },
    ],
  },
};

export function pageCitations(path: SitePath): PageCitations {
  return PAGE_CITATIONS[path] ?? { citations: DEFAULT_CITATIONS, lastReviewed: DEFAULT_LAST_REVIEWED };
}

// YMYL routes that MUST have a CitationBlock — used by CI validator.
export const YMYL_ROUTES: readonly SitePath[] = [
  "/",
  "/trt-clinic-miami/",
  "/trt-injections/",
  "/trt-pellets/",
  "/trt-gels/",
  "/hrt-miami/",
  "/bioidentical-hormones-miami/",
  "/peptide-therapy/",
  "/trt-cost/",
  "/does-insurance-cover-trt/",
  "/is-trt-safe/",
  "/trt-side-effects/",
  "/trt-before-and-after/",
] as const;
