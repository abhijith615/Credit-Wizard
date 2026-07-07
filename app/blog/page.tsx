import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BlogIndex from "@/components/blog/BlogIndex";
import JsonLd from "@/components/seo/JsonLd";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog — Loans, Credit & Finance Insights for Tamil Nadu",
  description:
    "Practical guidance on business loans, home loans, MSME finance, working capital, tax saving and credit scores from CreditWizard's advisory team in Tiruppur.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHeader
        eyebrow="Financial Insights"
        title="Clarity, compounded."
        description="Two decades of lending-room experience, distilled into practical advice on loans, credit and money decisions."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <BlogIndex />
    </>
  );
}
