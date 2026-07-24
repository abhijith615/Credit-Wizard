export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO
  readingTime: number; // minutes
  accent: "navy" | "gold" | "royal";
  content: string[]; // paragraphs
}

export const blogCategories = [
  "Business Loans",
  "Home Loans",
  "MSME Finance",
  "Loan Against Property",
  "Working Capital",
  "Personal Finance",
  "Tax Saving",
  "Credit Score",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "improve-credit-score-before-loan",
    title: "7 Proven Ways to Improve Your Credit Score Before Applying for a Loan",
    excerpt:
      "A 50-point improvement in your CIBIL score can cut your interest rate meaningfully. Here is the exact playbook we give our clients before they apply.",
    category: "Credit Score",
    author: "Credit Wizard Advisory Team",
    date: "2026-06-18",
    readingTime: 6,
    accent: "gold",
    content: [
      "Your credit score is the single most influential number in your loan application. Lenders use it to decide not just whether to approve you, but what rate to offer. Moving from the 700s into the 760+ band routinely unlocks better pricing tiers.",
      "First, pull your report from CIBIL and check for errors — incorrectly reported late payments and closed accounts still showing active are more common than most borrowers expect. Disputing errors is free and can lift your score within 30–45 days.",
      "Second, bring credit card utilisation under 30% of your limit. Utilisation is recalculated monthly, so paying balances down before your statement date shows results quickly.",
      "Third, do not close your oldest credit card. Length of credit history matters, and closing an old account shortens your average account age.",
      "Fourth, avoid new credit inquiries in the 90 days before a major loan application. Every hard inquiry shaves a few points, and clusters of inquiries signal credit hunger to underwriters.",
      "Fifth, if you have a thin file, a small secured card or an FD-backed card builds history safely. Sixth, set every EMI and card bill on auto-debit — a single 30-day late payment can cost 60–100 points and stays on your report for years.",
      "Finally, keep a healthy mix of secured and unsecured credit. When you are ready, a Credit Wizard advisor can pre-screen your profile across 35+ lenders without triggering a hard inquiry.",
    ],
  },
  {
    slug: "cgtmse-loan-guide-msme",
    title: "The Complete CGTMSE Loan Guide for Tamil Nadu MSMEs (2026)",
    excerpt:
      "Collateral-free credit up to ₹5 crore is available to eligible MSMEs under CGTMSE. Here's how the scheme works and how to qualify.",
    category: "MSME Finance",
    author: "Credit Wizard Advisory Team",
    date: "2026-05-30",
    readingTime: 8,
    accent: "navy",
    content: [
      "The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) lets banks lend to MSMEs without collateral by guaranteeing a large portion of the exposure. For Tiruppur's textile and manufacturing units, it is often the fastest route to meaningful working capital.",
      "Under the current framework, eligible micro and small enterprises can access collateral-free credit facilities up to ₹5 crore, covering both term loans and working capital.",
      "Eligibility hinges on being a new or existing micro/small enterprise with a viable business model. Retail trade, educational institutions and self-help groups have specific carve-outs, so classification matters — get it verified before applying.",
      "The guarantee fee is borne by the borrower and varies by loan size and category, with concessions for women entrepreneurs and units in specified regions.",
      "Banks still underwrite the business: expect scrutiny of GST returns, bank statements and financials. A well-prepared file with clean documentation is what separates a 3-week approval from a 3-month one.",
      "Credit Wizard has processed CGTMSE files across public and private sector banks for over a decade. We match your profile to the lender with the most favourable internal policy for your industry — talk to us before you apply anywhere.",
    ],
  },
  {
    slug: "home-loan-balance-transfer-worth-it",
    title: "Home Loan Balance Transfer: When It Saves Lakhs — and When It Doesn't",
    excerpt:
      "A lower rate isn't automatically a better deal. Use this break-even framework to decide whether transferring your home loan makes sense.",
    category: "Home Loans",
    author: "Credit Wizard Advisory Team",
    date: "2026-05-12",
    readingTime: 5,
    accent: "royal",
    content: [
      "Banks compete hard for existing home loan customers with clean repayment records, which means you may be able to refinance at a rate 0.5–1% below what you currently pay.",
      "The math is simple: estimate total interest saved over your remaining tenure, subtract transfer costs (processing fees, legal and valuation charges, stamp duty on the new mortgage), and check the break-even point.",
      "As a rule of thumb, a transfer makes sense when the rate difference is at least 0.5% and your remaining tenure is 8 years or more. In the final years of a loan, most of your EMI is principal — there is little interest left to save.",
      "Watch for hidden costs: some lenders offer teaser pricing that resets after a year, and 'zero processing fee' offers sometimes recover it through higher legal charges.",
      "A transfer is also the best moment to negotiate a top-up loan at home-loan rates — far cheaper than a personal loan for renovations or large expenses.",
      "We run the full break-even calculation across current offers from 35+ banks, including all charges, so you see the true net saving before you commit.",
    ],
  },
  {
    slug: "working-capital-mistakes-textile-business",
    title: "5 Working Capital Mistakes Textile Businesses Make (and How to Avoid Them)",
    excerpt:
      "From under-utilised CC limits to funding machinery with short-term money — the cash flow errors we see most often in Tiruppur's textile belt.",
    category: "Working Capital",
    author: "Credit Wizard Advisory Team",
    date: "2026-04-22",
    readingTime: 7,
    accent: "navy",
    content: [
      "After two decades advising textile businesses in Tiruppur, we see the same working capital mistakes repeat across units of every size.",
      "Mistake one: funding long-term assets with short-term money. Buying machinery from your cash credit limit chokes day-to-day liquidity — machinery deserves a term loan matched to its earning life.",
      "Mistake two: letting your CC limit stagnate while turnover grows. Banks assess limits on past financials; if your business has grown 30%, you are likely operating on a limit sized for a smaller company. Enhancement reviews should be annual.",
      "Mistake three: poor stock and debtor statement discipline. Irregular submissions attract penal interest and sour the banking relationship that determines your next enhancement.",
      "Mistake four: ignoring the effective cost of the facility. A lower interest rate with heavy commitment charges on unused limits can cost more than a slightly higher rate with none.",
      "Mistake five: single-bank dependence. Concentrating all facilities with one lender leaves you exposed to their policy changes. A second banking relationship is negotiating leverage.",
      "A working capital review takes us less than a week and regularly uncovers 1–2% of cost savings. It is the highest-ROI hour a business owner can spend with us.",
    ],
  },
  {
    slug: "loan-against-property-vs-business-loan",
    title: "Loan Against Property vs Business Loan: Which Is Right for Your Expansion?",
    excerpt:
      "Lower rate and longer tenure, or faster processing and no collateral? A practical comparison for business owners weighing both options.",
    category: "Loan Against Property",
    author: "Credit Wizard Advisory Team",
    date: "2026-03-28",
    readingTime: 6,
    accent: "gold",
    content: [
      "When a business needs ₹50 lakh or more for expansion, the choice usually narrows to two products: an unsecured business loan or a loan against property (LAP).",
      "LAP wins on cost: rates run several percentage points below unsecured business loans, and tenures stretch to 15 years, keeping EMIs manageable during the expansion phase.",
      "Business loans win on speed and simplicity: no property valuation, no legal opinion, no mortgage creation — disbursal in days rather than weeks.",
      "The decision framework we use: if the funding need is durable (capacity expansion, new premises), LAP's lower cost compounds into significant savings. If the need is short and urgent (a large order, a seasonal spike), speed matters more than rate.",
      "There is also a hybrid path many owners miss: a smaller unsecured loan for immediate needs, refinanced into a LAP once the property paperwork completes.",
      "Bring us your expansion plan and property documents, and we will model both options — including total interest cost, processing timelines and prepayment flexibility — before you commit either way.",
    ],
  },
  {
    slug: "tax-benefits-home-loan-2026",
    title: "Every Tax Benefit on Your Home Loan, Explained Simply (FY 2026-27)",
    excerpt:
      "Section 24(b), 80C, and the choices the new tax regime forces — how to actually maximise the tax value of your home loan.",
    category: "Tax Saving",
    author: "Credit Wizard Advisory Team",
    date: "2026-03-10",
    readingTime: 6,
    accent: "royal",
    content: [
      "A home loan remains one of the most tax-efficient forms of borrowing available to Indian taxpayers — but only if you structure it deliberately.",
      "Under the old tax regime, Section 24(b) allows a deduction of up to ₹2 lakh per year on interest for a self-occupied property, while Section 80C covers principal repayment up to ₹1.5 lakh within the overall 80C ceiling.",
      "For let-out properties, the entire interest is deductible against rental income, with loss set-off against other income capped at ₹2 lakh per year and the balance carried forward.",
      "The new regime offers lower slab rates but drops most home loan deductions for self-occupied property — the right choice depends on your total deduction basket, not the home loan alone.",
      "Joint loans multiply benefits: each co-borrower who is also a co-owner can claim deductions independently, effectively doubling the household's deduction ceiling.",
      "Before your next financial year begins, spend thirty minutes with an advisor comparing both regimes with your actual numbers. We do this for every home loan client at no charge.",
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const relatedPosts = (slug: string, count = 3) => {
  const current = getPost(slug);
  if (!current) return blogPosts.slice(0, count);
  return blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0;
      const bScore = b.category === current.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, count);
};
