import type { Metadata } from "next";
import Link from "next/link";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { alternatesFor } from "@/lib/hreflangMap";
import { activeReviewer } from "@/lib/medical-director";
import { absoluteUrl } from "@/lib/site";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalWebPage,
  buildService,
  buildServiceAreaService,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";

// STR-67 — Fort Lauderdale area page per STR-52 brief.
// All clinic placeholders (NAP, phone, address, reviewer, slug) resolve from
// `lib/business` and `lib/medical-director`. STR-50 placeholder values flip in
// atomically when STR-151 swaps `business.ts` — no per-page edits needed.
const PAGE_PATH = "/locations/fort-lauderdale-trt/" as const;
const ES_PAGE_PATH = "/es/locations/fort-lauderdale-trt/" as const;

// Per §7 of the brief: machine-readable last-review date for MedicalWebPage
// and visible Updated stamp.
const LAST_REVIEWED = "2026-05-17" as const;

const PAGE_TITLE = "TRT in Fort Lauderdale, FL | Strong Health" as const;
const PAGE_DESCRIPTION =
  "Board-reviewed testosterone replacement therapy for Fort Lauderdale and Broward. Transparent pricing, Spanish service, free consult. Call (786) 420-3187.";

const canonicalUrl = absoluteUrl(PAGE_PATH);

const breadcrumbItems: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Locations", path: "/locations/" },
  { name: "Fort Lauderdale", path: PAGE_PATH },
];

const browardAreaServed = [
  "Fort Lauderdale",
  "Plantation",
  "Pompano Beach",
  "Coral Springs",
  "Sunrise",
  "Davie",
  "Oakland Park",
  "Hollywood, FL",
  "Wilton Manors",
] as const;

const faqs: { question: string; answer: string }[] = [
  {
    question: "Where is the nearest TRT clinic to Fort Lauderdale?",
    answer:
      "Strong Health serves all of Broward from our clinic at 2999 NE 191st St, Suite 800, Aventura, FL 33180 — a 25–35 minute drive south on I-95 from central Fort Lauderdale. We also offer telehealth follow-ups for Plantation, Pompano Beach, Coral Springs, Sunrise, and Davie patients after their first in-person visit.",
  },
  {
    question: "How much does TRT cost in Fort Lauderdale?",
    answer:
      "Most patients pay between $150–$250 per month for testosterone replacement therapy at Strong Health, including routine labs and provider visits. Pellets and add-on peptides are priced separately. See our TRT cost guide for the full breakdown of what drives pricing.",
  },
  {
    question: "Does insurance cover TRT in Florida?",
    answer:
      "Some Florida insurance plans cover TRT when low testosterone is diagnosed by labs and documented as medically necessary. Many patients choose cash-pay for faster scheduling and a single all-in price. We verify coverage during your free consultation.",
  },
  {
    question: "What are the symptoms of low testosterone?",
    answer:
      "Common symptoms include low energy, reduced libido, erectile difficulty, weight gain, brain fog, irritability, and loss of muscle mass. The Mayo Clinic notes these symptoms also have other causes — only a morning blood test can confirm a low testosterone diagnosis.",
  },
  {
    question: "What lab tests are required to start TRT?",
    answer:
      "We require a morning total testosterone test, plus free testosterone, estradiol, PSA, hematocrit, and a metabolic panel. The American Urological Association recommends two morning total-testosterone readings below 300 ng/dL before starting therapy.",
  },
  {
    question: "TRT injections vs pellets vs cream — which is right for me?",
    answer:
      "Injections are the most cost-effective and easiest to titrate. Pellets are placed every 3–6 months and require no weekly routine. Creams are convenient but carry a documented transfer risk to family members. Your provider matches the method to your labs, lifestyle, and goals.",
  },
  {
    question: "How long until I feel results from TRT?",
    answer:
      "Most men notice improved energy and mood within 3–6 weeks and stronger libido and muscle changes within 3–6 months. Sustained benefits depend on consistent dosing and follow-up labs every quarter.",
  },
  {
    question: "Is TRT safe long-term?",
    answer:
      "Current evidence from the American Urological Association and Endocrine Society guidelines supports TRT safety in monitored, properly diagnosed men. Risks include elevated red blood cell count, acne, and possible fertility suppression — all monitored quarterly at Strong Health.",
  },
  {
    question: "Do you offer Spanish-speaking TRT providers in Fort Lauderdale?",
    answer:
      "Sí. Strong Health offers consultations and follow-ups in English and Spanish. Mention your language preference when you call and we will pair you with a Spanish-speaking team member from intake through follow-up.",
  },
  {
    question: "How do I book a TRT consultation in Fort Lauderdale?",
    answer:
      "Call (786) 420-3187 or book online. New-patient consultations are free and typically scheduled within 5 business days. Bring any prior testosterone labs from the last 12 months if you have them.",
  },
];

// Per brief §6: 5 JSON-LD blocks. Until a verified FL satellite address exists,
// we ship `serviceArea` on the parent org (not a fabricated branch LocalBusiness)
// per STR-51 §2.4 — combined with a `Service` node scoped to this page and the
// areas served. MedicalWebPage carries the reviewer signal and lastReviewed.
const schemaNodes = [
  buildServiceAreaService({
    pagePath: PAGE_PATH,
    serviceType: "Testosterone Replacement Therapy",
    areaName: "Fort Lauderdale, FL",
  }),
  buildService({
    pagePath: PAGE_PATH,
    serviceType: "Testosterone Replacement Therapy",
    areaServed: browardAreaServed,
    audience: { suggestedGender: "male", suggestedMinAge: 30 },
    offers: { bookingUrl: `${business.url}/contact/` },
  }),
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed: LAST_REVIEWED,
    specialty: "Endocrine",
  }),
  buildFaqPage(faqs, PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: alternatesFor(PAGE_PATH),
  openGraph: {
    type: "website",
    siteName: business.name,
    url: canonicalUrl,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function FortLauderdaleTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16 sm:py-24">
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

        {/* HERO ---------------------------------------------------------- */}
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Testosterone Replacement Therapy · Fort Lauderdale, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            TRT in Fort Lauderdale | Strong Health TRT Therapy
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Board-reviewed testosterone replacement therapy for men across Fort
            Lauderdale and Broward County. Transparent pricing. Same-week
            consults. English and Español.{" "}
            <Link
              href={ES_PAGE_PATH}
              hrefLang="es"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              en español →
            </Link>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={business.phone.href}
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full bg-zinc-900 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Call {business.phone.display}
            </a>
            <Link
              href="/contact/"
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full border border-zinc-300 px-7 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Book a free consultation
            </Link>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Medically reviewed by{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {activeReviewer.name}
            </Link>
            {activeReviewer.isNamedPhysician ? ", MD" : ""} · Updated{" "}
            <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED}</time>
          </p>
        </header>

        {/* H2.1 — Why Fort Lauderdale men choose Strong Health ----------- */}
        <section aria-labelledby="why-us" className="flex flex-col gap-4">
          <h2
            id="why-us"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Why Fort Lauderdale men choose Strong Health
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            If you&apos;re a man in Fort Lauderdale running on low energy, lower
            libido, and a fog you can&apos;t shake, you don&apos;t need another
            supplement aisle. You need a real clinical workup and, if your labs
            confirm it, a properly dosed testosterone protocol from a team that
            does this every day.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Strong Health is a Miami-based TRT clinic that treats Fort
            Lauderdale and Broward County patients — both at our flagship
            clinic and through telehealth follow-ups for Plantation, Pompano
            Beach, Coral Springs, Sunrise, and Davie. Every patient is seen by
            a licensed provider, every protocol is written from your bloodwork
            (not a quiz), and every plan is monitored quarterly per AUA
            guidelines.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            We answer phones in English and Spanish, publish our pricing, and
            our clinical content is reviewed by{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              {activeReviewer.name}
            </Link>
            {activeReviewer.isNamedPhysician ? ", MD" : ""}.
          </p>
        </section>

        {/* H2.2 — How TRT works (and what we treat) --------------------- */}
        <section aria-labelledby="how-it-works" className="flex flex-col gap-4">
          <h2
            id="how-it-works"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            How TRT works (and what we treat)
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Testosterone replacement therapy treats a confirmed deficiency of
            testosterone — the hormone that drives energy, libido, mood, lean
            muscle, fat distribution, and bone density in men. Per the
            Endocrine Society&apos;s clinical practice guideline, treatment is
            appropriate for men with consistent symptoms <em>and</em> two
            morning total-testosterone readings below the laboratory reference
            range.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            If you recognize this pattern, TRT may be worth a conversation:
          </p>
          <ul className="grid gap-2 text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
            <li>Persistent low energy or daytime fatigue despite adequate sleep</li>
            <li>Reduced sex drive or erectile changes</li>
            <li>Loss of muscle and increase in central body fat</li>
            <li>Brain fog, irritability, or depressed mood</li>
            <li>Slower recovery from training or injury</li>
            <li>Disrupted sleep, night sweats</li>
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            These symptoms can have other causes (the Mayo Clinic lists thyroid
            issues, sleep apnea, depression, and medication side effects among
            them), which is exactly why we start with labs — not a
            prescription. Read more about{" "}
            <Link
              href="/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              TRT therapy in Miami
            </Link>{" "}
            and the{" "}
            <Link
              href="/is-trt-safe/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              full safety profile
            </Link>{" "}
            before booking.
          </p>
        </section>

        {/* H2.3 — TRT options we offer ---------------------------------- */}
        <section aria-labelledby="options" className="flex flex-col gap-4">
          <h2
            id="options"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            TRT options we offer
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            There is no single &ldquo;best&rdquo; delivery method. There is the
            method that fits your labs, your schedule, and your goals.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Injections
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Intramuscular or subcutaneous — most cost-effective, easy to
                titrate, weekly cadence. The standard of care for the majority
                of TRT patients.{" "}
                <Link
                  href="/trt-injections/"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  TRT injections protocol →
                </Link>
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Pellets
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Placed every 3–6 months in a 10-minute office procedure. No
                weekly routine. Higher up-front cost, no daily commitment.{" "}
                <Link
                  href="/trt-pellets/"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  TRT pellet protocol →
                </Link>
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Creams &amp; gels
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Daily topical application. Convenient but carries a documented
                transfer risk to spouses, partners, and children.
              </p>
            </article>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300">
            Your provider walks you through the trade-offs at your consult. We
            don&apos;t upsell — we match.
          </p>
        </section>

        {/* H2.4 — Areas we serve in Broward ----------------------------- */}
        <section aria-labelledby="areas-served" className="flex flex-col gap-4">
          <h2
            id="areas-served"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Areas we serve in Broward
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Strong Health treats men across Broward County. We see Fort
            Lauderdale patients in person at our clinic in Aventura — a 25–35
            minute drive south on I-95 — and offer telehealth follow-ups (after
            the initial in-person consult and labs) for surrounding communities
            including:
          </p>
          <ul className="grid gap-2 text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
            {browardAreaServed.map((area) => (
              <li key={area} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1 text-zinc-400">
                  •
                </span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            Travel from Plantation or Sunrise is typically 20–30 minutes; from
            Pompano or Coral Springs, 25–40 minutes depending on I-95 traffic.
            Quarterly lab draws can be scheduled at any LabCorp or Quest
            location near you — your provider sends the order.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Patients coming down from Broward typically pair this with our{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              TRT therapy in Miami-Dade
            </Link>
            {" "}guide for the protocols and lab cadence used at the Aventura
            clinic.
          </p>
        </section>

        {/* H2.5 — What TRT costs in Fort Lauderdale --------------------- */}
        <section aria-labelledby="costs" className="flex flex-col gap-4">
          <h2
            id="costs"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            What TRT costs in Fort Lauderdale
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Most Strong Health TRT patients in Broward pay{" "}
            <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
              $150–$250 per month
            </strong>
            , all-inclusive of provider visits, prescriptions, and routine
            follow-up labs. Pellets, peptides, and add-ons are priced
            separately and quoted up front. No surprise bills.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">A few cost realities specific to Florida:</p>
          <ul className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Insurance:
              </strong>{" "}
              Some Florida plans cover TRT when low testosterone is documented
              per the AUA threshold (two morning total-T readings below 300
              ng/dL). Many patients still choose cash-pay for faster scheduling
              and a single all-in price.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Initial labs
              </strong>{" "}
              are typically $80–$150 if cash-pay; covered if billed through
              your insurance with appropriate diagnosis.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Hidden fees we don&apos;t charge:
              </strong>{" "}
              no membership fee, no enrollment fee, no &ldquo;concierge&rdquo;
              upsell to access your provider.
            </li>
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            For a full national pricing breakdown and what drives the
            variation, see{" "}
            <Link
              href="/trt-cost/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              what TRT costs
            </Link>
            .
          </p>
        </section>

        {/* H2.6 — Is TRT safe? ----------------------------------------- */}
        <section aria-labelledby="safety" className="flex flex-col gap-4">
          <h2
            id="safety"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Is TRT safe? Risks and monitoring
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            When TRT is prescribed for a confirmed deficiency and monitored
            properly, current evidence from the AUA and the Endocrine Society
            supports its long-term safety profile in adult men. The risks
            worth knowing:
          </p>
          <ul className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Erythrocytosis
              </strong>{" "}
              (elevated red blood cell count) — monitored quarterly via
              hematocrit. Easily managed.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Estradiol elevation
              </strong>{" "}
              — monitored; managed through dose adjustment or, rarely, an
              aromatase inhibitor.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Fertility suppression
              </strong>{" "}
              — TRT typically reduces sperm production. If you may want
              children during therapy, we discuss adjuncts (hCG) at consult.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Prostate considerations
              </strong>{" "}
              — current AUA guidance does not contraindicate TRT in men
              without active prostate cancer. We monitor PSA per protocol.
            </li>
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            You can read the full{" "}
            <Link
              href="/trt-side-effects/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              TRT side effects
            </Link>{" "}
            breakdown and our{" "}
            <Link
              href="/is-trt-safe/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              is TRT safe
            </Link>{" "}
            guide.
          </p>
        </section>

        {/* H2.7 — What patients say (gated until verified Google Reviews) - */}
        <section
          aria-labelledby="reviews"
          className="flex flex-col gap-4 rounded-2xl border border-dashed border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950"
        >
          <h2
            id="reviews"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            What patients say
          </h2>
          {/* Per STR-52 brief §8 H2.7 + STR-50 §5d: ship empty rather than
              fabricated. Verified Google Review excerpts from Broward-area
              patients replace this block before launch. */}
          <p className="text-zinc-700 dark:text-zinc-300">
            Verified Google Review excerpts from Broward-area patients will
            appear here as they are collected. We ship this section empty
            rather than ship fabricated testimonials — if a name appears on
            this page, the quote came from that patient.
          </p>
        </section>

        {/* H2.8 — FAQ -------------------------------------------------- */}
        <section aria-labelledby="faq" className="flex flex-col gap-6">
          <h2
            id="faq"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Frequently asked questions
          </h2>
          <dl className="flex flex-col gap-6">
            {faqs.map((f) => (
              <div key={f.question} className="flex flex-col gap-2">
                <dt className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {f.question}
                </dt>
                <dd className="text-zinc-700 dark:text-zinc-300">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* H2.9 — Book your Fort Lauderdale TRT consultation ------------ */}
        <section
          aria-labelledby="book"
          className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
        >
          <h2
            id="book"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Book your Fort Lauderdale TRT consultation
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            New-patient consultations are <strong>free</strong> and typically
            scheduled within 5 business days. Bring any prior testosterone
            labs (within the last 12 months) if you have them.
          </p>
          <dl className="grid gap-3 text-zinc-700 sm:grid-cols-2 dark:text-zinc-300">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Phone
              </dt>
              <dd>
                <a
                  href={business.phone.href}
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  {business.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Online
              </dt>
              <dd>
                <Link
                  href="/contact/"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  Book your free consult →
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Address (Fort Lauderdale-area)
              </dt>
              <dd className="not-italic">{business.address.displayLine1}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Hours
              </dt>
              <dd>
                Mon–Fri 8:00 AM – 6:00 PM · Sat by appointment
              </dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={business.phone.href}
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full bg-zinc-900 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Call {business.phone.display}
            </a>
            <Link
              href="/contact/"
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full border border-zinc-300 px-7 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Book online
            </Link>
          </div>
        </section>

        {/* Reviewer footer + last updated ------------------------------ */}
        <footer className="flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <p>
            Medically reviewed by{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {activeReviewer.name}
            </Link>
            {activeReviewer.isNamedPhysician ? ", MD" : ""}. Last reviewed{" "}
            <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED}</time>.
          </p>
          <p className="text-xs italic">
            Clinical claims on this page cite Mayo Clinic, the American
            Urological Association, the Endocrine Society, and the U.S. FDA.
            This page is informational and is not a substitute for in-person
            medical evaluation.
          </p>
        </footer>
      </div>
    </>
  );
}
