import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/locations/coral-gables-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT in Coral Gables, FL — Strong Health Miami" },
  description:
    "TRT for Coral Gables patients — physician-led care a short drive north of the Gables.",
  alternates: { canonical: PAGE_PATH },
};

export default function CoralGablesTrtPage() {
  return (
    <PageStub
      eyebrow="TRT Service Area · Coral Gables, FL"
      heading="TRT in Coral Gables, FL"
      intro="TRT for Coral Gables patients — physician-led care a short drive north of the Gables."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: "Coral Gables", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "All service areas", href: "/locations/" },
      ]}
    />
  );
}
