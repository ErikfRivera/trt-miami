import type { Metadata } from "next";
import Link from "next/link";
import { CitationBlock } from "@/components/citation-block";
import { FaqAccordion } from "@/components/faq-accordion";
import { SchemaGraph } from "@/components/schema-graph";
import { pageCitations } from "@/lib/citations/page-citations";
import { activeReviewer } from "@/lib/medical-director";
import { primaryReviewer } from "@/lib/providers/registry";
import { schemaEligible, trtMiamiGuideFaqs, TRT_FAQ_DISCLAIMER } from "@/lib/faq-content";
import {
  buildArticle,
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalWebPage,
  buildPageCitationSchema,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/fl/miami/trt-therapy/" as const;
const LAST_REVIEWED = "2026-05-17" as const;
const NEXT_REVIEW = "2026-11-13" as const;
const DATE_PUBLISHED = "2026-05-17" as const;
const HEADLINE = "TRT in Miami: A Complete Guide to Testosterone Replacement Therapy" as const;

const { citations, lastReviewed } = pageCitations(PAGE_PATH);

export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: "TRT in Miami: A Complete Guide to Testosterone Therapy",
  description:
    "An editorial guide to testosterone replacement therapy in Miami — what TRT is, how it works, what the research shows, and how to evaluate a provider.",
});

const breadcrumbItems: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "TRT in Miami", path: PAGE_PATH },
];

const schemaNodes = [
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed: LAST_REVIEWED,
    specialty: "Endocrine",
    dateModified: LAST_REVIEWED,
  }),
  buildArticle({
    pagePath: PAGE_PATH,
    headline: HEADLINE,
    datePublished: DATE_PUBLISHED,
    dateModified: LAST_REVIEWED,
  }),
  buildFaqPage(schemaEligible(trtMiamiGuideFaqs), PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
  buildPageCitationSchema(PAGE_PATH, citations),
];

export default function TrtMiamiGuidePage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:py-24">
        {/* Breadcrumb */}
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
                      <Link href={item.path} className="underline-offset-2 hover:underline">
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

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Testosterone Therapy · Miami, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            TRT in Miami: A Complete Guide to Testosterone Replacement Therapy
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            An editorial guide to testosterone replacement therapy in Miami —
            what TRT is, how it works, what the clinical research shows, and how
            to evaluate a provider.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Medically reviewed by{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {activeReviewer.name}
            </Link>
            . Last reviewed{" "}
            <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED}</time>
            {". Next scheduled review: "}
            <time dateTime={NEXT_REVIEW}>{NEXT_REVIEW}</time>
            {"."}
          </p>
        </header>

        {/* What is TRT */}
        <section aria-labelledby="what-is-trt" className="flex flex-col gap-4">
          <h2
            id="what-is-trt"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            What is testosterone replacement therapy?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Testosterone replacement therapy (TRT) is a prescription medical
            treatment that restores serum testosterone to a normal physiological
            range in men diagnosed with hypogonadism — clinically low
            testosterone confirmed by blood work and symptoms. The FDA approves
            TRT only for documented testosterone deficiency caused by a medical
            condition, not as an anti-aging supplement or performance enhancer.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Hypogonadism is more common than widely recognized. The Endocrine
            Society estimates prevalence at 2–6% of men overall, rising to
            20–50% in men with obesity, type 2 diabetes, or metabolic syndrome.
            The{" "}
            <Link
              href="/hrt/what-is-hrt/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              distinction between TRT and HRT
            </Link>{" "}
            matters for insurance coverage and treatment framing.
          </p>
        </section>

        {/* Who seeks TRT */}
        <section aria-labelledby="who-seeks-trt" className="flex flex-col gap-4">
          <h2
            id="who-seeks-trt"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Who seeks TRT in Miami?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Most men who seek TRT evaluation have experienced persistent fatigue,
            declining libido, mood changes, reduced muscle mass, or erectile
            difficulty — symptoms that are non-specific but become diagnostically
            relevant when two early-morning testosterone tests confirm total T
            below 300 ng/dL. Miami's demographic profile — a large Hispanic male
            population over 40 and a high rate of metabolic disease — tracks with
            nationally elevated hypogonadism prevalence in those groups.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The American Urological Association requires two separate qualifying
            blood tests before a diagnosis can be made. Symptoms alone are not
            sufficient. Men who want to learn what the diagnostic threshold means
            for their specific labs can review our{" "}
            <Link
              href="/trt/how-it-works/injections-vs-pellets-vs-gels/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              delivery method comparison
            </Link>
            .
          </p>
        </section>

        {/* Modalities */}
        <section aria-labelledby="modalities" className="flex flex-col gap-4">
          <h2
            id="modalities"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            TRT delivery methods
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            FDA-approved testosterone formulations differ in cost, stability of
            serum levels, administration frequency, and insurance coverage. The
            main categories are:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">Injections</strong> — weekly
              intramuscular or subcutaneous testosterone cypionate or enanthate;
              least expensive, most widely covered, largest serum peak-to-trough
              swings.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">Topical gels &amp; solutions</strong>{" "}
              — applied daily; stable levels but risk of transdermal transfer to
              partners or children; frequently excluded from insurance formularies.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">Subcutaneous pellets</strong> —
              implanted every 3–6 months for stable, hands-off delivery; requires
              an office procedure; dose cannot be adjusted once implanted.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">Long-acting injection (testosterone undecanoate)</strong>{" "}
              — administered every 10 weeks in a clinic; very stable levels; prior
              authorization often required.
            </li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400">
            A full comparison of pros and cons is in our{" "}
            <Link
              href="/trt/how-it-works/injections-vs-pellets-vs-gels/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              injections vs. pellets vs. gels guide
            </Link>
            .
          </p>
        </section>

        {/* Research & safety */}
        <section aria-labelledby="research-safety" className="flex flex-col gap-4">
          <h2
            id="research-safety"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            What the research shows
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The safety evidence base for TRT expanded significantly with two
            landmark trials. The{" "}
            <Link
              href="/trt/safety/traverse-trial-explained/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              TRAVERSE trial
            </Link>{" "}
            (NEJM, 2023) — the largest randomized controlled trial of TRT to date
            — enrolled 5,246 men with hypogonadism and cardiovascular disease or
            risk factors and found no significant increase in major adverse
            cardiovascular events compared with placebo over a median 33-month
            follow-up. The T-Trials (NEJM, 2016) demonstrated benefits in sexual
            function, bone mineral density, and physical capacity in older
            hypogonadal men.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Risks that require monitoring include polycythemia (elevated red cell
            count), PSA elevation, sleep apnea exacerbation, and fertility
            impairment. The Endocrine Society and AUA both recommend baseline and
            follow-up labs. For a full safety review, see our{" "}
            <Link
              href="/is-trt-safe/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              is TRT safe
            </Link>{" "}
            guide and our{" "}
            <Link
              href="/trt-side-effects/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              TRT side effects
            </Link>{" "}
            page.
          </p>
        </section>

        {/* Miami market context */}
        <section aria-labelledby="miami-market" className="flex flex-col gap-4">
          <h2
            id="miami-market"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            The Miami TRT landscape
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Miami has a dense concentration of TRT providers — from large
            telemedicine platforms to independent men's health clinics and
            urology practices. Monthly program costs range from approximately
            $150 for generic injectable testosterone with bundled labs to $400+
            for pellet-based programs. Pricing transparency varies widely; some
            clinics bundle labs and consultations into a flat monthly fee while
            others bill each component separately. See our{" "}
            <Link
              href="/fl/miami/trt-therapy/cost/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              Miami TRT cost guide
            </Link>{" "}
            for a detailed breakdown, and our{" "}
            <Link
              href="/fl/miami/trt-therapy/insurance/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              insurance coverage guide
            </Link>{" "}
            for information on what most health plans cover.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Patients in Broward County can find provider and pricing context in
            our{" "}
            <Link
              href="/fl/fort-lauderdale/trt-therapy/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              Fort Lauderdale TRT guide
            </Link>
            .
          </p>
        </section>

        {/* How to evaluate a provider */}
        <section aria-labelledby="evaluate-provider" className="flex flex-col gap-4">
          <h2
            id="evaluate-provider"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            How to evaluate a TRT provider in Miami
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            A qualified TRT provider should require at least two qualifying
            testosterone tests before prescribing, conduct a full baseline
            evaluation (CBC, lipid panel, PSA, LH/FSH, estradiol, comprehensive
            metabolic panel), have a Florida-licensed physician supervise or
            directly deliver care, and monitor labs at 30 days and every 6–12
            months after initiation.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Red flags include prescribing on symptoms alone without lab
            confirmation, not monitoring hematocrit or PSA, offering testosterone
            for athletic performance rather than documented deficiency, or
            operating without physician oversight. Florida telehealth regulations
            permit virtual TRT care for established patients but require a
            physician or ARNP with prescriptive authority for initial orders and
            regular lab oversight.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            For men concerned about fertility, review our{" "}
            <Link
              href="/trt/fertility/trt-and-fertility/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              TRT and fertility guide
            </Link>{" "}
            before starting treatment, as exogenous testosterone suppresses
            spermatogenesis. Expected timeline for symptom response is covered in{" "}
            <Link
              href="/trt/timeline/when-trt-starts-working/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              when TRT starts working
            </Link>
            .
          </p>
        </section>

        {/* Editorial reviewer note */}
        <section
          aria-labelledby="reviewer-note"
          className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h2
            id="reviewer-note"
            className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Editorial review note
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This guide is written and maintained by the Strong Health editorial
            team and reviewed by a licensed physician for medical accuracy. It is
            an educational resource, not clinical advice. Decisions about
            testosterone replacement therapy require a formal evaluation by a
            qualified medical provider based on your individual lab results,
            medical history, and symptoms.
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Reviewed:{" "}
            <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED}</time>. Medical
            reviewer:{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {activeReviewer.name}
            </Link>
            .
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Frequently asked questions about TRT in Miami
          </h2>
          <FaqAccordion items={trtMiamiGuideFaqs} defaultOpenFirst />
          <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
            {TRT_FAQ_DISCLAIMER}
          </p>
        </section>

        {/* Further reading */}
        <section aria-labelledby="further-reading" className="flex flex-col gap-3">
          <h2
            id="further-reading"
            className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Further reading
          </h2>
          <ul className="flex flex-col gap-1 text-zinc-700 dark:text-zinc-300">
            <li>
              <Link href="/fl/miami/trt-therapy/cost/" className="underline-offset-2 hover:underline">
                TRT cost in Miami — 2026 pricing guide
              </Link>
            </li>
            <li>
              <Link href="/fl/miami/trt-therapy/insurance/" className="underline-offset-2 hover:underline">
                Does insurance cover TRT in Miami?
              </Link>
            </li>
            <li>
              <Link href="/trt/how-it-works/injections-vs-pellets-vs-gels/" className="underline-offset-2 hover:underline">
                Injections vs. pellets vs. gels — delivery method comparison
              </Link>
            </li>
            <li>
              <Link href="/trt/safety/traverse-trial-explained/" className="underline-offset-2 hover:underline">
                The TRAVERSE trial explained
              </Link>
            </li>
            <li>
              <Link href="/trt/timeline/when-trt-starts-working/" className="underline-offset-2 hover:underline">
                When TRT starts working — what to expect week by week
              </Link>
            </li>
            <li>
              <Link href="/trt/fertility/trt-and-fertility/" className="underline-offset-2 hover:underline">
                TRT and fertility — what you need to know before starting
              </Link>
            </li>
            <li>
              <Link href="/fl/fort-lauderdale/trt-therapy/" className="underline-offset-2 hover:underline">
                Fort Lauderdale TRT guide
              </Link>
            </li>
            <li>
              <Link href="/hrt/what-is-hrt/" className="underline-offset-2 hover:underline">
                What is HRT? TRT vs. broader hormone replacement
              </Link>
            </li>
          </ul>
        </section>

        <CitationBlock
          citations={citations}
          reviewer={{
            slug: primaryReviewer.slug,
            name: primaryReviewer.name,
            credentials: primaryReviewer.honorificSuffix,
          }}
          lastReviewed={lastReviewed}
          pagePath={PAGE_PATH}
        />
      </div>
    </>
  );
}
