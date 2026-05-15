import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";

const PAGE_PATH = "/trt-before-and-after/" as const;

export const metadata: Metadata = {
  title: { absolute: "TRT Before and After: 12-Week Timeline — Strong Health Miami" },
  description:
    "What to expect in the first 12 weeks of TRT — energy, mood, body composition, sleep. Detailed page content in progress.",
  alternates: { canonical: PAGE_PATH },
};

export default function TrtBeforeAndAfterPage() {
  return (
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
  );
}
