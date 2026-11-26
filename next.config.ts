import type { NextConfig } from "next";

// Images and video have hashed-free but immutable file names by convention: a changed picture gets a new name,
// so a year-long cache is safe. See HANDOVER-CHECKLIST.md.
const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

// Report-only first: Next.js emits inline bootstrap scripts and Framer Motion writes inline styles, so a nonce-free
// enforced policy would break the site. Violations show in the browser console; tighten once reviewed.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
  "frame-ancestors 'none'",
].join("; ");

const isProduction = process.env.VERCEL_ENV === "production";

const security = [
  // Preview and branch deployments must never be indexed: they can carry placeholder prices and draft copy.
  ...(isProduction ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]),
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "X-Frame-Options", value: "DENY" },
  // Enforced subset: only frame-ancestors, which has no inline-script problem.
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The assistant reads content/knowledge.md at runtime; make sure the file is bundled with the route on Vercel.
  outputFileTracingIncludes: { "/api/chat": ["./content/**"] },
  env: {
    // One flag, usable on the server and in the browser.
    NEXT_PUBLIC_ESTIMATOR_ENABLED: process.env.ESTIMATOR_ENABLED === "true" ? "true" : "false",
  },
  images: {
    // Vercel's optimizer answered 402 (Hobby quota exhausted) on 26 Nov 2026 and every photo broke. Photos are now
    // served as pre-made WebP siblings through lib/image-loader.ts; no optimizer, no quota.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 960, 1600],
    imageSizes: [480],
  },
  async headers() {
    return [
      { source: "/:path*", headers: security },
      { source: "/images/:path*", headers: immutable },
      { source: "/video/:path*", headers: immutable },
      { source: "/brand/:path*", headers: immutable },
    ];
  },
  async redirects() {
    return [{ source: "/portfolio", destination: "/gallery", permanent: false }];
  },
};

export default nextConfig;
