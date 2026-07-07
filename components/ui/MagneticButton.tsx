"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "gold" | "navy" | "ghost" | "ghost-light";

const styles: Record<Variant, string> = {
  gold: "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-[0_10px_30px_-10px_rgba(199,154,45,0.55)]",
  navy: "bg-navy-700 text-white hover:bg-navy-600 shadow-[0_10px_30px_-10px_rgba(36,62,115,0.5)]",
  ghost:
    "border border-navy-700/25 text-navy-700 hover:border-gold-500 hover:text-gold-600 bg-transparent",
  "ghost-light":
    "border border-white/30 text-white hover:border-gold-400 hover:text-gold-300 bg-transparent",
};

interface Props {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Primary CTA — magnetic pull on desktop, plain tap target on touch.
 */
export default function MagneticButton({
  href,
  onClick,
  type = "button",
  variant = "gold",
  children,
  className = "",
  ariaLabel,
}: Props) {
  const ref = useMagnetic<HTMLDivElement>(0.28);

  const base = `group relative inline-flex items-center justify-center gap-2.5 rounded-full
    px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-300
    ${styles[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <svg
        className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  const isInternal = href?.startsWith("/") || href?.startsWith("#");

  return (
    <div ref={ref} className="inline-block">
      {href && isInternal ? (
        <Link href={href} className={base} aria-label={ariaLabel}>
          {inner}
        </Link>
      ) : href ? (
        <a href={href} className={base} aria-label={ariaLabel}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={base} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </div>
  );
}
