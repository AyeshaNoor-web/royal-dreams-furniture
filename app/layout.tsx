import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import DevBanner from "@/components/shared/DevBanner";
import { SITE } from "@/lib/site";

// Display: an elegant transitional serif that stays legible at card sizes. Body: geometric, quiet.
const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
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

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#E8D5C4" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable + " " + body.variable}>
      <body className="bg-beige font-dm text-charcoal antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <DevBanner />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
