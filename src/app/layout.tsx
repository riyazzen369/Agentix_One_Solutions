import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { LeadModalProvider } from "@/components/LeadModal";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";
import { OfferBanner } from "@/components/OfferBanner";
import { organizationLd, websiteLd } from "@/lib/seo";

// Latin text fonts are preloaded by Next. The rupee sign (₹) is not in the latin subset, so it comes from
// tiny ₹-only files that the browser fetches only on pages that show a price.
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});
const grotesk = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — AI Agency in Bengaluru | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, locale: site.locale, type: "website", url: "/", title: site.name, description: site.description },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#FFF21A", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${inter.variable} ${grotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="pb-[76px] sm:pb-0">
        <LeadModalProvider>
          <OfferBanner />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <StickyMobileCTA />
        </LeadModalProvider>
        <RevealObserver />
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
