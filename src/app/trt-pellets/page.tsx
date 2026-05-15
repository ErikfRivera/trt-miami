import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/trt-pellets/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT Pellets in Miami — Strong Health" },
  description:
    "Subcutaneous testosterone pellet implants in Miami. 3–6 month dosing intervals, no weekly injections. Page content in progress.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function TrtPelletsPage() {
  return (
    <PageStub
      eyebrow="TRT Method · Miami, FL"
      heading="TRT Pellets in Miami"
      intro="Testosterone pellet implants — a fortnightly office procedure replaces weekly injections, with steady-state hormone levels for 3 to 6 months between insertions."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "TRT Pellets", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "Compare with TRT injections", href: "/trt-injections/" },
        { label: "Compare with TRT gels", href: "/trt-gels/" },
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
      ]}
    />
  );
}
