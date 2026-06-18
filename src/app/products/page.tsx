"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Grid3x3, List, SlidersHorizontal } from "lucide-react";
import { Container, SectionHeading } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import { ProductQuickView } from "@/components/products/product-quick-view";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/services/product-service";
import { getCategories, getBrands } from "@/services/content-service";
import { SORT_OPTIONS, ITEMS_PER_PAGE } from "@/lib/constants";
import type { Product, Category, Brand } from "@/types";
import { cn } from "@/lib/utils";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 15000]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const result = await getProducts({
      search: search || undefined,
      category: category || undefined,
      brand: brand || undefined,
      sort: sort as "newest" | "price-asc" | "price-desc" | "name" | "popular",
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      page,
      limit: ITEMS_PER_PAGE,
    });
    setProducts(result.data);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setLoading(false);
  }, [search, category, brand, sort, page, priceRange]);

  useEffect(() => {
    getCategories().then(setCategories);
    getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Search</h4>
        <Input placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      </div>
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <Select value={category} onValueChange={(v) => { setCategory(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c._id} value={c.slug.current}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h4 className="font-medium mb-3">Brand</h4>
        <Select value={brand} onValueChange={(v) => { setBrand(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All Brands" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b._id} value={b.slug.current}>{b.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          min={0}
          max={15000}
          step={100}
          value={priceRange}
          onValueChange={(v) => { if (Array.isArray(v)) { setPriceRange(v); setPage(1); } }}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Container className="py-6 sm:py-8">
      <SectionHeading title="Shop All Products" subtitle={`${total} products found`} align="left" className="mb-8 sm:mb-10" />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 min-w-0">
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterPanel />
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "lg:hidden shrink-0 rounded-full")}>
                  <SlidersHorizontal className="h-4 w-4 sm:mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline">Filters</span>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-[min(100vw,20rem)] overflow-y-auto">
                  <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                  <div className="mt-6"><FilterPanel /></div>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={(v) => { if (v) { setSort(v); setPage(1); } }}>
                <SelectTrigger className="w-full sm:w-44 min-w-0 flex-1 sm:flex-none"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")} aria-label="Grid view">
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")} aria-label="List view">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className={cn("grid gap-3 sm:gap-4 md:gap-6", viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1")}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-xl sm:rounded-2xl" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 sm:py-20 text-muted-foreground">No products found</div>
          ) : (
            <div className={cn("grid gap-3 sm:gap-4 md:gap-6", viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1")}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 overflow-x-auto pb-2 -mx-1 px-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  size="sm"
                  className="shrink-0 min-w-9"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductQuickView product={quickViewProduct} open={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Container className="py-8"><Skeleton className="h-96 w-full" /></Container>}>
      <ProductsContent />
    </Suspense>
  );
}
