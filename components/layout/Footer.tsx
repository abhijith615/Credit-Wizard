"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy & Security Policy" },
];

const loanLinks = [
  { href: "/business-loan", label: "Business Loan" },
  { href: "/home-loan", label: "Home Loan" },
  { href: "/loan-against-property", label: "Loan Against Property" },
  { href: "/personal-loan", label: "Personal Loan" },
  { href: "/working-capital-loan", label: "Working Capital Loan" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full opacity-25"
        style={{ background: "radial-gradient(closest-side, rgba(199,154,45,0.55), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        {/* Oversized editorial statement */}
        <p className="font-serif-display max-w-4xl text-4xl leading-[1.12] text-white/95 sm:text-5xl lg:text-6xl">
          Two decades of trust.
          <br />
          <span className="text-gold-shimmer">One conversation away.</span>
        </p>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-200">
              Trusted financial advisory since {site.founded}, serving businesses and
              families across India. The right loan, the right bank, the right rate — every time.
            </p>
          </div>

          <nav aria-label="Quick links">
            <h3 className="eyebrow mb-6 !text-gold-400">Quick Links</h3>
            <ul className="space-y-3.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-navy-200 transition-colors duration-300 hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Loan products">
            <h3 className="eyebrow mb-6 !text-gold-400">Loan Products</h3>
            <ul className="space-y-3.5">
              {loanLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-navy-200 transition-colors duration-300 hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow mb-6 !text-gold-400">Get in Touch</h3>
            <div className="space-y-2 text-sm text-navy-200">
              <p>
                <a href={site.phoneHref} className="transition-colors hover:text-gold-300">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-300">
                  {site.email}
                </a>
              </p>
              <p>
                {site.address.street}, {site.address.locality}, {site.address.region}{" "}
                {site.address.postalCode}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center sm:text-left">
          <p className="text-xs text-navy-300">
            © {new Date().getFullYear()} {site.name}. All rights reserved. · Tiruppur, Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
