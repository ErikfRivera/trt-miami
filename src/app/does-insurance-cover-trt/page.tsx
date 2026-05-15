import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/does-insurance-cover-trt/" as const;

export const metadata: Metadata = {
  title: { absolute: "Does Insurance Cover TRT? — Strong Health Miami" },
  description:
    "What private insurance, Medicare, and HSAs typically cover for TRT. Detailed page content in progress.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function DoesInsuranceCoverTrtPage() {
  return (
    <PageStub
      eyebrow="Insurance & TRT · Miami, FL"
      heading="Does insurance cover TRT?"
      intro="What private insurance, Medicare, and HSAs typically cover for TRT. Detailed page content in progress."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Does insurance cover TRT?", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
      ]}
    />
  );
}
