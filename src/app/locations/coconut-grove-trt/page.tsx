import type { Metadata } from "next";
import Link from "next/link";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, buildServiceAreaService } from "@/lib/schema";

const PAGE_PATH = "/locations/coconut-grove-trt/" as const;

const schemaNodes = [
  buildServiceAreaService({ pagePath: PAGE_PATH, serviceType: "Testosterone Replacement Therapy", areaName: "Coconut Grove, FL" }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Coconut Grove", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT in Coconut Grove, FL — Strong Health Miami" },
  description:
    "TRT for Coconut Grove residents — discreet physician-led men's health care nearby.",
  alternates: { canonical: PAGE_PATH },
};

export default function CoconutGroveTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Service Area · Coconut Grove, FL"
        heading="TRT in Coconut Grove, FL"
        intro="TRT for Coconut Grove residents — discreet physician-led men's health care nearby."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: "Coconut Grove", path: PAGE_PATH },
        ]}
        body={
          <p>
            Coconut Grove residents pair the short drive north into Brickell
            with the same{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              TRT in Miami-Dade
            </Link>
            {" "}protocols used across the rest of the metro.
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
