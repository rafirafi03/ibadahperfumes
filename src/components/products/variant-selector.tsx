"use client";

import { cn } from "@/lib/utils";
import type { Product, ProductColor } from "@/types";
import { getProductSizes, getVariantStock } from "@/lib/dress-variants";

interface VariantSelectorProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

export function VariantSelector({
  product,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: VariantSelectorProps) {
  const sizes = getProductSizes(product);
  const colors = product.colors ?? [];

  return (
    <div className="space-y-5 mb-6">
      {colors.length > 0 && (
        <div>
          <p className="label-caps mb-3">
            Color — <span className="text-foreground normal-case tracking-normal font-medium">{selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {colors.map((color: ProductColor) => {
              const inStock = sizes.some((size) => getVariantStock(product, size, color.name) > 0);
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  disabled={!inStock}
                  onClick={() => onColorChange(color.name)}
                  title={color.name}
                  aria-label={`Color ${color.name}`}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative h-9 w-9 rounded-full border-2 transition-all",
                    isSelected ? "border-primary scale-110 shadow-sm" : "border-border/80 hover:border-primary/50",
                    !inStock && "opacity-40 cursor-not-allowed"
                  )}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <span className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-primary ring-offset-background" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <p className="label-caps mb-3">
          Size — <span className="text-foreground normal-case tracking-normal font-medium">{selectedSize}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const stock = selectedColor
              ? getVariantStock(product, size, selectedColor)
              : product.stock;
            const available = stock > 0;
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                disabled={!available}
                onClick={() => onSizeChange(size)}
                className={cn(
                  "min-w-[2.75rem] h-10 px-3 rounded-full border text-sm font-medium transition-all",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border/80 hover:border-primary/40 text-foreground",
                  !available && "opacity-40 line-through cursor-not-allowed"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          True to size · Model wears size S
        </p>
      </div>
    </div>
  );
}
