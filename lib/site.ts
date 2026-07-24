/** Single source of truth for brand, contact and SEO details. */
export const site = {
  name: "Credit Wizard In",
  tagline: "For Your Financial Needs",
  url: "https://www.creditwizard.in",
  description:
    "Credit Wizard In is a trusted financial advisory firm with 20+ years of experience helping businesses and families across India secure business loans, home loans, loans against property, personal loans and working capital finance.",
  phone: "+91 79042 83184",
  phoneHref: "tel:+917904283184",
  whatsapp: "https://wa.me/917904283184",
  email: "support@creditwizardin.com",
  // Google Apps Script web-app endpoint that logs enquiries to the
  // "Credit Wizard In" sheet. Override per-environment with
  // NEXT_PUBLIC_ENQUIRY_ENDPOINT if you redeploy the script.
  enquiryEndpoint:
    process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ||
    "https://script.google.com/macros/s/AKfycbztGv39QF9yyLM6WQwNSzEp7Djgu09lLENKfXhyb7zQ91w4aYkwzPuaRKEN8s0B1-iz/exec",
  address: {
    street: "No. 15, Alagendra Towers, 3rd Floor, IDFC Bank Upstairs, Bungalow Stop",
    locality: "Tiruppur",
    region: "Tamil Nadu",
    postalCode: "641603",
    country: "IN",
  },
  geo: { lat: 11.1085, lng: 77.3411 },
  hours: "Mon – Sat · 9:30 AM – 7:00 PM",
  founded: 2006,
  social: {
    facebook: "https://facebook.com/creditwizard",
    instagram: "https://instagram.com/creditwizard",
    linkedin: "https://linkedin.com/company/creditwizard",
    twitter: "https://x.com/creditwizard",
  },
  stats: {
    years: 20,
    clients: 5000,
    banks: 35,
    loanOptions: 15,
  },
};
