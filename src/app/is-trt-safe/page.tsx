import type { Metadata } from "next";
import { CitationBlock } from "@/components/citation-block";
import { PageStub } from "@/components/page-stub";
import { pageCitations } from "@/lib/citations/page-citations";
import { primaryReviewer } from "@/lib/providers/registry";

const PAGE_PATH = "/is-trt-safe/" as const;
const { citations, lastReviewed } = pageCitations(PAGE_PATH);

export const metadata: Metadata = {
  title: { absolute: "Is TRT Safe? — Strong Health Miami" },
  description:
    "Is testosterone replacement therapy safe? A physician-reviewed overview of risks, contraindications, and monitoring. Detailed page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function IsTrtSafePage() {
  return (
    <>
      <PageStub
        eyebrow="TRT Safety · Miami, FL"
        heading="Is TRT safe?"
        intro="Is testosterone replacement therapy safe? A physician-reviewed overview of risks, contraindications, and monitoring. Detailed page content in progress."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Is TRT safe?", path: PAGE_PATH },
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
