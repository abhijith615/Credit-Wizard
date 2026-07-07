import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CtaBand from "@/components/layout/CtaBand";
import AboutContent from "@/components/about/AboutContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us — Two Decades of Financial Expertise in Tiruppur",
  description:
    "CreditWizard has guided Tiruppur's businesses and families since 2006 — 5,000+ clients, 35+ banking partners and ₹850+ crore in loans facilitated with a transparent, advisory-first approach.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader
        eyebrow="About CreditWizard"
        title="Two Decades of Financial Expertise"
        description="We started in 2006 with a simple belief: people deserve a financial advisor who sits on their side of the table. Twenty years and thousands of clients later, nothing about that has changed."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutContent />
      <CtaBand
        title="Let's write the next chapter together."
        text="Whether it's your first loan or your fifteenth, the conversation starts the same way — free and unhurried."
      />
    </>
  );
}
