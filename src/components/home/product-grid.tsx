"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/components/shared/motion";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
  label?: string;
  viewAllHref?: string;
  variant?: "parchment" | "cream" | "sand";
}

export function ProductGrid({ products, title, subtitle, label, viewAllHref, variant = "parchment" }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("py-16 sm:py-22 md:py-26", variant === "cream" && "section-cream", variant === "sand" && "section-sand", variant === "parchment" && "section-parchment")}>
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
          <SectionHeading title={title} subtitle={subtitle} label={label} align="left" className="mb-0" />
          {viewAllHref && (
            <Button variant="outline" className="w-full sm:w-auto shrink-0 border-primary/30 text-primary hover:bg-primary hover:text-white" asChild>
              <Link href={viewAllHref}>
                View All <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {products.map((product) => (
            <motion.div key={product._id} variants={fadeIn}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
