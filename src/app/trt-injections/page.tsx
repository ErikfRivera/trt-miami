import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/trt-injections/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT Injections in Miami — Strong Health" },
  description:
    "Testosterone replacement therapy by intramuscular and subcutaneous injection in Miami. Page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function TrtInjectionsPage() {
  return (
    <PageStub
      eyebrow="TRT Method · Miami, FL"
      heading="TRT Injections in Miami"
      intro="Testosterone cypionate and enanthate injections — the most-studied TRT modality. Weekly or twice-weekly dosing, intramuscular or subcutaneous, with quarterly bloodwork."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "TRT Injections", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "Compare with TRT pellets", href: "/trt-pellets/" },
        { label: "Compare with TRT gels", href: "/trt-gels/" },
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
      ]}
    />
  );
}
