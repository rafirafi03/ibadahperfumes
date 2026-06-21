import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { heroImage } from "@/lib/images";
import { getWhatsAppHref } from "@/lib/contact";
import type { Banner } from "@/types";

export function BrandStoryStrip({ banners }: { banners: Banner[] }) {
  const promo = banners.find((b) => b.type === "promotional") || banners.find((b) => b.type === "hero");

  return (
    <section className="grid lg:grid-cols-2 border-y border-border/60 bg-white">
      <div className="flex flex-col justify-center px-8 py-16 sm:px-14 sm:py-20 lg:px-16 order-2 lg:order-1">
        <p className="label-caps mb-4">Our Philosophy</p>
        <div className="oud-accent-bar mb-6" />
        <h2 className="font-heading text-3xl sm:text-4xl leading-tight mb-5 max-w-md font-normal text-foreground">
          Fragrances rooted in devotion &amp; craft
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mb-9 text-sm sm:text-base">
          {promo?.description ||
            "Premium oud perfumes and attars sourced with care. Personal guidance on every order via WhatsApp."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 h-11 px-7 bg-primary text-white text-[0.62rem] uppercase tracking-[0.18em] font-medium hover:bg-brand-green-dark transition-colors rounded-sm"
          >
            Shop Collection
            <ArrowRight className="size-3.5" />
          </Link>
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-7 border border-border text-foreground text-[0.62rem] uppercase tracking-[0.18em] font-medium hover:border-primary/30 hover:text-primary transition-colors rounded-sm"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
      <div className="relative min-h-[300px] lg:min-h-full bg-[#f0f0ee] order-1 lg:order-2">
        <SafeImage
          src={promo?.imageUrl || heroImage(2)}
          alt="Ibadah Perfumes"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
