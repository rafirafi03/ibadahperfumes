"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/shared/container";
import { SafeImage } from "@/components/shared/safe-image";
import { categoryImage } from "@/lib/images";
import type { Category } from "@/types";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  const featured = categories.filter((c) => c.featured).slice(0, 6);

  return (
    <section className="py-14 sm:py-18 md:py-22 section-parchment">
      <Container>
        <SectionHeading
          title="Shop by Collection"
          subtitle="Explore oud perfumes, attars, and gift sets"
          label="Categories"
          align="left"
        />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {featured.map((category, i) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="snap-start shrink-0 w-[160px] sm:w-[180px]"
            >
              <Link href={`/products?category=${category.slug.current}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-mint ring-1 ring-border transition-all duration-300 group-hover:ring-primary/40 group-hover:shadow-[0_12px_32px_-10px_rgba(10,74,8,0.15)]">
                  <SafeImage
                    src={category.imageUrl || categoryImage(i)}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="180px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-heading text-base sm:text-lg leading-tight">{category.name}</h3>
                    {category.productCount && (
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/70 mt-1.5 font-medium">
                        {category.productCount} items
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 sm:mt-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary hover:underline underline-offset-4"
          >
            View all collections
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
