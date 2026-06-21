import type {
  Product,
  Category,
  Brand,
  Banner,
  FAQ,
  Testimonial,
  StoreSettings,
  Review,
  OrderRequest,
  User,
  Coupon,
  ProductColor,
  InstagramReel,
} from "@/types";
import { FRAGRANCE_VOLUMES } from "@/lib/fragrance-variants";
import {
  productImage,
  categoryImage,
  heroImage,
  avatarImage,
  unsplashUrl,
  UNSPLASH,
} from "@/lib/images";

const slug = (s: string) => ({ _type: "slug" as const, current: s });

function buildVariantStock(volumes: string[], concentrations: ProductColor[], baseStock = 4) {
  return volumes.flatMap((volume) =>
    concentrations.map((conc, i) => ({
      size: volume,
      color: conc.name,
      stock: baseStock - (volumes.indexOf(volume) % 2) - (i % 2),
    }))
  );
}

const concentrations = {
  edp: { name: "Eau de Parfum", hex: "#0a4a08" },
  parfum: { name: "Parfum", hex: "#073205" },
  attar: { name: "Attar Oil", hex: "#126b10" },
  oud: { name: "Pure Oud", hex: "#0a4a08" },
} as const;

export const mockSettings: StoreSettings = {
  _id: "settings-1",
  storeName: "Ibadah Perfumes",
  storeDescription: "Premium oud perfumes and Arabian attars — crafted with devotion for those who seek authentic, long-lasting fragrance.",
  whatsappNumber: "917510701994",
  email: "hello@ibadahperfumes.com",
  phone: "+91 75107 01994",
  address: "Kasaragod Chakkarebazar, Kerala, India",
  socialLinks: {
    instagram: "https://www.instagram.com/amfragrancesindia/",
    facebook: "https://facebook.com/ibadahperfumes",
  },
  seoTitle: "Ibadah Perfumes — Premium Oud & Attar",
  seoDescription: "Discover premium oud perfumes, attars, and niche fragrances at Ibadah Perfumes. Authentic Arabian collections for every occasion.",
  currency: "INR",
  currencySymbol: "₹",
};

export const mockCategories: Category[] = [
  { _id: "cat-1", name: "Oud Perfumes", slug: slug("oud-perfumes"), description: "Rich Arabian oud compositions", featured: true, order: 1, productCount: 8, imageUrl: categoryImage(0) },
  { _id: "cat-2", name: "Eau de Parfum", slug: slug("eau-de-parfum"), description: "Long-lasting luxury EDPs", featured: true, order: 2, productCount: 6, imageUrl: categoryImage(1) },
  { _id: "cat-3", name: "Attars & Oils", slug: slug("attars-oils"), description: "Traditional concentrated attars", featured: true, order: 3, productCount: 5, imageUrl: categoryImage(2) },
  { _id: "cat-4", name: "Gift Sets", slug: slug("gift-sets"), description: "Curated fragrance gift collections", featured: true, order: 4, productCount: 4, imageUrl: categoryImage(3) },
  { _id: "cat-5", name: "Niche Collection", slug: slug("niche-collection"), description: "Rare and exclusive blends", featured: true, order: 5, productCount: 3, imageUrl: categoryImage(4) },
  { _id: "cat-6", name: "Unisex Oud", slug: slug("unisex-oud"), description: "Genderless oud masterpieces", featured: false, order: 6, productCount: 4, imageUrl: categoryImage(5) },
];

export const mockBrands: Brand[] = [
  { _id: "brand-1", name: "Ibadah Signature", slug: slug("ibadah-signature"), description: "House oud collection" },
  { _id: "brand-2", name: "Arabian Nights", slug: slug("arabian-nights"), description: "Traditional Middle Eastern blends" },
  { _id: "brand-3", name: "Oud Royale", slug: slug("oud-royale"), description: "Premium Cambodian oud" },
];

const volumes = ["30ml", "50ml", "100ml"];

export const mockInstagramReels: InstagramReel[] = [
  {
    _id: "reel-1",
    title: "Gucci Flora Price Drop Offer",
    caption: "The scent of pure luxury ✨",
    reelUrl: "https://www.instagram.com/p/DQvcCGdkn_R/",
    thumbnailUrl: productImage(0),
    productId: "prod-1",
    productName: "Royal Cambodian Oud",
    featured: true,
    order: 1,
  },
  {
    _id: "reel-2",
    title: "Helen of Sparta — First Impression",
    caption: "The art of wearing pure oud oil",
    reelUrl: "https://www.instagram.com/p/DQ0n-9RkqAa/",
    thumbnailUrl: productImage(5),
    productId: "prod-6",
    productName: "Sultan's Attar",
    featured: true,
    order: 2,
  },
  {
    _id: "reel-3",
    title: "Ammu Murali Review",
    caption: "Dark, smoky, unforgettable",
    reelUrl: "https://www.instagram.com/p/DUCeBxOEjmi/",
    thumbnailUrl: productImage(2),
    productId: "prod-4",
    productName: "Black Oud Intense",
    featured: true,
    order: 3,
  },
  {
    _id: "reel-4",
    title: "Will Perfume Expire",
    caption: "Master perfumer secrets revealed",
    reelUrl: "https://www.instagram.com/p/DQjs9N3DLzq/",
    thumbnailUrl: productImage(1),
    productId: "prod-2",
    productName: "Arabian Nights Oud",
    featured: true,
    order: 4,
  },
  {
    _id: "reel-5",
    title: "Asianet Eid Media Coverage",
    caption: "Perfect for the oud lover in your life",
    reelUrl: "https://www.instagram.com/p/DHyC5N7SNDn/",
    thumbnailUrl: productImage(3),
    productId: "prod-7",
    productName: "Oud Discovery Set",
    featured: true,
    order: 5,
  },
];

/** About page — dedicated story reel (separate from product/homepage reels) */
export const mockAboutStoryReel: InstagramReel = {
  _id: "about-reel-1",
  title: "About our Story",
  caption: "Dedication behind every bottle",
  reelUrl: "https://www.instagram.com/p/DHyC5N7SNDn/",
  thumbnailUrl: heroImage(0),
  featured: true,
  order: 1,
};

export const mockProducts: Product[] = [
  {
    _id: "prod-1", name: "Royal Cambodian Oud", slug: slug("royal-cambodian-oud"),
    shortDescription: "Deep, resinous Cambodian oud with saffron and amber",
    description: "An opulent journey into the heart of Cambodian oud. Royal Cambodian Oud opens with luminous saffron and rose, melting into a rich resinous oud heart. The dry down reveals warm amber, musk, and a whisper of sandalwood that lingers for hours on skin.",
    price: 12999, compareAtPrice: 16999, stock: 20, status: "active", featured: true, isNewArrival: true, isBestSeller: true,
    imageUrl: productImage(0),
    category: mockCategories[0], brand: mockBrands[2],
    sizes: volumes, colors: [concentrations.edp, concentrations.parfum, concentrations.oud],
    variantStock: buildVariantStock(volumes, [concentrations.edp, concentrations.parfum, concentrations.oud]),
    specifications: [
      { key: "Top Notes", value: "Saffron, Rose" },
      { key: "Heart Notes", value: "Cambodian Oud, Orris" },
      { key: "Base Notes", value: "Amber, Musk, Sandalwood" },
      { key: "Longevity", value: "12+ hours" },
      { key: "Sillage", value: "Strong" },
    ],
    features: ["Hand-blended", "Natural oud extract", "Luxury gift packaging"],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-1"),
    averageRating: 4.9, reviewCount: 124,
  },
  {
    _id: "prod-2", name: "Arabian Nights Oud", slug: slug("arabian-nights-oud"),
    shortDescription: "Mystical oud with incense, leather, and dark spices",
    description: "Inspired by moonlit souks and ancient palaces. Arabian Nights Oud weaves smoky incense with supple leather and cardamom over a foundation of aged Arabian oud. A fragrance for evenings that demand presence.",
    price: 9999, compareAtPrice: 12999, stock: 18, status: "active", featured: true, isBestSeller: true,
    imageUrl: productImage(1),
    category: mockCategories[0], brand: mockBrands[1],
    sizes: volumes, colors: [concentrations.edp, concentrations.parfum],
    variantStock: buildVariantStock(volumes, [concentrations.edp, concentrations.parfum], 3),
    specifications: [
      { key: "Top Notes", value: "Cardamom, Bergamot" },
      { key: "Heart Notes", value: "Arabian Oud, Incense" },
      { key: "Base Notes", value: "Leather, Patchouli, Vanilla" },
      { key: "Longevity", value: "10+ hours" },
      { key: "Sillage", value: "Moderate to Strong" },
    ],
    features: ["Unisex", "Evening wear", "Complimentary sample vial"],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-2"),
    averageRating: 4.8, reviewCount: 98,
  },
  {
    _id: "prod-3", name: "White Oud Elixir", slug: slug("white-oud-elixir"),
    shortDescription: "Clean white oud with jasmine and white musk",
    description: "A modern interpretation of oud — airy and luminous. White Oud Elixir pairs rare white oud with night-blooming jasmine and soft white musk for a refined, wearable luxury scent.",
    price: 8499, stock: 25, status: "active", featured: true, isNewArrival: true,
    imageUrl: productImage(2),
    category: mockCategories[1], brand: mockBrands[0],
    sizes: volumes, colors: [concentrations.edp, concentrations.parfum],
    variantStock: buildVariantStock(volumes, [concentrations.edp, concentrations.parfum]),
    specifications: [
      { key: "Top Notes", value: "Bergamot, Pink Pepper" },
      { key: "Heart Notes", value: "White Oud, Jasmine" },
      { key: "Base Notes", value: "White Musk, Cedar" },
      { key: "Longevity", value: "8+ hours" },
      { key: "Sillage", value: "Moderate" },
    ],
    averageRating: 4.7, reviewCount: 76,
  },
  {
    _id: "prod-4", name: "Black Oud Intense", slug: slug("black-oud-intense"),
    shortDescription: "Dark, smoky oud with birch tar and black pepper",
    description: "For the bold. Black Oud Intense is an uncompromising composition of smoky Laotian oud, birch tar, and cracked black pepper. A statement fragrance that commands attention.",
    price: 14999, compareAtPrice: 18999, stock: 12, status: "active", isBestSeller: true,
    imageUrl: productImage(3),
    category: mockCategories[0], brand: mockBrands[2],
    sizes: ["30ml", "50ml"], colors: [concentrations.parfum, concentrations.oud],
    variantStock: buildVariantStock(["30ml", "50ml"], [concentrations.parfum, concentrations.oud], 3),
    specifications: [
      { key: "Top Notes", value: "Black Pepper, Elemi" },
      { key: "Heart Notes", value: "Laotian Oud, Birch Tar" },
      { key: "Base Notes", value: "Ambergris, Vetiver" },
      { key: "Longevity", value: "14+ hours" },
      { key: "Sillage", value: "Beast mode" },
    ],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-4"),
    averageRating: 4.9, reviewCount: 67,
  },
  {
    _id: "prod-5", name: "Rose Oud Royale", slug: slug("rose-oud-royale"),
    shortDescription: "Bulgarian rose intertwined with premium oud",
    description: "The eternal pairing perfected. Rose Oud Royale marries velvety Bulgarian rose petals with aged Hindi oud, creating a romantic yet powerful fragrance beloved across cultures.",
    price: 11499, stock: 16, status: "active", featured: true,
    imageUrl: productImage(4),
    category: mockCategories[1], brand: mockBrands[0],
    sizes: volumes, colors: [concentrations.edp, concentrations.parfum],
    variantStock: buildVariantStock(volumes, [concentrations.edp, concentrations.parfum], 4),
    averageRating: 4.8, reviewCount: 89,
  },
  {
    _id: "prod-6", name: "Sultan's Attar", slug: slug("sultans-attar"),
    shortDescription: "Pure oud attar oil — traditional and concentrated",
    description: "A treasure from the attar tradition. Sultan's Attar is a pure, alcohol-free oud oil distilled using centuries-old methods. A single drop on pulse points releases an intoxicating aura that lasts all day.",
    price: 6999, compareAtPrice: 8999, stock: 30, status: "active", isNewArrival: true,
    imageUrl: productImage(5),
    category: mockCategories[2], brand: mockBrands[1],
    sizes: ["6ml", "12ml"], colors: [concentrations.attar, concentrations.oud],
    variantStock: buildVariantStock(["6ml", "12ml"], [concentrations.attar, concentrations.oud]),
    specifications: [
      { key: "Type", value: "Pure Attar Oil" },
      { key: "Main Note", value: "Hindi Oud" },
      { key: "Application", value: "1-2 drops on pulse points" },
      { key: "Longevity", value: "All day" },
    ],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-6"),
    averageRating: 4.9, reviewCount: 112,
  },
  {
    _id: "prod-7", name: "Oud Discovery Set", slug: slug("oud-discovery-set"),
    shortDescription: "Five 10ml oud fragrances — the perfect introduction",
    description: "Explore the world of oud with our curated discovery set. Five 10ml vials featuring our most beloved compositions — from light white oud to intense black oud. The ideal gift for fragrance enthusiasts.",
    price: 4999, compareAtPrice: 6499, stock: 40, status: "active", isBestSeller: true,
    imageUrl: productImage(5),
    category: mockCategories[3], brand: mockBrands[0],
    sizes: ["Set"], colors: [{ name: "Discovery Set", hex: "#0a0a0a" }],
    variantStock: [{ size: "Set", color: "Discovery Set", stock: 40 }],
    specifications: [
      { key: "Contents", value: "5 × 10ml EDP vials" },
      { key: "Includes", value: "Royal Cambodian, Arabian Nights, White Oud, Rose Oud, Black Oud" },
    ],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-7"),
    averageRating: 4.7, reviewCount: 54,
  },
  {
    _id: "prod-8", name: "Musk Oud Fusion", slug: slug("musk-oud-fusion"),
    shortDescription: "Silky white musk layered over smooth oud",
    description: "Where East meets modern minimalism. Musk Oud Fusion balances creamy white musk with smooth, refined oud for an effortlessly elegant everyday luxury scent.",
    price: 7499, stock: 22, status: "active",
    imageUrl: productImage(1),
    category: mockCategories[5], brand: mockBrands[0],
    sizes: volumes, colors: [concentrations.edp],
    variantStock: buildVariantStock(volumes, [concentrations.edp]),
    averageRating: 4.6, reviewCount: 43,
  },
  {
    _id: "prod-9", name: "Oud & Amber Noir", slug: slug("oud-amber-noir"),
    shortDescription: "Warm amber embraced by smoky oud resin",
    description: "A warm embrace of golden amber and dark oud resin. Oud & Amber Noir is sophisticated and enveloping — perfect for cooler evenings and special occasions.",
    price: 10999, compareAtPrice: 13999, stock: 14, status: "active", featured: true,
    imageUrl: productImage(0),
    category: mockCategories[4], brand: mockBrands[2],
    sizes: ["50ml", "100ml"], colors: [concentrations.parfum, concentrations.edp],
    variantStock: buildVariantStock(["50ml", "100ml"], [concentrations.parfum, concentrations.edp], 2),
    averageRating: 4.8, reviewCount: 38,
  },
  {
    _id: "prod-10", name: "Hindi Oud Classic", slug: slug("hindi-oud-classic"),
    shortDescription: "Authentic Hindi oud — animalic, rich, traditional",
    description: "For the true oud connoisseur. Hindi Oud Classic showcases the full character of aged Hindi oud — animalic, barnyard, and utterly captivating. A fragrance that tells a story.",
    price: 15999, stock: 8, status: "active", isNewArrival: true,
    imageUrl: productImage(2),
    category: mockCategories[4], brand: mockBrands[2],
    sizes: ["12ml", "30ml"], colors: [concentrations.oud, concentrations.attar],
    variantStock: buildVariantStock(["12ml", "30ml"], [concentrations.oud, concentrations.attar], 2),
    specifications: [
      { key: "Origin", value: "Assam, India" },
      { key: "Aged", value: "15+ years" },
      { key: "Character", value: "Animalic, resinous, complex" },
    ],
    averageRating: 4.9, reviewCount: 31,
  },
];

export const mockBanners: Banner[] = [
  {
    _id: "banner-1", title: "Authentic Oud Fragrances", subtitle: "Ibadah Perfumes",
    description: "Premium oud perfumes and attars — crafted with devotion for lasting impression.",
    imageUrl: heroImage(0),
    link: "/products", buttonText: "Shop Now", type: "hero", active: true, order: 1,
  },
  {
    _id: "banner-2", title: "Pure Attar Collection", subtitle: "Traditional Craft",
    description: "Concentrated oud attars distilled using centuries-old Arabian methods.",
    imageUrl: heroImage(1),
    link: "/products?category=attars-oils", buttonText: "Explore Attars", type: "hero", active: true, order: 2,
  },
  {
    _id: "banner-3", title: "Free Fragrance Consultation", subtitle: "Via WhatsApp",
    description: "Not sure which oud suits you? Our experts will guide you to your perfect scent.",
    imageUrl: unsplashUrl(UNSPLASH.promo, 1200),
    link: "/contact",
    type: "promotional", active: true, order: 1,
  },
];

export const mockFAQs: FAQ[] = [
  { _id: "faq-1", question: "What is oud?", answer: "Oud (agarwood) is one of the world's most precious fragrance ingredients, formed when Aquilaria trees produce a dark resin in response to fungal infection. Its rich, complex scent has been treasured in Arabian perfumery for centuries.", order: 1 },
  { _id: "faq-2", question: "How do I choose the right concentration?", answer: "Eau de Parfum (EDP) offers 8–12 hours longevity and is ideal for daily wear. Parfum is more concentrated and luxurious. Attar oils are alcohol-free and extremely long-lasting — perfect for traditional application.", order: 2 },
  { _id: "faq-3", question: "How do I place an order?", answer: "Select your fragrance, choose volume and concentration, then checkout via WhatsApp. We confirm availability and dispatch within 1–2 business days.", order: 3 },
  { _id: "faq-4", question: "What is your return policy?", answer: "Unopened fragrances in original packaging may be returned within 7 days. Opened bottles and attar oils are final sale due to hygiene.", order: 4 },
  { _id: "faq-5", question: "How long does delivery take?", answer: "Standard delivery is 3–7 business days across India. Express options available in select cities.", order: 5 },
];

export const mockTestimonials: Testimonial[] = [
  { _id: "test-1", name: "Ahmed Al-Rashid", role: "Fragrance collector", content: "Royal Cambodian Oud is exceptional — deep, resinous, and lasts over 12 hours. Ibadah Perfumes understands true oud.", rating: 5, featured: true, avatarUrl: avatarImage(0) },
  { _id: "test-2", name: "Priya Sharma", role: "Luxury lifestyle blogger", content: "Finally, a store that treats oud with the respect it deserves. The packaging alone feels like unwrapping a treasure.", rating: 5, featured: true, avatarUrl: avatarImage(1) },
  { _id: "test-3", name: "Omar Hassan", role: "Perfume enthusiast", content: "Sultan's Attar is the real deal — one drop and I'm complimented all evening. WhatsApp ordering made it effortless.", rating: 5, featured: true, avatarUrl: avatarImage(2) },
];

export const mockReviews: Review[] = [
  { _id: "rev-1", userName: "Khalid M.", rating: 5, title: "Authentic oud", comment: "Royal Cambodian Oud is everything I hoped for. Rich, long-lasting, and beautifully packaged.", verified: true, approved: true, _createdAt: "2026-02-15" },
  { _id: "rev-2", userName: "Sarah L.", rating: 5, title: "Perfect gift", comment: "Bought the Oud Discovery Set for my husband — he loved every single vial.", verified: true, approved: true, _createdAt: "2026-02-10" },
  { _id: "rev-3", userName: "Raj P.", rating: 4, title: "Intense but beautiful", comment: "Black Oud Intense is not for the faint-hearted. Powerful sillage — use sparingly.", verified: true, approved: true, _createdAt: "2026-01-28" },
];

export const mockOrders: OrderRequest[] = [
  {
    _id: "order-1", orderNumber: "AM-2026-001", type: "cart",
    customer: { name: "Ahmed Al-Rashid", phone: "9876543210", email: "ahmed@email.com", address: "Mumbai, India" },
    items: [{ productId: "prod-1", productName: "Royal Cambodian Oud", price: 12999, quantity: 1, subtotal: 12999, size: "50ml", color: "Eau de Parfum" }],
    totalItems: 1, grandTotal: 12999, status: "pending", _createdAt: "2026-06-15",
  },
  {
    _id: "order-2", orderNumber: "AM-2026-002", type: "cart",
    customer: { name: "Priya Sharma", phone: "9876543211", address: "Delhi, India" },
    items: [
      { productId: "prod-2", productName: "Arabian Nights Oud", price: 9999, quantity: 1, subtotal: 9999, size: "50ml", color: "Parfum" },
      { productId: "prod-6", productName: "Sultan's Attar", price: 6999, quantity: 1, subtotal: 6999, size: "12ml", color: "Attar Oil" },
    ],
    totalItems: 2, grandTotal: 16998, status: "confirmed", _createdAt: "2026-06-14",
  },
];

export const mockUsers: User[] = [
  { _id: "user-1", name: "Ahmed Al-Rashid", email: "ahmed@email.com", phone: "9876543210", role: "customer", emailVerified: true },
  { _id: "user-2", name: "Priya Sharma", email: "priya@email.com", phone: "9876543211", role: "customer", emailVerified: true },
  { _id: "user-3", name: "Admin", email: "admin@amfragrance.com", role: "admin", emailVerified: true },
];

export const mockCoupons: Coupon[] = [
  { _id: "coupon-1", code: "AMOUD10", description: "10% off your first oud purchase", discountType: "percentage", discountValue: 10, minOrderAmount: 5000, usageLimit: 100, usedCount: 23, active: true },
  { _id: "coupon-2", code: "OUD500", description: "₹500 off orders above ₹8000", discountType: "fixed", discountValue: 500, minOrderAmount: 8000, usageLimit: 50, usedCount: 12, active: true },
];

export { FRAGRANCE_VOLUMES };
