import type { NextConfig } from "next";

// Photos and clips are never edited in place: a changed picture gets a new file name. That is what
// lets browsers and the Vercel edge keep them for a year.
const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Vercel's optimizer answered 402 (Hobby quota exhausted) on 26 Nov 2026 and every photo broke. Photos are
    // served as pre-made WebP siblings through lib/image-loader.ts (made by scripts/make-webp.mjs); no optimizer.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 960, 1600],
    imageSizes: [480],
  },
  async headers() {
    return [
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
