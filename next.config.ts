import type { NextConfig } from "next";

// Photos and clips are never edited in place: a changed picture gets a new file name. That is what
// lets browsers and the Vercel edge keep them for a year.
const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // WebP only: AVIF encodes several times slower on a cold request and this site has many images that are each
    // requested rarely, so visitors were waiting on the encoder instead of the download.
    formats: ["image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536],
    minimumCacheTTL: 31536000,
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
