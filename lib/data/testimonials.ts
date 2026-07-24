export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Senthil Kumar",
    role: "Garment Exporter",
    location: "Tiruppur",
    quote:
      "Our CC limit had not been reviewed in four years while turnover doubled. Credit Wizard restructured everything across two banks and our interest cost dropped visibly within a quarter. Two decades of relationships clearly count.",
    rating: 5,
    initials: "SK",
  },
  {
    name: "Priya Raghunathan",
    role: "First-time Home Buyer",
    location: "Coimbatore",
    quote:
      "Three banks had quoted me three different rates and I was lost. They compared everything, negotiated the processing fee to nearly nothing, and walked me through registration. The loan felt effortless.",
    rating: 5,
    initials: "PR",
  },
  {
    name: "Mohammed Farooq",
    role: "Textile Machinery Dealer",
    location: "Tiruppur",
    quote:
      "A machinery loan that two banks had kept pending for months was sanctioned in twelve days once Credit Wizard took over the file. They knew exactly which lender's policy fit our balance sheet.",
    rating: 5,
    initials: "MF",
  },
  {
    name: "Dr. Anitha Krishnan",
    role: "Dental Surgeon",
    location: "Erode",
    quote:
      "For my clinic expansion they arranged a professional loan at a rate I did not think was possible without collateral. Transparent about every charge from day one — that is rare in this business.",
    rating: 5,
    initials: "AK",
  },
  {
    name: "Ramesh Velusamy",
    role: "Dyeing Unit Owner",
    location: "Tiruppur",
    quote:
      "We have done our CGTMSE loan, an expansion term loan and a LAP through them over eight years. Every single time, the documentation list was accurate and the timeline they promised was the timeline delivered.",
    rating: 5,
    initials: "RV",
  },
  {
    name: "Kavitha Subramaniam",
    role: "Boutique Owner",
    location: "Tiruppur",
    quote:
      "As a first-generation entrepreneur, banks would not look at my file. Credit Wizard structured it under CGTMSE and I had working capital in three weeks. They treat small businesses with the same seriousness as big ones.",
    rating: 5,
    initials: "KS",
  },
];
