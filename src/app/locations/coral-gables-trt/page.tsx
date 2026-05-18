import type { Metadata } from "next";
import Link from "next/link";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, buildServiceAreaService } from "@/lib/schema";

const PAGE_PATH = "/locations/coral-gables-trt/" as const;

const schemaNodes = [
  buildServiceAreaService({ pagePath: PAGE_PATH, serviceType: "Testosterone Replacement Therapy", areaName: "Coral Gables, FL" }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Coral Gables", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT in Coral Gables, FL — Strong Health Miami" },
  description:
    "TRT for Coral Gables patients — physician-led care a short drive north of the Gables.",
  alternates: { canonical: PAGE_PATH },
};

export default function CoralGablesTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Service Area · Coral Gables, FL"
        heading="TRT in Coral Gables, FL"
        intro="TRT for Coral Gables patients — physician-led care a short drive north of the Gables."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: "Coral Gables", path: PAGE_PATH },
        ]}
        body={
          <p>
            Coral Gables patients are seen at our Miami clinic — protocols,
            lab cadence, and pricing match the broader{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              Miami testosterone therapy
            </Link>
            {" "}guide.
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
