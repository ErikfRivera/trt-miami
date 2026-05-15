import type { Metadata } from "next";
import Link from "next/link";
import { NapBlock } from "@/components/nap-block";
import { LocationMap } from "@/components/location-map";
import { SchemaGraph } from "@/components/schema-graph";
import { TrustStrip } from "@/components/trust-strip";
import { business } from "@/lib/business";
import { drAngelRivera } from "@/lib/physician";
import { alternatesFor } from "@/lib/hreflangMap";
import { homepageFaqs, homepageReviews } from "@/lib/homepage-content";
import {
  aggregateRatingFromReviews,
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalBusiness,
  buildPhysician,
  buildReview,
  reviewId,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "TRT Therapy Miami | Strong Health Miami, FL",
  },
  description:
    "TRT therapy in Miami at Strong Health: physician-supervised testosterone replacement, full bloodwork, same-week consultations. Call to schedule today.",
  alternates: alternatesFor("/"),
};

const reviewNodes = homepageReviews.map((review) => buildReview(review));
const aggregate = aggregateRatingFromReviews(homepageReviews);

const schemaNodes = [
  buildMedicalBusiness({
    physicianUrls: [drAngelRivera.url],
    reviewIds: homepageReviews.map((r) => reviewId(r.slug)),
    aggregateRating: aggregate,
  }),
  buildPhysician(),
  ...reviewNodes,
  buildFaqPage(homepageFaqs, "/"),
  buildBreadcrumbList([{ name: "Home", path: "/" }], "/"),
];

export default function Home() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:py-24">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Testosterone Replacement Therapy · Miami, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            TRT Therapy in Miami at Strong Health
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {business.name} is a men&apos;s health clinic in Miami. Physician-led
            care, full bloodwork, transparent self-pay pricing. Explore{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              TRT Clinic Miami
            </Link>
            ,{" "}
            <Link
              href="/hrt-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              HRT Miami
            </Link>
            ,{" "}
            <Link
              href="/bioidentical-hormones-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              Bioidentical Hormones Miami
            </Link>
            , and{" "}
            <Link
              href="/peptide-therapy/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              Peptide Therapy Miami
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
              Book a free consultation
            </Link>
          </div>
        </header>

        <TrustStrip />

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start cv-auto">
          <NapBlock />
          <LocationMap />
        </div>

        <section aria-labelledby="faq-heading" className="flex flex-col gap-6 cv-auto">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Frequently asked questions
          </h2>
          <dl className="flex flex-col gap-6">
            {homepageFaqs.map((item) => (
              <div key={item.question} className="flex flex-col gap-2">
                <dt className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {item.question}
                </dt>
                <dd className="text-zinc-600 dark:text-zinc-400">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
