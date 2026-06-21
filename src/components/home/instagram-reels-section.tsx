"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/shared/container";
import { InstagramReelCard } from "@/components/shared/instagram-reel-card";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import type { InstagramReel } from "@/types";

interface InstagramReelsSectionProps {
  reels: InstagramReel[];
  title?: string;
  subtitle?: string;
  label?: string;
  className?: string;
}

export function InstagramReelsSection({
  reels,
  title = "From the Atelier",
  subtitle = "Watch our latest reels on site, or open on Instagram.",
  label = "Instagram",
}: InstagramReelsSectionProps) {
  const featured = reels.filter((r) => r.featured !== false).slice(0, 6);
  if (featured.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-[#fafaf9] border-t border-border/60">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <p className="label-caps mb-4">{label}</p>
            <div className="oud-accent-bar mb-5" />
            <h2 className="font-heading text-2xl sm:text-3xl leading-tight mb-4 font-normal text-foreground">{title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-sm">{subtitle}</p>
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] font-medium text-primary hover:opacity-70 transition-opacity"
            >
              @{INSTAGRAM_HANDLE}
              <ExternalLink className="size-3 w-3 opacity-60" />
            </Link>
          </div>

          <div className="lg:col-span-9 flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
            {featured.map((reel, i) => (
              <motion.div
                key={reel._id}
                className="snap-start"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <InstagramReelCard reel={reel} index={i} variant="carousel" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

interface ProductReelsProps {
  reels: InstagramReel[];
  productName: string;
}

export function ProductInstagramReels({ reels, productName }: ProductReelsProps) {
  if (!reels.length) return null;

  return (
    <div className="mt-12 pt-12 border-t border-border">
      <p className="label-caps mb-2">Instagram</p>
      <h3 className="font-heading text-xl sm:text-2xl text-foreground mb-6 font-normal">
        See {productName} in action
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
        {reels.map((reel, i) => (
          <InstagramReelCard key={reel._id} reel={reel} index={i} variant="grid" />
        ))}
      </div>
    </div>
  );
}
