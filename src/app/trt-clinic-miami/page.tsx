import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import {
  TRT_FAQ_DISCLAIMER,
  TRT_FAQ_LAST_REVIEWED,
  schemaEligible,
  trtClinicMiamiFaqs,
} from "@/lib/faq-content";
import { alternatesFor } from "@/lib/hreflangMap";
import { drAngelRivera } from "@/lib/physician";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalProcedure,
  buildMedicalWebPage,
  buildService,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";

const PAGE_PATH = "/trt-clinic-miami/" as const;

const canonicalUrl = `${business.url}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: {
    absolute: "TRT Clinic Miami | Strong Health Miami, FL",
  },
  description:
    "Doctor-led TRT clinic in Miami. Florida-licensed physician supervision, comprehensive bloodwork, transparent self-pay pricing. Same-week consults available.",
  alternates: alternatesFor(PAGE_PATH),
  openGraph: {
    type: "website",
    siteName: "Strong Health TRT Therapy Miami",
    url: canonicalUrl,
    title: "TRT Clinic in Miami | Strong Health Miami",
    description:
      "Physician-led testosterone replacement therapy clinic in Miami — Florida-licensed MD oversight, full bloodwork, transparent pricing.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRT Clinic in Miami | Strong Health Miami",
    description: "Physician-led TRT clinic in Miami with full bloodwork and transparent pricing.",
  },
};

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
  }),
  buildFaqPage(schemaEligible(trtClinicMiamiFaqs), PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
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
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Request a consultation
            </Link>
          </div>
        </header>

        <section
          aria-labelledby="visit-heading"
          className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8 lg:grid-cols-3"
        >
          <div>
            <h2
              id="visit-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Visit our Miami clinic
            </h2>
            <address className="mt-3 not-italic leading-6 text-zinc-600 dark:text-zinc-400">
              <span className="block">{business.address.displayLine1}</span>
              {business.address.displayLine2 ? (
                <span className="block">{business.address.displayLine2}</span>
              ) : null}
            </address>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Phone</h3>
            <p className="mt-1">
              <a
                href={business.phone.href}
                className="text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
              >
                {business.phone.display}
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Hours</h3>
            <ul className="mt-1 text-zinc-600 dark:text-zinc-400">
              <li>Mon–Fri: 8:00 a.m. – 6:00 p.m.</li>
              <li>Sat: 9:00 a.m. – 1:00 p.m.</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
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
              {drAngelRivera.name}
            </span>{" "}
            — {drAngelRivera.jobTitle} at Strong Health Miami.{" "}
            {drAngelRivera.description}
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
              href="/contact/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {drAngelRivera.name}
            </Link>
            , {drAngelRivera.jobTitle}. Last reviewed{" "}
            <time dateTime={TRT_FAQ_LAST_REVIEWED}>{TRT_FAQ_LAST_REVIEWED}</time>.
          </p>
          <FaqAccordion items={trtClinicMiamiFaqs} />
          <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
            {TRT_FAQ_DISCLAIMER}
          </p>
        </section>
      </div>
    </>
  );
}
