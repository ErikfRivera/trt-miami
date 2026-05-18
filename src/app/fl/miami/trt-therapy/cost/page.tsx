import type { Metadata } from "next";
import Link from "next/link";
import { CitationBlock } from "@/components/citation-block";
import { FaqAccordion } from "@/components/faq-accordion";
import { SchemaGraph } from "@/components/schema-graph";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import { schemaEligible, trtMiamiCostFaqs, TRT_FAQ_DISCLAIMER } from "@/lib/faq-content";
import {
  buildArticle,
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalWebPage,
  buildPageCitationSchema,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import type { SchemaNode } from "@/lib/schema/types";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const PAGE_PATH = "/fl/miami/trt-therapy/cost/" as const;
const HUB_PATH = "/fl/miami/trt-therapy/" as const;
const LAST_REVIEWED = "2026-05-17" as const;
const DATE_PUBLISHED = "2026-05-17" as const;
const HEADLINE = "How Much Does TRT Cost in Miami? An Editorial Market Survey" as const;
const PAGE_DESCRIPTION =
  "An editorial overview of TRT pricing in Miami — initial visit, monthly maintenance, lab work, insurance, FSA/HSA — based on a 2026-05-17 survey of five Miami-area and national providers." as const;

const { citations, lastReviewed } = pageCitations(PAGE_PATH);

// Brief §7 requires OG type "article" for this editorial child page; the
// shared `pageMetadata` helper defaults to "website" for sitewide consistency,
// so we spread it and override the type on the OpenGraph object.
const baseMetadata = pageMetadata({
  path: PAGE_PATH,
  title: "How Much Does TRT Cost in Miami? Editorial Guide",
  description:
    "An editorial overview of TRT costs in Miami — initial visit, monthly maintenance, lab work, insurance, and FSA/HSA — based on a 2026-05-17 provider survey.",
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, type: "article" },
};

const breadcrumbItems: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "TRT in Miami", path: HUB_PATH },
  { name: "TRT cost", path: PAGE_PATH },
];

// Brief §6.1 wants the MedicalWebPage to carry `isPartOf` (→ hub @id), a
// short `name` + `description`, `about` (MedicalCondition array), `audience`,
// and an editorial `reviewedBy`. The shared schema builder doesn't take
// these inputs today, so we emit a thin sibling MedicalWebPage node with the
// same `@id` and let `dedupeNodes` (schema/graph.ts) merge it into the core
// node. Same pattern `buildPageCitationSchema` already uses for `citation`.
const MEDICAL_WEBPAGE_ID = `${absoluteUrl(PAGE_PATH)}#medical-page`;
const HUB_MEDICAL_WEBPAGE_ID = `${absoluteUrl(HUB_PATH)}#medical-page`;

const medicalWebPageEditorial: SchemaNode = {
  "@type": "MedicalWebPage",
  "@id": MEDICAL_WEBPAGE_ID,
  url: absoluteUrl(PAGE_PATH),
  name: HEADLINE,
  description: PAGE_DESCRIPTION,
  inLanguage: "en-US",
  isPartOf: { "@id": HUB_MEDICAL_WEBPAGE_ID },
  about: [
    { "@type": "MedicalCondition", name: "Hypogonadism" },
    { "@type": "MedicalCondition", name: "Testosterone deficiency" },
  ],
  audience: {
    "@type": "PeopleAudience",
    audienceType: "Adults researching TRT cost in the Miami area",
  },
};

const schemaNodes = [
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed: LAST_REVIEWED,
    specialty: "Endocrine",
    dateModified: LAST_REVIEWED,
  }),
  medicalWebPageEditorial,
  buildArticle({
    pagePath: PAGE_PATH,
    headline: HEADLINE,
    datePublished: DATE_PUBLISHED,
    dateModified: LAST_REVIEWED,
  }),
  buildFaqPage(schemaEligible(trtMiamiCostFaqs), PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
  buildPageCitationSchema(PAGE_PATH, citations),
];

export default function TrtMiamiCostPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:py-24">
        {/* Breadcrumb */}
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

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            TRT cost guide · Miami, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            How Much Does TRT Cost in Miami?
          </h1>
          {/* Featured-snippet-eligible standfirst — must remain in the first ~60 words. */}
          <p className="max-w-3xl text-lg text-zinc-700 dark:text-zinc-300">
            TRT in Miami typically costs <strong className="font-semibold">$99 to $300+ per
            month</strong>, depending on the provider. National telehealth services start near
            $99/month; in-person Miami clinics most commonly quote $150–$250/month for ongoing
            maintenance, with the initial consultation and baseline labs running an additional
            $200–$300 (bundled or unbundled). Most local in-person clinics operate self-pay; many
            provide a superbill for out-of-network reimbursement. See{" "}
            <Link href={HUB_PATH} className="underline-offset-2 hover:underline">
              TRT in Miami: the full editorial guide
            </Link>{" "}
            for the broader context.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <em>
              Last reviewed by editorial team: <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED}</time>.
            </em>{" "}
            Pricing reflects a survey of five Miami-area and national providers as of that date.
            See <a href="#methodology" className="underline-offset-2 hover:underline">Methodology</a>{" "}
            below. <strong>Prices change; figures accurate as of 2026-05-17.</strong>
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Author: Editorial team, Strong Health. Medical reviewer: <em>pending</em>.
          </p>
        </header>

        {/* §2 — Market overview */}
        <section aria-labelledby="market-overview" className="flex flex-col gap-4">
          <h2
            id="market-overview"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            How much does TRT cost in Miami? (market overview)
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Strong Health does not sell testosterone replacement therapy. This page is an
            independent editorial market survey of what TRT typically costs in the Miami area,
            built so readers can evaluate provider quotes against published market figures. The
            short answer for the highest-volume cost question: TRT in Miami runs about{" "}
            <strong className="font-semibold">$99 to $300+ per month</strong> for ongoing
            maintenance, plus a one-time initial bundle of roughly{" "}
            <strong className="font-semibold">$200–$300</strong> for the consultation and baseline
            labs. The lower end of that maintenance band reflects national mail-order telehealth
            services; the middle of the band ($150–$250) reflects in-person Miami clinics in our
            sample.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Cost depends on five things: whether the provider is in-person or telehealth-only;
            what is bundled into the monthly price (labs, follow-ups, medication); the
            testosterone delivery form (injections are the most cost-effective, pellets the most
            expensive over time); whether the visit is billed through insurance or paid cash; and
            the clinic's positioning, since concierge practices charge a premium. We list each
            quoted figure alongside the named provider and a link to that provider's public
            pricing page in the <a href="#methodology" className="underline-offset-2 hover:underline">Methodology</a> section so readers can confirm the numbers
            themselves.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            For the broader TRT picture in Miami — what TRT is, who is a candidate, what the
            research shows, and how to evaluate a provider — see{" "}
            <Link href={HUB_PATH} className="underline-offset-2 hover:underline">
              the editorial TRT guide for Miami
            </Link>
            .
          </p>
        </section>

        {/* §3 — What an initial TRT visit typically includes */}
        <section aria-labelledby="initial-visit" className="flex flex-col gap-4">
          <h2
            id="initial-visit"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            What an initial TRT visit typically includes
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            A standard initial TRT visit in Miami bundles four components: a physician
            consultation, a comprehensive hormone lab panel, a personalized treatment protocol if
            low testosterone is clinically confirmed, and — at some clinics — the first month of
            medication if therapy begins that day. Total cost for the initial bundle commonly
            runs <strong className="font-semibold">$200–$300</strong>, depending on whether labs
            and the first month of medication are included or billed separately.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Florida Surgery &amp; Weight Loss Center publishes a <strong>$250 same-day initial
            bundle</strong> that includes consult, baseline labs, and the first month of
            medication — a useful local benchmark for what "all-in" pricing looks like in Miami.
            Other surveyed clinics bundle the consult with labs but bill medication separately;
            a few quote the consult alone at the same $100–$150 price national chains advertise
            and add labs ($150–$250) on top.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            The physician consultation itself reviews medical history, current symptoms, prior
            lab work, contraindications, and treatment goals. A qualified provider will order
            two early-morning testosterone measurements before prescribing — symptoms alone are
            not sufficient diagnostic grounds, per American Urological Association guidance. The
            specific delivery method (injection, gel, pellet, patch) is selected with the
            clinician based on insurance coverage, lifestyle, and fertility goals;{" "}
            <Link
              href="/trt-injections/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              injections
            </Link>
            ,{" "}
            <Link
              href="/trt-pellets/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              pellets
            </Link>
            , and{" "}
            <Link
              href="/trt-gels/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              gels
            </Link>{" "}
            each have a distinct cost structure covered in our delivery-method guides.
          </p>
        </section>

        {/* §4 — Lab work — what's run and how often */}
        <section aria-labelledby="lab-work" className="flex flex-col gap-4">
          <h2
            id="lab-work"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Lab work — what's run and how often
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            The baseline TRT lab panel is well-standardized. The Endocrine Society's clinical
            practice guideline on testosterone therapy in men with hypogonadism specifies the
            tests that should be run before initiating therapy and the monitoring cadence
            thereafter (see the <a
              href="https://academic.oup.com/jcem/article/103/5/1715/4939465"
              rel="noopener"
              target="_blank"
              className="underline-offset-2 hover:underline"
            >Endocrine Society guideline</a>). A typical Miami initial panel includes:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-300">
            <li>Total testosterone (two early-morning samples on separate days)</li>
            <li>Free testosterone or calculated free testosterone</li>
            <li>Sex hormone-binding globulin (SHBG)</li>
            <li>Sensitive estradiol</li>
            <li>Luteinizing hormone (LH) and follicle-stimulating hormone (FSH)</li>
            <li>Prolactin (to rule out pituitary cause)</li>
            <li>Complete blood count (CBC) and comprehensive metabolic panel (CMP)</li>
            <li>Lipid panel and HbA1c</li>
            <li>Prostate-specific antigen (PSA) where clinically indicated</li>
            <li>Thyroid-stimulating hormone (TSH)</li>
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            Monitoring after initiation typically follows a 30-day, 3-month, then 6–12-month
            cadence: a CBC to watch for polycythemia, a repeat testosterone level to confirm the
            dose lands in physiological range, a PSA where clinically indicated, and hematocrit.
            Mayo Clinic's patient-facing summary of TRT — <a
              href="https://www.mayoclinic.org/healthy-lifestyle/sexual-health/in-depth/testosterone-therapy/art-20045728"
              rel="noopener"
              target="_blank"
              className="underline-offset-2 hover:underline"
            >Testosterone therapy: Potential benefits and risks as you age</a> — frames the same
            monitoring expectations for general audiences.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Lab cost in Miami varies: in-person clinics with negotiated lab agreements often
            include the full initial panel in the bundle price; clinics that bill labs separately
            quote roughly $150–$250 for the initial panel and $80–$150 for follow-up panels.
            Telehealth providers typically charge a one-time lab kit fee ($45–$99 in our scan)
            and route the patient to a national lab network (Quest, LabCorp) where the actual
            blood draw happens.
          </p>
        </section>

        {/* §5 — What monthly maintenance typically costs */}
        <section aria-labelledby="monthly-maintenance" className="flex flex-col gap-4">
          <h2
            id="monthly-maintenance"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            What monthly maintenance typically costs
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Surveyed monthly TRT prices in the Miami area cluster between $99 and $300, with
            outlier concierge practices charging more. Each figure below is attributed to a named
            provider and reflects that provider's published price on 2026-05-17. None of the
            prices below is Strong Health's price; Strong Health does not sell TRT.
          </p>
          {/* Prefer dl/ul over table for <400px reflow (brief §7). */}
          <dl className="grid gap-4 text-zinc-700 dark:text-zinc-300">
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                South Florida Men's Health — <span className="font-normal">$169/month, all-inclusive</span>
              </dt>
              <dd className="mt-1 text-sm">
                In-person Miami clinic. Bundle includes labs, consult, medication, and delivery.
                Currently the most-cited Miami in-person anchor on the cost SERP.
              </dd>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                Florida Surgery &amp; Weight Loss Center —{" "}
                <span className="font-normal">$199/month maintenance, $250 initial bundle</span>
              </dt>
              <dd className="mt-1 text-sm">
                In-person Miami clinic with same-day initiation. Initial $250 bundle includes
                consult, baseline labs, and the first month of medication.
              </dd>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                Dr. Miami Beach —{" "}
                <span className="font-normal">$100–$300/month (published range)</span>
              </dt>
              <dd className="mt-1 text-sm">
                In-person Miami Beach practice. Publishes a wide range without disclosing initial
                visit pricing. Currently ranks in the top three on the Miami cost-PAA.
              </dd>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                Low T Center — <span className="font-normal">from $105/month</span>
              </dt>
              <dd className="mt-1 text-sm">
                National men's-health chain operating in-person clinics and a telehealth path.
                Entry price reflects basic injection program; pricing scales with bundled
                services.
              </dd>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                Hone Health (national telehealth) —{" "}
                <span className="font-normal">$99–$169/month, plus ~$45 lab kit</span>
              </dt>
              <dd className="mt-1 text-sm">
                Mail-order telehealth, not in-person. Lab draw routed through a national lab
                network. Mention here is to anchor the lower end of the market band — the
                in-person Miami clinics above are typically more expensive than mail-order
                telehealth for reasons covered in the FAQ.
              </dd>
            </div>
          </dl>
          <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
            Industry-range context (US in-person), aggregated from Hone Health and Low T Center
            cost guides: $150–$500/month maintenance; $150–$300 initial visit. Local Miami
            in-person pricing sits at the lower end of this national range.
          </p>
        </section>

        {/* §6 — Insurance vs. self-pay in Florida */}
        <section aria-labelledby="insurance-vs-self-pay" className="flex flex-col gap-4">
          <h2
            id="insurance-vs-self-pay"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Insurance vs. self-pay in Florida
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Most commercial insurers operating in Florida cover testosterone replacement therapy
            only when documented hypogonadism is clinically established through qualifying lab
            values and symptoms, and only when prior authorization has been approved. Age-related
            testosterone decline — sometimes labeled "low T" — is typically excluded from
            coverage even when symptoms are present, because most plans align their criteria
            with the Endocrine Society's diagnostic threshold rather than a softer
            symptom-driven definition.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            That payer posture, combined with the administrative cost of working insurance for
            what is often a long-term prescription, has driven most surveyed in-person Miami
            clinics into a self-pay model. Patients can request a{" "}
            <strong>superbill</strong> at the end of the visit and submit it to their carrier
            for out-of-network reimbursement — but the carrier may pay anywhere from nothing to
            the in-network rate, depending on plan terms, deductible status, and the specific
            diagnosis codes the clinic uses. <strong>Reimbursement is not guaranteed.</strong>
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Patients who specifically want to use insurance should expect a longer path:
            obtaining a referral from a primary-care physician, completing the qualifying labs
            inside the insurer's network, working through prior authorization, and being open
            to using only the formulary-covered testosterone form (typically generic injectable
            cypionate). For the national-level breakdown of what most plans cover and how to
            verify benefits, see our{" "}
            <Link
              href="/does-insurance-cover-trt/"
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              does insurance cover TRT
            </Link>{" "}
            guide. The Endocrine Society's full clinical practice guideline on testosterone
            therapy is the underlying evidence base most payers reference — see the{" "}
            <a
              href="https://academic.oup.com/jcem/article/103/5/1715/4939465"
              rel="noopener"
              target="_blank"
              className="underline-offset-2 hover:underline"
            >
              Endocrine Society clinical practice guideline
            </a>{" "}
            for the source text.
          </p>
        </section>

        {/* §7 — FSA, HSA, and superbills */}
        <section aria-labelledby="fsa-hsa" className="flex flex-col gap-4">
          <h2
            id="fsa-hsa"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            FSA, HSA, and superbills
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Per <a
              href="https://www.irs.gov/publications/p502"
              rel="noopener"
              target="_blank"
              className="underline-offset-2 hover:underline"
            >IRS Publication 502</a>, medical care expenses include amounts paid for the
            "diagnosis, cure, mitigation, treatment, or prevention of disease." TRT visits, lab
            work, and medication prescribed by a physician for a diagnosed medical condition
            typically fall under that definition and are usually FSA- and HSA-eligible. Many
            Miami clinics accept FSA/HSA cards at point of sale, which removes the need for a
            separate reimbursement request.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Where the clinic doesn't accept FSA/HSA cards directly, the standard mechanic is a{" "}
            <strong>superbill</strong>: an itemized receipt listing the diagnosis (ICD-10),
            procedure (CPT), provider NPI, and amount paid. Patients submit the superbill to
            their HSA/FSA administrator (or to their insurance for out-of-network
            reimbursement). Most surveyed Miami clinics will produce a superbill on request
            at no additional cost.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Two caveats apply. First, plan-level rules vary on which expense categories
            qualify, and a documented denial after the fact is harder to fix than a documented
            approval beforehand. <strong>Confirm eligibility with your plan administrator.</strong>{" "}
            Second, the underlying diagnosis matters: TRT for documented hypogonadism almost
            always qualifies under IRS rules; TRT for "anti-aging" or unspecified low-T with
            no qualifying lab work is on weaker ground and may be challenged in audit.
          </p>
        </section>

        {/* §8 — Methodology + sources */}
        <section aria-labelledby="methodology" className="flex flex-col gap-4">
          <h2
            id="methodology"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Methodology + sources
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Prices on this page were pulled from each provider's public marketing or pricing
            page on <strong>2026-05-17</strong>. Five providers were surveyed: three in-person
            Miami clinics (South Florida Men's Health, Florida Surgery &amp; Weight Loss Center,
            Dr. Miami Beach) and two national chains with established public pricing (Low T
            Center, Hone Health). Inclusion was determined by SERP visibility on the{" "}
            <em>trt miami</em> cluster (top organic + cited People-Also-Ask results) plus the
            two national chains that publish entry-level monthly prices.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Strong Health does not endorse any provider listed and has no commercial
            relationship with any of them. Inclusion is editorial: the goal is to give the
            reader an accurate picture of the Miami market without steering toward a specific
            provider. Prices change; promotional bundles, telehealth-only variants, and
            insurance-billed pricing may differ from the figures above.{" "}
            <strong>Prices change; figures accurate as of 2026-05-17.</strong> This page is
            re-surveyed quarterly; on any pricing-table change, the page's{" "}
            <code>lastReviewed</code> and <code>dateModified</code> bump.
          </p>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Sources</h3>
          <ul className="list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-300">
            <li>
              <a
                href="https://academic.oup.com/jcem/article/103/5/1715/4939465"
                rel="noopener"
                target="_blank"
                className="underline-offset-2 hover:underline"
              >
                Endocrine Society — Testosterone Therapy in Men With Hypogonadism: An Endocrine
                Society Clinical Practice Guideline
              </a>{" "}
              (JCEM, 2018)
            </li>
            <li>
              <a
                href="https://www.irs.gov/publications/p502"
                rel="noopener"
                target="_blank"
                className="underline-offset-2 hover:underline"
              >
                IRS Publication 502 — Medical and Dental Expenses
              </a>
            </li>
            <li>
              <a
                href="https://www.mayoclinic.org/healthy-lifestyle/sexual-health/in-depth/testosterone-therapy/art-20045728"
                rel="noopener"
                target="_blank"
                className="underline-offset-2 hover:underline"
              >
                Mayo Clinic — Testosterone therapy: Potential benefits and risks as you age
              </a>
            </li>
          </ul>
        </section>

        {/* §9 — FAQ */}
        <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Frequently asked questions about TRT cost in Miami
          </h2>
          <FaqAccordion items={trtMiamiCostFaqs} defaultOpenFirst />
          <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
            {TRT_FAQ_DISCLAIMER}
          </p>
        </section>

        {/* §10 — Related reading */}
        <section aria-labelledby="related-reading" className="flex flex-col gap-3">
          <h2
            id="related-reading"
            className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Related reading
          </h2>
          <ul className="flex flex-col gap-1 text-zinc-700 dark:text-zinc-300">
            <li>
              <Link href={HUB_PATH} className="underline-offset-2 hover:underline">
                TRT in Miami: the complete editorial guide
              </Link>
            </li>
            <li>
              <Link href="/trt-injections/" className="underline-offset-2 hover:underline">
                TRT injections — what to expect
              </Link>
            </li>
            <li>
              <Link href="/trt-pellets/" className="underline-offset-2 hover:underline">
                TRT pellets — implantation, duration, and cost
              </Link>
            </li>
            <li>
              <Link href="/trt-gels/" className="underline-offset-2 hover:underline">
                TRT gels and topical solutions
              </Link>
            </li>
            <li>
              <Link href="/does-insurance-cover-trt/" className="underline-offset-2 hover:underline">
                Does insurance cover TRT?
              </Link>
            </li>
            <li>
              <Link href="/about/" className="underline-offset-2 hover:underline">
                Editorial standards and review process
              </Link>
            </li>
          </ul>
        </section>

        <CitationBlock
          citations={citations}
          reviewer={{
            slug: primaryReviewer.slug,
            name: primaryReviewer.name,
            credentials: primaryReviewer.honorificSuffix,
          }}
          lastReviewed={lastReviewed}
          pagePath={PAGE_PATH}
        />
      </div>
    </>
  );
}
