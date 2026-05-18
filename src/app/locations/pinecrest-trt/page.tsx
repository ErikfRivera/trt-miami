import type { Metadata } from "next";
import Link from "next/link";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, buildServiceAreaService } from "@/lib/schema";

const PAGE_PATH = "/locations/pinecrest-trt/" as const;

const schemaNodes = [
  buildServiceAreaService({ pagePath: PAGE_PATH, serviceType: "Testosterone Replacement Therapy", areaName: "Pinecrest, FL" }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Pinecrest", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT in Pinecrest, FL — Strong Health Miami" },
  description:
    "TRT for Pinecrest patients — physician-led men's hormone care, short drive north.",
  alternates: { canonical: PAGE_PATH },
};

export default function PinecrestTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Service Area · Pinecrest, FL"
        heading="TRT in Pinecrest, FL"
        intro="TRT for Pinecrest patients — physician-led men's hormone care, short drive north."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: "Pinecrest", path: PAGE_PATH },
        ]}
        body={
          <p>
            Pinecrest patients drive a short stretch north on US-1 to follow
            the same{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              Miami TRT therapy
            </Link>
            {" "}protocols and lab cadence used across Miami-Dade.
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
