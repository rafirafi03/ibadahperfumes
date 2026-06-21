"use client";

import { SafeImage } from "@/components/shared/safe-image";
import { unsplashUrl, UNSPLASH } from "@/lib/images";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Banner } from "@/types";

export function PromotionalBanners({ banners }: { banners: Banner[] }) {
  const promos = banners.filter((b) => b.type === "promotional");
  if (promos.length === 0) return null;

  return (
    <section className="py-12 md:py-16 section-oud">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {promos.map((banner, i) => (
            <motion.div
              key={banner._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={banner.link || "/products"}
                className="group block relative overflow-hidden rounded-2xl ring-1 ring-white/15 bg-brand-green-dark min-h-[200px] sm:min-h-[220px]"
              >
                <SafeImage
                  src={banner.imageUrl || unsplashUrl(UNSPLASH.promo, 1200)}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
                <div className="relative z-10 flex flex-col justify-center h-full p-8 sm:p-10 text-white">
                  {banner.subtitle && (
                    <p className="label-caps text-white/65 mb-2">{banner.subtitle}</p>
                  )}
                  <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-medium leading-tight max-w-sm">
                    {banner.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-[0.14em] font-semibold text-white/80 group-hover:text-white transition-colors">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
