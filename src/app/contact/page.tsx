import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { LocationMap } from "@/components/location-map";
import { NapBlock } from "@/components/nap-block";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { buildBreadcrumbList, buildMedicalBusiness } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/contact/" as const;
const PAGE_TITLE = "Contact Strong Health Miami | TRT Therapy Consultations";
const PAGE_DESCRIPTION = `Contact ${business.name} in Miami, FL. Call ${business.phone.display} or request a callback about TRT therapy.`;

const schemaNodes = [
  buildMedicalBusiness({}),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Contact", path: PAGE_PATH }], PAGE_PATH),
];

// STR-13: switched from raw `metadata` to pageMetadata() helper so og:url /
// og:title / twitter:title resolve to /contact/ instead of falling through to
// layout defaults (which had og:url pointing at the homepage). Same regression
// pattern STR-135 fixed elsewhere — this route was missed.
export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  socialTitle: "Contact Strong Health Miami — TRT Therapy",
});

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:py-24">
      <SchemaGraph nodes={schemaNodes} />
      <header className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Contact
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Talk to {business.name}
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Call us, or leave a few details and we&apos;ll contact you to discuss
          next steps for{" "}
          <Link
            href="/trt-clinic-miami/"
            className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
          >
            TRT Therapy in Miami
          </Link>
          .
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <section
          aria-labelledby="lead-form-heading"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h2
            id="lead-form-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Request a callback
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            We&apos;ll reach out within one business day. Please don&apos;t share
            medical history through this form — we&apos;ll cover that on the
            call.
          </p>
          <div className="mt-6">
            <LeadForm />
          </div>
        </section>

        <aside className="flex flex-col gap-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Or call directly
            </h2>
            <a
              href={business.phone.href}
              data-phone-surface="contact_sidebar"
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Call {business.phone.display}
            </a>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Mon–Fri 8a–6p · Sat 9a–1p
            </p>
          </div>
          <NapBlock />
          <LocationMap />
        </aside>
      </div>
    </div>
  );
}
