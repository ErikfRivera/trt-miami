import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/locations/pinecrest-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT in Pinecrest, FL — Strong Health Miami" },
  description:
    "TRT for Pinecrest patients — physician-led men's hormone care, short drive north.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function PinecrestTrtPage() {
  return (
    <PageStub
      eyebrow="TRT Service Area · Pinecrest, FL"
      heading="TRT in Pinecrest, FL"
      intro="TRT for Pinecrest patients — physician-led men's hormone care, short drive north."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: "Pinecrest", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "All service areas", href: "/locations/" },
      ]}
    />
  );
}
