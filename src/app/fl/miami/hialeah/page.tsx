import type { Metadata } from "next";
import Link from "next/link";
import { NapBlock } from "@/components/nap-block";
import { LocationMap } from "@/components/location-map";
import { business } from "@/lib/business";
import { absoluteUrl } from "@/lib/site";

const pagePath = "/fl/miami/hialeah" as const;
const moneyPagePath = "/fl/miami/trt-therapy" as const;
const physicianPagePath = "/about/dr-angel-rivera" as const;
const flHubPath = "/fl" as const;

export const metadata: Metadata = {
  title: {
    absolute: "TRT Therapy for Hialeah Patients — Strong Health Miami",
  },
  description:
    "Hialeah men can see Strong Health for testosterone replacement therapy at our Brickell clinic — short drive from Westland Mall, bilingual care, easy parking.",
  alternates: { canonical: pagePath },
  openGraph: {
    type: "website",
    url: absoluteUrl(pagePath),
    title: "TRT Therapy for Hialeah Patients — Strong Health Miami",
    description:
      "Testosterone replacement therapy for Hialeah, served from our Brickell clinic. Bilingual (English/Spanish) intake, easy drive from the 826/Palmetto.",
  },
  twitter: {
    card: "summary",
    title: "TRT Therapy for Hialeah Patients — Strong Health Miami",
    description:
      "Testosterone replacement therapy for Hialeah, served from our Brickell clinic. Bilingual (English/Spanish) intake, easy drive from the 826/Palmetto.",
  },
};

const faqs: { question: string; answer: string }[] = [
  {
    question: "Where is the clinic for Hialeah TRT patients?",
    answer:
      "We see Hialeah patients at our Brickell location at 697 N Miami Avenue, Miami, FL 33136. There is no separate Hialeah office — Brickell is the closest Strong Health clinic and is where Hialeah residents come for testosterone replacement therapy. If we open a dedicated Hialeah location, this page will be updated and the new address listed here.",
  },
  {
    question: "Do you have Spanish-speaking staff for Hialeah patients?",
    answer:
      "Yes. Hialeah is a predominantly Spanish-speaking community and our front desk and clinical intake support both English and Spanish. If you would prefer your consultation in Spanish, mention it when you call and we will pair you with a Spanish-speaking team member from intake through follow-up.",
  },
  {
    question: "How long does it take to drive from Hialeah to the Brickell clinic?",
    answer:
      "Plan on roughly 20 to 35 minutes by car from central Hialeah to Brickell during normal traffic, depending on whether you take the Palmetto Expressway (SR-826) and I-95 or surface streets via NW 27th Avenue. Allow 40 to 55 minutes during the morning and evening rush hours. Saturday morning appointments are usually the fastest drive of the week.",
  },
  {
    question: "Where do I park when I get to the Brickell clinic?",
    answer:
      "Brickell has metered street parking on N Miami Avenue and several paid garages within a two-block radius of the clinic. We will send a parking note in your appointment confirmation email with the closest options for the time of day you are visiting. Plan on a 10-minute buffer to walk from the garage to the clinic on a first visit.",
  },
  {
    question: "Can I do my TRT consultation by telemedicine instead of driving from Hialeah?",
    answer:
      "Initial evaluation usually requires an in-person visit so we can take a full medical history, draw labs, and confirm identification — that part needs the drive. Once you are an active patient, many follow-up visits and dose-adjustment check-ins can be handled by telemedicine, which removes the Hialeah-to-Brickell trip from the maintenance schedule.",
  },
  {
    question: "Do I need a referral from my primary care doctor in Hialeah?",
    answer:
      "No referral is required to schedule a consultation with us. If you already have recent bloodwork from a Hialeah-area primary care visit, bring it — it can speed up the evaluation. If not, we will draw the panel ourselves at the Brickell visit.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Florida",
      item: absoluteUrl(flHubPath),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Miami",
      item: absoluteUrl("/fl/miami"),
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Hialeah",
      item: absoluteUrl(pagePath),
    },
  ],
};

const medicalClinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: `${business.name} — Serving Hialeah, FL`,
  url: absoluteUrl(pagePath),
  telephone: business.phone.e164,
  medicalSpecialty: "Endocrine",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.streetAddress,
    addressLocality: business.address.addressLocality,
    addressRegion: business.address.addressRegion,
    postalCode: business.address.postalCode,
    addressCountry: business.address.addressCountry,
  },
  areaServed: {
    "@type": "City",
    name: "Hialeah",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Miami-Dade County",
    },
  },
  availableLanguage: ["English", "Spanish"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function HialeahPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalClinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Home
            </Link>
            <span aria-hidden="true" className="px-1">
              /
            </span>
          </li>
          <li>
            <Link href={flHubPath} className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Florida
            </Link>
            <span aria-hidden="true" className="px-1">
              /
            </span>
          </li>
          <li>
            <Link href="/fl/miami" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Miami
            </Link>
            <span aria-hidden="true" className="px-1">
              /
            </span>
          </li>
          <li aria-current="page" className="text-zinc-900 dark:text-zinc-100">
            Hialeah
          </li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          TRT Therapy · Hialeah, FL
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          TRT therapy for Hialeah, served from our Brickell clinic
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Strong Health is a men&apos;s health clinic in downtown Miami offering
          testosterone replacement therapy to patients across Miami-Dade. If you
          live in Hialeah and want to talk to a physician about TRT, this page
          covers what to expect from the drive, the clinic, and your first visit.
          Consultations are available in English and Spanish.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={business.phone.href}
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Call {business.phone.display}
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Visit our clinic
          </Link>
        </div>
      </header>

      <section aria-labelledby="who-we-serve" className="flex flex-col gap-4">
        <h2
          id="who-we-serve"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Who we see from Hialeah
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Hialeah is the second-largest city in Miami-Dade County and one of the
          most heavily Spanish-speaking communities in the United States. The men
          who come to us from Hialeah are a wide range — long-time residents whose
          primary language is Spanish, first-generation Cuban-American and
          Venezuelan-American patients, and younger professionals who commute
          south to Brickell or Doral for work. What they share is wanting a
          physician-led conversation about testosterone instead of an online
          form-and-ship clinic.
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          Spanish-speaking care is a real part of how we operate, not a checkbox.
          Front-desk intake, clinical history-taking, and follow-up calls can be
          done in Spanish if that is what you prefer. If you are bringing a
          parent or family member who speaks only Spanish to translate for them,
          you do not need to — tell us when you call and we will arrange the
          visit accordingly. The physician overseeing TRT care at Strong Health
          is{" "}
          <Link
            href={physicianPagePath}
            className="font-medium text-zinc-900 underline underline-offset-2 hover:no-underline dark:text-zinc-100"
          >
            Dr. Angel Rivera
          </Link>
          ; his bio page covers training, credentials, and the panels we run.
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          We do not run a Hialeah-specific protocol. The evaluation, the lab
          panel, and the treatment options are the same as for any patient at
          our{" "}
          <Link
            href={moneyPagePath}
            className="font-medium text-zinc-900 underline underline-offset-2 hover:no-underline dark:text-zinc-100"
          >
            TRT therapy at our Miami Brickell clinic
          </Link>{" "}
          — what changes from city to city is the logistics of getting to a
          visit, which is what the rest of this page is about.
        </p>
      </section>

      <section aria-labelledby="drive-time" className="flex flex-col gap-4">
        <h2
          id="drive-time"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Drive time from Hialeah landmarks to the Brickell clinic
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          The clinic is at {business.address.displayLine1},{" "}
          {business.address.displayLine2}, on the north edge of Brickell across
          from downtown. The fastest route from most of Hialeah is the Palmetto
          Expressway (SR-826) east to State Road 112, then south on I-95 to the
          NW 8th Street exit. Surface-street alternatives via NW 27th Avenue or
          NW 36th Street are slower but avoid I-95 backups. Estimates below are
          for a normal weekday outside of rush hour.
        </p>
        <ul className="grid gap-2 text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              Hialeah Park Racing &amp; Casino
            </span>{" "}
            (E 32nd St) — about 9 miles, 20 to 30 minutes.
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              Westland Mall
            </span>{" "}
            (W 49th St) — about 11 miles, 25 to 35 minutes.
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              Hialeah City Hall
            </span>{" "}
            (Palm Ave) — about 9 miles, 20 to 30 minutes.
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              Amelia Earhart Park
            </span>{" "}
            — about 10 miles, 25 to 35 minutes.
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              Hialeah Gardens
            </span>{" "}
            (NW 87th Ave) — about 13 miles, 30 to 40 minutes.
          </li>
          <li>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              Milander Park
            </span>{" "}
            (E 4th Ave) — about 8 miles, 20 to 30 minutes.
          </li>
        </ul>
        <p className="text-zinc-700 dark:text-zinc-300">
          During the 7 to 9 AM and 4 to 7 PM rush windows, add 15 to 25 minutes
          to any of these drives. Mid-morning and early-afternoon appointments
          are noticeably easier. Saturday morning appointments tend to be the
          quickest drive in or out of Brickell from Hialeah all week.
        </p>
      </section>

      <section aria-labelledby="transit-parking" className="flex flex-col gap-4">
        <h2
          id="transit-parking"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Transit and parking
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          If you would rather not drive, the clinic is reachable by Miami-Dade
          Transit. From Hialeah, the most reliable transit route is the Tri-Rail
          Hialeah Market Station to the MetroRail transfer at the Tri-Rail/Metrorail
          Transfer Station, then south to Government Center or Brickell station.
          Total time runs about 60 to 80 minutes depending on connections, and
          puts you within a 10-minute walk of the clinic. The 27 and 77
          Miami-Dade bus routes also connect parts of Hialeah toward downtown
          but are slower than rail.
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          For drivers, parking around the clinic is metered street parking on
          N Miami Avenue and on the side streets between NW 6th and NW 8th, plus
          several paid garages within a two-block radius. Garage rates are
          highest on weekdays during downtown business hours and drop sharply on
          evenings and weekends. We will include the closest open option in your
          appointment confirmation, and the front desk can validate a few of the
          nearby garages on request. Plan on an extra 10 minutes for a first
          visit so you are not rushing in from the garage.
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          Rideshare drop-off works in front of the building on N Miami Avenue.
          If you are coming from Hialeah by Uber or Lyft, expect roughly the
          same drive time as your own car plus the pickup window — surge pricing
          on weekday rush hours can be substantial and parking your own car is
          often the cheaper option.
        </p>
      </section>

      <section
        aria-labelledby="patient-stories"
        className="flex flex-col gap-4 rounded-2xl border border-dashed border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950"
      >
        <h2
          id="patient-stories"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Stories from Hialeah patients
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          We are gathering testimonials from current Hialeah patients with their
          permission. Real, attributed stories will be added to this section as
          they are reviewed and approved. We will not use stock copy or invented
          quotes here — if a patient is named on this page, the quote came from
          that patient.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <NapBlock />
        <LocationMap />
      </div>

      <section aria-labelledby="faq" className="flex flex-col gap-6">
        <h2
          id="faq"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Frequently asked questions from Hialeah patients
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

      <section
        aria-labelledby="next-steps"
        className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
      >
        <h2
          id="next-steps"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Ready to book?
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Call us at{" "}
          <a
            href={business.phone.href}
            className="font-medium text-zinc-900 underline underline-offset-2 hover:no-underline dark:text-zinc-100"
          >
            {business.phone.display}
          </a>{" "}
          to schedule a Hialeah-area consultation, or browse the rest of our
          Florida service areas on our{" "}
          <Link
            href={flHubPath}
            className="font-medium text-zinc-900 underline underline-offset-2 hover:no-underline dark:text-zinc-100"
          >
            Florida hub
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
