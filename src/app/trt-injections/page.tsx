import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import { buildBreadcrumbList, buildMedicalTherapy, buildPageCitationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/trt-injections/" as const;
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

const schemaNodes = [
  buildMedicalTherapy({
    pagePath: PAGE_PATH,
    name: "Testosterone Injection Therapy",
    alternateNames: ["TRT Injections", "Testosterone Cypionate", "Testosterone Enanthate"],
    indication: "Male hypogonadism (low testosterone)",
    adverseOutcomes: ["Injection site pain", "Polycythemia", "Hormonal fluctuations"],
    contraindications: ["Active prostate cancer", "Breast cancer", "Untreated sleep apnea"],
  }),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "TRT Injections", path: PAGE_PATH }], PAGE_PATH),
  buildPageCitationSchema(PAGE_PATH, citations),
];

export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: "TRT Injections in Miami — Strong Health",
  description:
    "Testosterone replacement therapy by intramuscular and subcutaneous injection in Miami. Page content in progress.",
});

export default function TrtInjectionsPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
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
