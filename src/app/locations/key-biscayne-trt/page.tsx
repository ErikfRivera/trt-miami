import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/locations/key-biscayne-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT in Key Biscayne, FL — Strong Health Miami" },
  description:
    "TRT for Key Biscayne residents — a 15-minute drive across the Rickenbacker.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function KeyBiscayneTrtPage() {
  return (
    <PageStub
      eyebrow="TRT Service Area · Key Biscayne, FL"
      heading="TRT in Key Biscayne, FL"
      intro="TRT for Key Biscayne residents — a 15-minute drive across the Rickenbacker."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: "Key Biscayne", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "All service areas", href: "/locations/" },
      ]}
    />
  );
}
