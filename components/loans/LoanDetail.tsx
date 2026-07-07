"use client";

import Link from "next/link";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import LoanIcon from "@/components/ui/LoanIcon";
import MagneticButton from "@/components/ui/MagneticButton";
import type { Loan } from "@/lib/data/loans";
import { loans } from "@/lib/data/loans";

/** Accessible accordion item for FAQs with animated height. */
function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-100">
      <button
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
      >
        <span className="text-base font-semibold text-navy-800 sm:text-lg">{q}</span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "rotate-45 border-gold-500 text-gold-600" : "border-navy-200 text-navy-700"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 leading-relaxed text-ink-soft">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function LoanDetail({ loan }: { loan: Loan }) {
  const scope = useReveal<HTMLDivElement>();
  const others = loans.filter((l) => l.slug !== loan.slug).slice(0, 3);

  return (
    <div ref={scope}>
      {/* Overview + features */}
      <section className="bg-white pb-24 pt-4 lg:pb-32" aria-label={`${loan.name} overview`}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <p data-reveal className="text-xl leading-relaxed text-ink">
                {loan.longDescription}
              </p>

              <div className="mt-14 grid gap-6 sm:grid-cols-1">
                {loan.features.map((f, i) => (
                  <div
                    key={f.title}
                    data-reveal
                    className="card-luxe sheen flex gap-6 rounded-3xl p-8"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy-700">
                      <LoanIcon name={loan.icon} className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-serif-display text-xl text-navy-800">{f.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky eligibility / documents rail */}
            <aside className="lg:sticky lg:top-32 lg:self-start" aria-label="Eligibility and documents">
              <div data-reveal-x="right" className="grad-navy overflow-hidden rounded-3xl p-9 text-white">
                <h2 className="font-serif-display text-2xl">Eligibility</h2>
                <ul className="mt-6 space-y-4">
                  {loan.eligibility.map((e) => (
                    <li key={e} className="flex gap-3 text-sm leading-relaxed text-navy-100">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                          <path d="m3 8.5 3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {e}
                    </li>
                  ))}
                </ul>

                <h2 className="font-serif-display mt-10 text-2xl">Documents Required</h2>
                <ul className="mt-6 space-y-3.5">
                  {loan.documents.map((d) => (
                    <li key={d} className="flex gap-3 text-sm leading-relaxed text-navy-100">
                      <span className="mt-[0.55rem] h-1 w-4 shrink-0 rounded-full bg-gold-400/70" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <MagneticButton href="/contact#enquiry" variant="gold" className="w-full">
                    Check Your Eligibility
                  </MagneticButton>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-mist py-24 lg:py-32" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Common Questions"
            title={`${loan.name} — answered honestly.`}
            align="center"
          />
          <div data-reveal className="mt-14 border-t border-navy-100">
            {loan.faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} id={`faq-${loan.slug}-${i}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="bg-white py-24 lg:py-28" aria-labelledby="related-loans-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="related-loans-heading" data-split className="font-serif-display text-3xl text-navy-800 sm:text-4xl">
            Explore other solutions
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3" data-reveal-group>
            {others.map((l) => (
              <Link key={l.slug} href={`/${l.slug}`} data-reveal className="card-luxe group rounded-3xl p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors duration-500 group-hover:bg-navy-700 group-hover:text-gold-300">
                  <LoanIcon name={l.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-serif-display mt-5 text-xl text-navy-800">{l.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{l.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600">
                  Learn More
                  <svg className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
