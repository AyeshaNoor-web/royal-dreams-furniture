import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import DevBanner from "@/components/shared/DevBanner";
import { SITE } from "@/lib/site";
import { aiChatEnabled } from "@/lib/flags";

// Display: Fraunces, a high-contrast serif with a real italic. Body and labels: Instrument Sans, 400 and 500 only.
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const title = SITE.name + " | Made-to-Measure Furniture, Sofas, Beds & Wardrobes in the UAE";
const description =
  "Made-to-measure sofas, beds, dining tables, curtains, wardrobes, walk-in closets and media walls, designed, built and installed across Dubai, Abu Dhabi and all Emirates.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s | " + SITE.name },
  description,
  keywords: [
    "custom furniture UAE", "wall paneling Dubai", "walk-in closet Dubai", "fitted wardrobes UAE", "TV unit Dubai",
    "media wall UAE", "dressing table Dubai", "custom joinery Abu Dhabi", "made to measure wardrobes Sharjah", SITE.name,
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE.url,
    siteName: SITE.name,
    title,
    description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE.name + " showroom" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FAF5EF" };

// Search engines: one FurnitureStore entity with a stable @id, referenced by the WebSite. Only facts the site states.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": SITE.url + "/#business",
  name: SITE.name,
  url: SITE.url,
  image: SITE.url + "/og-image.jpg",
  telephone: "+" + SITE.phones[0].intl,
  priceRange: "$$$",
  address: { "@type": "PostalAddress", addressLocality: SITE.showroom.city, addressRegion: SITE.showroom.city, addressCountry: "AE", streetAddress: SITE.showroom.area },
  areaServed: ["Dubai", "Sharjah", "Ajman", "Abu Dhabi", "Al Ain", "Ras Al Khaimah", "Umm Al Quwain", "Fujairah"],
  sameAs: SITE.instagramAccounts.map((a) => a.url),
  makesOffer: { "@type": "Offer", itemOffered: { "@type": "Service", name: "Made-to-measure furniture and joinery, designed in 3D and installed", areaServed: "United Arab Emirates" } },
};
const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE.url + "/#website", url: SITE.url, name: SITE.name, publisher: { "@id": SITE.url + "/#business" } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable + " " + body.variable}>
      <body className="bg-beige pb-[calc(76px+env(safe-area-inset-bottom))] font-dm text-charcoal antialiased sm:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([businessJsonLd, websiteJsonLd]) }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <DevBanner />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget ai={aiChatEnabled && Boolean(process.env.ANTHROPIC_API_KEY)} />
      </body>
    </html>
  );
}
