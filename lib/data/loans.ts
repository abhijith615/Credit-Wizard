export interface LoanFeature {
  title: string;
  description: string;
}

export interface Loan {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: "briefcase" | "home" | "building" | "user" | "cycle";
  image: string;
  imageAlt: string;
  emiDefaults: { amount: number; rate: number; years: number };
  highlights: string[];
  features: LoanFeature[];
  eligibility: string[];
  documents: string[];
  faqs: { q: string; a: string }[];
}

export const loans: Loan[] = [
  {
    slug: "business-loan",
    name: "Business Loan",
    shortName: "Business",
    tagline: "Capital that keeps pace with your ambition.",
    description:
      "Collateral-free loans, MSME finance, expansion funding and machinery loans for growing businesses — with fast approvals through our multi-bank network.",
    longDescription:
      "Whether you are scaling a garment unit, adding machinery or entering new markets, our business loan advisory matches you with the right lender, the right structure and the best possible rate. With two decades of banking relationships across 35+ institutions, we negotiate on your behalf and manage the paperwork end to end.",
    icon: "briefcase",
    image: "/images/business-loan.jpeg",
    imageAlt: "Business owner standing confidently on the floor of his textile factory in Tiruppur",
    emiDefaults: { amount: 5000000, rate: 11.5, years: 5 },
    highlights: ["Collateral-Free (Unsecured)", "MSME Loans", "Expansion Finance", "Machinery Loans"],
    features: [
      { title: "Collateral Free Business Loans (Unsecured)", description: "Funding from ₹10 lakh up to ₹2 crore approved purely on your cash flows, banking conduct and credit history — no property, machinery or deposits pledged. Disbursal in as little as 3–5 working days, ideal for urgent orders, seasonal stock or bridging receivables where speed matters more than rate." },
      { title: "MSME Loans", description: "Collateral-light funding tailored for micro, small and medium enterprises, including CGTMSE-backed options." },
      { title: "Expansion Finance", description: "Structured term loans to fund new units, additional capacity or market expansion." },
      { title: "Machinery Loans", description: "Finance up to 90% of machinery value with tenures aligned to your equipment's earning life." },
    ],
    eligibility: [
      "Business vintage of 2+ years",
      "Minimum annual turnover of ₹25 lakh",
      "Satisfactory banking and repayment track record",
      "Applicable to proprietorships, partnerships, LLPs and Pvt. Ltd. companies",
    ],
    documents: [
      "KYC of promoters and business entity",
      "Last 2–3 years financials with ITR",
      "12-month bank statements",
      "GST returns and registration",
      "Quotations (for machinery loans)",
    ],
    faqs: [
      { q: "How fast can a business loan be approved?", a: "With complete documents, in-principle approvals typically arrive in 3–7 working days. Our team pre-screens your file against each bank's credit policy to avoid rejections and delays." },
      { q: "Do I need collateral for an MSME loan?", a: "Not always. CGTMSE-covered loans and select unsecured business loan programs allow funding without collateral, based on your cash flows and credit history." },
      { q: "What loan amount can my business get?", a: "Amounts range from ₹10 lakh to ₹25 crore+ depending on turnover, profitability and security offered. We help you position your file for the maximum justified amount." },
    ],
  },
  {
    slug: "home-loan",
    name: "Home Loan",
    shortName: "Home",
    tagline: "The right rate for the place you'll call home.",
    description:
      "New home purchase, construction finance and balance transfers — compared across 35+ banks so you never overpay on interest.",
    longDescription:
      "A home loan is a 15–25 year commitment, and a 0.5% rate difference can cost lakhs. We compare offers across leading banks and housing finance companies, negotiate processing fees, and walk you through every step from sanction to registration — so you close on your home with total clarity.",
    icon: "home",
    image: "/images/home-loan.jpeg",
    imageAlt: "Model of an Indian house with keys ready for handover",
    emiDefaults: { amount: 4000000, rate: 8.5, years: 20 },
    highlights: ["Plot Purchase", "New Home Purchase", "Construction", "Balance Transfer"],
    features: [
      { title: "Residential Plot Purchase", description: "Plot loans for buying residential land in approved layouts — funding up to 75% of the plot value with tenures up to 15 years. Convert to a composite plot-plus-construction loan when you are ready to build and unlock home-loan interest rates on the full amount." },
      { title: "New Home Purchase", description: "Funding up to 90% of property value for ready and under-construction homes." },
      { title: "Construction Finance", description: "Stage-wise disbursals matched to your build schedule on your own plot." },
      { title: "Balance Transfer", description: "Move an existing loan to a lower rate and unlock top-up funds with minimal paperwork." },
    ],
    eligibility: [
      "Salaried or self-employed with stable income",
      "Age 21–65 at loan maturity",
      "Healthy credit score (typically 700+)",
      "Clear and marketable property title",
    ],
    documents: [
      "KYC documents of all applicants",
      "Salary slips / business financials",
      "6–12 month bank statements",
      "Property documents and approved plan",
      "Existing loan statement (for balance transfer)",
    ],
    faqs: [
      { q: "How much home loan am I eligible for?", a: "Banks typically lend up to 60x your net monthly income, adjusted for existing obligations. We assess your profile across lenders to find the highest sanctioned amount at the best rate." },
      { q: "Should I choose a fixed or floating rate?", a: "For most borrowers floating rates linked to the repo rate work out cheaper over time. We model both scenarios for your tenure before you decide." },
      { q: "Is a balance transfer worth it?", a: "If your current rate is 0.5% or more above market and you have 8+ years of tenure left, a transfer usually pays for itself within months. We calculate the exact break-even for you." },
    ],
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    shortName: "Property",
    tagline: "Unlock the value sitting in your property.",
    description:
      "High-value funding against residential or commercial property with quick processing and flexible end-use.",
    longDescription:
      "Your property can fund your next big move — business expansion, education, consolidation of high-cost debt or a major purchase. We arrange loans against residential and commercial property at rates far below unsecured borrowing, with tenures up to 15 years and quick, transparent processing.",
    icon: "building",
    image: "/images/property.jpeg",
    imageAlt: "Couple reviewing a loan against property with an advisor, house model and keys on the desk",
    emiDefaults: { amount: 7500000, rate: 9.75, years: 12 },
    highlights: ["Residential Property", "Commercial Property", "Quick Processing"],
    features: [
      { title: "Residential Property", description: "Loans up to 70% of market value against self-occupied or rented homes." },
      { title: "Commercial Property", description: "Funding against shops, offices and industrial property with flexible structures." },
      { title: "Quick Processing", description: "Parallel legal and technical evaluation for disbursal in as little as 10 days." },
    ],
    eligibility: [
      "Owned residential, commercial or industrial property",
      "Stable income to service the EMI",
      "Age 23–70 at loan maturity",
      "Clear title with approved construction",
    ],
    documents: [
      "KYC of all applicants and co-owners",
      "Complete property title chain",
      "Income proof — ITR, financials or salary slips",
      "12-month bank statements",
      "Property tax receipts and EB card",
    ],
    faqs: [
      { q: "How much can I borrow against my property?", a: "Typically 50–70% of the property's market value, depending on property type, income and lender policy. Commercial properties are usually funded at slightly lower ratios." },
      { q: "Can I use the funds for any purpose?", a: "Yes. Loan against property is flexible-end-use — business needs, education, medical costs or debt consolidation. Speculative uses are the only restriction." },
      { q: "How long does disbursal take?", a: "With clear title documents, 10–15 working days including legal opinion and valuation. We run these steps in parallel to compress the timeline." },
    ],
  },
  {
    slug: "personal-loan",
    name: "Personal Loan",
    shortName: "Personal",
    tagline: "Fast, paperless funds when life can't wait.",
    description:
      "Instant-approval personal loans for salaried employees and professionals — no collateral, minimal documentation.",
    longDescription:
      "Weddings, medical needs, travel or that gap between plans and payday — a personal loan bridges it without touching your savings. We match salaried employees and professionals with lenders offering the fastest approvals and lowest rates for their exact profile, often with same-week disbursal.",
    icon: "user",
    image: "/images/personal-loan.jpeg",
    imageAlt: "Hands offering a money bag marked with the rupee symbol",
    emiDefaults: { amount: 500000, rate: 12.5, years: 4 },
    highlights: ["Salaried Employees", "Professionals", "Fast Approval"],
    features: [
      { title: "Salaried Employees", description: "Pre-approved style offers based on your salary and employer category." },
      { title: "Professionals", description: "Dedicated programs for doctors, CAs, architects and other certified professionals." },
      { title: "Fast Approval", description: "Digital-first processing with approvals in as little as 24–48 hours." },
    ],
    eligibility: [
      "Net monthly income of ₹25,000+",
      "Age 21–60 years",
      "Credit score of 700+ preferred",
      "6+ months with current employer",
    ],
    documents: [
      "PAN and Aadhaar",
      "Last 3 months' salary slips",
      "3–6 month bank statements",
      "Employment / professional certificate",
    ],
    faqs: [
      { q: "How quickly can I get a personal loan?", a: "For clean salaried profiles, approval within 24–48 hours and disbursal in 2–4 working days is typical. We shortlist lenders whose digital process fits your urgency." },
      { q: "What interest rate should I expect?", a: "Rates vary widely — roughly 10.5% to 18% — based on your employer, income and credit score. Our comparison across banks routinely saves borrowers 2–4% versus walking into a single bank." },
      { q: "Will checking my eligibility hurt my credit score?", a: "No. Our initial assessment uses a soft evaluation of your profile. A hard bureau inquiry happens only when you choose a lender and formally apply." },
    ],
  },
  {
    slug: "working-capital-loan",
    name: "Working Capital Loan",
    shortName: "Working Capital",
    tagline: "Keep cash flowing while your business grows.",
    description:
      "Cash credit, overdraft and CGTMSE-backed limits that smooth out receivable cycles and fund day-to-day operations.",
    longDescription:
      "In textile and manufacturing businesses, money is always in motion — stock, receivables, advances. Working capital finance keeps operations liquid without eating into margins. We structure cash credit limits, overdrafts and CGTMSE-covered facilities that match your operating cycle, renewing and enhancing them as you grow.",
    icon: "cycle",
    image: "/images/working-capital.jpeg",
    imageAlt: "Rising growth chart built from Indian rupee notes",
    emiDefaults: { amount: 2500000, rate: 11, years: 3 },
    highlights: ["Cash Credit (CC)", "Overdraft (OD)", "CGTMSE Loan"],
    features: [
      { title: "Cash Credit (CC)", description: "Revolving limits against stock and receivables — pay interest only on what you use." },
      { title: "Overdraft (OD)", description: "Flexible overdraft facilities against property or financial securities." },
      { title: "CGTMSE Loan", description: "Government-guaranteed, collateral-free working capital up to ₹5 crore for eligible MSMEs." },
    ],
    eligibility: [
      "Operating business with 2+ years vintage",
      "GST-registered with regular filings",
      "Audited or CA-certified financials",
      "Positive net worth and margin trends",
    ],
    documents: [
      "Entity KYC and registration documents",
      "Last 3 years audited financials",
      "12-month bank statements of all accounts",
      "GST returns for the last 12 months",
      "Stock and debtor statements",
    ],
    faqs: [
      { q: "What is the difference between CC and OD?", a: "Cash credit is secured against stock and receivables and is meant purely for working capital; an overdraft is usually secured against property or deposits and offers more flexible end-use. We help you pick the structure with the lowest effective cost." },
      { q: "Can I get working capital without collateral?", a: "Yes — CGTMSE-covered facilities provide collateral-free limits up to ₹5 crore for eligible manufacturing and service MSMEs. Your eligibility depends on financials and credit conduct." },
      { q: "How is my working capital limit decided?", a: "Banks assess your operating cycle, turnover and margins — commonly 20–25% of annual turnover. We present your file to lenders whose assessment method favours your business model." },
    ],
  },
];

export const getLoan = (slug: string) => loans.find((l) => l.slug === slug);
