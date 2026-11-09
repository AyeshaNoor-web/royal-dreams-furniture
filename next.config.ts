import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536],
  },
  async redirects() {
    return [{ source: "/portfolio", destination: "/gallery", permanent: false }];
  },
};

export default nextConfig;
