import Link from "next/link";
import { Container } from "@/components/shared/container";
import { BrandLogo } from "@/components/shared/brand-logo";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";
import { getSettings } from "@/services/content-service";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="mt-auto bg-white border-t border-border">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10">
          <div className="col-span-2 lg:col-span-5">
            <BrandLogo className="mb-5" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {settings.storeDescription}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="label-caps text-primary mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Fragrances</Link></li>
              <li><Link href="/products?sort=newest" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Collections</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="label-caps text-primary mb-4">Brand</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h4 className="label-caps text-primary mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
              {settings.email && <li>{settings.email}</li>}
              {settings.phone && <li>{settings.phone}</li>}
              {settings.address && <li>{settings.address}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[0.65rem] text-muted-foreground uppercase tracking-[0.14em]">
            &copy; {new Date().getFullYear()} {settings.storeName || APP_NAME}
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
