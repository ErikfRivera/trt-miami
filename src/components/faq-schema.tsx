import { JsonLd } from "@/components/json-ld";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSchemaProps = {
  items: readonly FaqItem[];
};

export function FaqSchema({ items }: FaqSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
