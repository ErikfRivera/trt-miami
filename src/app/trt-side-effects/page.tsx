import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import { buildBreadcrumbList, buildMedicalWebPage, buildPageCitationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/trt-side-effects/" as const;
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

const schemaNodes = [
  buildMedicalWebPage({ pagePath: PAGE_PATH, lastReviewed, specialty: "Endocrinology" }),
  buildPageCitationSchema(PAGE_PATH, citations),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "TRT side effects", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: "TRT Side Effects: What to Watch For — Strong Health Miami",
  description:
    "Common and uncommon side effects of testosterone replacement therapy and how we monitor for them. Detailed page content in progress.",
});

export default function TrtSideEffectsPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="TRT Side Effects · Miami, FL"
        heading="TRT side effects"
        intro="Common and uncommon side effects of testosterone replacement therapy and how we monitor for them. Detailed page content in progress."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "TRT side effects", path: PAGE_PATH },
        ]}
        relatedLinks={[
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
