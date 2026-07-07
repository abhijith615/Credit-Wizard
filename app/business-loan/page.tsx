import LoanPage, { loanMetadata } from "@/components/loans/LoanPage";

export const metadata = loanMetadata("business-loan");

export default function BusinessLoanPage() {
  return <LoanPage slug="business-loan" />;
}
