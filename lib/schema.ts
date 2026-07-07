import { site } from "@/lib/site";
import type { BlogPost } from "@/lib/data/blog";
import type { Loan } from "@/lib/data/loans";

/** JSON-LD builders — FinancialService, LocalBusiness, Breadcrumb, Blog, FAQ. */

export const financialServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  foundingDate: String(site.founded),
  priceRange: "Free consultation",
  image: `${site.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "19:00",
  },
  areaServed: [
    { "@type": "City", name: "Tiruppur" },
    { "@type": "State", name: "Tamil Nadu" },
  ],
  sameAs: Object.values(site.social),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
  },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${site.url}${item.path}`,
  })),
});

export const loanServiceSchema = (loan: Loan) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: loan.name,
  name: `${loan.name} — ${site.name}`,
  description: loan.description,
  provider: { "@id": `${site.url}/#organization` },
  areaServed: { "@type": "State", name: "Tamil Nadu" },
  url: `${site.url}/${loan.slug}`,
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const blogPostSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  dateModified: post.date,
  author: { "@type": "Organization", name: post.author },
  publisher: { "@id": `${site.url}/#organization` },
  mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  articleSection: post.category,
});

export const blogSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${site.name} — Financial Insights`,
  description:
    "Expert guidance on business loans, home loans, MSME finance, working capital and credit health from CreditWizard's advisory team.",
  url: `${site.url}/blog`,
  publisher: { "@id": `${site.url}/#organization` },
});
