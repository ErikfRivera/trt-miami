import type { Metadata } from "next";
import Link from "next/link";
import { CitationBlock } from "@/components/citation-block";
import { FaqAccordion } from "@/components/faq-accordion";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import {
  TRT_FAQ_DISCLAIMER,
  TRT_FAQ_LAST_REVIEWED,
  schemaEligible,
  trtCostFaqs,
} from "@/lib/faq-content";
import { drAngelRivera } from "@/lib/physician";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalWebPage,
  buildPageCitationSchema,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/trt-cost/" as const;
const { citations: trtCostCitations, lastReviewed: trtCostLastReviewed } = pageCitations(PAGE_PATH);

export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: "TRT Cost in Miami: 2026 Pricing Guide",
  description:
    "How much does TRT cost in Miami, with and without insurance. Detailed page content in progress.",
});

const breadcrumbItems: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "TRT Cost in Miami", path: PAGE_PATH },
];

const schemaNodes = [
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed: TRT_FAQ_LAST_REVIEWED,
    specialty: "Endocrine",
  }),
  buildFaqPage(schemaEligible(trtCostFaqs), PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
  buildPageCitationSchema(PAGE_PATH, trtCostCitations),
];

export default function TrtCostPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:py-24">
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
            TRT Cost · Miami, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            TRT Cost in Miami
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            How much does TRT cost in Miami, with and without insurance. Detailed
            page content in progress.
          </p>
        </header>

        <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            TRT cost in Miami — frequently asked questions
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
          <FaqAccordion items={trtCostFaqs} defaultOpenFirst />
          <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
            {TRT_FAQ_DISCLAIMER}
          </p>
        </section>

        <section
          aria-labelledby="cta-heading"
          className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
        >
          <h2
            id="cta-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Talk to a physician about TRT
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Detailed information for this page is on its way. In the meantime,
            call to ask questions or book a consultation, or visit our contact
            page for clinic hours and directions.
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
              Visit our clinic
            </Link>
          </div>
        </section>

        <section aria-labelledby="related-heading" className="flex flex-col gap-3">
          <h2
            id="related-heading"
            className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Related pages
          </h2>
          <ul className="flex flex-col gap-1 text-zinc-700 dark:text-zinc-300">
            <li>
              <Link
                href="/trt-clinic-miami/"
                className="underline-offset-2 hover:underline"
              >
                TRT clinic in Miami
              </Link>
            </li>
            <li>
              <Link
                href="/does-insurance-cover-trt/"
                className="underline-offset-2 hover:underline"
              >
                Does insurance cover TRT?
              </Link>
            </li>
          </ul>
        </section>

        <CitationBlock
          citations={trtCostCitations}
          reviewer={{
            slug: primaryReviewer.slug,
            name: primaryReviewer.name,
            credentials: primaryReviewer.honorificSuffix,
          }}
          lastReviewed={trtCostLastReviewed}
          pagePath={PAGE_PATH}
        />
      </div>
    </>
  );
}
