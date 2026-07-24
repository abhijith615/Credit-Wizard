# Credit Wizard In — For Your Financial Needs

Premium corporate website for Credit Wizard In, a financial advisory firm in Tiruppur, Tamil Nadu
with 20+ years of experience. Built to feel closer to Stripe/Linear/Mercury than a
traditional loan website.

## Stack

- **Next.js 15 (App Router) + TypeScript** — fully static output (SSG) for every page
- **Tailwind CSS v4** — design tokens defined in `app/globals.css` under `@theme`
- **GSAP 3.13** — ScrollTrigger, ScrollToPlugin, SplitText (all free since 3.13)
- **Lenis** — smooth scrolling, driven by GSAP's ticker (single rAF loop)
- **next/font** — Cormorant Garamond (serif display) + Plus Jakarta Sans (body), self-hosted

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all pages prerendered)
```

## Architecture

```
app/
  layout.tsx            Fonts, metadata, JSON-LD org schema, providers
  page.tsx              Home (Hero → About → Services → WhyUs → Process → Testimonials → Enquiry)
  about/                Company story, animated counters, 2006→Today timeline
  business-loan/        ┐
  home-loan/            │
  loan-against-property/│  Thin pages over the shared LoanPage template
  personal-loan/        │  (per-page metadata + Service/FAQ/Breadcrumb schema)
  working-capital-loan/ ┘
  blog/                 SEO blog: search, category filters, newsletter
  blog/[slug]/          Article template + related posts + BlogPosting schema
  contact/              Channels, Google Map embed, hours, enquiry form
  sitemap.ts robots.ts  Generated SEO plumbing
  opengraph-image.tsx   Generated OG card (no binary assets needed)

components/
  providers/SmoothScroll.tsx   Lenis ↔ GSAP integration (reduced-motion aware)
  layout/    Navbar (transparent → glass), Footer, PageHeader, CtaBand
  home/      Hero, AboutPreview, Services, WhyUs, Process, Testimonials, EnquiryForm
  loans/     LoanPage (server template) + LoanDetail (client)
  blog/      BlogIndex (client, filters), ArticleBody
  ui/        Cursor, MagneticButton, AnimatedCounter, SectionHeading, Logo, LoanIcon

hooks/
  useReveal.ts     Declarative scroll reveals: [data-split] [data-reveal]
                   [data-reveal-x] [data-scale] [data-reveal-group]
  useMagnetic.ts   Magnetic hover pull (fine pointers only)

lib/
  gsap.ts          Single GSAP registration point — import gsap from here
  site.ts          Brand/contact/stats — single source of truth
  schema.ts        JSON-LD builders (FinancialService, Service, FAQ, Blog, Breadcrumb)
  data/            loans.ts, blog.ts, testimonials.ts (typed content)
```

## Motion system

All scroll animation is opt-in via data attributes handled by `useReveal`:

| Attribute          | Effect                                     |
| ------------------ | ------------------------------------------ |
| `data-split`       | SplitText masked line reveal (headlines)   |
| `data-reveal`      | Rise + fade on scroll into view            |
| `data-reveal-group`| Staggers all `data-reveal` children        |
| `data-reveal-x`    | Directional slide (`left`/`right`)         |
| `data-scale`       | Gentle scale-in for cards/imagery          |

Every effect (including Lenis, the cursor, magnetic buttons, parallax and counters)
checks `prefers-reduced-motion` and disables itself. Only `transform`/`opacity` are
animated — no layout thrash, GPU-composited throughout.

## Wiring the forms

`EnquiryForm` and the newsletter forms currently simulate submission client-side.
Point them at your CRM / mail service by replacing the marked `await` in
`components/home/EnquiryForm.tsx` with a `fetch` to an API route.

## Before going live

1. Replace placeholder contact details in `lib/site.ts` (phone, email, address, geo, socials).
2. Set the production domain in `lib/site.ts` (`url`) — metadata, sitemap and schema all read it.
3. Drop the real logo into `components/ui/Logo.tsx` if you want to swap the coded mark
   (source file: `logo.cdr` in the repo root).
