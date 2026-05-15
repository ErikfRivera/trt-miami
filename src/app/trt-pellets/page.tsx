import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import { buildBreadcrumbList, buildMedicalTherapy } from "@/lib/schema";

const PAGE_PATH = "/trt-pellets/" as const;
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

const schemaNodes = [
  buildMedicalTherapy({
    pagePath: PAGE_PATH,
    name: "Testosterone Pellet Therapy",
    alternateNames: ["TRT Pellets", "Subcutaneous Testosterone Pellets"],
    indication: "Male hypogonadism (low testosterone)",
    adverseOutcomes: ["Pellet extrusion", "Infection at insertion site", "Hormonal fluctuations"],
    contraindications: ["Active prostate cancer", "Breast cancer"],
  }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "TRT Pellets", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT Pellets in Miami — Strong Health" },
  description:
    "Subcutaneous testosterone pellet implants in Miami. 3–6 month dosing intervals, no weekly injections. Page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function TrtPelletsPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
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
      <div className="mx-auto w-full max-w-4xl px-6 pb-16">
        <CitationBlock
          citations={citations}
          reviewer={{
            slug: primaryReviewer.slug,
            name: primaryReviewer.name,
            credentials: primaryReviewer.honorificSuffix,
          }}
          lastReviewed={lastReviewed}
          pagePath={PAGE_PATH}
        />
      </div>
    </>
  );
}
