export type CitationItem = {
  title: string;
  url: string;
  publisher: string;
  year?: number;
  dateAccessed?: string;
  pmid?: string;
  doi?: string;
};

export type CitationReviewer = {
  slug: string;
  name: string;
  credentials: string;
};

export type PageCitations = {
  citations: readonly CitationItem[];
  lastReviewed: string;
};
