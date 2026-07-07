/** Elegant stroke icons for each loan product — one path language, no icon library. */
const paths: Record<string, React.ReactNode> = {
  briefcase: (
    <>
      <rect x="5" y="12" width="30" height="21" rx="3" />
      <path d="M14 12V9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3M5 21h30M20 18v6" />
    </>
  ),
  home: (
    <>
      <path d="M6 19 20 7l14 12" />
      <path d="M9.5 17v14a2 2 0 0 0 2 2h17a2 2 0 0 0 2-2V17M16.5 33v-9h7v9" />
    </>
  ),
  building: (
    <>
      <rect x="8" y="6" width="17" height="27" rx="2" />
      <path d="M25 15h5.5a2 2 0 0 1 2 2v16M13 12h3m-3 6h3m-3 6h3m5-12h3m-3 6h3m-3 6h3M5 33h30" />
    </>
  ),
  user: (
    <>
      <circle cx="20" cy="13.5" r="6.5" />
      <path d="M7.5 33.5c1.6-6.6 6.4-10 12.5-10s10.9 3.4 12.5 10" />
    </>
  ),
  cycle: (
    <>
      <path d="M31.5 15.5A12.5 12.5 0 0 0 9 17.5M8.5 24.5A12.5 12.5 0 0 0 31 22.5" />
      <path d="M9 10v7.5h7.5M31 30v-7.5h-7.5" />
    </>
  ),
};

export default function LoanIcon({
  name,
  className = "h-9 w-9",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.briefcase}
    </svg>
  );
}
