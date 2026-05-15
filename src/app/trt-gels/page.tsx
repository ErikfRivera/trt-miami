import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import { buildBreadcrumbList, buildMedicalTherapy } from "@/lib/schema";

const PAGE_PATH = "/trt-gels/" as const;
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

const schemaNodes = [
  buildMedicalTherapy({
    pagePath: PAGE_PATH,
    name: "Testosterone Gel Therapy",
    alternateNames: ["TRT Gels", "Transdermal Testosterone"],
    indication: "Male hypogonadism (low testosterone)",
    adverseOutcomes: ["Skin irritation", "Transfer risk to others", "Hormonal imbalance if misapplied"],
    contraindications: ["Women", "Children", "Patients with skin conditions at application site"],
  }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "TRT Gels", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: "TRT Gels in Miami — Strong Health" },
  description:
    "Transdermal testosterone gels in Miami. Daily topical dosing, physician-supervised. Page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function TrtGelsPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
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
