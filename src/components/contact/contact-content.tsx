import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  ExternalLink,
  Gift,
  Mail,
  MapPin,
  Package,
  Phone,
  Sparkles,
} from "lucide-react";
import { LocationMap } from "@/components/contact/location-map";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { CONTACT_PHONE_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import { getTelHref, getWhatsAppHref } from "@/lib/contact";
import {
  getGoogleMapsDirectionsUrl,
  getGoogleMapsSearchUrl,
} from "@/lib/maps";
import type { StoreSettings } from "@/types";
import { cn } from "@/lib/utils";

interface ContactChannelCardProps {
  icon: React.ReactNode;
  label: string;
  title: string;
  description?: string;
  href?: string;
  external?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function ContactChannelCard({
  icon,
  label,
  title,
  description,
  href,
  external,
  className,
  children,
}: ContactChannelCardProps) {
  const inner = (
    <>
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-amber transition-colors group-hover:bg-brand-gold/15 group-hover:border-brand-gold/35">
        {icon}
      </div>
      <p className="label-caps mb-2 text-brand-amber">{label}</p>
      <p className="font-heading text-lg leading-snug text-foreground">{title}</p>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      {children}
    </>
  );

  const cardClass = cn(
    "group fragrance-panel flex h-full flex-col p-6 transition-all duration-300 hover:border-brand-gold/35 hover:shadow-[0_12px_40px_-16px_rgba(20,20,20,0.18)]",
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(cardClass, "relative")}
      >
        {inner}
        <ArrowUpRight className="absolute top-5 right-5 size-4 text-muted-foreground/50 transition-all group-hover:text-brand-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    );
  }

  return <div className={cardClass}>{inner}</div>;
}

const helpTopics = [
  {
    icon: Package,
    title: "Orders & Delivery",
    text: "Track an order, change details, or ask about shipping timelines.",
    message: "Hello Ibadah Perfumes, I have a question about my order or delivery.",
  },
  {
    icon: Sparkles,
    title: "Fragrance Guidance",
    text: "Not sure which oud suits you? We'll match a scent to your taste.",
    message: "Hello Ibadah Perfumes, I'd like help choosing the right oud fragrance.",
  },
  {
    icon: Gift,
    title: "Gifts & Sets",
    text: "Discovery sets, attars, and curated gifts for any occasion.",
    message: "Hello Ibadah Perfumes, I'm looking for a gift or discovery set recommendation.",
  },
] as const;

interface ContactContentProps {
  settings: StoreSettings;
}

export function ContactContent({ settings }: ContactContentProps) {
  const whatsappHref = getWhatsAppHref();
  const telHref = getTelHref();
  const mapSearchUrl = settings.address ? getGoogleMapsSearchUrl(settings.address) : null;
  const mapDirectionsUrl = settings.address
    ? getGoogleMapsDirectionsUrl(settings.address)
    : null;

  return (
    <>
      {/* Channels + consultation */}
      <section className="section-parchment">
        <Container className="py-8 sm:py-12 lg:py-16">
          <PageHeader
            label="Get in Touch"
            title="Fragrance Concierge"
            subtitle="Questions about notes, longevity, or your order? We typically reply within a few hours on WhatsApp."
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="mb-8">
                <p className="label-caps mb-3">Direct Lines</p>
                <div className="oud-accent-bar mb-4" />
                <h2 className="font-heading text-2xl sm:text-3xl leading-tight">
                  Every way to reach us
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ContactChannelCard
                  icon={<WhatsAppIcon className="size-5 text-[#25D366]" />}
                  label="WhatsApp"
                  title={CONTACT_PHONE_DISPLAY}
                  description="Fastest way to reach our fragrance team"
                  href={whatsappHref}
                  external
                />

                <ContactChannelCard
                  icon={<Phone className="size-5" />}
                  label="Phone"
                  title={CONTACT_PHONE_DISPLAY}
                  description="Call for urgent order or delivery queries"
                  href={telHref}
                />

                {settings.email && (
                  <ContactChannelCard
                    icon={<Mail className="size-5" />}
                    label="Email"
                    title={settings.email}
                    description="For detailed enquiries and collaborations"
                    href={`mailto:${settings.email}`}
                  />
                )}

                <ContactChannelCard
                  icon={<Clock className="size-5" />}
                  label="Hours"
                  title="Mon – Sat, 10 AM – 7 PM IST"
                  description="WhatsApp messages welcome anytime"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24 overflow-hidden rounded-2xl section-oud ring-1 ring-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,_rgba(110,103,95,0.18),_transparent_55%)]" />
                <div className="relative p-6 sm:p-8">
                  <p className="label-caps mb-3 text-brand-gold">Private Consultation</p>
                  <div className="oud-accent-bar mb-5 opacity-90" />
                  <h2 className="font-heading text-2xl sm:text-[1.75rem] text-white leading-tight mb-3">
                    Find your signature oud
                  </h2>
                  <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-6">
                    Share your preferred scent profile, occasion, or a fragrance link — we&apos;ll
                    guide you to the perfect composition from our collection.
                  </p>
                  <ul className="space-y-3 mb-7 text-sm text-white/55">
                    <li className="flex gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                      Oud, attar &amp; concentration advice
                    </li>
                    <li className="flex gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                      Order confirmation via WhatsApp
                    </li>
                    <li className="flex gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                      Gift sets &amp; discovery recommendations
                    </li>
                  </ul>
                  <div className="space-y-3">
                    <Button
                      className="w-full h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-0"
                      asChild
                    >
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="size-5 mr-2" />
                        Start a Conversation
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-full border-brand-gold/40 text-white hover:bg-brand-gold hover:text-brand-espresso"
                      asChild
                    >
                      <Link href="/products">
                        Browse Fragrances
                        <ArrowUpRight className="size-4 ml-2 opacity-70" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help topics */}
          <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-border/70">
            <div className="mb-8 sm:mb-10 max-w-2xl">
              <p className="label-caps mb-3">How We Can Help</p>
              <div className="oud-accent-bar mb-4" />
              <h2 className="font-heading text-2xl sm:text-3xl leading-tight">
                Tell us what you need
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Tap a topic to open WhatsApp with a pre-filled message — no forms, no waiting.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {helpTopics.map((topic) => (
                <a
                  key={topic.title}
                  href={getWhatsAppHref(topic.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group fragrance-panel flex flex-col p-6 transition-all duration-300 hover:border-brand-gold/35 hover:shadow-[0_12px_40px_-16px_rgba(20,20,20,0.18)]"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-secondary/80 text-brand-amber transition-colors group-hover:bg-brand-gold/10">
                    <topic.icon className="size-5" />
                  </div>
                  <h3 className="font-heading text-lg mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {topic.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-brand-amber font-medium">
                    Message us
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Location */}
      {settings.address && (
        <section className="section-cream border-y border-border/60">
          <Container className="py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
              <div>
                <p className="label-caps mb-3">Visit the Atelier</p>
                <div className="oud-accent-bar mb-5" />
                <h2 className="font-heading text-2xl sm:text-3xl leading-tight mb-4">
                  Kasaragod, Kerala
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                  {settings.address}. Drop by to explore our oud collection in person, or message
                  ahead on WhatsApp before your visit.
                </p>
                {mapSearchUrl && mapDirectionsUrl && (
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <Button variant="outline" className="rounded-full" asChild>
                      <a href={mapDirectionsUrl} target="_blank" rel="noopener noreferrer">
                        <MapPin className="size-4 mr-2" />
                        Get Directions
                        <ExternalLink className="size-3.5 ml-2 opacity-60" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="rounded-full text-muted-foreground" asChild>
                      <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer">
                        Open in Google Maps
                        <ExternalLink className="size-3.5 ml-2 opacity-60" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-border/60 shadow-[0_8px_32px_-12px_rgba(20,20,20,0.12)]">
                <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px]">
                  <LocationMap address={settings.address} />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 scrim-bottom pt-12 pb-4 px-4 sm:px-5 sm:pb-5">
                  <p className="label-caps text-brand-gold mb-1">Our Location</p>
                  <p className="font-heading text-sm sm:text-base leading-snug text-white line-clamp-2">
                    {settings.address}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Instagram */}
      <section className="section-sand py-12 sm:py-14">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-2xl fragrance-panel p-6 sm:p-8">
            <div className="max-w-lg">
              <p className="label-caps mb-2">Follow Along</p>
              <h2 className="font-heading text-xl sm:text-2xl mb-2">
                @{INSTAGRAM_HANDLE}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reels, unboxings, and behind-the-scenes from our atelier on Instagram.
              </p>
            </div>
            <Button variant="outline" className="rounded-full shrink-0 self-start sm:self-center" asChild>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
                Follow on Instagram
                <ExternalLink className="size-3.5 ml-2 opacity-60" />
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
