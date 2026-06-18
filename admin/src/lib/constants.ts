export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Calira Couture";
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Calira";
export const BRAND_TAGLINE = process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Couture";
export const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || "http://localhost:3000";
export const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

export const ADMIN_NAV = [
  { href: "/", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/products", label: "Products", icon: "Package" },
  { href: "/categories", label: "Categories", icon: "Grid3x3" },
  { href: "/brands", label: "Brands", icon: "Tag" },
  { href: "/orders", label: "Orders", icon: "ShoppingBag" },
  { href: "/customers", label: "Customers", icon: "Users" },
  { href: "/banners", label: "Banners", icon: "Image" },
  { href: "/coupons", label: "Coupons", icon: "Ticket" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;
