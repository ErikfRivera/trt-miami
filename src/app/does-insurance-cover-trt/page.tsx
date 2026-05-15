import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import { buildBreadcrumbList, buildMedicalWebPage, buildPageCitationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PAGE_PATH = "/does-insurance-cover-trt/" as const;
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

const schemaNodes = [
  buildMedicalWebPage({ pagePath: PAGE_PATH, lastReviewed, specialty: "Endocrinology" }),
  buildPageCitationSchema(PAGE_PATH, citations),
  buildBreadcrumbList([{ name: "Home", path: "/" }, { name: "Does insurance cover TRT?", path: PAGE_PATH }], PAGE_PATH),
];

export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: "Does Insurance Cover TRT? — Strong Health Miami",
  description:
    "What private insurance, Medicare, and HSAs typically cover for TRT. Detailed page content in progress.",
});

export default function DoesInsuranceCoverTrtPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
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
