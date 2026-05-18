import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { SchemaGraph } from "@/components/schema-graph";
import { YmylDocPage } from "@/components/ymyl-doc-page";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalWebPage,
  buildPageCitationSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { loadYmylDoc } from "@/lib/ymyl/doc";

const PAGE_PATH = "/is-trt-safe/" as const;
const doc = loadYmylDoc("copy-is-trt-safe");
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

const schemaNodes = [
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed,
    specialty: "Endocrinology",
    dateModified: lastReviewed,
  }),
  buildFaqPage(doc.faqs, PAGE_PATH),
  buildBreadcrumbList(
    [{ name: "Home", path: "/" }, { name: "Is TRT safe?", path: PAGE_PATH }],
    PAGE_PATH,
  ),
  buildPageCitationSchema(PAGE_PATH, citations),
];

export const metadata: Metadata = pageMetadata({
  path: PAGE_PATH,
  title: doc.frontmatter.title,
  description: doc.frontmatter.meta_description,
});

export default function IsTrtSafePage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <YmylDocPage
        doc={doc}
        lastReviewed={lastReviewed}
        eyebrow="TRT Safety · Miami, FL"
        breadcrumbLabel="Is TRT safe?"
      >
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
      </YmylDocPage>
    </>
  );
}
