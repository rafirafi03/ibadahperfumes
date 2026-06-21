import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryBento } from "@/components/home/category-bento";
import { FeaturedSpotlight } from "@/components/home/featured-spotlight";
import { BrandStoryStrip } from "@/components/home/brand-story-strip";
import { ProductTabs } from "@/components/home/product-tabs";
import { InstagramReelsSection } from "@/components/home/instagram-reels-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import {
  getBanners, getCategories, getFeaturedProducts,
  getNewArrivals, getBestSellers, getFAQs, getTestimonials,
  getInstagramReels,
} from "@/services/content-service";

export const revalidate = 3600;

export default async function HomePage() {
  const [banners, categories, featured, newArrivals, bestSellers, faqs, testimonials, reels] = await Promise.all([
    getBanners(),
    getCategories(),
    getFeaturedProducts(),
    getNewArrivals(),
    getBestSellers(),
    getFAQs(),
    getTestimonials(),
    getInstagramReels(),
  ]);

  return (
    <>
      <HeroBanner banners={banners} />
      <CategoryBento categories={categories} />
      <FeaturedSpotlight products={featured} />
      <BrandStoryStrip banners={banners} />
      <ProductTabs featured={featured} newArrivals={newArrivals} bestSellers={bestSellers} />
      <InstagramReelsSection reels={reels} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <NewsletterSection />
    </>
  );
}
