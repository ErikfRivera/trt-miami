import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rawGaMeasurementId = process.env.NEXT_PUBLIC_GA4_ID?.trim();
const gaMeasurementId =
  rawGaMeasurementId && rawGaMeasurementId !== "G-PLACEHOLDER"
    ? rawGaMeasurementId
    : undefined;

const rawGscVerification = process.env.GSC_VERIFICATION_TOKEN?.trim();
const gscVerificationToken =
  rawGscVerification && rawGscVerification !== "PLACEHOLDER"
    ? rawGscVerification
    : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Miami TRT — Testosterone Replacement Therapy in Miami, FL",
    template: "%s | Miami TRT",
  },
  description:
    "Testosterone replacement therapy (TRT) for men in the Miami area. Bloodwork, physician-supervised protocols, and ongoing follow-up.",
  applicationName: "Miami TRT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Miami TRT",
    title: "Miami TRT — Testosterone Replacement Therapy in Miami, FL",
    description:
      "Testosterone replacement therapy (TRT) for men in the Miami area. Bloodwork, physician-supervised protocols, and ongoing follow-up.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miami TRT — Testosterone Replacement Therapy in Miami, FL",
    description:
      "Testosterone replacement therapy (TRT) for men in the Miami area. Bloodwork, physician-supervised protocols, and ongoing follow-up.",
  },
  robots: { index: true, follow: true },
  verification: gscVerificationToken
    ? { google: gscVerificationToken }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
      <body className="min-h-full flex flex-col">{children}</body>
      {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
    </html>
  );
}
