import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { PageStub } from "@/components/page-stub";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";

const PAGE_PATH = "/trt-before-and-after/" as const;
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

export const metadata: Metadata = {
  title: { absolute: "TRT Before and After: 12-Week Timeline — Strong Health Miami" },
  description:
    "What to expect in the first 12 weeks of TRT — energy, mood, body composition, sleep. Detailed page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function TrtBeforeAndAfterPage() {
  return (
    <>
      <PageStub
        eyebrow="TRT Timeline · Miami, FL"
        heading="TRT before and after: 12-week timeline"
        intro="What to expect in the first 12 weeks of TRT — energy, mood, body composition, sleep. Detailed page content in progress."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "TRT before and after: 12-week timeline", path: PAGE_PATH },
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
