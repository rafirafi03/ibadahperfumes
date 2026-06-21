"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SafeImage } from "@/components/shared/safe-image";
import { categoryImage } from "@/lib/images";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

export function CategoryBento({ categories }: { categories: Category[] }) {
  const featured = categories.filter((c) => c.featured).slice(0, 5);
  if (featured.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 md:py-28 bg-white border-t border-border/60">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <p className="label-caps mb-4">Collections</p>
            <div className="oud-accent-bar mb-5" />
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground leading-tight font-normal">
              Explore by scent
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 auto-rows-[160px] sm:auto-rows-[220px]">
          {featured.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                i === 0
                  ? "col-span-2 lg:col-span-7 lg:row-span-2"
                  : "col-span-1 lg:col-span-5"
              )}
            >
              <CategoryTile category={cat} index={i} large={i === 0} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryTile({
  category,
  index,
  large = false,
}: {
  category: Category;
  index: number;
  large?: boolean;
}) {
  return (
    <Link
      href={`/products?category=${category.slug.current}`}
      className="group relative block h-full overflow-hidden bg-[#f0f0ee]"
    >
      <SafeImage
        src={category.imageUrl || categoryImage(index)}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
        sizes={large ? "50vw" : "25vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
        <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/60 mb-2 font-medium">
          {category.productCount ? `${category.productCount} fragrances` : "Collection"}
        </p>
        <h3 className={cn("font-heading font-normal leading-tight", large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl")}>
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
