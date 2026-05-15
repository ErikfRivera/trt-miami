import type { SitePath } from "@/lib/site";
import { faqId } from "./ids";
import type { FaqItem, SchemaNode } from "./types";

export const buildFaqPage = (
  items: readonly FaqItem[],
  pagePath: SitePath = "/",
): SchemaNode =>
  ({
    "@type": "FAQPage",
    "@id": faqId(pagePath),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }) as SchemaNode;
