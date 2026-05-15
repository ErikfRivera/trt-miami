import { absoluteUrl, type SitePath } from "@/lib/site";
import type { CitationItem } from "@/lib/citations/types";
import type { SchemaNode } from "./types";

// Adds Article.citation to the MedicalWebPage node for the given page.
// Emitted as a separate JSON-LD block — Google merges it with the existing
// MedicalWebPage node via the shared @id.
export const buildPageCitationSchema = (
  pagePath: SitePath,
  citations: readonly CitationItem[],
): SchemaNode =>
  ({
    "@type": "MedicalWebPage",
    "@id": `${absoluteUrl(pagePath)}#medical-page`,
    citation: citations.map((c) => {
      const node: Record<string, unknown> = {
        "@type": "CreativeWork",
        name: c.title,
        url: c.url,
        publisher: { "@type": "Organization", name: c.publisher },
      };
      if (c.year) node.datePublished = String(c.year);
      if (c.pmid) node.identifier = `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`;
      if (c.doi) node.sameAs = `https://doi.org/${c.doi}`;
      return node;
    }),
  }) as SchemaNode;
