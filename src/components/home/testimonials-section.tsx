"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SafeImage } from "@/components/shared/safe-image";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const featured = testimonials.filter((t) => t.featured);
  const [index, setIndex] = useState(0);
  if (featured.length === 0) return null;

  const current = featured[index % featured.length];
  const prev = () => setIndex((i) => (i - 1 + featured.length) % featured.length);
  const next = () => setIndex((i) => (i + 1) % featured.length);

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-border/60">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-caps mb-6">Testimonials</p>
          <div className="oud-accent-bar mx-auto mb-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl leading-relaxed text-foreground font-normal text-balance mb-10">
                &ldquo;{current.content}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                {current.avatarUrl && (
                  <div className="relative size-10 rounded-full overflow-hidden bg-secondary">
                    <SafeImage src={current.avatarUrl} alt={current.name} fill className="object-cover" sizes="40px" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{current.name}</p>
                  {current.role && <p className="text-xs text-muted-foreground">{current.role}</p>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {featured.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-10">
              <button onClick={prev} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Previous">
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
              </span>
              <button onClick={next} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Next">
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
