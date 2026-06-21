"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types";

interface FeaturedSpotlightProps {
  products: Product[];
}

export function FeaturedSpotlight({ products }: FeaturedSpotlightProps) {
  if (products.length === 0) return null;

  const [hero, ...rest] = products;

  return (
    <section className="py-20 sm:py-24 bg-[#fafaf9]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <p className="label-caps mb-4">Editor&apos;s Pick</p>
            <div className="oud-accent-bar mb-5" />
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground leading-tight font-normal mb-5">
              Signature fragrances
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm text-sm sm:text-base">
              Hand-selected oud compositions — refined, long-lasting, and crafted with intention.
            </p>
            <Link
              href="/products?featured=true"
              className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] font-medium text-primary hover:opacity-70 transition-opacity"
            >
              View all featured
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-8 space-y-3">
            <ProductCard product={hero} layout="spotlight" />
            <div className="grid sm:grid-cols-2 gap-3">
              {rest.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} layout="compact" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
