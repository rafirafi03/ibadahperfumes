"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice, calculateDiscount, getProductImageUrl } from "@/utils/format";
import { productHasVariants } from "@/lib/dress-variants";
import type { Product } from "@/types";
import { toast } from "sonner";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, open, onClose }: ProductQuickViewProps) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const imageUrl = getProductImageUrl(product);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const hasVariants = productHasVariants(product);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-1.5rem)] sm:w-full max-w-3xl p-0 overflow-hidden max-h-[min(90vh,800px)]">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[min(90vh,800px)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-[3/4] max-h-[45vh] md:max-h-none md:aspect-auto md:min-h-[320px] bg-muted">
              <Image src={imageUrl} alt={product.name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
              {discount > 0 && (
                <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-accent text-accent-foreground border-0 rounded-full">
                  -{discount}%
                </Badge>
              )}
            </div>
            <div className="p-5 sm:p-6 flex flex-col min-h-0">
              {product.brand && (
                <p className="label-caps mb-2">{product.brand.name}</p>
              )}
              <h2 className="font-heading text-xl sm:text-2xl font-medium mb-2 leading-tight">{product.name}</h2>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xl sm:text-2xl font-semibold">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-muted-foreground line-through text-sm">{formatPrice(product.compareAtPrice)}</span>
                )}
              </div>
              {product.shortDescription && (
                <p className="text-muted-foreground text-sm mb-6 line-clamp-4 sm:line-clamp-none">{product.shortDescription}</p>
              )}
              <div className="mt-auto space-y-3 pt-4">
                {hasVariants ? (
                  <Button className="w-full h-11 rounded-full" asChild>
                    <Link href={`/products/${product.slug.current}`} onClick={onClose}>
                      Select Size &amp; Colour
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full h-11 rounded-full" onClick={() => {
                    addItem({ productId: product._id, name: product.name, price: product.price, imageUrl, slug: product.slug.current, stock: product.stock });
                    setCartOpen(true);
                    onClose();
                    toast.success("Added to your bag");
                  }}>
                    <ShoppingBag className="h-4 w-4 mr-2" /> Add to Bag
                  </Button>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 h-10" asChild>
                    <Link href={`/products/${product.slug.current}`} onClick={onClose}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => toggleItem(product._id)}>
                    <Heart className={isInWishlist(product._id) ? "fill-red-500 text-red-500" : ""} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
