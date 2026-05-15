import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/locations/aventura-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT in Aventura, FL — Strong Health Miami" },
  description:
    "TRT for Aventura patients at our Miami clinic — a short drive south on Biscayne Boulevard or I-95.",
  alternates: { canonical: PAGE_PATH },
};

export default function AventuraTrtPage() {
  return (
    <PageStub
      eyebrow="TRT Service Area · Aventura, FL"
      heading="TRT in Aventura, FL"
      intro="TRT for Aventura patients at our Miami clinic — a short drive south on Biscayne Boulevard or I-95."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: "Aventura", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "All service areas", href: "/locations/" },
      ]}
    />
  );
}
