import type { Metadata } from "next";
import Link from "next/link";
import { CitationBlock } from "@/components/citation-block";
import { FaqAccordion } from "@/components/faq-accordion";
import { LocationMap } from "@/components/location-map";
import { NapBlock } from "@/components/nap-block";
import { SchemaGraph } from "@/components/schema-graph";
import { TrustStrip } from "@/components/trust-strip";
import { business } from "@/lib/business";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import {
  TRT_FAQ_DISCLAIMER,
  TRT_FAQ_LAST_REVIEWED,
  schemaEligible,
  trtClinicMiamiFaqs,
} from "@/lib/faq-content";
import { drAngelRivera } from "@/lib/physician";
import { activeReviewer } from "@/lib/medical-director";
import {
  buildArticle,
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalProcedure,
  buildMedicalWebPage,
  buildPageCitationSchema,
  buildService,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/trt-clinic-miami/" as const;
const { citations: trtMiamiCitations, lastReviewed: trtMiamiLastReviewed } = pageCitations(PAGE_PATH);

// First commit that introduced this route (b107a84). Used as the Article's
// `datePublished`; `dateModified` tracks the latest medical review cadence.
const PAGE_DATE_PUBLISHED = "2026-05-14" as const;

// Next scheduled review = last reviewed + 180d, matching the 180-day cadence
// used by CitationBlock and the YMYL cohort. Keeps STR-203's reviewer
// attribution in lockstep with TRT_FAQ_LAST_REVIEWED without a runtime branch.
const TRT_FAQ_NEXT_REVIEW = (() => {
  const d = new Date(`${TRT_FAQ_LAST_REVIEWED}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 180);
  return d.toISOString().slice(0, 10);
})();

// og:url is resolved via `pageMetadata` → `absoluteUrl(PAGE_PATH)` so it
// points at the canonical subdomain (miami.stronghealth.com). STR-135 caught
// the original `${business.url}${PAGE_PATH}` shipping a cross-domain og:url.
export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: "TRT Clinic Miami | Strong Health Miami, FL",
  description:
    "Doctor-led TRT clinic in Miami. Florida-licensed physician supervision, comprehensive bloodwork, transparent self-pay pricing. Same-week consults available.",
  socialTitle: "TRT Clinic in Miami | Strong Health Miami",
  socialDescription:
    "Physician-led testosterone replacement therapy clinic in Miami — Florida-licensed MD oversight, full bloodwork, transparent pricing.",
});

const breadcrumbItems: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "TRT Clinic Miami", path: PAGE_PATH },
];

const schemaNodes = [
  buildMedicalProcedure({
    pagePath: PAGE_PATH,
    name: "Testosterone Replacement Therapy (TRT)",
    alternateNames: ["TRT", "Testosterone therapy"],
    howPerformed:
      "Bioidentical testosterone is administered via intramuscular injection, subcutaneous pellet, or transdermal preparation after lab-confirmed diagnosis of low testosterone. Treatment is supervised by a Florida-licensed physician with quarterly bloodwork.",
    preparation:
      "Baseline labs include total testosterone (morning draw, fasted), free testosterone, SHBG, estradiol, CBC, CMP, PSA (males ≥40), and lipid panel.",
    followup:
      "Quarterly bloodwork and clinical review for the first year; biannual thereafter.",
    indications: ["Hypogonadism (low testosterone)", "Andropause symptoms"],
    bodyLocation: "Endocrine system",
    performerPhysicianUrl: drAngelRivera.url,
  }),
  buildService({
    pagePath: PAGE_PATH,
    serviceType: "Testosterone Replacement Therapy",
    areaServed: business.areaServed,
    audience: { suggestedGender: "male", suggestedMinAge: 30 },
    // TODO: STR-2 — wire booking URL once /book/ ships; placeholder uses /contact/.
    offers: { bookingUrl: `${business.url}/contact/` },
  }),
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed: TRT_FAQ_LAST_REVIEWED,
    specialty: "Endocrine",
    dateModified: TRT_FAQ_LAST_REVIEWED,
  }),
  buildArticle({
    pagePath: PAGE_PATH,
    headline: "Physician-Led TRT Clinic in Miami",
    datePublished: PAGE_DATE_PUBLISHED,
    dateModified: TRT_FAQ_LAST_REVIEWED,
  }),
  buildFaqPage(schemaEligible(trtClinicMiamiFaqs), PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
  buildPageCitationSchema(PAGE_PATH, trtMiamiCitations),
];

export default function TrtClinicMiamiPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 dark:text-zinc-400">
          <ol className="flex flex-wrap items-center gap-x-2">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-x-2">
                  {isLast ? (
                    <span aria-current="page" className="text-zinc-700 dark:text-zinc-300">
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={item.path}
                        className="underline-offset-2 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Testosterone Replacement Therapy · Miami, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Physician-Led TRT Clinic in Miami
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Physician-supervised testosterone replacement therapy at our Miami
            clinic. Call to schedule a consultation with our medical team.
            Patients with broader endocrine needs can also explore{" "}
            <Link
              href="/hrt-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              hormone replacement therapy
            </Link>
            ,{" "}
            <Link
              href="/bioidentical-hormones-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              bioidentical hormones
            </Link>
            , or{" "}
            <Link
              href="/peptide-therapy/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              peptide therapy in Miami
            </Link>
            {" "}for weight loss, recovery, and hormone support.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={business.phone.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Call {business.phone.display}
            </a>
            {/* STR-183 — money-page CTA points to local #assessment anchor */}
            {/* per STR-8 brief: keep equity on the money page until the user */}
            {/* needs the dedicated intake at /contact/. */}
            <Link
              href="#assessment"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Book a free consultation
            </Link>
          </div>
        </header>

        <TrustStrip />

        <section aria-labelledby="what-is" className="flex flex-col gap-4">
          <h2
            id="what-is"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            What is TRT?
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Testosterone replacement therapy (TRT) is a physician-prescribed
            program that brings testosterone back into a healthy range for men
            with lab-confirmed low testosterone (hypogonadism). At Strong
            Health Miami, every TRT plan starts with a full lab panel and an
            in-person evaluation by a Florida-licensed physician. We treat
            symptoms against biomarkers — not symptoms alone, and not lab
            values in a vacuum.
          </p>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Patients with broader endocrine needs can also explore{" "}
            <Link
              href="/hrt-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              HRT Miami
            </Link>
            ,{" "}
            <Link
              href="/bioidentical-hormones-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              Bioidentical Hormones Miami
            </Link>
            , and{" "}
            <Link
              href="/peptide-therapy/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              Peptide Therapy Miami
            </Link>
            {" "}for weight loss, recovery, and hormone support.
          </p>
        </section>

        <section aria-labelledby="modalities" className="flex flex-col gap-6 cv-auto">
          <h2
            id="modalities"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Common TRT modalities
          </h2>
          {/* Editorial framing (STR-37, confirmed CEO/CMO in STR-118 and shipped
              via STR-167): the Kyzatrex and Clomid/Enclomiphene sub-blocks
              describe modality categories, not a claim that Strong Health
              prescribes any specific product. Verbs must stay descriptive
              ("is taken", "is sometimes prescribed"). Do not rewrite into
              "we administer / we prescribe" copy without re-checking that
              decision. */}
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Injections
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Testosterone cypionate or enanthate, administered
                intramuscularly or subcutaneously. Typically dosed weekly or
                twice weekly for stable serum levels.
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Pellets
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Compounded testosterone pellets are inserted subcutaneously in
                a brief in-office procedure and release a steady dose for 3–5
                months. Good fit for patients who prefer not to self-inject.
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Topical gels &amp; creams
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Daily-applied transdermal preparations. Useful for fine-grained
                dose flexibility and when injections or pellets aren&apos;t the
                right fit.
              </p>
            </article>
          </div>

          <article
            aria-labelledby="modality-oral-kyzatrex"
            className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <h3
              id="modality-oral-kyzatrex"
              className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Oral TRT (Kyzatrex®)
            </h3>
            <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
              Kyzatrex® (testosterone undecanoate) is the first FDA-approved
              oral testosterone replacement therapy in modern formulation.{" "}
              <a
                href="https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=214770"
                rel="noopener nofollow"
                target="_blank"
                className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
              >
                Approved by the FDA in 2022
              </a>{" "}
              and brought to market by Marius Pharmaceuticals, it is taken
              twice daily with food and absorbed primarily via the lymphatic
              system, which bypasses the first-pass liver metabolism that made
              earlier oral testosterones unsafe.
            </p>
            <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
              Oral TRT is sometimes considered by men who want to avoid weekly
              injections, in-office pellet insertions, or the transfer risk
              associated with daily topical gels. Like every TRT modality,
              oral testosterone requires baseline and follow-up bloodwork —
              typically total and free testosterone, hematocrit, estradiol,
              PSA, and a lipid panel — consistent with the{" "}
              <a
                href="https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline"
                rel="noopener nofollow"
                target="_blank"
                className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
              >
                American Urological Association&apos;s 2018 testosterone-deficiency
                guideline
              </a>
              .
            </p>
            <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
              Trade-offs a clinician will usually review: the Kyzatrex label
              includes a blood-pressure monitoring requirement; twice-daily
              dosing with food calls for consistent adherence; and
              out-of-pocket cost is generally higher than injectable
              testosterone cypionate. Choosing between oral, injectable,
              pellet, and topical TRT is individualized to lifestyle, lab
              response, and tolerance.
            </p>
            <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
              Sources: FDA Kyzatrex prescribing information (2022); AUA
              Testosterone Deficiency Guideline (2018).
            </p>
          </article>

          <article
            aria-labelledby="modality-clomid-enclomiphene"
            className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <h3
              id="modality-clomid-enclomiphene"
              className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Clomid / Enclomiphene (fertility-preserving alternative)
            </h3>
            <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
              For men with low testosterone who want to preserve fertility,
              Clomid® (clomiphene citrate) and its purified isomer
              enclomiphene are selective estrogen receptor modulators (SERMs)
              that are sometimes prescribed off-label as an alternative to
              traditional TRT. Unlike exogenous testosterone — which
              suppresses the brain&apos;s signal to the testes and can reduce
              testicular volume and sperm production — these SERMs act
              upstream. They block estrogen feedback at the hypothalamus,
              increase LH and FSH, and stimulate the testes&apos; own
              testosterone production.
            </p>
            <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
              Published studies show clomiphene can raise total testosterone
              into the normal range while maintaining or improving sperm
              parameters, which is why it is often a first-line consideration
              for younger men, men actively trying to conceive, or men who
              want to preserve future fertility.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/22788734/"
                rel="noopener nofollow"
                target="_blank"
                className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
              >
                Katz DJ et al., &ldquo;Outcomes of clomiphene citrate treatment
                in young hypogonadal men,&rdquo; BJU Int (2012)
              </a>
              .
            </p>
            <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
              Trade-offs a clinician will usually review: as an off-label
              use, it is not FDA-approved for male hypogonadism
              (enclomiphene&apos;s New Drug Application was withdrawn in
              2016); a minority of men experience mood or transient visual
              side effects; and the magnitude of testosterone increase is
              generally smaller than with injectable testosterone. Lab
              monitoring follows the same cadence as injectable TRT,
              consistent with the{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/29562364/"
                rel="noopener nofollow"
                target="_blank"
                className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
              >
                Endocrine Society Clinical Practice Guideline on Testosterone
                Therapy (2018)
              </a>
              .
            </p>
            <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
              Sources: Endocrine Society Clinical Practice Guideline —
              Testosterone Therapy (2018); AUA Testosterone Deficiency
              Guideline (2018); Katz DJ et al., BJU Int (2012).
            </p>
          </article>
        </section>

        <section aria-labelledby="process" className="flex flex-col gap-4 cv-auto">
          <h2
            id="process"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            How TRT works at our Miami clinic
          </h2>
          <ol className="grid max-w-3xl gap-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                1
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Initial consultation
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  In-person at our Miami clinic. Medical history, symptom
                  review, and physical exam with a Florida-licensed physician.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                2
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Comprehensive lab panel
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Total and free testosterone (morning, fasted), SHBG,
                  estradiol, CBC, CMP, lipid panel, and PSA for men ≥40.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                3
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Personalized protocol
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Your physician designs the protocol — modality, dose, and
                  ancillaries — calibrated to your symptoms, biomarkers, and
                  risk profile.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                4
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Quarterly re-check
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Bloodwork and clinical review every quarter for the first
                  year, then biannually. Routine follow-ups can be done via
                  secure video.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section aria-labelledby="physician-heading" className="flex flex-col gap-3 cv-auto">
          <h2
            id="physician-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Your Miami physician
          </h2>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {activeReviewer.name}
            </span>{" "}
            — {activeReviewer.jobTitle} at Strong Health Miami.{" "}
            {activeReviewer.description}
          </p>
        </section>

        <section aria-labelledby="faq-heading" className="flex flex-col gap-4 cv-auto">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            TRT in Miami — frequently asked questions
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Medically reviewed by{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {activeReviewer.name}
            </Link>
            . Last reviewed{" "}
            <time dateTime={TRT_FAQ_LAST_REVIEWED}>{TRT_FAQ_LAST_REVIEWED}</time>
            {". Next scheduled review: "}
            <time dateTime={TRT_FAQ_NEXT_REVIEW}>{TRT_FAQ_NEXT_REVIEW}</time>
            {"."}
          </p>
          <FaqAccordion items={trtClinicMiamiFaqs} />
          <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
            {TRT_FAQ_DISCLAIMER}
          </p>
        </section>

        <section aria-labelledby="location" className="flex flex-col gap-6 cv-auto">
          <h2
            id="location"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Our Miami location &amp; service area
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Strong Health Miami serves patients across the Miami metro,
            including {business.areaServed.slice(0, -1).join(", ")}, and{" "}
            {business.areaServed[business.areaServed.length - 1]}. Telehealth
            follow-ups are offered statewide in Florida.
          </p>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <NapBlock />
            <LocationMap />
          </div>
        </section>

        <section
          id="assessment"
          aria-labelledby="cta"
          className="flex flex-col gap-4 rounded-3xl bg-zinc-900 p-8 text-white sm:p-12 dark:bg-zinc-50 dark:text-zinc-900 cv-auto scroll-mt-24"
        >
          <h2
            id="cta"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Book your TRT consultation in Miami
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-300 dark:text-zinc-700">
            Same-week appointments available. Talk to a Florida-licensed
            physician about whether testosterone replacement therapy is the
            right fit for your symptoms and goals.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={business.phone.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700"
            >
              Call {business.phone.display}
            </a>
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10 dark:border-zinc-900/20 dark:text-zinc-900 dark:hover:bg-zinc-900/10"
            >
              Book a free consultation
            </Link>
          </div>
        </section>

        <CitationBlock
          citations={trtMiamiCitations}
          reviewer={{
            slug: primaryReviewer.slug,
            name: primaryReviewer.name,
            credentials: primaryReviewer.honorificSuffix,
          }}
          lastReviewed={trtMiamiLastReviewed}
          pagePath={PAGE_PATH}
        />
      </div>
    </>
  );
}
