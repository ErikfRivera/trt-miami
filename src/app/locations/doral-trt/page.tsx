import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/locations/doral-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT in Doral, FL — Strong Health Miami" },
  description:
    "TRT for Doral and West Miami-Dade patients — physician-led care at our Miami clinic, easy access via the 836.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function DoralTrtPage() {
  return (
    <PageStub
      eyebrow="TRT Service Area · Doral, FL"
      heading="TRT in Doral, FL"
      intro="TRT for Doral and West Miami-Dade patients — physician-led care at our Miami clinic, easy access via the 836."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: "Doral", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "All service areas", href: "/locations/" },
      ]}
    />
  );
}
