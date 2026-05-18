import type { Metadata } from "next";
import Link from "next/link";
import { CitationBlock } from "@/components/citation-block";
import { LocationMap } from "@/components/location-map";
import { NapBlock } from "@/components/nap-block";
import { SchemaGraph } from "@/components/schema-graph";
import { TrustStrip } from "@/components/trust-strip";
import { business } from "@/lib/business";
import { pageCitations } from "@/lib/citations/page-citations";
import { drAngelRivera } from "@/lib/physician";
import { activeReviewer } from "@/lib/medical-director";
import { alternatesFor } from "@/lib/hreflangMap";
import { absoluteUrl } from "@/lib/site";
import { primaryReviewer } from "@/lib/providers/registry";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalProcedure,
  buildPageCitationSchema,
  buildService,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import type { FaqItem } from "@/lib/schema/types";

const PAGE_PATH = "/hrt-miami/" as const;
const canonicalUrl = absoluteUrl(PAGE_PATH);
const { citations: hrtCitations, lastReviewed: hrtLastReviewed } = pageCitations(PAGE_PATH);

const title = "HRT Miami | Strong Health Miami, FL";
const description =
  "Physician-supervised hormone replacement therapy in Miami for men and women — testosterone, estrogen, thyroid, and peptide support. Same-week consultations.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: alternatesFor(PAGE_PATH),
  openGraph: {
    type: "website",
    // Geo-neutral brand label (STR-119). Miami signal lives in the page title
    // and og:title below — not in the sitewide brand chrome.
    siteName: business.name,
    url: canonicalUrl,
    title: "Hormone Replacement Therapy in Miami | Strong Health",
    description:
      "Physician-supervised HRT in Miami for men and women — testosterone, estrogen, thyroid, peptides. Same-week consults.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HRT in Miami | Strong Health",
    description: "Physician-supervised HRT for men and women in Miami.",
  },
};

const faqs: readonly FaqItem[] = [
  {
    question: "What is hormone replacement therapy (HRT)?",
    answer:
      "Hormone replacement therapy is a physician-prescribed program that supplements hormones the body no longer produces at optimal levels. Common targets include testosterone, estrogen, progesterone, thyroid, and DHEA. At Strong Health Miami, every HRT plan begins with a comprehensive lab panel and is reviewed by a Florida-licensed physician.",
  },
  {
    question: "Who is a candidate for HRT in Miami?",
    answer:
      "Adults with lab-confirmed hormone deficiency and symptoms that interfere with daily life — fatigue, mood changes, sleep disruption, low libido, weight gain, or cognitive complaints — are typical candidates. We screen for contraindications (active cancers, untreated cardiovascular disease, pregnancy, certain liver conditions) before starting any protocol.",
  },
  {
    question: "How is HRT for men different from HRT for women?",
    answer:
      "Men typically receive testosterone replacement, often combined with HCG to preserve testicular function and an aromatase modulator when indicated. Women's HRT focuses on estrogen, progesterone, and sometimes low-dose testosterone — protocols change with perimenopause, menopause, and post-hysterectomy status. Each plan is individualized to symptoms and labs.",
  },
  {
    question: "What lab work do you order before starting HRT?",
    answer:
      "Baseline labs typically include total and free testosterone (men), estradiol, progesterone (women), LH, FSH, SHBG, TSH/free T4/free T3, CBC, comprehensive metabolic panel, lipid panel, HbA1c, vitamin D, and PSA for men over 40. Additional tests are ordered as clinically indicated by your physician.",
  },
  {
    question: "What forms of HRT do you offer?",
    answer:
      "We offer injections (intramuscular and subcutaneous), pellet implants, topical creams and gels, oral preparations where appropriate, and compounded preparations through a licensed compounding pharmacy. Your physician will discuss which route fits your goals, lifestyle, and clinical picture.",
  },
  {
    question: "How long does HRT take to work?",
    answer:
      "Energy, sleep, and mood often improve within the first 4–8 weeks. Body composition changes, libido, and lab-level stabilization typically take 12–24 weeks. We re-check labs at 6 and 12 weeks after starting and adjust dosing based on biomarkers and symptoms.",
  },
  {
    question: "Is HRT safe?",
    answer:
      "When prescribed and monitored by a licensed physician with regular bloodwork, HRT is generally well tolerated for the indications it is approved for. Risks vary by hormone, route, dose, and personal medical history. Your physician will review benefits, side effects, and contraindications in detail before any prescription.",
  },
  {
    question: "Does insurance cover HRT?",
    answer:
      "Strong Health Miami operates as a self-pay clinic. Some HRT medications may be covered by insurance under specific diagnosis codes — we'll discuss your situation during consultation. We can provide an itemized superbill for out-of-network reimbursement attempts.",
  },
  {
    question: "Do you offer HRT for women experiencing menopause?",
    answer:
      "Yes. Our clinicians design perimenopause and menopause protocols using estrogen, progesterone, and (when indicated) low-dose testosterone. Bioidentical options including pellets and creams are available — see our bioidentical hormones page for details on plant-derived molecularly identical hormones.",
  },
  {
    question: "Can I do HRT follow-ups by telehealth?",
    answer:
      "Initial consultations happen in person at our Miami clinic so a physician can review your full medical history and order baseline labs. Routine HRT follow-ups can be conducted by secure video for patients located in Florida.",
  },
];

const breadcrumbItems: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "HRT Miami", path: PAGE_PATH },
];

const schemaNodes = [
  buildMedicalProcedure({
    pagePath: PAGE_PATH,
    name: "Hormone Replacement Therapy (HRT)",
    alternateNames: ["HRT", "Hormone therapy", "Bioidentical hormone replacement"],
    howPerformed:
      "Hormones — testosterone, estrogen, progesterone, thyroid, and/or DHEA — are administered via injection, pellet, topical, or oral preparation after a baseline lab workup and physician evaluation. Protocols are individualized to sex, symptoms, biomarkers, and risk factors.",
    preparation:
      "Baseline labs include total and free testosterone, estradiol, progesterone (women), LH, FSH, SHBG, TSH, free T4, free T3, CBC, CMP, lipid panel, HbA1c, vitamin D, and PSA (men ≥40).",
    followup:
      "Lab re-check and clinical review at 6 weeks, 12 weeks, then every 3–6 months. Doses are titrated to biomarker and symptom response.",
    indications: [
      "Male hypogonadism (low testosterone)",
      "Perimenopause and menopause",
      "Andropause",
      "Hypothyroidism (clinical and subclinical)",
      "Symptomatic hormone deficiency confirmed by lab panel",
    ],
    bodyLocation: "Endocrine system",
    performerPhysicianUrl: drAngelRivera.url,
  }),
  buildService({
    pagePath: PAGE_PATH,
    serviceType: "Hormone Replacement Therapy",
    areaServed: business.areaServed,
    offers: { bookingUrl: `${business.url}/contact/` },
  }),
  buildFaqPage(faqs, PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
  buildPageCitationSchema(PAGE_PATH, hrtCitations),
];

export default function HrtMiamiPage() {
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

        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Hormone Replacement Therapy · Miami, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Hormone Replacement Therapy in Miami
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Physician-supervised HRT for men and women at Strong Health Miami —
            testosterone, estrogen, progesterone, and thyroid support, all dosed
            to your individual lab panel. Initial in-clinic consultations,
            telehealth follow-ups across Florida.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={business.phone.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Call {business.phone.display}
            </a>
            <Link
              href="/contact/"
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
            What is hormone replacement therapy?
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Hormone replacement therapy is a physician-prescribed program that
            supplements hormones the body no longer produces at optimal levels.
            Most commonly that means testosterone for men, estrogen and
            progesterone for women, and thyroid support for either — but a
            complete HRT plan considers the full endocrine picture, not just one
            hormone in isolation.
          </p>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            At Strong Health Miami, every HRT plan starts with a comprehensive
            lab panel and an in-person physician evaluation. We treat symptoms
            against biomarkers — not symptoms alone, and not lab values in a
            vacuum. Our protocols are also designed to integrate with{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              testosterone replacement therapy in Miami
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
            </Link>{" "}
            when clinically appropriate.
          </p>
        </section>

        <section aria-labelledby="symptoms" className="flex flex-col gap-4 cv-auto">
          <h2
            id="symptoms"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Common symptoms of hormone imbalance
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                In men
              </h3>
              <ul className="flex flex-col gap-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                <li>Persistent fatigue and low energy</li>
                <li>Loss of muscle mass, easier weight gain</li>
                <li>Reduced libido, erectile changes</li>
                <li>Mood changes, irritability, brain fog</li>
                <li>Sleep disruption</li>
              </ul>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                In women
              </h3>
              <ul className="flex flex-col gap-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                <li>Hot flashes, night sweats</li>
                <li>Sleep disruption, mood swings</li>
                <li>Vaginal dryness, low libido</li>
                <li>Weight gain around the midsection</li>
                <li>Brain fog, irregular cycles</li>
              </ul>
            </article>
          </div>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            For men, the testosterone-side equivalent of HRT is{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              TRT therapy in Miami
            </Link>
            {" "}— a dedicated guide to protocols, lab work, and what to expect.
          </p>
          <p className="max-w-3xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Symptoms alone are not a diagnosis. Lab work is required to confirm
            hormone deficiency and rule out other causes.
          </p>
        </section>

        <section aria-labelledby="modalities" className="flex flex-col gap-4 cv-auto">
          <h2
            id="modalities"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            HRT modalities we offer in Miami
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Injections
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Testosterone cypionate, enanthate, and combination preparations
                administered intramuscularly or subcutaneously. Typically dosed
                weekly or twice weekly for stable serum levels.
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Pellets
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Compounded hormone pellets are inserted subcutaneously and
                release a steady dose over 3–6 months. Available for both
                testosterone and estradiol protocols.
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Topical creams &amp; gels
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Daily-applied transdermal preparations for testosterone,
                estrogen, and progesterone. A good fit for patients who prefer
                no injections and want fine-grained dose flexibility.
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Oral &amp; ancillary support
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Oral progesterone, levothyroxine, HCG, and aromatase modulators
                when clinically indicated to complete the protocol and protect
                fertility, cycling, and estrogen balance.
              </p>
            </article>
          </div>
        </section>

        <section aria-labelledby="process" className="flex flex-col gap-4 cv-auto">
          <h2
            id="process"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            How HRT works at our Miami clinic
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
                  Baseline hormone, metabolic, lipid, and screening labs. We
                  use a single quality-controlled lab partner so results are
                  comparable across visits.
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
                  Your physician designs the protocol — hormones, modality, dose,
                  and ancillaries — calibrated to your symptoms, biomarkers,
                  and risk profile.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                4
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  6- and 12-week follow-ups
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Re-check labs and titrate the dose to your response. Routine
                  follow-ups thereafter every 3–6 months — many by telehealth.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section aria-labelledby="physician" className="flex flex-col gap-3 cv-auto">
          <h2
            id="physician"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Your Miami HRT physician
          </h2>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {activeReviewer.name}
            </span>{" "}
            — {activeReviewer.jobTitle} at Strong Health Miami.{" "}
            {activeReviewer.description}
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

        <section aria-labelledby="faq-heading" className="flex flex-col gap-6 cv-auto">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Frequently asked questions
          </h2>
          <dl className="flex flex-col gap-6">
            {faqs.map((item) => (
              <div key={item.question} className="flex flex-col gap-2">
                <dt className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {item.question}
                </dt>
                <dd className="text-zinc-600 dark:text-zinc-400">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-labelledby="cta"
          className="flex flex-col gap-4 rounded-3xl bg-zinc-900 p-8 text-white sm:p-12 dark:bg-zinc-50 dark:text-zinc-900 cv-auto"
        >
          <h2
            id="cta"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Schedule your HRT consultation in Miami
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-300 dark:text-zinc-700">
            Same-week appointments available. Talk to a Florida-licensed
            physician about whether hormone replacement therapy is the right fit
            for your symptoms and goals.
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
          citations={hrtCitations}
          reviewer={{
            slug: primaryReviewer.slug,
            name: primaryReviewer.name,
            credentials: primaryReviewer.honorificSuffix,
          }}
          lastReviewed={hrtLastReviewed}
          pagePath={PAGE_PATH}
        />
      </div>
    </>
  );
}
