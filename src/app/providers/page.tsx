import type { Metadata } from "next";
import Link from "next/link";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { providers } from "@/lib/providers/registry";
import {
  isVerifiedLicense,
  isVerifiedNpi,
  licenseVerificationUrl,
  npiRegistryUrl,
} from "@/lib/providers/verification-urls";
import { buildCollectionPage, buildBreadcrumbList, buildPhysician } from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/providers/" as const;

export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: `Our Medical Providers | ${business.legalName} Miami`,
  description:
    "Meet the Florida-licensed physicians behind Strong Health Miami. Board-certified, NPI-verified, and accountable for every clinical page on this site.",
});

const breadcrumbs: readonly BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Our Providers", path: PAGE_PATH },
];

const schemaNodes = [
  buildCollectionPage({
    pagePath: PAGE_PATH,
    name: "Our Medical Providers | Strong Health Miami",
    description:
      "Every clinical page on this site is written or reviewed by a licensed physician. Below are the credentialed clinicians responsible for our medical content and patient care.",
    physicianUrls: providers.map((p) => p.url),
  }),
  buildPhysician(),
  buildBreadcrumbList(breadcrumbs, PAGE_PATH),
];

export default function ProvidersPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
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
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Our Medical Providers
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Every page on this site that discusses a medical condition or treatment
            is written or reviewed by a licensed physician. Below are the credentialed
            clinicians responsible for our medical content and patient care.
          </p>
        </header>

        <ul className="flex flex-col gap-10">
          {providers.map((provider) => (
            <li key={provider.slug}>
              <article className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex gap-5">
                  {provider.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={provider.image}
                      alt={`Headshot of ${provider.name}`}
                      width={80}
                      height={80}
                      className="h-20 w-20 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-2xl font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                    >
                      {provider.familyName.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {provider.name}
                    </h2>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {provider.jobTitle}
                    </p>
                  </div>
                </div>

                <dl className="grid gap-y-2 gap-x-6 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Specialty
                    </dt>
                    <dd className="mt-1 text-zinc-700 dark:text-zinc-300">{provider.specialty}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Languages
                    </dt>
                    <dd className="mt-1 text-zinc-700 dark:text-zinc-300">
                      {provider.languages.join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      FL License
                    </dt>
                    <dd className="mt-1 text-zinc-700 dark:text-zinc-300">
                      {!isVerifiedLicense(provider.license) ? (
                        <span className="italic text-zinc-400">Pending verification (STR-50)</span>
                      ) : (
                        <>
                          FL #{provider.license}{" "}
                          <a
                            href={licenseVerificationUrl(provider.license)}
                            rel="noopener"
                            target="_blank"
                            className="text-zinc-500 underline underline-offset-2 hover:text-zinc-700 dark:text-zinc-400"
                          >
                            verify
                          </a>
                        </>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      NPI
                    </dt>
                    <dd className="mt-1 text-zinc-700 dark:text-zinc-300">
                      {!isVerifiedNpi(provider.npi) ? (
                        <span className="italic text-zinc-400">Pending verification (STR-50)</span>
                      ) : (
                        <>
                          {provider.npi}{" "}
                          <a
                            href={npiRegistryUrl(provider.npi)}
                            rel="noopener"
                            target="_blank"
                            className="text-zinc-500 underline underline-offset-2 hover:text-zinc-700 dark:text-zinc-400"
                          >
                            NPI Registry
                          </a>
                        </>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Board Certification
                    </dt>
                    <dd className="mt-1 text-zinc-700 dark:text-zinc-300">
                      {provider.boardCertification === "PENDING_BOARD" ? (
                        <span className="italic text-zinc-400">Pending verification (STR-37)</span>
                      ) : (
                        `${provider.boardCertification}, ${provider.boardYear}`
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Licensing Board
                    </dt>
                    <dd className="mt-1 text-zinc-700 dark:text-zinc-300">{provider.licensingBoard}</dd>
                  </div>
                </dl>

                <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  {provider.summary}
                </p>

                <Link
                  href={`/providers/${provider.slug}/`}
                  className="self-start text-sm font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  Read full bio →
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Our clinicians review every page within 180 days. See our editorial standards on the{" "}
          <Link href="/medical-reviewer/" className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-200">
            Medical Reviewer page
          </Link>
          .
        </p>
      </div>
    </>
  );
}
