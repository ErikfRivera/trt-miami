import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/trt-gels/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT Gels in Miami — Strong Health" },
  description:
    "Transdermal testosterone gels in Miami. Daily topical dosing, physician-supervised. Page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function TrtGelsPage() {
  return (
    <PageStub
      eyebrow="TRT Method · Miami, FL"
      heading="TRT Gels in Miami"
      intro="Topical testosterone gels — daily transdermal dosing, no injections, no pellet insertions. Useful for patients who prefer self-administered home therapy."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "TRT Gels", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "Compare with TRT injections", href: "/trt-injections/" },
        { label: "Compare with TRT pellets", href: "/trt-pellets/" },
        { label: "TRT clinic in Miami", href: "/trt-clinic-miami/" },
      ]}
    />
  );
}
