import type { Metadata } from "next";
import Link from "next/link";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, buildServiceAreaService } from "@/lib/schema";

const PAGE_PATH = "/locations/doral-trt/" as const;

const schemaNodes = [
  buildServiceAreaService({ pagePath: PAGE_PATH, serviceType: "Testosterone Replacement Therapy", areaName: "Doral, FL" }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Doral", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT in Doral, FL — Strong Health Miami" },
  description:
    "TRT for Doral and West Miami-Dade patients — physician-led care at our Miami clinic, easy access via the 836.",
  alternates: { canonical: PAGE_PATH },
};

export default function DoralTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Service Area · Doral, FL"
        heading="TRT in Doral, FL"
        intro="TRT for Doral and West Miami-Dade patients — physician-led care at our Miami clinic, easy access via the 836."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: "Doral", path: PAGE_PATH },
        ]}
        body={
          <p>
            Doral and West Miami-Dade patients are seen at the same
            clinic that anchors our{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              Testosterone Replacement Therapy in Miami
            </Link>
            {" "}program, with the 836 cutting most commute times to under 25
            minutes.
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
