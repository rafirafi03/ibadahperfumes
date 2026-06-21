"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInstagramEmbedUrl, getInstagramPostUrl } from "@/lib/instagram";
import type { InstagramReel } from "@/types";
import { cn } from "@/lib/utils";

interface InstagramReelCardProps {
  reel: InstagramReel;
  index?: number;
  className?: string;
  /** Wider card for homepage carousel */
  variant?: "carousel" | "grid";
}

export function InstagramReelCard({
  reel,
  index = 0,
  className,
  variant = "carousel",
}: InstagramReelCardProps) {
  const postUrl = getInstagramPostUrl(reel.reelUrl);
  const embedUrl = getInstagramEmbedUrl(reel.reelUrl);

  const widthClass =
    variant === "carousel"
      ? "w-[210px] sm:w-[240px] md:w-[260px]"
      : "w-full";

  return (
    <article
      className={cn(
        "relative shrink-0 group flex flex-col",
        widthClass,
        className
      )}
    >
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 transition-all duration-300 hover:ring-white/25">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={embedUrl}
            title={reel.title || reel.productName || "Instagram reel"}
            className="absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-[48%] border-0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading={index < 3 ? "eager" : "lazy"}
            scrolling="no"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none scrim-bottom pt-16 pb-12 px-3 overlay-content">
          {reel.productName && (
            <p className="text-[0.58rem] uppercase tracking-[0.2em] text-white/70 mb-1 font-sans">
              {reel.productName}
            </p>
          )}
          <p className="text-sm font-medium text-white line-clamp-2 leading-snug">
            {reel.title || reel.caption}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 p-2.5">
          <Button
            size="sm"
            variant="outline"
            className="w-full h-8 rounded-full bg-black/40 backdrop-blur-sm border-white/25 text-white hover:bg-white hover:text-primary text-[0.65rem] font-sans tracking-wide"
            asChild
          >
            <Link href={postUrl} target="_blank" rel="noopener noreferrer">
              Instagram
              <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
