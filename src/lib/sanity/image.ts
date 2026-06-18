import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImage } from "@/types";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export function getImageUrl(source?: SanityImage, width = 800): string {
  if (!source) return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop";
  try {
    return urlFor(source).width(width).auto("format").url();
  } catch {
    return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop";
  }
}
