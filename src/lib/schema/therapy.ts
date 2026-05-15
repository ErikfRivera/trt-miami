import { absoluteUrl, type SitePath } from "@/lib/site";
import { therapyId } from "./ids";
import type { SchemaNode } from "./types";

export type MedicalTherapyInput = {
  pagePath: SitePath;
  name: string;
  alternateNames?: readonly string[];
  indication: string;
  adverseOutcomes?: readonly string[];
  contraindications?: readonly string[];
  seriousAdverseOutcomes?: readonly string[];
  guideline?: {
    evidenceOrigin: string;
    evidenceLevel?: "A" | "B" | "C";
    subject: string;
  };
};

const evidenceLevelUri = (level: "A" | "B" | "C") =>
  `https://schema.org/EvidenceLevel${level}`;

export const buildMedicalTherapy = (input: MedicalTherapyInput): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "MedicalTherapy",
    "@id": therapyId(input.pagePath),
    name: input.name,
    indication: { "@type": "MedicalIndication", name: input.indication },
    url: absoluteUrl(input.pagePath),
  };
  if (input.alternateNames?.length) node.alternateName = input.alternateNames;
  if (input.adverseOutcomes?.length) {
    node.adverseOutcome = input.adverseOutcomes.map((name) => ({
      "@type": "MedicalEntity",
      name,
    }));
  }
  if (input.contraindications?.length) {
    node.contraindication = input.contraindications.map((name) => ({
      "@type": "MedicalContraindication",
      name,
    }));
  }
  if (input.seriousAdverseOutcomes?.length) {
    node.seriousAdverseOutcome = input.seriousAdverseOutcomes.map((name) => ({
      "@type": "MedicalEntity",
      name,
    }));
  }
  if (input.guideline) {
    node.guideline = {
      "@type": "MedicalGuideline",
      evidenceLevel: input.guideline.evidenceLevel
        ? evidenceLevelUri(input.guideline.evidenceLevel)
        : undefined,
      evidenceOrigin: input.guideline.evidenceOrigin,
      guidelineSubject: {
        "@type": "MedicalTherapy",
        name: input.guideline.subject,
      },
    };
  }
  return node as SchemaNode;
};
