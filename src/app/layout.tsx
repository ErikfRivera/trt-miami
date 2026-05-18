import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import { PhoneClickTracker } from "@/components/phone-click-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyMobileCallBar } from "@/components/sticky-mobile-call-bar";
import { gscVerificationToken } from "@/lib/analytics";
import { business } from "@/lib/business";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const defaultDescription = `${business.name} provides testosterone replacement therapy and peptide therapy in Miami, FL. Call ${business.phone.display} to schedule a consultation.`;
const socialDescription = `Testosterone replacement therapy and peptide therapy in Miami, FL. Call ${business.phone.display} to schedule a consultation.`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Sitewide brand strings are geo-neutral (STR-119). Miami pages re-add the
  // "Miami" signal via their own title/openGraph/twitter overrides; non-Miami
  // city/spoke pages inherit these neutral defaults instead of leaking Miami
  // into og:site_name, the <title> template, applicationName, etc.
  title: {
    default: business.name,
    template: `%s · ${business.name}`,
  },
  description: defaultDescription,
  applicationName: business.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    url: siteUrl,
    title: business.name,
    description: socialDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: socialDescription,
  },
  ...(gscVerificationToken
    ? { verification: { google: gscVerificationToken } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1 pb-24 lg:pb-0">{children}</main>
        <SiteFooter />
        <StickyMobileCallBar />
        <PhoneClickTracker />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
