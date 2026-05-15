import type { Metadata } from "next";
import Link from "next/link";
import { DarkFaqAccordion } from "@/components/home/dark-faq-accordion";
import { DarkMapPanel } from "@/components/home/dark-map-panel";
import { FloatingCallChip } from "@/components/home/floating-call-chip";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import {
  TRT_FAQ_DISCLAIMER,
  TRT_FAQ_LAST_REVIEWED,
  schemaEligible,
  trtClinicMiamiFaqs,
} from "@/lib/faq-content";
import { homepageReviews } from "@/lib/homepage-content";
import { alternatesFor } from "@/lib/hreflangMap";
import { drAngelRivera } from "@/lib/physician";
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
    "TRT therapy in Miami at Strong Health — physician-supervised testosterone replacement, full bloodwork, transparent self-pay, same-week consultations.",
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
  buildFaqPage(schemaEligible(trtClinicMiamiFaqs), "/"),
  buildBreadcrumbList([{ name: "Home", path: "/" }], "/"),
];

const symptoms = [
  "Persistent fatigue that sleep doesn't fix",
  "Loss of libido or weaker erections",
  "Hard-to-lose belly fat despite training",
  "Mood swings, irritability, low motivation",
  "Brain fog and reduced focus",
  "Less muscle, weaker recovery from workouts",
  "Disrupted sleep or night sweats",
  "Drop in confidence and drive at work",
] as const;

const differentiators = [
  {
    title: "Physician-led, not script-mill",
    body:
      "Every plan is reviewed by a Florida-licensed MD. We diagnose with a two-test AUA protocol, not a self-report quiz.",
  },
  {
    title: "Full bloodwork, every quarter",
    body:
      "Total + free testosterone, SHBG, estradiol, CBC, CMP, PSA, lipids. We treat against numbers, not vibes.",
  },
  {
    title: "Transparent self-pay pricing",
    body:
      "Flat quarterly pricing bundles labs, medication, and physician visits. Itemized superbill on request for HSA/FSA.",
  },
  {
    title: "Same-week consultations",
    body:
      "Booking to first in-person visit in days, not weeks. Telehealth follow-ups for established Florida patients.",
  },
] as const;

const valueProps = [
  {
    title: "Privacy",
    bullets: [
      "Discreet in-person clinic — no group waiting area, no pharmacy lines.",
      "Records stay inside our clinic; no marketing data sharing.",
      "Self-pay billing keeps therapy out of your insurance file.",
    ],
  },
  {
    title: "Evidence",
    bullets: [
      "AUA two-test diagnostic protocol before any prescription.",
      "PSA, hematocrit, and estradiol monitored at every recheck.",
      "We won't prescribe for performance or anti-aging — only documented hypogonadism.",
    ],
  },
  {
    title: "Time efficiency",
    bullets: [
      "One in-person visit to start, telehealth recheck thereafter.",
      "Labs drawn on-site or at any LabCorp/Quest in Miami-Dade.",
      "Pellet patients: one in-office procedure every 3–5 months.",
    ],
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Free consultation",
    body:
      "30-minute call or in-person visit. Symptoms, history, goals. No commitment.",
  },
  {
    n: "02",
    title: "Comprehensive lab panel",
    body:
      "Two early-morning total testosterone tests plus full hormone, metabolic, and cardiovascular markers.",
  },
  {
    n: "03",
    title: "Personalized protocol",
    body:
      "Physician designs injection, pellet, or gel-based plan calibrated to your biomarkers and lifestyle.",
  },
  {
    n: "04",
    title: "Quarterly re-check",
    body:
      "Bloodwork + clinical review every 90 days for year one, biannually after that. Adjust dose, never guess.",
  },
] as const;

const neighborhoods = [
  { name: "Brickell", path: "/locations/brickell-trt/" },
  { name: "Coral Gables", path: "/locations/coral-gables-trt/" },
  { name: "Coconut Grove", path: "/locations/coconut-grove-trt/" },
  { name: "Aventura", path: "/locations/aventura-trt/" },
  { name: "Doral", path: "/locations/doral-trt/" },
  { name: "Pinecrest", path: "/locations/pinecrest-trt/" },
  { name: "Kendall", path: "/locations/kendall-trt/" },
  { name: "Key Biscayne", path: "/locations/key-biscayne-trt/" },
  { name: "Hialeah", path: "/locations/hialeah-trt/" },
] as const;

const nearbyCities = [
  {
    name: "Fort Lauderdale",
    path: "/locations/fort-lauderdale-trt/",
    note: "Broward County · 35 min north on I-95",
  },
  {
    name: "Hialeah",
    path: "/locations/hialeah-trt/",
    note: "Bilingual EN/ES intake · 15 min via 826",
  },
  {
    name: "Aventura",
    path: "/locations/aventura-trt/",
    note: "North Miami-Dade · 25 min on Biscayne Blvd",
  },
  {
    name: "Doral",
    path: "/locations/doral-trt/",
    note: "West Miami-Dade · 20 min via Palmetto",
  },
] as const;

const serviceAreaSentence = `${business.areaServed.slice(0, -1).join(", ")}, and ${
  business.areaServed[business.areaServed.length - 1]
}`;

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <SchemaGraph nodes={schemaNodes} />
      <FloatingCallChip />

      {/* HERO ------------------------------------------------------------ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[520px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(251,191,36,0.12),transparent_70%)]"
        />
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            <span className="inline-block h-px w-8 bg-amber-300/70" />
            Testosterone Replacement Therapy · Miami-Dade, FL
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl sm:leading-[1.05]">
            Testosterone Replacement Therapy (TRT)
            <br className="hidden sm:block" /> in{" "}
            <span className="text-amber-400">Miami</span> —
            Physician-Supervised, Evidence-Based.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Florida-licensed physicians. Full bloodwork. Transparent self-pay
            pricing. Same-week consultations across Brickell, Coral Gables,
            Doral, Aventura and the wider Miami-Dade.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={business.phone.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-amber-400 px-7 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
            >
              Call {business.phone.display}
            </a>
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-7 text-sm font-semibold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-800"
            >
              Book a free consultation
            </Link>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-wider text-slate-400">
            {[
              "In-person Miami clinic",
              "Florida-licensed MD",
              "Comprehensive labs",
              "Same-week consults",
              "Self-pay · superbill on request",
            ].map((pill) => (
              <li key={pill} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-amber-400">
                  ✓
                </span>
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SYMPTOMS -------------------------------------------------------- */}
      <section className="border-t border-slate-900">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Low testosterone
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              These symptoms aren&apos;t just aging.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              The AUA defines low testosterone as a total morning level below
              300 ng/dL <span className="text-slate-500">plus</span> consistent
              symptoms. If three or more of these sound like you, it&apos;s
              worth checking your bloodwork.
            </p>
          </header>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {symptoms.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 border-b border-slate-900 py-3 text-slate-200"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-400/40 text-[0.7rem] font-bold text-amber-400"
                >
                  ✓
                </span>
                <span className="text-base leading-7">{s}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={business.phone.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-semibold text-slate-950 hover:bg-amber-300"
            >
              Get bloodwork
            </a>
            <Link
              href="/is-trt-safe/"
              className="text-sm font-medium text-slate-300 underline-offset-4 hover:text-amber-300 hover:underline"
            >
              Is TRT safe? Read the brief →
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT ----------------------------------------- */}
      <section className="border-t border-slate-900 cv-auto">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              The Strong Health difference
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              What makes us different.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              We don&apos;t do remote-only telehealth prescriptions or
              one-size-fits-all stacks. Strong Health is a physical Miami
              clinic with a medical model.
            </p>
          </header>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d, i) => (
              <article
                key={d.title}
                className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-slate-800" />
                </div>
                <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MAP + SERVICE AREA ---------------------------------------------- */}
      <section
        aria-labelledby="map-heading"
        className="border-t border-slate-900 cv-auto"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Service area
            </p>
            <h2
              id="map-heading"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Visit us in <span className="text-amber-400">Miami</span> —
              serving Miami-Dade and Broward.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              One physical clinic. Patients drive in from across the wider
              Miami metro — {serviceAreaSentence}. Telehealth follow-ups for
              established Florida patients.
            </p>
          </header>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <DarkMapPanel />
            <div className="flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
              <header>
                <h3 className="text-xl font-semibold text-white">
                  {business.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Visit us or call to book a free consultation.
                </p>
              </header>
              <dl className="grid gap-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Address
                  </dt>
                  <dd className="mt-2 text-slate-300">
                    <address className="not-italic leading-6">
                      <span className="block">
                        {business.address.displayLine1}
                      </span>
                      {business.address.displayLine2 ? (
                        <span className="block">
                          {business.address.displayLine2}
                        </span>
                      ) : null}
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Phone
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={business.phone.href}
                      className="font-semibold text-slate-100 underline-offset-4 hover:text-amber-300 hover:underline"
                    >
                      {business.phone.display}
                    </a>
                  </dd>
                  <dt className="mt-4 text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Hours
                  </dt>
                  <dd className="mt-2 text-slate-300">
                    <ul className="leading-6">
                      <li>Mon–Fri · 8:00a – 6:00p</li>
                      <li>Sat · 9:00a – 1:00p</li>
                      <li>Sun · Closed</li>
                    </ul>
                  </dd>
                </div>
              </dl>
              <a
                href={business.phone.href}
                className="inline-flex h-11 items-center justify-center self-start rounded-full bg-amber-400 px-6 text-sm font-semibold text-slate-950 hover:bg-amber-300"
              >
                Call {business.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS PLACEHOLDER --------------------------------------------- */}
      <section
        aria-labelledby="reviews-heading"
        className="border-t border-slate-900 cv-auto"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Patient reviews
            </p>
            <h2
              id="reviews-heading"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Visit us to leave the next review.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              We ship the page with no reviews rather than ship fake ones.
              Verified reviews from Strong Health Miami patients land here as
              they&apos;re collected through our moderated submission flow.
            </p>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-6"
              >
                <div className="flex items-center gap-1 text-amber-400/30">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg
                      key={idx}
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  Verified patient review coming soon.
                </p>
                <p className="text-xs uppercase tracking-wider text-slate-600">
                  Strong Health Miami patient
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR MEN WHO VALUE ----------------------------------------- */}
      <section className="border-t border-slate-900 cv-auto">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Who we&apos;re for
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Built for men who value{" "}
              <span className="text-amber-400">privacy, evidence, and time.</span>
            </h2>
            <p className="text-base leading-7 text-slate-400">
              You&apos;re not buying a script — you&apos;re buying a medical
              relationship. Most patients are 30–55, professionally
              accountable, and want their hormones managed the way they&apos;d
              manage their cholesterol or blood pressure.
            </p>
          </header>
          <div className="grid gap-8 lg:grid-cols-3">
            {valueProps.map((vp) => (
              <article
                key={vp.title}
                className="flex flex-col gap-4 border-t border-amber-400/50 pt-6"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {vp.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {vp.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-sm leading-6 text-slate-300"
                    >
                      <span aria-hidden="true" className="mt-1 text-amber-400">
                        →
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / STEPS ------------------------------------------------- */}
      <section className="border-t border-slate-900 cv-auto">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Your steps
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Fixed treatment. No moving target.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              Four steps from first call to a calibrated protocol. No surprise
              upsells, no anti-aging stacks bolted on.
            </p>
          </header>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="relative flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <span className="font-mono text-3xl font-semibold text-amber-400">
                  {s.n}
                </span>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{s.body}</p>
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-7 hidden text-slate-700 lg:block"
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DOCTORS --------------------------------------------------------- */}
      <section className="border-t border-slate-900 cv-auto">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Named doctors
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Real physicians. Real credentials.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              Every protocol is reviewed and signed by a Florida-licensed MD.
              No nurse-practitioner-only model, no AI-prescriber.
            </p>
          </header>
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7">
              <div
                aria-hidden="true"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-slate-950 text-2xl font-semibold text-amber-400"
              >
                {drAngelRivera.familyName.charAt(0)}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {drAngelRivera.name}
                </h3>
                <p className="text-sm font-medium text-amber-400">
                  {drAngelRivera.jobTitle}
                </p>
                <p className="text-sm leading-6 text-slate-400">
                  Oversees every patient evaluation, lab review, and treatment
                  plan at Strong Health Miami. Florida Board of Medicine
                  licensed. Member: AUA, Endocrine Society.
                </p>
                <p className="text-xs italic text-slate-500">
                  Full credentials and headshot publish once the clinic move
                  closes (gated on internal QA).
                </p>
              </div>
            </article>
            <article className="flex flex-col justify-center gap-3 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Care team
              </p>
              <p className="text-sm leading-6 text-slate-400">
                We&apos;re adding a second physician and a Florida-licensed
                phlebotomist this summer. Care-team profiles publish as they
                onboard — no stock photos, no placeholder bios.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* RESULTS PLACEHOLDER --------------------------------------------- */}
      <section className="border-t border-slate-900 cv-auto">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Real results
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Outcomes you can verify on your own labs.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              Most patients see early changes — energy, mood, libido — within
              3–4 weeks. Body composition and erectile function build over
              3–6 months. Published patient outcome data lands here after our
              first cohort completes 12 months of follow-up.
            </p>
          </header>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                label: "Energy & mood",
                window: "Weeks 3–4",
                body: "Early subjective changes typically reported by patients on a steady protocol.",
              },
              {
                label: "Body composition",
                window: "Months 3–6",
                body: "Lean-mass and visceral-fat shifts in monitored hypogonadal patients.",
              },
              {
                label: "Erectile function",
                window: "Months 3–6",
                body: "AUA-published response window for testosterone-driven improvements.",
              },
            ].map((r) => (
              <article
                key={r.label}
                className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {r.window}
                </p>
                <h3 className="text-lg font-semibold text-white">{r.label}</h3>
                <p className="text-sm leading-6 text-slate-400">{r.body}</p>
              </article>
            ))}
          </div>
          <p className="text-xs italic text-slate-500">
            Strong Health Miami does not publish patient before/after metrics
            until cohort-level outcome data is medically reviewed and
            consented for use. Educational windows above are AUA-sourced, not
            site-specific.
          </p>
        </div>
      </section>

      {/* NEIGHBORHOODS --------------------------------------------------- */}
      <section className="border-t border-slate-900 cv-auto">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Neighborhoods served
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Serving the wider Miami area.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              One physical clinic, patients across Miami-Dade. Drive-time,
              parking, and language-support notes live on each neighborhood
              page.
            </p>
          </header>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {neighborhoods.map((n) => (
              <li key={n.path}>
                <Link
                  href={n.path}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 transition-colors hover:border-amber-400/40 hover:bg-slate-900"
                >
                  <span className="text-base font-medium text-slate-100">
                    TRT in {n.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-amber-400 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/locations/"
            className="self-start text-sm font-medium text-amber-300 underline-offset-4 hover:text-amber-200 hover:underline"
          >
            See all Miami-area locations →
          </Link>
        </div>
      </section>

      {/* NEARBY CITIES --------------------------------------------------- */}
      <section className="border-t border-slate-900 cv-auto">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Nearby cities
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              TRT therapy in nearby cities.
            </h2>
            <p className="text-base leading-7 text-slate-400">
              Outside the Miami metro? We see patients from across South
              Florida. Use the closest landing page for drive-time and
              language-support details.
            </p>
          </header>
          <ul className="grid gap-3 sm:grid-cols-2">
            {nearbyCities.map((c) => (
              <li key={c.path}>
                <Link
                  href={c.path}
                  className="flex flex-col gap-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-amber-400/40 hover:bg-slate-900"
                >
                  <span className="text-base font-semibold text-slate-100">
                    TRT in {c.name}
                  </span>
                  <span className="text-sm text-slate-400">{c.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ ------------------------------------------------------------- */}
      <section
        aria-labelledby="faq-heading"
        className="border-t border-slate-900 cv-auto"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-20 sm:py-24">
          <header className="flex flex-col gap-3 sm:max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Frequently asked
            </p>
            <h2
              id="faq-heading"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Common questions about TRT in Miami.
            </h2>
            <p className="text-sm text-slate-500">
              Medically reviewed. Last reviewed{" "}
              <time dateTime={TRT_FAQ_LAST_REVIEWED}>
                {TRT_FAQ_LAST_REVIEWED}
              </time>
              .
            </p>
          </header>
          <DarkFaqAccordion items={trtClinicMiamiFaqs} />
          <p className="text-xs italic text-slate-500">{TRT_FAQ_DISCLAIMER}</p>
        </div>
      </section>

      {/* FINAL CTA ------------------------------------------------------- */}
      <section
        aria-labelledby="final-cta"
        className="border-t border-slate-900 cv-auto"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"
            />
            <div className="relative flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                Ready to start
              </p>
              <h2
                id="final-cta"
                className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Ready to talk to a TRT physician in Miami?
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-300">
                Same-week appointments available. We&apos;ll order the labs,
                read your results with you, and tell you honestly whether TRT
                is the right answer — or whether it isn&apos;t.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={business.phone.href}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-amber-400 px-7 text-sm font-semibold text-slate-950 hover:bg-amber-300"
                >
                  Call {business.phone.display}
                </a>
                <Link
                  href="/contact/"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/40 px-7 text-sm font-semibold text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                >
                  Book a free consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
