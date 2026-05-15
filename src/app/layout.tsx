import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { LocalBusinessSchema } from "@/components/local-business-schema";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Strong Health TRT Therapy Miami",
    template: "%s · Strong Health TRT Therapy Miami",
  },
  description:
    "Strong Health TRT Therapy Miami provides testosterone replacement therapy in Miami, FL. Call (619) 746-1616 or visit us at 697 N Miami Avenue.",
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
    description:
      "Testosterone replacement therapy in Miami, FL. Call (619) 746-1616 or visit us at 697 N Miami Avenue.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strong Health TRT Therapy Miami",
    description:
      "Testosterone replacement therapy in Miami, FL. Call (619) 746-1616 or visit us at 697 N Miami Avenue.",
  },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
