"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/shared/safe-image";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice, calculateDiscount, getProductImageUrl } from "@/utils/format";
import { productHasVariants } from "@/lib/fragrance-variants";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const GRID_IMAGE_HEIGHT = "h-[240px] sm:h-[270px]";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
  layout?: "grid" | "list" | "spotlight" | "compact";
}

export function ProductCard({ product, onQuickView, className, layout = "grid" }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product._id);
  const hasVariants = productHasVariants(product);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const imageUrl = getProductImageUrl(product);
  const productHref = `/products/${product.slug.current}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasVariants) return;
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: getProductImageUrl(product),
      slug: product.slug.current,
      stock: product.stock,
    });
    setCartOpen(true);
    toast.success("Added to your bag");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product._id);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  if (layout === "spotlight") {
    return (
      <Link href={productHref} className={cn("group block overflow-hidden bg-white border border-border hover:border-primary/20 transition-colors", className)}>
        <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-[#f0f0ee]">
          <SafeImage
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-6 sm:p-8">
          {product.brand && <p className="label-caps mb-2">{product.brand.name}</p>}
          <h3 className="font-heading text-xl sm:text-2xl leading-snug text-foreground font-normal mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 max-w-lg mb-4">{product.shortDescription}</p>
          <span className="text-sm font-medium text-foreground tracking-wide">{formatPrice(product.price)}</span>
        </div>
      </Link>
    );
  }

  if (layout === "compact") {
    return (
      <Link href={productHref} className={cn("group flex gap-4 p-5 bg-white border border-border hover:border-primary/20 transition-colors", className)}>
        <div className="relative size-20 sm:size-24 shrink-0 overflow-hidden bg-brand-mint">
          <SafeImage src={imageUrl} alt={product.name} fill className="object-cover" sizes="96px" />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          {product.brand && <p className="product-brand mb-1">{product.brand.name}</p>}
          <h3 className="font-product text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>
          <span className="price-display-card mt-2">{formatPrice(product.price)}</span>
        </div>
      </Link>
    );
  }

  if (layout === "list") {
    return (
      <article className={cn("group product-card flex overflow-hidden", className)}>
        <Link
          href={productHref}
          className="relative h-[140px] w-[112px] sm:h-[168px] sm:w-[132px] shrink-0 overflow-hidden product-card__media"
          aria-label={product.name}
        >
          <SafeImage src={imageUrl} alt={product.name} fill className="object-cover object-center" sizes="132px" />
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between px-4 py-3.5 sm:px-5 sm:py-4 product-card__body border-t-0 border-l border-border">
          <Link href={productHref}>
            {product.brand && <p className="product-brand mb-1.5">{product.brand.name}</p>}
            <h3 className="font-product text-lg line-clamp-2 group-hover:text-muted-foreground transition-colors">{product.name}</h3>
            <div className="flex items-baseline gap-2 mt-2.5">
              <span className="price-display-card text-base">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through font-light">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
          </Link>
          <div className="flex gap-2 mt-3">
            {hasVariants ? (
              <Button size="sm" variant="outline" className="flex-1 rounded-full border-border hover:border-foreground/40" asChild>
                <Link href={productHref}>Select Options</Link>
              </Button>
            ) : (
              <Button size="sm" className="flex-1 rounded-full bg-primary text-white hover:bg-brand-green-dark" onClick={handleAddToCart}>
                <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />Add to Bag
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className={cn("size-9 p-0 rounded-full shrink-0", inWishlist && "bg-secondary border-foreground/30")}
              onClick={handleWishlist}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-3.5 w-3.5", inWishlist && "fill-foreground text-foreground")} />
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <motion.article
      className={cn("group h-full", className)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="product-card h-full flex flex-col">
        <div className={cn("relative product-card__media w-full shrink-0", GRID_IMAGE_HEIGHT)}>
          <Link href={productHref} className="absolute inset-0 z-[1]" aria-label={product.name}>
            <SafeImage
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 45vw, 25vw"
            />
          </Link>
          {discount > 0 && (
            <Badge className="absolute top-2.5 left-2.5 z-[2] rounded-full bg-white text-foreground border-0 text-[9px] uppercase tracking-[0.14em] font-sans font-semibold pointer-events-none shadow-sm">
              -{discount}%
            </Badge>
          )}
          {product.isNewArrival && !discount && (
            <Badge className="absolute top-2.5 left-2.5 z-[2] rounded-full bg-white/95 text-foreground border border-border text-[9px] uppercase tracking-[0.14em] font-sans pointer-events-none shadow-sm">
              New
            </Badge>
          )}
          <button
            type="button"
            onClick={handleWishlist}
            className={cn(
              "absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-all duration-300",
              inWishlist ? "product-card__wishlist-active" : "product-card__wishlist"
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-3.5 w-3.5", inWishlist && "fill-current")} />
          </button>
        </div>

        <div className="product-card__body flex flex-col flex-1 px-3.5 py-3.5 sm:px-4 sm:py-4">
          <Link href={productHref} className="block flex-1">
            {product.brand && <p className="product-brand mb-1.5">{product.brand.name}</p>}
            <h3 className="font-product text-[0.9rem] sm:text-[1rem] leading-snug line-clamp-2 group-hover:text-muted-foreground transition-colors duration-300">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="price-display-card">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-xs text-muted-foreground line-through font-light">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
          </Link>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            {hasVariants ? (
              <Button size="sm" variant="outline" className="flex-1 min-w-0 rounded-full h-9 text-xs font-sans tracking-wide border-border hover:border-foreground/40" asChild>
                <Link href={productHref}>Select Options</Link>
              </Button>
            ) : (
              <Button size="sm" className="flex-1 min-w-0 rounded-full h-9 text-xs font-sans tracking-wide bg-primary text-white hover:bg-brand-green-dark" onClick={handleAddToCart}>
                <ShoppingBag className="h-3 w-3 mr-1.5 shrink-0" /> Add to Bag
              </Button>
            )}
            {onQuickView && (
              <Button
                size="icon"
                variant="outline"
                className="size-9 shrink-0 rounded-full border-border hover:border-foreground/40"
                onClick={(e) => { e.preventDefault(); onQuickView(product); }}
                aria-label="Quick view"
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
