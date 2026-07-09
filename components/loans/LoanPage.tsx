import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import CtaBand from "@/components/layout/CtaBand";
import LoanDetail from "@/components/loans/LoanDetail";
import JsonLd from "@/components/seo/JsonLd";
import { getLoan } from "@/lib/data/loans";
import { breadcrumbSchema, faqSchema, loanServiceSchema } from "@/lib/schema";

/** Shared server-side builder for the five loan product pages. */

export function loanMetadata(slug: string): Metadata {
  const loan = getLoan(slug)!;
  return {
    title: `${loan.name} — Fast Approval, Best Rates`,
    description: `${loan.description} Free consultation with CreditWizard, a trusted loan advisory since 2006.`,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${loan.name} — CreditWizard`,
      description: loan.description,
    },
  };
}

export default function LoanPage({ slug }: { slug: string }) {
  const loan = getLoan(slug)!;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: loan.name, path: `/${slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={loanServiceSchema(loan)} />
      <JsonLd data={faqSchema(loan.faqs)} />
      <PageHeader
        eyebrow={`${loan.shortName} Finance`}
        title={loan.name}
        description={loan.tagline}
        crumbs={crumbs}
      />
      <LoanDetail loan={loan} />
      <CtaBand
        title={`Let's get your ${loan.name.toLowerCase()} moving.`}
        text="Share your requirement and get a clear, personalised assessment within one working day."
      />
    </>
  );
}
