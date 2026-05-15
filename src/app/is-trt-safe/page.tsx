import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/is-trt-safe/" as const;

export const metadata: Metadata = {
  title: { absolute: "Is TRT Safe? — Strong Health Miami" },
  description:
    "Is testosterone replacement therapy safe? A physician-reviewed overview of risks, contraindications, and monitoring. Detailed page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function IsTrtSafePage() {
  return (
    <PageStub
      eyebrow="TRT Safety · Miami, FL"
      heading="Is TRT safe?"
      intro="Is testosterone replacement therapy safe? A physician-reviewed overview of risks, contraindications, and monitoring. Detailed page content in progress."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Is TRT safe?", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
      ]}
    />
  );
}
