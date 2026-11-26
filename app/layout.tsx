import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header, { type MenuGroup } from "@/components/site/Header";
import SiteFooter from "@/components/site/SiteFooter";
import MobileTabBar from "@/components/site/MobileTabBar";
import { categoriesInGroup, groups } from "@/lib/gallery";
import { priceLabel, priceOf } from "@/lib/pricing";
import ChatWidget from "@/components/chat/ChatWidget";
import { SITE } from "@/lib/site";

// Fonts are bundled in app/fonts: fetching Google Fonts at build time has stalled builds on the development machine.
const body = localFont({ src: "./fonts/manrope.woff2", weight: "400 800", variable: "--font-body", display: "swap" });
const accent = localFont({
  src: [
    { path: "./fonts/cormorant.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/cormorant-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-accent",
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

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#262624" };

const menu: MenuGroup[] = groups.map((g) => ({
  title: g.title,
  items: categoriesInGroup(g.slug).map((c) => ({ title: c.title, href: "/collections/" + c.slug, price: priceLabel(c.slug), priced: !!priceOf(c.slug) })),
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={body.variable + " " + accent.variable}>
      <body className="bg-beige font-dm text-charcoal antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <Header menu={menu} />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileTabBar />
        <ChatWidget />
      </body>
    </html>
  );
}
