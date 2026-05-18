import type { Metadata } from "next";
import Link from "next/link";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, buildServiceAreaService } from "@/lib/schema";

const PAGE_PATH = "/locations/aventura-trt/" as const;

const schemaNodes = [
  buildServiceAreaService({ pagePath: PAGE_PATH, serviceType: "Testosterone Replacement Therapy", areaName: "Aventura, FL" }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Aventura", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT in Aventura, FL — Strong Health Miami" },
  description:
    "TRT for Aventura patients at our Miami clinic — a short drive south on Biscayne Boulevard or I-95.",
  alternates: { canonical: PAGE_PATH },
};

export default function AventuraTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Service Area · Aventura, FL"
        heading="TRT in Aventura, FL"
        intro="TRT for Aventura patients at our Miami clinic — a short drive south on Biscayne Boulevard or I-95."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: "Aventura", path: PAGE_PATH },
        ]}
        body={
          <p>
            Aventura sits at the north edge of the Miami-Dade service area;
            patients here follow the same protocols and lab cadence covered in
            our{" "}
            <Link
              href="/trt-clinic-miami/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              Miami TRT therapy
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
