"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import LoanIcon from "@/components/ui/LoanIcon";
import { loans } from "@/lib/data/loans";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Premium service cards with pointer-tracked lighting: a radial gold
 * glow follows the cursor across each card via CSS custom properties.
 */
export default function Services() {
  const scope = useReveal<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);

  const onCardMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion()) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section ref={scope} className="bg-mist py-28 lg:py-36" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <SectionHeading
            eyebrow="Loan Solutions"
            title="Every financial need. One trusted advisor."
            description="Five specialised loan practices, one standard of care — compared across 35+ banks and NBFCs to land the structure and rate that fit you."
          />
        </div>

        <div ref={gridRef} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan, i) => (
            <Link
              key={loan.slug}
              href={`/${loan.slug}`}
              data-reveal
              onMouseMove={onCardMove}
              className={`card-luxe group relative overflow-hidden rounded-3xl ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {/* Image header — same photo as the loan's detail page */}
              <div className="relative overflow-hidden">
                <Image
                  src={loan.image}
                  alt=""
                  width={1200}
                  height={896}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="h-44 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Pointer-follow lighting */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(199,154,45,0.12), transparent 65%)",
                }}
              />

              {/* Icon badge bridges image and content */}
              <span className="relative -mt-8 ml-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-navy-700 shadow-[0_10px_30px_-12px_rgba(22,36,74,0.35)] ring-1 ring-navy-100 transition-colors duration-500 group-hover:bg-navy-700 group-hover:text-gold-300">
                <LoanIcon name={loan.icon} />
              </span>

              <div className="p-8 pt-5">
              <h3 className="font-serif-display relative text-2xl text-navy-800">
                {loan.name}
              </h3>
              <p className="relative mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                {loan.description}
              </p>

              <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={`${loan.name} highlights`}>
                {loan.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-navy-100 bg-navy-50/60 px-3.5 py-1.5 text-xs font-medium text-navy-700"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <span className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition-colors duration-300 group-hover:text-gold-600">
                Learn More
                <svg
                  className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              </div>
            </Link>
          ))}

          {/* Consultation card completes the grid */}
          <div
            data-reveal
            className="grad-navy sheen relative flex flex-col justify-between overflow-hidden rounded-3xl p-9 text-white"
          >
            {/* Advisor consultation photo under a navy grade */}
            <div className="absolute inset-0" aria-hidden="true">
              <Image
                src="/images/consultation.jpeg"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-800/80 to-navy-950/90" />
            </div>
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30"
              style={{ background: "radial-gradient(closest-side, rgba(199,154,45,0.8), transparent)" }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="eyebrow !text-gold-300">Not sure where to start?</p>
              <h3 className="font-serif-display mt-5 text-3xl leading-snug">
                Talk to an advisor — free, and genuinely useful.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-navy-200">
                A 30-minute conversation that maps your exact need to the right product and lender.
              </p>
            </div>
            <Link
              href="/contact#enquiry"
              className="relative mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-gold-400"
            >
              Get Free Consultation
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
