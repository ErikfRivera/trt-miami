import Link from "next/link";
import type { ReactNode } from "react";
import { FaqAccordion } from "@/components/faq-accordion";
import { Markdown } from "@/components/markdown";
import { NapBlock } from "@/components/nap-block";
import { activeReviewer } from "@/lib/medical-director";
import type { YmylDoc } from "@/lib/ymyl/doc";
import type { FaqEntry } from "@/lib/faq-content";

export type YmylDocPageProps = {
  doc: YmylDoc;
  /** ISO date (YYYY-MM-DD) of last medical review. Used for the byline. */
  lastReviewed: string;
  /** Eyebrow label shown above H1. Short, locale-aware. */
  eyebrow: string;
  /** Display name for the breadcrumb's final crumb. */
  breadcrumbLabel: string;
  /** CitationBlock rendered by the consuming page so the citation guardrail
   *  sees `<CitationBlock />` in the page source. */
  children: ReactNode;
};

// Until STR-50 / STR-131 lands a verified medical director, the byline uses
// the generic clinical-team attribution from `activeReviewer`. The
// `{{TOKEN}}` placeholders in the source markdown are stripped at load time
// (see `loadYmylDoc`) so they cannot leak into rendered HTML.
function YmylByline({ lastReviewed }: { lastReviewed: string }) {
  const authorLabel = activeReviewer.isNamedPhysician
    ? `${activeReviewer.name}${activeReviewer.honorificSuffix ? `, ${activeReviewer.honorificSuffix}` : ""}`
    : activeReviewer.name;
  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      By{" "}
      <Link href={activeReviewer.href} rel="author" className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300">
        {authorLabel}
      </Link>
      {". Medically reviewed by "}
      <Link href={activeReviewer.href} className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300">
        {authorLabel}
      </Link>
      {" on "}
      <time dateTime={lastReviewed}>{lastReviewed}</time>
      {"."}
    </p>
  );
}

function faqsAsEntries(slug: string, faqs: YmylDoc["faqs"]): FaqEntry[] {
  return faqs.map((faq, i) => ({
    id: `${slug}-faq-${i + 1}`,
    inSchema: true,
    question: faq.question,
    answer: faq.answer,
  }));
}

export function YmylDocPage({
  doc,
  lastReviewed,
  eyebrow,
  breadcrumbLabel,
  children,
}: YmylDocPageProps) {
  const h1 = doc.frontmatter.h1 ?? breadcrumbLabel;
  const faqEntries = faqsAsEntries(doc.slug, doc.faqs);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li className="flex items-center gap-x-2">
            <Link href="/" className="underline-offset-2 hover:underline">
              Home
            </Link>
            <span aria-hidden="true">/</span>
          </li>
          <li className="flex items-center gap-x-2">
            <span aria-current="page" className="text-zinc-700 dark:text-zinc-300">
              {breadcrumbLabel}
            </span>
          </li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {h1}
        </h1>
        <YmylByline lastReviewed={lastReviewed} />
      </header>

      <article>
        <Markdown source={doc.body} />
      </article>

      {faqEntries.length > 0 ? (
        <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
          <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Frequently asked questions
          </h2>
          <FaqAccordion items={faqEntries} />
        </section>
      ) : null}

      <NapBlock />

      {children}
    </div>
  );
}
