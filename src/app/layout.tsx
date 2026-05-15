import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
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
  title: {
    default: "Strong Health TRT Therapy Miami",
    template: "%s · Strong Health TRT Therapy Miami",
  },
  description: defaultDescription,
  applicationName: "Strong Health TRT Therapy Miami",
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
    siteName: "Strong Health TRT Therapy Miami",
    url: siteUrl,
    title: "Strong Health TRT Therapy Miami",
    description: socialDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strong Health TRT Therapy Miami",
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
        <SiteHeader />
        <main className="flex-1 pb-24 lg:pb-0">{children}</main>
        <SiteFooter />
        <StickyMobileCallBar />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
