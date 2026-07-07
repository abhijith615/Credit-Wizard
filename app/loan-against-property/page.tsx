import LoanPage, { loanMetadata } from "@/components/loans/LoanPage";

export const metadata = loanMetadata("loan-against-property");

export default function LoanAgainstPropertyPage() {
  return <LoanPage slug="loan-against-property" />;
}
