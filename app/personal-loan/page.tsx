import LoanPage, { loanMetadata } from "@/components/loans/LoanPage";

export const metadata = loanMetadata("personal-loan");

export default function PersonalLoanPage() {
  return <LoanPage slug="personal-loan" />;
}
