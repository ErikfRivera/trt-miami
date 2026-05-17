import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { alternatesFor } from "@/lib/hreflangMap";
import type { SitePath } from "@/lib/site";

const PAGE_PATH = "/locations/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT Clinic Locations Across Miami-Dade — Strong Health" },
  description:
    "Strong Health serves patients across Miami-Dade and Broward. See drive-time, parking, and language-support notes for each area we cover.",
  alternates: alternatesFor(PAGE_PATH),
};

const areas: { name: string; path: SitePath; note: string }[] = [
  { name: "Hialeah", path: "/locations/hialeah-trt/", note: "Bilingual EN/ES intake, easy drive from the 826/Palmetto" },
  { name: "Fort Lauderdale", path: "/locations/fort-lauderdale-trt/", note: "Broward County — same-week consults, EN/ES, 25–35 min south on I-95" },
  { name: "Aventura", path: "/locations/aventura-trt/", note: "North Miami-Dade — content coming soon" },
  { name: "Doral", path: "/locations/doral-trt/", note: "West Miami-Dade — content coming soon" },
  { name: "Brickell", path: "/locations/brickell-trt/", note: "Downtown Miami — content coming soon" },
  { name: "Coral Gables", path: "/locations/coral-gables-trt/", note: "Content coming soon" },
  { name: "Coconut Grove", path: "/locations/coconut-grove-trt/", note: "Content coming soon" },
  { name: "Kendall", path: "/locations/kendall-trt/", note: "Content coming soon" },
  { name: "Pinecrest", path: "/locations/pinecrest-trt/", note: "Content coming soon" },
  { name: "Key Biscayne", path: "/locations/key-biscayne-trt/", note: "Content coming soon" },
];

export default function LocationsHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: PAGE_PATH },
        ]}
      />
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 dark:text-zinc-400">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/" className="underline-offset-2 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
              Locations
            </li>
          </ol>
        </nav>
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            TRT clinic service areas · Miami-Dade & Broward
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            TRT clinic locations across Miami-Dade
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Strong Health is a single physical clinic that serves the wider
            Miami metro. The area pages below cover drive-time, parking, transit,
            and any language-support notes specific to that neighborhood.
          </p>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2">
          {areas.map((area) => (
            <li key={area.path}>
              <Link
                href={area.path}
                className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  TRT in {area.name}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{area.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
