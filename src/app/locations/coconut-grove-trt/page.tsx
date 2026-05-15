import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/locations/coconut-grove-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT in Coconut Grove, FL — Strong Health Miami" },
  description:
    "TRT for Coconut Grove residents — discreet physician-led men's health care nearby.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function CoconutGroveTrtPage() {
  return (
    <PageStub
      eyebrow="TRT Service Area · Coconut Grove, FL"
      heading="TRT in Coconut Grove, FL"
      intro="TRT for Coconut Grove residents — discreet physician-led men's health care nearby."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: "Coconut Grove", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "All service areas", href: "/locations/" },
      ]}
    />
  );
}
