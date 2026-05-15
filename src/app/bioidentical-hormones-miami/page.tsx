import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/bioidentical-hormones-miami/" as const;

export const metadata: Metadata = {
  title: { absolute: "Bioidentical Hormones Miami (BHRT) — Strong Health" },
  description:
    "Bioidentical hormone replacement therapy in Miami. Plant-derived, molecularly identical hormones prescribed and monitored by a Florida-licensed physician. Page content in progress.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function BioidenticalHormonesMiamiPage() {
  return (
    <PageStub
      eyebrow="Bioidentical Hormone Replacement Therapy · Miami, FL"
      heading="Bioidentical Hormones in Miami"
      intro="Bioidentical hormone replacement therapy in Miami — pellets, creams, and injections of molecularly identical hormones, dosed to your individual lab panel."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Bioidentical Hormones Miami", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
        { label: "HRT in Miami", href: "/hrt-miami/" },
      ]}
    />
  );
}
