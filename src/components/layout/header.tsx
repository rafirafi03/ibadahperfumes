"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/search/search-bar";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { NAV_LINKS } from "@/lib/constants";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-border/70">
      <Container className="relative">
        <div className="flex h-[3.75rem] sm:h-16 items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full size-9 text-foreground hover:bg-secondary"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden lg:flex items-center gap-6 flex-1">
            {(isHome ? NAV_LINKS.slice(0, 3) : NAV_LINKS).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.62rem] uppercase tracking-[0.2em] font-medium transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <BrandLogo compact />
          </Link>

          <div className="flex items-center gap-0.5 flex-1 justify-end">
            <div className="hidden md:block max-w-[200px] lg:max-w-[220px]">
              <SearchBar className="[&_input]:bg-secondary/60 [&_input]:border-transparent [&_input]:rounded-sm" />
            </div>
            <Button variant="ghost" size="icon" className="relative rounded-full size-9 md:hidden text-foreground" asChild>
              <Link href="/products" aria-label="Search">
                <Search className="h-[1.1rem] w-[1.1rem]" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative rounded-full size-9 text-foreground hover:bg-secondary" asChild>
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-0.5 rounded-full bg-primary text-[9px] text-white flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full size-9 text-foreground hover:bg-secondary"
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-0.5 rounded-full bg-primary text-[9px] text-white flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {isHome && (
          <nav className="hidden lg:flex items-center justify-center gap-10 pb-3 border-t border-border/50 pt-3">
            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.62rem] uppercase tracking-[0.2em] font-medium transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger className="sr-only">Menu</SheetTrigger>
        <SheetContent side="left" className="w-full max-w-[min(100vw,20rem)] border-r border-border bg-white p-5">
          <div className="flex flex-col gap-6 mt-4">
            <BrandLogo />
            <SearchBar inlineResults onNavigate={() => setMobileOpen(false)} />
            <nav className="flex flex-col gap-1 border-t border-border pt-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "font-heading text-xl py-2.5 px-3 transition-colors",
                    pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
