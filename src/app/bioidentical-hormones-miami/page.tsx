import type { Metadata } from "next";
import Link from "next/link";
import { LocationMap } from "@/components/location-map";
import { NapBlock } from "@/components/nap-block";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { drAngelRivera } from "@/lib/physician";
import { alternatesFor } from "@/lib/hreflangMap";
import { absoluteUrl } from "@/lib/site";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalProcedure,
  buildService,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import type { FaqItem } from "@/lib/schema/types";

const PAGE_PATH = "/bioidentical-hormones-miami/" as const;
const canonicalUrl = absoluteUrl(PAGE_PATH);

const title = "Bioidentical Hormones Miami | Strong Health Miami, FL";
const description =
  "Bioidentical hormone replacement therapy in Miami: plant-derived hormone pellets, creams, and injections, physician-prescribed and lab-monitored. Book today.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: alternatesFor(PAGE_PATH),
  openGraph: {
    type: "website",
    siteName: "Strong Health TRT Therapy Miami",
    url: canonicalUrl,
    title: "Bioidentical Hormones in Miami | Strong Health",
    description:
      "Bioidentical hormone replacement therapy in Miami — plant-derived pellets, creams, injections. Physician-prescribed.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bioidentical Hormones in Miami | Strong Health",
    description:
      "Plant-derived bioidentical hormone replacement therapy in Miami, physician-prescribed and monitored.",
  },
};

const faqs: readonly FaqItem[] = [
  {
    question: "What are bioidentical hormones?",
    answer:
      "Bioidentical hormones are plant-derived compounds — typically from soy or yam — whose molecular structure is identical to the hormones the human body produces. The most commonly prescribed bioidentical forms include estradiol, progesterone, and testosterone. At Strong Health Miami, bioidentical preparations are physician-prescribed and dispensed by a licensed compounding pharmacy.",
  },
  {
    question: "How are bioidentical hormones different from synthetic HRT?",
    answer:
      "Bioidentical means the molecule itself is identical to endogenous human hormones. Many conventional HRT products (e.g., conjugated equine estrogens, medroxyprogesterone) use molecules that differ slightly. Bioidentical preparations may be made in standardized FDA-approved forms (estradiol patches, micronized progesterone) or compounded preparations tailored to individual dosing.",
  },
  {
    question: "Are bioidentical hormones FDA-approved?",
    answer:
      "Several bioidentical hormone products are FDA-approved — including estradiol patches, gels, and micronized oral progesterone. Compounded bioidentical preparations, including most custom pellets and creams, are prepared by licensed pharmacies under state regulation and are not individually FDA-approved. Your physician will review which form fits your protocol.",
  },
  {
    question: "Who is a candidate for bioidentical hormone replacement in Miami?",
    answer:
      "Adults with lab-confirmed hormone deficiency or perimenopausal/menopausal symptoms that interfere with quality of life are typical candidates. We screen for contraindications — including hormone-sensitive cancers, active thromboembolic disease, uncontrolled liver disease, and pregnancy — before starting any protocol.",
  },
  {
    question: "What forms of bioidentical hormones do you offer?",
    answer:
      "Pellets implanted subcutaneously (3–6 month duration), compounded creams and gels (daily transdermal), injections for testosterone, and oral micronized progesterone are all available. Your physician will recommend a form based on the hormone, your goals, lifestyle, and clinical picture.",
  },
  {
    question: "How are bioidentical hormone pellets inserted?",
    answer:
      "Pellet insertion is a brief in-office procedure. The skin over the upper buttock is numbed with local anesthetic, a small incision is made, and pellets the size of a grain of rice are placed in the subcutaneous tissue. The site is closed with a steri-strip. Most patients return to normal activity the next day.",
  },
  {
    question: "How long do bioidentical hormone pellets last?",
    answer:
      "Most testosterone pellets release a therapeutic dose for 3–5 months in men and 3–4 months in women. Estradiol pellets typically last 3–4 months. Re-implantation is scheduled based on symptom recurrence and follow-up labs, not a fixed calendar.",
  },
  {
    question: "Are bioidentical hormones safer than synthetic hormones?",
    answer:
      "The published literature does not establish a clear safety advantage for compounded bioidentical preparations over FDA-approved hormone therapy. Risks — including breast cancer, cardiovascular events, and thromboembolism — depend on the hormone, dose, route, duration, and individual risk factors. Your physician will review benefits and risks specific to your situation.",
  },
  {
    question: "Does insurance cover bioidentical hormone therapy?",
    answer:
      "Strong Health Miami operates as a self-pay clinic. Some FDA-approved bioidentical products may be covered by insurance under specific diagnosis codes; compounded preparations are typically not covered. We provide an itemized superbill on request for out-of-network reimbursement.",
  },
  {
    question: "What lab work do you order for bioidentical hormone therapy?",
    answer:
      "Baseline labs typically include estradiol, progesterone, total and free testosterone, SHBG, LH, FSH, TSH, free T4, free T3, CBC, comprehensive metabolic panel, lipid panel, vitamin D, and PSA (men ≥40). We re-check the relevant hormone levels at 6 and 12 weeks and then every 3–6 months on maintenance.",
  },
];

const breadcrumbItems: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Bioidentical Hormones Miami", path: PAGE_PATH },
];

const schemaNodes = [
  buildMedicalProcedure({
    pagePath: PAGE_PATH,
    name: "Bioidentical Hormone Replacement Therapy (BHRT)",
    alternateNames: ["BHRT", "Bioidentical HRT", "Bioidentical hormones"],
    howPerformed:
      "Plant-derived hormones — molecularly identical to endogenous human hormones — are administered via subcutaneous pellets, compounded creams, gels, injections, or oral preparations after baseline labs and physician evaluation. Compounded preparations are dispensed by a licensed compounding pharmacy.",
    preparation:
      "Baseline labs include estradiol, progesterone, total and free testosterone, SHBG, LH, FSH, TSH, free T4, free T3, CBC, CMP, lipid panel, vitamin D, and PSA (men ≥40).",
    followup:
      "Lab re-check and clinical review at 6 and 12 weeks, then every 3–6 months on maintenance. Pellet re-implantation scheduled by symptom return and labs.",
    indications: [
      "Perimenopause and menopause",
      "Male hypogonadism (low testosterone)",
      "Andropause",
      "Symptomatic hormone deficiency confirmed by lab panel",
    ],
    bodyLocation: "Endocrine system",
    performerPhysicianUrl: drAngelRivera.url,
  }),
  buildService({
    pagePath: PAGE_PATH,
    serviceType: "Bioidentical Hormone Replacement Therapy",
    areaServed: business.areaServed,
    offers: { bookingUrl: `${business.url}/contact/` },
  }),
  buildFaqPage(faqs, PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
];

export default function BioidenticalHormonesMiamiPage() {
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
            Bioidentical Hormone Replacement Therapy · Miami, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Bioidentical Hormone Replacement Therapy in Miami
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Plant-derived, molecularly identical hormones — estradiol,
            progesterone, and testosterone — prescribed and monitored by a
            Florida-licensed physician. Pellets, compounded creams, and
            injections, all dosed to your individual lab panel.
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
              Request a consultation
            </Link>
          </div>
        </header>

        <section aria-labelledby="what-is" className="flex flex-col gap-4">
          <h2
            id="what-is"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            What are bioidentical hormones?
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Bioidentical hormones are plant-derived compounds whose molecular
            structure is identical to the hormones the human body produces.
            Common bioidentical preparations include 17β-estradiol, micronized
            progesterone, and testosterone — usually sourced from soy or wild
            yam and processed in a licensed pharmacy.
          </p>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Some bioidentical products are FDA-approved (estradiol patches,
            gels, oral micronized progesterone) and dispensed like any
            prescription medication. Others — particularly custom pellets and
            compounded creams — are prepared by licensed compounding pharmacies
            under state regulation and tailored to a specific dosing protocol.
            Both have a place in modern{" "}
            <Link
              href="/hrt-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              hormone replacement therapy in Miami
            </Link>{" "}
            depending on the patient and the goal.
          </p>
        </section>

        <section aria-labelledby="modalities" className="flex flex-col gap-4 cv-auto">
          <h2
            id="modalities"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Bioidentical hormone modalities we offer in Miami
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Bioidentical hormone pellets
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Compounded testosterone or estradiol pellets the size of a
                grain of rice, inserted under the skin in a brief in-office
                procedure. Releases a steady dose for 3–5 months.
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Compounded creams &amp; gels
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Daily-applied transdermal preparations for estradiol,
                progesterone, and testosterone — compounded to your dose. Good
                fit for fine-grained titration and for patients who prefer no
                injections.
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Bioidentical testosterone injections
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Testosterone cypionate is a bioidentical injection form,
                administered intramuscularly or subcutaneously — typically
                weekly or twice weekly — and integrates with broader{" "}
                <Link
                  href="/trt-clinic-miami/"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  TRT protocols
                </Link>
                .
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Oral micronized progesterone
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Oral micronized progesterone is an FDA-approved bioidentical
                preparation, used in women on estrogen therapy to support
                endometrial protection and for some perimenopause symptom
                profiles.
              </p>
            </article>
          </div>
        </section>

        <section aria-labelledby="process" className="flex flex-col gap-4 cv-auto">
          <h2
            id="process"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            How bioidentical hormone therapy works at our Miami clinic
          </h2>
          <ol className="grid max-w-3xl gap-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                1
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Initial in-clinic consultation
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Medical history, symptom review, and physical exam with a
                  Florida-licensed physician at our Miami clinic.
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
                  Hormones, thyroid, metabolic, lipid, and screening labs to
                  establish a baseline and rule out contraindications.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                3
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Customized bioidentical protocol
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Your physician chooses hormone, form (pellet, cream, oral, or
                  injection), and dose based on biomarkers, symptoms, and risk
                  profile. Compounded items are filled by a licensed pharmacy.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                4
              </span>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Re-check labs at 6 and 12 weeks
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Titrate dose to response. Pellet re-implantation is scheduled
                  by symptom return and follow-up labs, not a fixed calendar.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section aria-labelledby="safety" className="flex flex-col gap-4 cv-auto">
          <h2
            id="safety"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Safety, evidence, and compliance
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Bioidentical hormone therapy carries the same risk classes as any
            hormone therapy — including cardiovascular, thromboembolic, and
            hormone-sensitive cancer risks — modified by hormone, dose, route,
            and personal history. Our clinic does not advertise compounded
            bioidentical products as safer or more effective than FDA-approved
            preparations; the evidence base does not support that claim.
          </p>
          <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Compounded preparations are dispensed through licensed compounding
            pharmacies under state regulation. Every protocol begins with a
            physician evaluation, baseline labs, and a documented benefit-risk
            review.
          </p>
        </section>

        <section aria-labelledby="physician" className="flex flex-col gap-3 cv-auto">
          <h2
            id="physician"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Your Miami bioidentical hormone physician
          </h2>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {drAngelRivera.name}
            </span>{" "}
            — {drAngelRivera.jobTitle} at Strong Health Miami.{" "}
            {drAngelRivera.description}
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
            Schedule your bioidentical hormone consultation in Miami
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-300 dark:text-zinc-700">
            Same-week appointments available. Talk to a Florida-licensed
            physician about whether bioidentical hormone replacement therapy is
            the right fit for your symptoms and goals.
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
              Visit our clinic
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
