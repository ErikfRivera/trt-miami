import type { Metadata } from "next";
import Link from "next/link";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, buildServiceAreaService } from "@/lib/schema";

const PAGE_PATH = "/locations/key-biscayne-trt/" as const;

const schemaNodes = [
  buildServiceAreaService({ pagePath: PAGE_PATH, serviceType: "Testosterone Replacement Therapy", areaName: "Key Biscayne, FL" }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Key Biscayne", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT in Key Biscayne, FL — Strong Health Miami" },
  description:
    "TRT for Key Biscayne residents — a 15-minute drive across the Rickenbacker.",
  alternates: { canonical: PAGE_PATH },
};

export default function KeyBiscayneTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Service Area · Key Biscayne, FL"
        heading="TRT in Key Biscayne, FL"
        intro="TRT for Key Biscayne residents — a 15-minute drive across the Rickenbacker."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: "Key Biscayne", path: PAGE_PATH },
        ]}
        body={
          <p>
            Key Biscayne residents cross the Rickenbacker in about 15 minutes
            and follow the same{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              TRT in Miami
            </Link>
            {" "}program used across the rest of Miami-Dade.
          </p>
        }
        relatedLinks={[
          { label: "Miami TRT therapy overview", href: "/trt-clinic-miami/" },
          { label: "All service areas", href: "/locations/" },
        ]}
      />
    </>
  );
}
