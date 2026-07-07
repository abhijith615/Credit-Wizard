import LoanPage, { loanMetadata } from "@/components/loans/LoanPage";

export const metadata = loanMetadata("home-loan");

export default function HomeLoanPage() {
  return <LoanPage slug="home-loan" />;
}
