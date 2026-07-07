import LoanPage, { loanMetadata } from "@/components/loans/LoanPage";

export const metadata = loanMetadata("working-capital-loan");

export default function WorkingCapitalLoanPage() {
  return <LoanPage slug="working-capital-loan" />;
}
