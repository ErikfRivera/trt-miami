import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/trt-cost/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT Cost in Miami: 2026 Pricing Guide" },
  description:
    "How much does TRT cost in Miami, with and without insurance. Detailed page content in progress.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function TrtCostPage() {
  return (
    <PageStub
      eyebrow="TRT Cost · Miami, FL"
      heading="TRT Cost in Miami"
      intro="How much does TRT cost in Miami, with and without insurance. Detailed page content in progress."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "TRT Cost in Miami", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
      ]}
    />
  );
}
