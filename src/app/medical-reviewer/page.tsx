import type { Metadata } from "next";
import Link from "next/link";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { activeReviewer, hasVerifiedMedicalDirector } from "@/lib/medical-director";
import { primaryReviewer } from "@/lib/providers/registry";
import { reviewedPagesByReviewer } from "@/lib/providers/reviewed-pages";
import { buildMedicalWebPage, buildBreadcrumbList } from "@/lib/schema";
import { physicianId } from "@/lib/schema/ids";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/medical-reviewer/" as const;

// STR-128 §3 — `/medical-reviewer/` is itself a reviewed page about the
// reviewer. Pin both `lastReviewed` and `dateModified` to one ISO date so
// the schema reports a coherent review-and-update cadence.
const PAGE_REVIEW_DATE = "2026-05-15" as const;

// STR-137 — this route identifies the medical reviewer. Until a real
// medical director is published, noindex,nofollow keeps it out of Google's
// index alongside `/providers/` and the provider bio routes.
export const metadata: Metadata = {
  ...pageMetadata({
    path: PAGE_PATH,
    title: `Medical Review Standards | ${business.legalName}`,
    description:
      "How we review medical content at Strong Health Miami: named physician reviewer, 180-day refresh, primary-source citations.",
  }),
  robots: hasVerifiedMedicalDirector ? undefined : { index: false, follow: false },
};

const breadcrumbs: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Medical Reviewer", path: PAGE_PATH },
];

const reviewedList = reviewedPagesByReviewer(primaryReviewer.slug);

// STR-128 §4 — single source of truth for the physician entity lives on
// `/providers/{slug}/`. Here we reference that node by `@id` only via
// MedicalWebPage's `reviewedBy` / `mainEntity` slots; do not re-emit the
// full Person JSON-LD or Google will treat the editorial-standards page as
// two different physicians.
//
// STR-137 — when no verified medical director is published, the
// MedicalWebPage builder suppresses both `reviewedBy` and `mainEntity`
// references so the dangling @id never reaches the graph.
const schemaNodes = [
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed: PAGE_REVIEW_DATE,
    dateModified: PAGE_REVIEW_DATE,
    specialty: "Endocrine",
    reviewerPhysicianUrl: primaryReviewer.url,
    mainEntityId: physicianId(primaryReviewer.url),
  }),
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

        {/* Reviewer card — STR-137 renders the generic clinical-team surface
            when no verified medical director has been published yet. */}
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
              {hasVerifiedMedicalDirector ? activeReviewer.familyName.charAt(0) : "SH"}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {activeReviewer.name}
              </p>
              {activeReviewer.jobTitle ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{activeReviewer.jobTitle}</p>
              ) : null}
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {activeReviewer.description}
              </p>
              {hasVerifiedMedicalDirector ? (
                <Link
                  href={activeReviewer.href}
                  className="mt-1 self-start text-sm font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  Read full bio →
                </Link>
              ) : null}
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
              `Every page that describes a medical condition, treatment, dosage, side effect, or clinical outcome is reviewed by ${activeReviewer.name} before publication.`,
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
            Pages reviewed by {activeReviewer.name}
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
