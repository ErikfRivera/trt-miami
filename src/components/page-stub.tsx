import Link from "next/link";
import { BreadcrumbSchema, type BreadcrumbItem } from "@/components/breadcrumb-schema";
import { business } from "@/lib/business";
import type { SitePath } from "@/lib/site";

export type PageStubProps = {
  eyebrow: string;
  heading: string;
  intro: string;
  breadcrumbs: readonly BreadcrumbItem[];
  /** Optional related links shown above the contact CTA. */
  relatedLinks?: readonly { label: string; href: SitePath }[];
};

// Stubs render real H1/breadcrumbs/CTA so they are indexable from day one
// (STR-91 unblocked GSC indexing for the TRT Miami program). Marketing/content
// progressively fills the body — stubs are NOT noindex'd by default anymore.
// Reserve noindex for explicit drafts (e.g. /es/ pages awaiting translation).
export function PageStub({ eyebrow, heading, intro, breadcrumbs, relatedLinks }: PageStubProps) {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:py-24">
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
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {heading}
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">{intro}</p>
        </header>

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

        {relatedLinks && relatedLinks.length > 0 ? (
          <section aria-labelledby="related-heading" className="flex flex-col gap-3">
            <h2
              id="related-heading"
              className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Related pages
            </h2>
            <ul className="flex flex-col gap-1 text-zinc-700 dark:text-zinc-300">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
