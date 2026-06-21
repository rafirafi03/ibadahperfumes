"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductTabsProps {
  featured: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}

const tabs = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New In" },
  { id: "popular", label: "Best Sellers" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProductTabs({ featured, newArrivals, bestSellers }: ProductTabsProps) {
  const [active, setActive] = useState<TabId>("featured");

  const products =
    active === "featured" ? featured : active === "new" ? newArrivals : bestSellers;

  const viewAllHref =
    active === "featured"
      ? "/products?featured=true"
      : active === "new"
        ? "/products?sort=newest"
        : "/products?sort=popular";

  if (!featured.length && !newArrivals.length && !bestSellers.length) return null;

  return (
    <section className="py-20 sm:py-24 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <p className="label-caps mb-4">Shop</p>
            <div className="oud-accent-bar mb-5" />
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground leading-tight font-normal">
              Find your scent
            </h2>
          </div>

          <div className="flex gap-8 border-b border-border w-full lg:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "pb-3 text-[0.62rem] uppercase tracking-[0.2em] font-medium transition-colors border-b -mb-px",
                  active === tab.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] font-medium text-primary border border-primary/30 px-8 h-11 items-center hover:bg-primary hover:text-white transition-colors rounded-sm"
          >
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
