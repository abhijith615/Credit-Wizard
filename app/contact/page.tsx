import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactContent from "@/components/contact/ContactContent";
import EnquiryForm from "@/components/home/EnquiryForm";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us — Free Loan Consultation in Tiruppur",
  description:
    "Visit Credit Wizard In in Tiruppur, call us, or request a callback. Free consultation on business loans, home loans, LAP, personal loans and working capital.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader
        eyebrow="Contact Us"
        title="Let's talk about your numbers."
        description="Walk in, call, or write — every conversation starts with listening, not selling."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactContent />
      <EnquiryForm />
    </>
  );
}
