import Link from "next/link";
import Image from "next/image";

/**
 * CreditWizard brand: the hexagonal "CW" mark cropped from the
 * original logo.png (navy tile, gold/white monogram) paired with a
 * crisp HTML wordmark so the text stays sharp at every size.
 */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label="Credit Wizard In — home"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={44}
        height={44}
        priority
        className="h-11 w-11 shrink-0 rounded-xl shadow-[0_2px_10px_rgba(22,36,74,0.3)]"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif-display text-[1.3rem] tracking-tight ${
            light ? "text-white" : "text-navy-800"
          }`}
        >
          Credit<span className="text-gold-500">Wizard</span>
          <span className={light ? "text-navy-200" : "text-ink-soft"}> In</span>
        </span>
        <span
          className={`mt-1 text-[0.58rem] font-medium uppercase tracking-[0.28em] ${
            light ? "text-navy-200" : "text-ink-soft"
          }`}
        >
          For Your Financial Needs
        </span>
      </span>
    </Link>
  );
}
