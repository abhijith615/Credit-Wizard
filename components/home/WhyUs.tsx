"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    title: "20+ Years Experience",
    text: "Two decades navigating bank credit policies means we know which lender says yes to your exact profile.",
    num: "01",
  },
  {
    title: "Fast Processing",
    text: "Pre-screened files, parallel processing and direct banker relationships compress weeks into days.",
    num: "02",
  },
  {
    title: "Best Interest Rates",
    text: "We make banks compete for your file — and pass every basis point of the negotiation back to you.",
    num: "03",
  },
  {
    title: "Multiple Bank Tie-ups",
    text: "35+ banks and NBFCs on one desk. One application, every relevant offer, zero running around.",
    num: "04",
  },
  {
    title: "Transparent Documentation",
    text: "A complete checklist upfront, every charge disclosed in writing. No surprises at sanction.",
    num: "05",
  },
  {
    title: "Dedicated Relationship Manager",
    text: "One person owns your file from application to disbursement — and answers the phone when you call.",
    num: "06",
  },
  {
    title: "Expert Financial Guidance",
    text: "Honest advice on whether to borrow at all. Sometimes the best guidance is 'wait six months' — we say it.",
    num: "07",
  },
];

/**
 * Editorial numbered list on a dark canvas. Rows reveal with a
 * stagger; on hover a gold rule slides in — an infographic that
 * reads like an index page from an annual report.
 */
export default function WhyUs() {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-navy-900 py-28 text-white lg:py-36"
      aria-labelledby="why-heading"
    >
      {/* Background: Tiruppur textile floor under a deep navy grade */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/business-loan.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-900/80 to-navy-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 to-transparent" />
      </div>
      <div
        className="pointer-events-none absolute -left-40 top-24 h-[34rem] w-[34rem] rounded-full opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(59,91,169,0.9), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-[26rem] w-[26rem] rounded-full opacity-15"
        style={{ background: "radial-gradient(closest-side, rgba(199,154,45,0.7), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why CreditWizard"
          title="What twenty years in the room with bankers buys you."
          description="Anyone can forward your documents to a bank. The difference is knowing which bank, which product, and which way to present your strengths."
          dark
        />

        <div className="mt-16 border-t border-white/10" data-reveal-group>
          {reasons.map((r) => (
            <div
              key={r.num}
              data-reveal
              className="group relative grid gap-3 border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.03] sm:grid-cols-[5rem_1fr_1.4fr] sm:items-baseline sm:gap-8 sm:py-9"
            >
              {/* Gold rule sweeps in on hover */}
              <span
                className="absolute bottom-0 left-0 h-px w-0 bg-gold-500 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                aria-hidden="true"
              />
              <span className="font-serif-display text-xl text-gold-400/80 transition-colors duration-300 group-hover:text-gold-300">
                {r.num}
              </span>
              <h3 className="font-serif-display text-2xl text-white sm:text-[1.7rem]">{r.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-navy-200">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
