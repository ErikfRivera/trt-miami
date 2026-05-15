import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildGraph } from "@/lib/schema/graph";
import { buildPageCitationSchema } from "@/lib/schema/citation";
import type { CitationItem, CitationReviewer } from "@/lib/citations/types";
import type { SitePath } from "@/lib/site";

type CitationBlockProps = {
  citations: readonly CitationItem[];
  reviewer: CitationReviewer;
  lastReviewed: string;
  pagePath: SitePath;
};

function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDate(isoDate: string): string {
  return new Date(isoDate + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function CitationBlock({ citations, reviewer, lastReviewed, pagePath }: CitationBlockProps) {
  const nextReview = addDays(lastReviewed, 180);
  const citationSchema = buildPageCitationSchema(pagePath, citations);

  return (
    <>
      <JsonLd data={buildGraph(citationSchema)} />
      <section
        id="references"
        aria-label="Citations and sources"
        className="border-t border-zinc-200 pt-8 dark:border-zinc-800"
      >
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sources reviewed for this page
        </h2>
        <ol className="citation-list mb-6 flex flex-col gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {citations.map((citation, index) => (
            <li key={citation.url} id={`cite-${index + 1}`} className="flex gap-2">
              <span className="shrink-0 font-medium text-zinc-500 dark:text-zinc-400">
                {index + 1}.
              </span>
              <span>
                <a
                  href={citation.url}
                  rel="noopener"
                  target="_blank"
                  className="font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
                >
                  {citation.title}
                </a>
                {". "}
                <cite className="not-italic text-zinc-600 dark:text-zinc-400">
                  {citation.publisher}
                </cite>
                {citation.year ? `. ${citation.year}` : ""}
                {citation.pmid ? (
                  <span className="ml-1 text-zinc-400 dark:text-zinc-500">
                    [PMID:{" "}
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`}
                      rel="noopener"
                      target="_blank"
                      className="underline underline-offset-2"
                    >
                      {citation.pmid}
                    </a>
                    ]
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Last medical review:{" "}
          <time dateTime={lastReviewed}>{formatDate(lastReviewed)}</time> by{" "}
          <Link
            href={`/providers/${reviewer.slug}/`}
            rel="author"
            className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
          >
            {reviewer.name}, {reviewer.credentials}
          </Link>
          {". "}
          Next scheduled review:{" "}
          <time dateTime={nextReview}>{formatDate(nextReview)}</time>.
        </p>
      </section>
    </>
  );
}
