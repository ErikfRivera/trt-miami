import type { Metadata } from "next";
import Link from "next/link";
import { NapBlock } from "@/components/nap-block";
import { LocationMap } from "@/components/location-map";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { primaryReviewer, providers } from "@/lib/providers/registry";
import {
  buildAboutPage,
  buildMedicalBusiness,
  buildPhysician,
  buildBreadcrumbList,
} from "@/lib/schema";
import { drAngelRivera } from "@/lib/physician";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/about/" as const;

export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: `About ${business.legalName} | Miami Hormone Health Clinic`,
  description: `${business.legalName} is a Miami hormone clinic specializing in TRT and HRT. Bilingual care, Florida-licensed physician, lab-based protocols.`,
});

const breadcrumbs: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: PAGE_PATH },
];

const schemaNodes = [
  buildAboutPage({
    pagePath: PAGE_PATH,
    name: `About ${business.legalName} | Miami Hormone Health Clinic`,
    description:
      "Strong Health Miami is a hormone-health clinic in Miami, Florida. We help men with low testosterone and women with hormone changes optimize their endocrine health under the care of a licensed physician.",
    founderPhysicianUrl: primaryReviewer.url,
  }),
  buildMedicalBusiness({
    physicianUrls: providers.map((p) => p.url),
  }),
  buildPhysician(),
  buildBreadcrumbList(breadcrumbs, PAGE_PATH),
];

export default function AboutPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 dark:text-zinc-400">
          <ol className="flex flex-wrap items-center gap-x-2">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
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
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            About {business.legalName}
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {business.legalName} is a hormone-health clinic in Miami, Florida. We help men with
            low testosterone and women with hormone changes optimize their endocrine health under
            the care of a licensed physician.
          </p>
        </header>

        <section aria-labelledby="why-heading" className="flex flex-col gap-4">
          <h2
            id="why-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Why we exist
          </h2>
          <div className="flex flex-col gap-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              Miami-Dade is home to one of the largest male populations aged 30–60 in the
              southeastern United States, yet access to evidence-based hormone care here has
              historically meant long waits at academic medical centers or reliance on
              telemedicine-only models that skip the in-person evaluation. Strong Health was
              founded to close that gap: a physical Miami clinic, a licensed physician on-site,
              and protocols that start with labs — not with a self-report quiz.
            </p>
            <p>
              Miami&apos;s climate also matters. High heat and humidity affect androgen binding
              and sweat-based absorption differently than northern markets. Our protocols account
              for this, and our bilingual care (English and Spanish) reflects the city&apos;s
              patient population — not a national one-size-fits-all program.
            </p>
          </div>
        </section>

        <section aria-labelledby="how-heading" className="flex flex-col gap-4">
          <h2
            id="how-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            How we practice
          </h2>
          <ul className="flex flex-col gap-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {[
              "Florida-licensed physician on-site — no telemedicine-only prescribing.",
              "Labs drawn on-site or at LabCorp/Quest; results reviewed within 72 hours.",
              "Bilingual care: English and Spanish.",
              "Same-week new-patient appointment slots available in most weeks.",
              "We do not pre-bill for treatments before consult and labs are complete.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 shrink-0 text-zinc-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="providers-heading" className="flex flex-col gap-4">
          <h2
            id="providers-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Our medical providers
          </h2>
          <div className="flex gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-lg font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {drAngelRivera.familyName.charAt(0)}
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">{drAngelRivera.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{drAngelRivera.jobTitle}</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {drAngelRivera.description}
              </p>
            </div>
          </div>
          <Link
            href="/providers/"
            className="self-start text-sm font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
          >
            See all providers →
          </Link>
        </section>

        <section aria-labelledby="visit-heading" className="flex flex-col gap-6">
          <h2
            id="visit-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Visit us
          </h2>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <NapBlock />
            <LocationMap />
          </div>
        </section>

        <section aria-labelledby="licensure-heading" className="flex flex-col gap-4">
          <h2
            id="licensure-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Licensure &amp; accreditation
          </h2>
          <ul className="flex flex-col gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-zinc-400">→</span>
              <span>
                Florida Agency for Health Care Administration (AHCA) registration:{" "}
                <span className="font-medium text-zinc-400 dark:text-zinc-500 italic">
                  {process.env.AHCA_NUMBER ?? "Pending — STR-50"}
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-zinc-400">→</span>
              <span>
                DEA registration:{" "}
                <span className="font-medium text-zinc-400 dark:text-zinc-500 italic">
                  {process.env.DEA_NUMBER ?? "Pending — STR-50"}
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-zinc-400">→</span>
              <span>
                Florida Board of Medicine licensed physician — verified through the Florida
                Department of Health MQA portal.
              </span>
            </li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/providers/"
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Meet our providers
          </Link>
          <Link
            href="/contact/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Contact us
          </Link>
          <Link
            href="/medical-reviewer/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Editorial standards
          </Link>
        </div>
      </div>
    </>
  );
}
