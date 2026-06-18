# LuxeStore - Production E-Commerce Platform

A modern, premium e-commerce application built with Next.js App Router, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Zustand, Sanity CMS, and WhatsApp ordering.

## Features

### Customer Storefront
- Animated hero banner, featured products, categories, testimonials, FAQ, newsletter
- Product listing with search, filters, sorting, pagination, grid/list view, quick view
- Product detail with image zoom, reviews, related products, WhatsApp ordering
- Cart system with persistent storage (Zustand) and cart drawer
- Wishlist, user authentication, account dashboard
- Instant debounced search with suggestions and history

### WhatsApp Ordering
- Single product and cart checkout via WhatsApp
- Orders saved to Sanity before redirect
- Pre-formatted professional order messages

### Admin Dashboard (Custom - No Sanity Studio)
- Dashboard overview with stats
- Product, category, brand, order, customer, banner, coupon management
- Store settings (WhatsApp number, contact info, SEO)

### SEO
- Dynamic metadata, Open Graph, Twitter Cards
- Product JSON-LD structured data
- Sitemap and robots.txt

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS v4, Shadcn UI, Framer Motion
- **State:** Zustand, TanStack Query
- **Forms:** React Hook Form + Zod
- **CMS:** Sanity (headless only)
- **Auth:** JWT sessions with httpOnly cookies

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Admin Dashboard (Separate App — Subdomain)

The admin panel is a **separate Next.js app** in the `admin/` folder, intended for subdomain hosting (e.g. `admin.yourdomain.com`), not `/admin` on the storefront.

```bash
# Terminal 1 — storefront (port 3000)
npm run dev

# Terminal 2 — admin (port 3001)
npm run dev:admin
```

- **Storefront:** [http://localhost:3000](http://localhost:3000)
- **Admin:** [http://localhost:3001](http://localhost:3001) → sign in at `/login`

Legacy `/admin/*` URLs on the storefront redirect to the admin app.

### Demo Credentials
- **Admin** (admin app only): admin@luxestore.com / admin123
- **Customer:** Use any email with password `password123` (mock mode)

## Sanity CMS Setup

1. Create a project at [sanity.io](https://sanity.io)
2. Update `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token
   ```
3. Deploy schemas: `npx sanity deploy` (from project root with sanity config)

The app works out of the box with mock data when Sanity is not configured.

## Project Structure

```
src/                  # Storefront app
admin/                # Admin app (deploy to subdomain)
├── src/app/          # Admin routes at /, /products, etc.
└── src/features/     # Admin-only UI

sanity/
└── schemas/          # Sanity CMS schemas
```

Shared code (`services`, `lib`, `components/ui`, `types`, etc.) lives in `src/` and is imported by the admin app via `experimental.externalDir`.

## Deployment

Deploy **two separate apps**:

| App | Domain example | Vercel root directory |
|-----|----------------|----------------------|
| Storefront | `luxestore.com` | `/` (project root) |
| Admin | `admin.luxestore.com` | `/admin` |

Environment variables (both apps need matching `JWT_SECRET`; set `COOKIE_DOMAIN=.yourdomain.com` in production for shared sessions):

```
NEXT_PUBLIC_STORE_URL=https://luxestore.com
NEXT_PUBLIC_ADMIN_URL=https://admin.luxestore.com
COOKIE_DOMAIN=.luxestore.com
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start storefront (port 3000) |
| `npm run dev:admin` | Start admin app (port 3001) |
| `npm run build` | Production build (storefront) |
| `npm run build:admin` | Production build (admin) |
| `npm run build:all` | Build both apps |
| `npm run start` | Start storefront |
| `npm run start:admin` | Start admin app |
| `npm run lint` | Run ESLint |
