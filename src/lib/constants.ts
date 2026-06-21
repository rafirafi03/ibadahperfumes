export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Ibadah Perfumes";
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Ibadah";
export const BRAND_TAGLINE = process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Perfumes";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || APP_URL;
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917510701994";
export const CONTACT_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "+91 75107 01994";
export const CURRENCY_SYMBOL = "₹";
export const ITEMS_PER_PAGE = 12;
export const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "amfragrancesindia";
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/amfragrancesindia/";

export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "bg-yellow-500" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-500" },
  { value: "processing", label: "Processing", color: "bg-purple-500" },
  { value: "shipped", label: "Shipped", color: "bg-indigo-500" },
  { value: "delivered", label: "Delivered", color: "bg-green-500" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
  { value: "popular", label: "Most Popular" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
