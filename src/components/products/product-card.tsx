"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice, calculateDiscount, getProductImageUrl } from "@/utils/format";
import { productHasVariants } from "@/lib/dress-variants";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onQuickView, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product._id);
  const hasVariants = productHasVariants(product);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const imageUrl = getProductImageUrl(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasVariants) return;
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl,
      slug: product.slug.current,
      stock: product.stock,
    });
    setCartOpen(true);
    toast.success("Added to your bag");
  };

  return (
    <motion.article
      className={cn("group relative", className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/products/${product.slug.current}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl bg-muted shadow-sm transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-black/[0.06]">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-accent text-accent-foreground border-0 px-2 sm:px-2.5 text-[9px] sm:text-[10px] tracking-wider uppercase">
              -{discount}%
            </Badge>
          )}
          {product.isNewArrival && !discount && (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-primary/90 text-primary-foreground border-0 px-2 sm:px-2.5 text-[9px] sm:text-[10px] tracking-wider uppercase">
              New
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 flex gap-1.5 sm:gap-2 translate-y-0 opacity-100 sm:translate-y-full sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-400 ease-out">
            {hasVariants ? (
              <Button size="sm" className="flex-1 rounded-full h-8 sm:h-9 text-[10px] sm:text-xs tracking-wide" asChild>
                <Link href={`/products/${product.slug.current}`} onClick={(e) => e.stopPropagation()}>
                  Select Options
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                className="flex-1 rounded-full h-8 sm:h-9 text-[10px] sm:text-xs tracking-wide min-w-0"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5 shrink-0" />
                <span className="truncate sm:hidden">Add</span>
                <span className="truncate hidden sm:inline">Add to Bag</span>
              </Button>
            )}
            {onQuickView && (
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 p-0 bg-white/95 hover:bg-white shrink-0 hidden sm:inline-flex"
                onClick={(e) => { e.preventDefault(); onQuickView(product); }}
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
        <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-1.5 px-0.5">
          {product.brand && (
            <p className="label-caps truncate">{product.brand.name}</p>
          )}
          <h3 className="font-medium text-xs sm:text-sm leading-snug line-clamp-2 tracking-wide text-foreground/90">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-sm font-semibold tracking-wide">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1.5 pt-1">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  className="h-3 w-3 rounded-full border border-border/60 shrink-0"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-muted-foreground">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
          {product.averageRating && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-accent">★</span>
              <span>{product.averageRating}</span>
              <span className="opacity-60">({product.reviewCount})</span>
            </div>
          )}
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleItem(product._id);
          toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
        }}
        className={cn(
          "absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm",
          "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-105",
          inWishlist && "opacity-100 text-accent"
        )}
        aria-label="Add to wishlist"
      >
        <Heart className={cn("h-3.5 w-3.5", inWishlist && "fill-current")} />
      </button>
    </motion.article>
  );
}
