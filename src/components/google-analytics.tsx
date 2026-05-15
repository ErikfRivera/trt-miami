import Script from "next/script";
import { ga4MeasurementId } from "@/lib/analytics";

export function GoogleAnalytics() {
  if (!ga4MeasurementId) return null;

  const id = ga4MeasurementId;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{send_page_view:true});`}
      </Script>
    </>
  );
}
