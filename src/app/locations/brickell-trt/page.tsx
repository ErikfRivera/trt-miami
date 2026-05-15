import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/locations/brickell-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT in Brickell, FL — Strong Health Miami" },
  description:
    "TRT for Brickell residents — walking distance for many, in the heart of downtown Miami.",
  alternates: { canonical: PAGE_PATH },
};

export default function BrickellTrtPage() {
  return (
    <PageStub
      eyebrow="TRT Service Area · Brickell, FL"
      heading="TRT in Brickell, FL"
      intro="TRT for Brickell residents — walking distance for many, in the heart of downtown Miami."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: "Brickell", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "All service areas", href: "/locations/" },
      ]}
    />
  );
}
