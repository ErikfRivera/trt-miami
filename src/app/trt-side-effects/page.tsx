import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/trt-side-effects/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT Side Effects: What to Watch For — Strong Health Miami" },
  description:
    "Common and uncommon side effects of testosterone replacement therapy and how we monitor for them. Detailed page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function TrtSideEffectsPage() {
  return (
    <PageStub
      eyebrow="TRT Side Effects · Miami, FL"
      heading="TRT side effects"
      intro="Common and uncommon side effects of testosterone replacement therapy and how we monitor for them. Detailed page content in progress."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "TRT side effects", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
      ]}
    />
  );
}
