import type { Metadata } from "next";
import Link from "next/link";
import { LocationMap } from "@/components/location-map";
import { NapBlock } from "@/components/nap-block";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { drAngelRivera } from "@/lib/physician";
import { alternatesFor } from "@/lib/hreflangMap";
import { absoluteUrl } from "@/lib/site";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalProcedure,
  buildService,
} from "@/lib/schema";
import type { FaqItem } from "@/lib/schema/types";

const PAGE_PATH = "/peptide-therapy/" as const;
const canonicalUrl = absoluteUrl(PAGE_PATH);

const title = "Peptide Therapy in Miami | Physician-Prescribed | Strong Health";
const description =
  "Physician-supervised peptide therapy in Miami — GLP-1s for weight loss, recovery support, and hormone peptides. Free consultation. Same-week appointments.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: alternatesFor(PAGE_PATH),
  openGraph: {
    type: "website",
    // Geo-neutral brand label (STR-119). Miami signal lives in the page title
    // and og:title below — not in the sitewide brand chrome.
    siteName: business.name,
    url: canonicalUrl,
    title: "Peptide Therapy in Miami | Strong Health",
    description:
      "Physician-prescribed peptide therapy in Miami. GLP-1s, recovery peptides, hormone support. Free consultation.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Therapy in Miami | Strong Health",
    description:
      "Physician-prescribed peptide therapy in Miami. GLP-1s, recovery, hormone peptides.",
  },
};

const faqs: readonly FaqItem[] = [
  {
    question: "What is peptide therapy?",
    answer:
      "Peptide therapy uses short chains of amino acids that act as biological signals to support specific cellular functions — including metabolism, tissue repair, and hormone production. At our Miami clinic, peptide therapy is physician-prescribed after a medical evaluation and customized to your goals and labs.",
  },
  {
    question: "How much does peptide therapy cost in Miami?",
    answer:
      "Transparent pricing is reviewed with you during your free consultation, based on the peptide, dosing, and length of treatment. Most patients pay out-of-pocket; HSA and FSA cards may be eligible.",
  },
  {
    question: "Is peptide therapy safe?",
    answer:
      "When prescribed and monitored by a licensed physician, peptide therapy is generally well tolerated. Side effects vary by peptide and are reviewed with you during consultation. Treatments are dispensed by licensed compounding pharmacies. Self-sourced or unmonitored peptide use carries meaningful risks and is not what we offer.",
  },
  {
    question: "Is peptide therapy FDA-approved?",
    answer:
      "Some peptides we may prescribe — including semaglutide and tirzepatide — are FDA-approved for specific indications. Other peptides discussed during consultation are compounded preparations and are not FDA-approved for general use. Your physician will explain the regulatory status, evidence base, and alternatives for any therapy considered.",
  },
  {
    question: "How is peptide therapy administered?",
    answer:
      "Most peptides are administered via small subcutaneous self-injections at home, typically once daily or several times per week. Our team trains you during your first visit. Some therapies are available as nasal sprays or oral preparations depending on the peptide and clinical fit.",
  },
  {
    question: "Who is peptide therapy for?",
    answer:
      "Adults seeking medically supervised support for weight management, recovery, hormonal balance, or age-related wellness goals. We evaluate medical history, current medications, and lab work before any prescription. Peptide therapy is not appropriate for everyone — your physician will confirm fit during consultation.",
  },
  {
    question: "Does insurance cover peptide therapy?",
    answer:
      "Most peptide therapies are not covered by insurance and are paid out-of-pocket. GLP-1 medications like semaglutide may be covered under specific diagnoses. We'll review your situation and provide a clear cost estimate during your free consultation.",
  },
  {
    question: "How soon will I see results?",
    answer:
      "Results vary by peptide, protocol, and individual response. Patients on GLP-1 weight-loss protocols often see meaningful changes within 8–12 weeks; hormone peptides typically show effects over 2–3 months. We measure progress at 30, 60, and 90 days. Outcomes are not guaranteed and your physician will set realistic expectations during consultation.",
  },
];

const breadcrumbItems = [
  { name: "Home", path: "/" as const },
  { name: "Peptide Therapy", path: PAGE_PATH },
];

const schemaNodes = [
  buildMedicalProcedure({
    pagePath: PAGE_PATH,
    name: "Peptide Therapy",
    alternateNames: ["Peptide Injections", "Peptide Treatment"],
    howPerformed:
      "Physician-prescribed peptides administered via subcutaneous injection following clinical evaluation, lab review, and a customized protocol.",
    indications: [
      "Body composition and weight management",
      "Recovery support",
      "Hormone optimization",
    ],
  }),
  buildService({
    pagePath: PAGE_PATH,
    serviceType: "Peptide Therapy",
    areaServed: business.areaServed,
    // TODO: STR-2 — wire booking URL once /book/ ships; placeholder uses /contact.
    offers: { bookingUrl: `${business.url}/contact` },
  }),
  buildFaqPage(faqs, PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
];

export default function PeptideTherapyPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16 sm:py-24">
      <SchemaGraph nodes={schemaNodes} />

      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Peptide Therapy · Miami, FL
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Peptide Therapy in Miami
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Physician-supervised peptide therapy at {business.name} — GLP-1
          therapies for weight loss, recovery support, and hormone peptides.
          Reviewed by {drAngelRivera.name}, {drAngelRivera.jobTitle}.
        </p>
        <ul
          aria-label="Clinic highlights"
          className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400"
        >
          <li>Medically supervised in Miami, FL</li>
          <li>Free 15-minute consultation</li>
          <li>Same-week appointments</li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-2">
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

      <section aria-labelledby="what-is" className="flex flex-col gap-4">
        <h2
          id="what-is"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          What is peptide therapy?
        </h2>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          Peptide therapy uses short chains of amino acids that act as
          biological signals, prescribed by a physician to support specific
          functions such as metabolism, tissue repair, and hormone production.
          At Strong Health Miami, every protocol begins with a medical
          evaluation, lab work, and a customized plan from our medical director.
        </p>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          Peptides are administered after clinical review and dispensed through
          licensed pharmacies — typically via small subcutaneous self-injections
          you perform at home, with training provided at your first visit.
        </p>
      </section>

      <section aria-labelledby="therapies" className="flex flex-col gap-6">
        <h2
          id="therapies"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          Peptide therapies we offer in Miami
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Weight loss &amp; metabolic support (GLP-1s)
            </h3>
            <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              Semaglutide and tirzepatide are GLP-1 receptor medications that
              support appetite regulation and glucose response. Both are
              FDA-approved for specific indications and prescribed under
              physician supervision when clinically appropriate.
            </p>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                Who it&apos;s for:
              </span>{" "}
              adults seeking medically supervised weight management.
            </p>
          </article>

          <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Hormone &amp; vitality support
            </h3>
            <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              Growth hormone secretagogues such as sermorelin and
              ipamorelin/CJC-1295 stimulate the body&apos;s own growth-hormone
              release. Often considered alongside hormone-balance evaluation in
              adults with age-related decline.
            </p>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Often paired with{" "}
              <Link
                href="/trt-clinic-miami/"
                className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
              >
                testosterone replacement therapy in Miami
              </Link>{" "}
              for men with documented low T.
            </p>
          </article>

        </div>
      </section>

      <section aria-labelledby="benefits" className="flex flex-col gap-4">
        <h2
          id="benefits"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          Benefits of peptide therapy
        </h2>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          When prescribed appropriately and monitored over time, peptide
          therapy may help support:
        </p>
        <ul className="grid max-w-3xl gap-2 text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
          <li className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
            Body composition and fat-loss support
          </li>
          <li className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
            Recovery and sleep quality
          </li>
          <li className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
            Skin, hair, and connective tissue
          </li>
          <li className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
            Energy and cognitive clarity
          </li>
          <li className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800 sm:col-span-2">
            Hormonal balance and metabolic health
          </li>
        </ul>
        <p className="max-w-3xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          Results vary by individual and protocol. Outcomes are not guaranteed,
          and your physician will set realistic expectations during consultation.
        </p>
      </section>

      <section aria-labelledby="what-to-expect" className="flex flex-col gap-4">
        <h2
          id="what-to-expect"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          What to expect at our Miami clinic
        </h2>
        <ol className="grid max-w-3xl gap-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
          <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
              1
            </span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Free 15-minute consultation
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                In-person at our Miami clinic or by telehealth statewide in
                Florida.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
              2
            </span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Lab work and medical history review
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Baseline labs and a medical history review to confirm fit and
                safety.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
              3
            </span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Customized protocol from your physician
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Designed and reviewed by {drAngelRivera.name}.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
              4
            </span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Prescription via licensed pharmacy
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Dispensed through a licensed compounding pharmacy partner.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
              5
            </span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Follow-up at 30, 60, and 90 days
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Progress, labs, and adjustments — peptide therapy is a managed
                program, not a one-time injection.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="pricing" className="flex flex-col gap-4">
        <h2
          id="pricing"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          Pricing &amp; insurance
        </h2>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          Transparent pricing reviewed during your free consultation.
        </p>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          Most peptide therapies are paid out-of-pocket; HSA and FSA cards may
          be eligible. Some GLP-1 medications may be covered under specific
          diagnoses — we&apos;ll confirm during your consultation.
        </p>
      </section>

      <section aria-labelledby="safety" className="flex flex-col gap-4">
        <h2
          id="safety"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          Safety, credentials &amp; compliance
        </h2>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Medically reviewed by {drAngelRivera.name}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {drAngelRivera.jobTitle}, Strong Health Miami
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {drAngelRivera.description}
          </p>
        </div>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          Therapies are prescribed only after medical evaluation. Some peptides
          discussed during consultation may not be FDA-approved for all
          indications; your physician will review the evidence, alternatives,
          and risks before any prescription. Treatments are dispensed by
          licensed compounding pharmacies — we do not endorse self-sourced or
          unmonitored peptide use.
        </p>
      </section>

      <section aria-labelledby="location" className="flex flex-col gap-6">
        <h2
          id="location"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          Our Miami location &amp; service area
        </h2>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          Strong Health Miami serves patients across the Miami metro, including{" "}
          {business.areaServed.slice(0, -1).join(", ")}, and{" "}
          {business.areaServed[business.areaServed.length - 1]}. Telehealth
          follow-ups are offered statewide in Florida.
        </p>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <NapBlock />
          <LocationMap />
        </div>
      </section>

      <section aria-labelledby="faq" className="flex flex-col gap-4">
        <h2
          id="faq"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-zinc-200 bg-white p-5 open:shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-zinc-900 marker:hidden dark:text-zinc-50">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-zinc-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="cta"
        className="flex flex-col gap-4 rounded-3xl bg-zinc-900 p-8 text-white sm:p-12 dark:bg-zinc-50 dark:text-zinc-900"
      >
        <h2
          id="cta"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Book your free peptide therapy consultation
        </h2>
        <p className="max-w-2xl text-base leading-7 text-zinc-300 dark:text-zinc-700">
          Same-week appointments available in Miami. Talk to {drAngelRivera.name}
          {" "}and the Strong Health team about whether peptide therapy is the right
          fit for your goals.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={business.phone.href}
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700"
          >
            Call {business.phone.display}
          </a>
          <Link
            href="/contact/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10 dark:border-zinc-900/20 dark:text-zinc-900 dark:hover:bg-zinc-900/10"
          >
            Visit our clinic
          </Link>
        </div>
      </section>
    </div>
  );
}
