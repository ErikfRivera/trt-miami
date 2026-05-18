import type { Metadata } from "next";
import Link from "next/link";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, buildServiceAreaService } from "@/lib/schema";

const PAGE_PATH = "/locations/kendall-trt/" as const;

const schemaNodes = [
  buildServiceAreaService({ pagePath: PAGE_PATH, serviceType: "Testosterone Replacement Therapy", areaName: "Kendall, FL" }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Kendall", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT in Kendall, FL — Strong Health Miami" },
  description:
    "TRT for Kendall and South Miami-Dade patients — easy drive north via US-1 or the Palmetto.",
  alternates: { canonical: PAGE_PATH },
};

export default function KendallTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Service Area · Kendall, FL"
        heading="TRT in Kendall, FL"
        intro="TRT for Kendall and South Miami-Dade patients — easy drive north via US-1 or the Palmetto."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: "Kendall", path: PAGE_PATH },
        ]}
        body={
          <p>
            Kendall patients drive 20–30 minutes north for in-person visits
            and follow the same{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              TRT therapy in Miami
            </Link>
            {" "}protocols and quarterly-lab cadence as the rest of Miami-Dade.
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
