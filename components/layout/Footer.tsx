"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const loanLinks = [
  { href: "/business-loan", label: "Business Loan" },
  { href: "/home-loan", label: "Home Loan" },
  { href: "/loan-against-property", label: "Loan Against Property" },
  { href: "/personal-loan", label: "Personal Loan" },
  { href: "/working-capital-loan", label: "Working Capital Loan" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
              Trusted financial advisory in Tiruppur since {site.founded}. The right loan,
              the right bank, the right rate — every time.
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
            <h3 className="eyebrow mb-6 !text-gold-400">Stay Informed</h3>
            {subscribed ? (
              <p className="text-sm leading-relaxed text-gold-300">
                Thank you — you&apos;re on the list. Smart finance insights, once a month.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSubscribed(true);
                }}
              >
                <p className="mb-4 text-sm leading-relaxed text-navy-200">
                  Monthly insights on loans, rates and credit health. No spam, ever.
                </p>
                <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-gold-400">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-navy-300 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-gold-500 px-5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
                    aria-label="Subscribe to newsletter"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 space-y-2 text-sm text-navy-200">
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

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-navy-300">
            © {new Date().getFullYear()} {site.name}. All rights reserved. · Tiruppur, Tamil Nadu
          </p>
          <div className="flex gap-5">
            {(
              [
                ["Facebook", site.social.facebook, "M13.5 8.5V6.75c0-.7.55-1.25 1.25-1.25H16.5V2.5h-2.75A4.25 4.25 0 0 0 9.5 6.75V8.5H7v3h2.5v9h4v-9h2.75l.5-3z"],
                ["Instagram", site.social.instagram, "M12 8.25A3.75 3.75 0 1 0 12 15.75 3.75 3.75 0 0 0 12 8.25zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm6.4-.65a1.35 1.35 0 1 1-2.7 0 1.35 1.35 0 0 1 2.7 0zM3 7.5A4.5 4.5 0 0 1 7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5z"],
                ["LinkedIn", site.social.linkedin, "M6.5 8.75v11.5H3V8.75zM4.75 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM20.5 13.6v6.65H17v-6.15c0-1.5-.65-2.35-1.9-2.35-1 0-1.7.7-1.95 1.35-.1.25-.15.55-.15.9v6.25H9.5V8.75H13v1.5c.55-.85 1.55-1.85 3.5-1.85 2.45 0 4 1.65 4 5.2z"],
                ["X", site.social.twitter, "M17.75 3h3.1l-6.8 7.8L22 21h-6.25l-4.9-6.45L5.25 21h-3.1l7.25-8.35L2 3h6.4l4.45 5.9zm-1.1 16.15h1.7L7.45 4.75H5.6z"],
              ] as const
            ).map(([name, href, d]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on ${name}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-navy-200 transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
