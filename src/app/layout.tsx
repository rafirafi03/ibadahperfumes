import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ContactFab } from "@/components/shared/contact-fab";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME, APP_URL, BRAND_NAME, BRAND_TAGLINE, BRAND_LOGO_PATH } from "@/lib/constants";
import { generateOrganizationJsonLd, brandLogoMetadata } from "@/utils/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Premium Oud & Attar Fragrances`,
    template: `%s | ${APP_NAME}`,
  },
  description: `Discover premium oud perfumes and attars at ${BRAND_NAME} ${BRAND_TAGLINE}. Shop curated Arabian fragrances with WhatsApp ordering.`,
  metadataBase: new URL(APP_URL),
  icons: {
    icon: [{ url: BRAND_LOGO_PATH, type: "image/jpeg" }],
    apple: [{ url: BRAND_LOGO_PATH, type: "image/jpeg" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — Premium Oud & Attar Fragrances`,
    description: `Discover premium oud perfumes and attars at ${BRAND_NAME} ${BRAND_TAGLINE}. Shop curated Arabian fragrances with WhatsApp ordering.`,
    images: [brandLogoMetadata],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Premium Oud & Attar Fragrances`,
    description: `Discover premium oud perfumes and attars at ${BRAND_NAME} ${BRAND_TAGLINE}. Shop curated Arabian fragrances with WhatsApp ordering.`,
    images: [BRAND_LOGO_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ContactFab />
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
