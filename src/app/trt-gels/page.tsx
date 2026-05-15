import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { PageStub } from "@/components/page-stub";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";

const PAGE_PATH = "/trt-gels/" as const;
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

export const metadata: Metadata = {
  title: { absolute: "TRT Gels in Miami — Strong Health" },
  description:
    "Transdermal testosterone gels in Miami. Daily topical dosing, physician-supervised. Page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function TrtGelsPage() {
  return (
    <>
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
