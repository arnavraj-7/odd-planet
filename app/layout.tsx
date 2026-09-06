import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Schibsted_Grotesk,
} from "next/font/google";

import { site } from "@/lib/content";

import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted-grotesk",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oddplanet.in"),
  title: "Odd Planet — Influencer Marketing & Content Agency",
  description:
    "Influencer campaigns, content and amplification for brands that need to be talked about. New Delhi.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Odd Planet — Influencer Marketing & Content Agency",
    description:
      "Influencer campaigns, content and amplification for brands that need to be talked about.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odd Planet — Influencer Marketing & Content Agency",
    description:
      "Influencer campaigns, content and amplification for brands that need to be talked about.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  colorScheme: "dark",
};

const organisation = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: "https://oddplanet.in",
      email: site.email,
      telephone: site.phone,
      foundingDate: String(site.founded),
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Delhi",
        addressCountry: "IN",
      },
      sameAs: [site.instagram, site.linkedin],
    },
    {
      "@type": "WebSite",
      name: site.name,
      url: "https://oddplanet.in",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />
      </body>
    </html>
  );
}
