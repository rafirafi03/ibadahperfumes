"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const heroBanners = banners.filter((b) => b.type === "hero");
  if (heroBanners.length === 0) return null;

  const banner = heroBanners[current];
  const next = () => setCurrent((c) => (c + 1) % heroBanners.length);
  const prev = () => setCurrent((c) => (c - 1 + heroBanners.length) % heroBanners.length);

  return (
    <section className="relative bg-[#fafaf9] overflow-hidden">
      <div className="grid lg:grid-cols-12 min-h-[min(88vh,780px)]">
        {/* Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {banner.subtitle && (
                <>
                  <p className="label-caps mb-4">{banner.subtitle}</p>
                  <div className="oud-accent-bar mb-6" />
                </>
              )}
              <h1 className="font-heading text-[2.25rem] leading-[1.08] sm:text-4xl md:text-[2.75rem] lg:text-5xl font-normal text-foreground text-balance mb-5">
                {banner.title}
              </h1>
              {banner.description && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mb-9">
                  {banner.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                {banner.link && (
                  <Button
                    size="lg"
                    className="h-11 rounded-sm bg-primary text-white hover:bg-brand-green-dark px-8 text-[0.65rem] uppercase tracking-[0.18em] font-medium"
                    asChild
                  >
                    <Link href={banner.link}>
                      {banner.buttonText || "Shop Collection"}
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-sm border-border text-foreground hover:border-primary/40 hover:text-primary px-8 text-[0.65rem] uppercase tracking-[0.18em] font-medium bg-transparent"
                  asChild
                >
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {heroBanners.length > 1 && (
            <div className="flex items-center gap-4 mt-12 pt-6 border-t border-border/70">
              <div className="flex gap-1.5">
                {heroBanners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={cn(
                      "h-px transition-all duration-300",
                      i === current ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground/40"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-1 ml-auto">
                <button onClick={prev} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Previous">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={next} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Next">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[400px] lg:min-h-full order-1 lg:order-2 bg-[#f0f0ee]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <SafeImage
                src={banner.imageUrl || heroImage(0)}
                alt={banner.title}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
