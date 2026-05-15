export type SchemaNode = Record<string, unknown> & { "@type": string | string[] };
export type SchemaGraph = {
  "@context": "https://schema.org";
  "@graph": SchemaNode[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ReviewInput = {
  slug: string;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  datePublishedISO: string;
  body: string;
};
