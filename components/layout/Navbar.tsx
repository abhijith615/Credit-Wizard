"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { useMagnetic } from "@/hooks/useMagnetic";

const loanLinks = [
  { href: "/business-loan", label: "Business Loan" },
  { href: "/home-loan", label: "Home Loan" },
  { href: "/loan-against-property", label: "Loan Against Property" },
  { href: "/personal-loan", label: "Personal Loan" },
  { href: "/working-capital-loan", label: "Working Capital Loan" },
];

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const tailLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * Sticky navigation: transparent over the hero, morphs into a glass
 * bar once the page scrolls. Loan pages live in a "Loans" dropdown on
 * desktop and expand inline in the full-screen mobile menu.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);
  const pathname = usePathname();
  const ctaRef = useMagnetic<HTMLDivElement>(0.25);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dark hero pages get light text while the navbar is transparent
  const overDark = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation; restore scroll
  useEffect(() => {
    setOpen(false);
    setLoansOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const linkCls = (href: string) =>
    `relative py-2 text-[0.82rem] font-medium tracking-wide transition-colors duration-300
     after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold-500
     after:transition-all after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)]
     ${pathname === href ? "after:w-full" : "after:w-0 hover:after:w-full"}
     ${overDark ? "text-white/85 hover:text-white" : "text-navy-800 hover:text-navy-600"}`;

  const enterLoans = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setLoansOpen(true);
  };
  const leaveLoans = () => {
    closeTimer.current = setTimeout(() => setLoansOpen(false), 180);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled && !open ? "glass shadow-[0_8px_32px_-16px_rgba(22,36,74,0.18)]" : ""
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        <div className="relative z-50">
          <Logo light={overDark} />
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {mainLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkCls(l.href)}>
              {l.label}
            </Link>
          ))}

          {/* Loans dropdown */}
          <div className="relative" onMouseEnter={enterLoans} onMouseLeave={leaveLoans}>
            <button
              className={`flex items-center gap-1.5 py-2 text-[0.82rem] font-medium tracking-wide transition-colors duration-300 ${
                overDark ? "text-white/85 hover:text-white" : "text-navy-800 hover:text-navy-600"
              }`}
              aria-expanded={loansOpen}
              aria-haspopup="true"
              onClick={() => setLoansOpen((v) => !v)}
            >
              Loans
              <svg
                className={`h-3 w-3 transition-transform duration-300 ${loansOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                loansOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <div className="glass overflow-hidden rounded-2xl p-2 shadow-[0_24px_60px_-20px_rgba(22,36,74,0.35)]">
                {loanLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block rounded-xl px-4 py-3 text-[0.82rem] font-medium transition-colors duration-200 ${
                      pathname === l.href
                        ? "bg-navy-50 text-navy-700"
                        : "text-navy-800 hover:bg-gold-50 hover:text-gold-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {tailLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkCls(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div ref={ctaRef} className="hidden lg:block">
            <Link
              href="/contact#enquiry"
              className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-[0.8rem] font-semibold tracking-wide text-navy-900 shadow-[0_10px_28px_-12px_rgba(199,154,45,0.7)] transition-colors duration-300 hover:bg-gold-400"
            >
              Get Free Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden ${
              open ? "text-navy-800" : overDark ? "text-white" : "text-navy-800"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`h-[1.5px] w-6 bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span className={`h-[1.5px] w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-[1.5px] w-6 bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex-1 overflow-y-auto px-6 pb-10 pt-28">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {[...mainLinks, ...loanLinks, ...tailLinks].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-navy-100/70 py-4 font-serif-display text-2xl text-navy-800 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div
            className={`mt-8 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: open ? "520ms" : "0ms" }}
          >
            <Link
              href="/contact#enquiry"
              className="block rounded-full bg-gold-500 px-8 py-4 text-center text-sm font-semibold text-navy-900"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
