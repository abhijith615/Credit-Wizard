import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Security Policy",
  description:
    "How Credit Wizard In collects, uses, protects and shares your personal and financial information, in accordance with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

interface Section {
  title: string;
  body: (string | { list: string[] })[];
}

const sections: Section[] = [
  {
    title: "1. Who we are",
    body: [
      `Credit Wizard In ("we", "us", "our") is a loan and financial advisory service with its registered office at ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, India. This Privacy & Security Policy explains how we collect, use, store, share and protect your personal information when you use our website, submit an enquiry, or engage our advisory services.`,
      "This policy is published in accordance with the Digital Personal Data Protection Act, 2023 (\"DPDP Act\"), the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (\"SPDI Rules\").",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "We collect only the information needed to advise you and process your loan requirement:",
      {
        list: [
          "Identity and contact details — name, phone number, email address and city, as provided in our enquiry and contact forms.",
          "Financial information — loan type sought, desired loan amount, monthly income range and any details you choose to share in your message.",
          "Documents — where you engage our services, KYC, income and property documents required by lending institutions, collected with your explicit consent.",
          "Technical information — basic device and usage data (such as browser type and pages visited) collected through standard web logs to keep the website secure and improve it.",
        ],
      },
      "We do not knowingly collect personal data from children under 18. Our services are intended for adults capable of entering into financial contracts.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      {
        list: [
          "To respond to your enquiry and provide free consultation as requested by you.",
          "To assess your loan requirement and identify suitable products across our network of banks and NBFCs.",
          "To prepare and submit loan applications to lenders — only with your knowledge and consent.",
          "To communicate with you about the status of your application and related services.",
          "To send you financial insights and updates, only if you subscribe to our newsletter (you may unsubscribe at any time).",
          "To comply with applicable laws, including KYC and anti-money-laundering requirements.",
        ],
      },
      "We process your personal data only for the purposes stated above and only as long as your consent remains in force, as required under the DPDP Act, 2023.",
    ],
  },
  {
    title: "4. Consent and your rights",
    body: [
      "By submitting your details on this website, you consent to being contacted by Credit Wizard In about your enquiry. Under the DPDP Act, 2023, you have the right to:",
      {
        list: [
          "Access a summary of the personal data we hold about you and how it has been processed.",
          "Request correction of inaccurate or incomplete data, and updating of your details.",
          "Request erasure of your personal data once it is no longer necessary for the purpose it was collected, subject to legal retention requirements.",
          "Withdraw your consent at any time, with effect for future processing.",
          "Nominate another individual to exercise these rights on your behalf in case of death or incapacity.",
          "Raise a grievance with us, and if unresolved, approach the Data Protection Board of India.",
        ],
      },
      "To exercise any of these rights, contact our Grievance Officer using the details in Section 10. We will respond within the timelines prescribed by law.",
    ],
  },
  {
    title: "5. Sharing and disclosure",
    body: [
      "We never sell your personal data. We share it only:",
      {
        list: [
          "With banks and NBFCs — to obtain loan offers and process applications you have asked us to pursue.",
          "With credit bureaus — only as part of a formal loan application initiated with your consent.",
          "With service providers who help us operate this website, bound by confidentiality obligations.",
          "With authorities — where disclosure is required by law, court order or a lawful government request.",
        ],
      },
      "Any lender or partner receiving your data is required to use it solely for processing your loan requirement.",
    ],
  },
  {
    title: "6. Data security",
    body: [
      "We follow reasonable security practices and procedures as required under Section 43A of the IT Act, 2000 and the SPDI Rules, 2011, including:",
      {
        list: [
          "Encryption of data in transit using HTTPS/TLS across the entire website.",
          "Access to client documents restricted to authorised advisory staff on a need-to-know basis.",
          "Secure storage of physical and digital documents, with disposal once the retention purpose ends.",
          "Periodic review of our security practices and of the third-party services we use.",
        ],
      },
      "In the event of a personal data breach affecting you, we will notify you and the Data Protection Board of India as required under the DPDP Act, 2023.",
    ],
  },
  {
    title: "7. Data retention",
    body: [
      "We retain enquiry details for up to 24 months from your last interaction with us, unless you ask us to delete them sooner. Documents relating to completed loan engagements are retained as required by applicable banking, tax and audit regulations, after which they are securely destroyed.",
    ],
  },
  {
    title: "8. Cookies and analytics",
    body: [
      "This website uses only essential cookies and similar technologies necessary for it to function correctly. We do not use advertising trackers. If we introduce analytics cookies in future, we will seek your consent through a notice on the website before placing them.",
    ],
  },
  {
    title: "9. Third-party links",
    body: [
      "Our website may contain links to external sites, including bank websites, WhatsApp and Google Maps. Their privacy practices are governed by their own policies, and we encourage you to review them. We are not responsible for the content or privacy practices of third-party sites.",
    ],
  },
  {
    title: "10. Grievance Officer",
    body: [
      "In accordance with the Information Technology Act, 2000, the SPDI Rules, 2011 and the DPDP Act, 2023, the contact details of our Grievance Officer are:",
      {
        list: [
          "Name: Grievance Officer — Credit Wizard In",
          `Address: ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, India`,
          `Email: ${site.email}`,
          `Phone: ${site.phone} (${site.hours})`,
        ],
      },
      "We aim to acknowledge grievances within 48 hours and resolve them within the timelines prescribed under applicable law.",
    ],
  },
  {
    title: "11. Changes to this policy",
    body: [
      "We may update this policy from time to time to reflect changes in law or our practices. The revised policy will be posted on this page with an updated effective date. Continued use of the website after changes indicates your acceptance of the revised policy.",
      "This policy is governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts at Tiruppur, Tamil Nadu.",
      "Effective date: 1 July 2026.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy & Security Policy", path: "/privacy-policy" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHeader
        eyebrow="Your Data, Protected"
        title="Privacy & Security Policy"
        description="How we collect, use and protect your personal and financial information — in plain language, in accordance with Indian law."
        crumbs={crumbs}
      />
      <section className="bg-white pb-28" aria-label="Privacy and security policy">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-navy-100 py-10 first:border-t-0">
              <h2 className="font-serif-display text-2xl text-navy-800">{s.title}</h2>
              {s.body.map((item, i) =>
                typeof item === "string" ? (
                  <p key={i} className="mt-4 leading-relaxed text-ink-soft">
                    {item}
                  </p>
                ) : (
                  <ul key={i} className="mt-4 space-y-3">
                    {item.list.map((li) => (
                      <li key={li} className="flex gap-3 leading-relaxed text-ink-soft">
                        <span className="mt-[0.65rem] h-1 w-4 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
