import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, buildServiceAreaService } from "@/lib/schema";

const PAGE_PATH = "/locations/fort-lauderdale-trt/" as const;

const schemaNodes = [
  buildServiceAreaService({ pagePath: PAGE_PATH, serviceType: "Testosterone Replacement Therapy", areaName: "Fort Lauderdale, FL" }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Fort Lauderdale", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT in Fort Lauderdale, FL — Strong Health Miami" },
  description:
    "Strong Health serves Fort Lauderdale and surrounding Broward County patients from our Miami clinic — about a 35–50 minute drive south on I-95.",
  alternates: { canonical: PAGE_PATH },
};

export default function FortLauderdaleTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Service Area · Fort Lauderdale, FL"
        heading="TRT in Fort Lauderdale, FL"
        intro="Strong Health serves Fort Lauderdale and surrounding Broward County patients from our Miami clinic — about a 35–50 minute drive south on I-95."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: "Fort Lauderdale", path: PAGE_PATH },
        ]}
        relatedLinks={[
          { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
          { label: "All service areas", href: "/locations/" },
        ]}
      />
    </>
  );
}
