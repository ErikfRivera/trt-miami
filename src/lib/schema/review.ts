import { HOME_BUSINESS_ID, reviewId } from "./ids";
import type { ReviewInput, SchemaNode } from "./types";

export const buildReview = (input: ReviewInput): SchemaNode =>
  ({
    "@type": "Review",
    "@id": reviewId(input.slug),
    itemReviewed: { "@id": HOME_BUSINESS_ID },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(input.rating),
      bestRating: "5",
      worstRating: "1",
    },
    author: { "@type": "Person", name: input.authorName },
    datePublished: input.datePublishedISO,
    // Customer's own words; do not paraphrase (per brief §2.1).
    reviewBody: input.body,
  }) as SchemaNode;

export const aggregateRatingFromReviews = (
  reviews: readonly ReviewInput[],
): { ratingValue: number; reviewCount: number } | undefined => {
  if (reviews.length === 0) return undefined;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return {
    ratingValue: Number((total / reviews.length).toFixed(2)),
    reviewCount: reviews.length,
  };
};
