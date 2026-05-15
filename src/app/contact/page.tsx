import type { Metadata } from "next";
import { NapBlock } from "@/components/nap-block";
import { LocationMap } from "@/components/location-map";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { alternatesFor } from "@/lib/hreflangMap";
import { buildBreadcrumbList, buildMedicalBusiness } from "@/lib/schema";

const PAGE_PATH = "/contact/" as const;

const schemaNodes = [
  buildMedicalBusiness({}),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Contact", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${business.name} in Miami, FL. Call ${business.phone.display} to schedule a consultation.`,
  alternates: alternatesFor(PAGE_PATH),
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:py-24">
      <SchemaGraph nodes={schemaNodes} />
      <header className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Contact
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Visit {business.name}
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Our clinic is located in downtown Miami. Call to book a consultation
          or drop by during business hours.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <NapBlock />
        <LocationMap />
      </div>
    </div>
  );
}
