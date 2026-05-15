import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/hrt-miami/" as const;

export const metadata: Metadata = {
  title: { absolute: "HRT Miami: Hormone Replacement Therapy — Strong Health" },
  description:
    "Physician-led hormone replacement therapy in Miami. Full lab workup, individualized protocols, in-person care. Page content in progress.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function HrtMiamiPage() {
  return (
    <PageStub
      eyebrow="Hormone Replacement Therapy · Miami, FL"
      heading="Hormone Replacement Therapy in Miami"
      intro="Full-spectrum hormone replacement therapy for men and women in Miami — testosterone, estrogen, progesterone, and thyroid support, all under physician supervision with quarterly bloodwork."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "HRT Miami", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "Bioidentical hormones in Miami", href: "/bioidentical-hormones-miami/" },
      ]}
    />
  );
}
