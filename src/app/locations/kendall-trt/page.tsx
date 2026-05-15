import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/locations/kendall-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT in Kendall, FL — Strong Health Miami" },
  description:
    "TRT for Kendall and South Miami-Dade patients — easy drive north via US-1 or the Palmetto.",
  alternates: { canonical: PAGE_PATH },
};

export default function KendallTrtPage() {
  return (
    <PageStub
      eyebrow="TRT Service Area · Kendall, FL"
      heading="TRT in Kendall, FL"
      intro="TRT for Kendall and South Miami-Dade patients — easy drive north via US-1 or the Palmetto."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: "Kendall", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "All service areas", href: "/locations/" },
      ]}
    />
  );
}
