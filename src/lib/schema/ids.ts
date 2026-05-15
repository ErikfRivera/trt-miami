import { absoluteUrl, type SitePath } from "@/lib/site";
import { business } from "@/lib/business";

export const HOME_BUSINESS_ID = `${business.url}/#business`;
export const HOME_FAQ_ID = `${business.url}/#faq`;
export const HOME_BREADCRUMBS_ID = `${business.url}/#breadcrumbs`;

export const physicianId = (physicianUrl: string) => `${physicianUrl}#physician`;
export const branchBusinessId = (branchPath: SitePath) =>
  `${absoluteUrl(branchPath)}#business`;
export const procedureId = (pagePath: SitePath) =>
  `${absoluteUrl(pagePath)}#procedure`;
export const therapyId = (pagePath: SitePath) =>
  `${absoluteUrl(pagePath)}#therapy`;
export const serviceId = (pagePath: SitePath) =>
  `${absoluteUrl(pagePath)}#service`;
export const faqId = (pagePath: SitePath) =>
  pagePath === "/" ? HOME_FAQ_ID : `${absoluteUrl(pagePath)}#faq`;
export const breadcrumbId = (pagePath: SitePath) =>
  pagePath === "/" ? HOME_BREADCRUMBS_ID : `${absoluteUrl(pagePath)}#breadcrumbs`;
export const reviewId = (slug: string) => `${business.url}/#review-${slug}`;
