import type { Metadata } from "next";
import Link from "next/link";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { primaryReviewer } from "@/lib/providers/registry";
import { reviewedPagesByReviewer } from "@/lib/providers/reviewed-pages";
import { buildMedicalWebPage, buildBreadcrumbList, buildPhysician } from "@/lib/schema";
// primaryReviewer.url used for MedicalWebPage reviewedBy reference
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";

const PAGE_PATH = "/medical-reviewer/" as const;

export const metadata: Metadata = {
  title: { absolute: `Medical Review Standards | ${business.legalName}` },
  description:
    "How we review medical content at Strong Health Miami: named physician reviewer, 180-day refresh, primary-source citations.",
  alternates: { canonical: PAGE_PATH },
};

const breadcrumbs: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Medical Reviewer", path: PAGE_PATH },
];

const reviewedList = reviewedPagesByReviewer(primaryReviewer.slug);

const schemaNodes = [
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed: "2026-05-15",
    specialty: "Endocrine",
    reviewerPhysicianUrl: primaryReviewer.url,
  }),
  buildPhysician(),
  buildBreadcrumbList(breadcrumbs, PAGE_PATH),
];

export default function MedicalReviewerPage() {
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
            Medical Review &amp; Editorial Standards
          </h1>
        </header>

        {/* Reviewer card */}
        <section aria-labelledby="reviewer-heading">
          <h2
            id="reviewer-heading"
            className="mb-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Who reviews our medical content
          </h2>
          <article className="flex gap-5 rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-xl font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {primaryReviewer.familyName.charAt(0)}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {primaryReviewer.name}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{primaryReviewer.jobTitle}</p>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {primaryReviewer.description}
              </p>
              <Link
                href={`/providers/${primaryReviewer.slug}/`}
                className="mt-1 self-start text-sm font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
              >
                Read full bio →
              </Link>
            </div>
          </article>
        </section>

        {/* Review process */}
        <section aria-labelledby="process-heading" className="flex flex-col gap-4">
          <h2
            id="process-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Our review process
          </h2>
          <ul className="flex flex-col gap-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {[
              `Every page that describes a medical condition, treatment, dosage, side effect, or clinical outcome is reviewed by ${primaryReviewer.name} before publication.`,
              'Each page carries a "Medically reviewed by … on YYYY-MM-DD" line at the top.',
              "Pages are re-reviewed every 180 days or sooner if guidelines change.",
              "Citations are tied to primary sources (peer-reviewed journals, FDA labeling, NIH, Endocrine Society, AUA, Mayo Clinic).",
              "We do not publish patient testimonials that imply specific clinical outcomes without consent and citation.",
              `If you find a factual error, email ${business.schemaName} via our contact page; corrections are logged with a date.`,
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 shrink-0 text-zinc-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pages reviewed */}
        <section aria-labelledby="reviewed-heading" className="flex flex-col gap-4">
          <h2
            id="reviewed-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Pages reviewed by {primaryReviewer.name}
          </h2>
          <ul className="flex flex-col gap-2 text-sm">
            {reviewedList.map((page) => (
              <li key={page.path} className="flex flex-wrap items-baseline gap-2">
                <Link
                  href={page.path}
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  {page.title}
                </Link>
                <span className="text-zinc-400 dark:text-zinc-500">
                  — last reviewed{" "}
                  <time dateTime={page.lastReviewed}>{page.lastReviewed}</time>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Editorial independence */}
        <section aria-labelledby="independence-heading" className="flex flex-col gap-4">
          <h2
            id="independence-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Editorial independence
          </h2>
          <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {business.legalName} does not accept payment from pharmaceutical companies to
            influence clinical content. Treatment decisions are made by the prescribing physician
            based on labs, symptoms, and patient goals — not by marketing.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/providers/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Meet our providers
          </Link>
          <Link
            href="/about/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            About our clinic
          </Link>
        </div>
      </div>
    </>
  );
}
