"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for the self-hosted photo set. Every .jpg under /images and /video has 480, 960 and 1600px
 * WebP siblings made at build-prep time (scripts/make-webp.mjs); the loader picks the smallest that covers the
 * requested width. Anything else (brand PNGs, external URLs) is served untouched. No image optimizer is involved,
 * so there is no quota to run out of.
 */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (!/^\/(images|video)\/.+\.jpg$/.test(src)) return src;
  const w = width <= 480 ? 480 : width <= 960 ? 960 : 1600;
  return src.replace(/\.jpg$/, `-${w}w.webp`);
}
