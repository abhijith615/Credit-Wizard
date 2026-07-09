import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import Services from "@/components/home/Services";
import WhyUs from "@/components/home/WhyUs";
import EmiSection from "@/components/home/EmiSection";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import EnquiryForm from "@/components/home/EnquiryForm";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "CreditWizard — Trusted Loan & Financial Advisory | For Your Financial Needs",
  description:
    "20+ years of trusted financial advisory serving clients across India. Business loans, home loans, loan against property, personal loans and working capital — compared across 35+ banks for the best rates.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />
      <Hero />
      <AboutPreview />
      <Services />
      <WhyUs />
      <EmiSection />
      <Process />
      <Testimonials />
      <EnquiryForm />
    </>
  );
}
