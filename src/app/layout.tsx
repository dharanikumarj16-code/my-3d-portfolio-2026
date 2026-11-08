import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import AppOverlays from "@/components/app-overlays";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  metadataBase: new URL(config.site),
  applicationName: config.title,
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    siteName: config.title,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: config.site,
  },
  publisher: config.author,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.png",
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        spaceGrotesk.variable,
        inter.variable,
        jetbrainsMono.variable,
        "font-body",
        "scroll-smooth",
      ].join(" ")}
      style={
        {
          "--font-sans": "var(--font-body)",
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <head>
        <Script
          defer
          src={process.env.UMAMI_DOMAIN}
          data-website-id={process.env.UMAMI_SITE_ID}
        ></Script>
        <Script
          id="ld-json-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: config.title,
              url: config.site,
              description: config.description.long,
              author: {
                "@type": "Person",
                name: config.author,
              },
              publisher: {
                "@type": "Person",
                name: config.author,
              },
            }),
          }}
        />
        <Analytics />
        <SpeedInsights />
      </head>
      <body className="font-body antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <Providers>
          <Header />
          {children}
          <Footer />
          <AppOverlays />
        </Providers>
      </body>
    </html>
  );
}
