import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Droplets, Leaf, MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { StoryReelPlayer } from "@/components/about/story-reel-player";
import { Button } from "@/components/ui/button";
import { getSettings, getStoryReel } from "@/services/content-service";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import { getWhatsAppHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Our Story",
  description: `Discover the story behind ${BRAND_NAME} ${BRAND_TAGLINE} — unisex oud perfumes curated with authenticity and craft.`,
};

const pillars = [
  {
    icon: Droplets,
    title: "Pure Oud, No Compromise",
    text: "Every bottle is sourced from trusted distillers. We work directly with oud artisans across Cambodia, India, and the Arabian Gulf.",
  },
  {
    icon: Leaf,
    title: "Unisex by Design",
    text: "Our compositions are built for everyone — balanced, wearable, and free from outdated gender labels. Scent is personal, not prescribed.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic & Transparent",
    text: "We share origin stories, concentration details, and honest notes so you know exactly what you're wearing on skin.",
  },
  {
    icon: MessageCircle,
    title: "Concierge on WhatsApp",
    text: "Not sure which oud suits you? Message us anytime. Our team guides you from first sample to signature scent.",
  },
];

export default async function AboutPage() {
  const [settings, storyReel] = await Promise.all([getSettings(), getStoryReel()]);
  const whatsappHref = getWhatsAppHref();

  return (
    <>
      {/* Reel */}
      {storyReel && (
        <section className="section-cream border-b border-border">
          <Container className="py-10 sm:py-12">
            <PageHeader
              label="Our Story"
              title="Crafting Unisex Oud for the Modern Nose"
              subtitle={`${settings.storeName} began with a simple belief: oud belongs to everyone. We curate niche compositions that honour tradition while feeling unmistakably contemporary.`}
              className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 pb-0 border-0 [&_.oud-accent-bar]:mx-auto"
            />
            <div className="text-center max-w-lg mx-auto mb-6 sm:mb-8">
              <p className="label-caps mb-3">Behind the Scent</p>
              <div className="oud-accent-bar mx-auto mb-4" />
              <h2 className="font-heading text-xl sm:text-2xl">See our atelier in action</h2>
            </div>
            <StoryReelPlayer reel={storyReel} className="max-w-[300px] mx-auto" />
          </Container>
        </section>
      )}

      {/* Story */}
      <section className="section-parchment border-b border-border">
        <Container className="py-14 sm:py-16">
          <div className="max-w-3xl space-y-8">
            <div>
              <p className="label-caps mb-3">The Maison</p>
              <div className="oud-accent-bar mb-5" />
              <p className="font-heading text-xl sm:text-2xl leading-relaxed text-foreground/90">
                {settings.storeDescription}
              </p>
            </div>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                What started as a passion for rare oud oils grew into a full atelier of unisex perfumes,
                attars, and discovery sets. We blend old-world craftsmanship with a modern, minimal approach
                to luxury — no excess, just exceptional scent.
              </p>
              <p>
                From Cambodian oud with its honeyed depth to smoky Hindi compositions and bright Arabian blends,
                each fragrance is chosen for character, longevity, and the way it evolves on skin throughout the day.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-border">
              {[
                { n: "50+", l: "Compositions" },
                { n: "100%", l: "Authentic" },
                { n: "24h", l: "Support" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="font-heading text-2xl sm:text-3xl text-foreground">{n}</p>
                  <p className="label-caps mt-1.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="section-parchment border-b border-border">
        <Container className="py-14 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="label-caps mb-3">What We Stand For</p>
            <div className="oud-accent-bar mx-auto mb-5" />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl">The Ibadah Promise</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="fragrance-panel hover:border-foreground/15 transition-colors">
                <div className="flex size-11 items-center justify-center rounded-full bg-secondary mb-4">
                  <Icon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg sm:text-xl mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-sand">
        <Container className="py-14 sm:py-16 text-center">
          <p className="label-caps mb-3">Begin Your Journey</p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl max-w-xl mx-auto leading-tight">
            Find the oud that feels like yours
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed">
            Browse the collection online or message us for a personal recommendation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/products">
                Explore Fragrances
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-foreground/20" asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
