"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const milestones = [
  {
    year: "2006",
    title: "The first desk",
    text: "CreditWizard opens in Tiruppur with one advisor, two bank relationships and a promise of straight answers.",
  },
  {
    year: "2011",
    title: "The textile belt trusts us",
    text: "Word-of-mouth from garment exporters makes us the quiet default for working capital in the knitwear cluster.",
  },
  {
    year: "2015",
    title: "1,000 families home",
    text: "Our home loan practice crosses a thousand disbursed loans — many to first-generation buyers.",
  },
  {
    year: "2019",
    title: "25 banks, one desk",
    text: "Our lender network crosses 25 institutions, letting us truly compare rather than merely refer.",
  },
  {
    year: "2022",
    title: "CGTMSE at scale",
    text: "We become one of the region's most experienced desks for collateral-free MSME finance.",
  },
  {
    year: "Today",
    title: "Every loan need, one desk",
    text: "5,000+ clients, 35+ banking partners, 15+ loan options — and the same founding promise: advice first, always.",
  },
];

const values = [
  {
    title: "Advice before product",
    text: "We recommend what fits your cash flow — including, sometimes, not borrowing at all.",
  },
  {
    title: "Total transparency",
    text: "Every charge, every clause, explained in plain language before you sign.",
  },
  {
    title: "Speed with rigour",
    text: "Fast approvals come from doing the file right the first time, not from cutting corners.",
  },
  {
    title: "Relationships over transactions",
    text: "Most of our clients are on their third or fourth loan with us. That is the metric we manage.",
  },
];

export default function AboutContent() {
  const scope = useReveal<HTMLElement>();
  const spineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !spineRef.current || !timelineRef.current) return;
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 72%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope }
  );

  return (
    <div ref={scope as React.RefObject<HTMLDivElement>}>
      {/* Numbers */}
      <section className="bg-white pb-24 lg:pb-28" aria-label="CreditWizard by the numbers">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            data-reveal-group
            className="grid gap-px overflow-hidden rounded-3xl border border-navy-100 bg-navy-100/70 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { value: site.stats.years, suffix: "+", label: "Years of Experience" },
              { value: site.stats.clients, suffix: "+", label: "Happy Customers" },
              { value: site.stats.banks, suffix: "+", label: "Banking Partners" },
              { value: site.stats.loanOptions, suffix: "+", label: "Loan Options Available" },
            ].map((s) => (
              <div key={s.label} data-reveal className="bg-white p-10 text-center">
                <p className="font-serif-display text-5xl text-navy-700">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm font-medium text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial imagery: how we work, and what it adds up to */}
      <section className="bg-white pb-28" aria-label="CreditWizard in pictures">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1.35fr_1fr]">
          <figure data-reveal-x="left" className="group relative overflow-hidden rounded-3xl">
            <Image
              src="/images/family-keys.jpeg"
              alt="A family celebrating as they receive the keys to their new home"
              width={2400}
              height={1792}
              sizes="(max-width: 1024px) 100vw, 640px"
              className="h-80 w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[26rem]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" aria-hidden="true" />
            <figcaption className="absolute bottom-6 left-7 right-7 font-serif-display text-2xl text-white drop-shadow-[0_2px_12px_rgba(13,20,40,0.6)]">
              Every approval ends in a moment like this.
            </figcaption>
          </figure>
          <figure data-reveal-x="right" className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white">
            <Image
              src="/images/growth.jpeg"
              alt="Rising growth chart built from Indian rupee notes"
              width={2400}
              height={1792}
              sizes="(max-width: 1024px) 100vw, 480px"
              className="h-80 w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[26rem]"
            />
            <figcaption className="absolute bottom-6 left-7 right-7 font-serif-display text-2xl text-navy-800">
              Every kind of growth, funded honestly.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-beige py-28 lg:py-32" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Journey"
            title="2006 → Today"
            description="Twenty years, told in six chapters."
            align="center"
          />

          <div className="relative mx-auto mt-20 max-w-3xl">
            <div className="absolute bottom-8 left-[1.05rem] top-8 w-px bg-navy-200/70 sm:left-1/2" aria-hidden="true">
              <div ref={spineRef} className="h-full w-full origin-top bg-gradient-to-b from-gold-400 to-gold-600" />
            </div>

            <ol ref={timelineRef} className="space-y-16">
              {milestones.map((m, i) => (
                <li
                  key={m.year}
                  data-reveal
                  className={`relative pl-14 sm:w-1/2 ${
                    i % 2 === 1 ? "sm:ml-auto sm:pl-14" : "sm:pl-0 sm:pr-14 sm:text-right"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold-500 bg-white ${
                      i % 2 === 1 ? "sm:-left-[1.15rem]" : "sm:left-auto sm:-right-[1.15rem]"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-gold-500" />
                  </span>
                  <p className="font-serif-display text-4xl text-gold-600">{m.year}</p>
                  <h3 className="mt-3 text-lg font-semibold text-navy-800">{m.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-28 lg:py-32" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="The principles that survived twenty years."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2" data-reveal-group>
            {values.map((v, i) => (
              <div key={v.title} data-reveal className="card-luxe sheen rounded-3xl p-9">
                <span className="font-serif-display text-xl text-gold-500">0{i + 1}</span>
                <h3 className="font-serif-display mt-4 text-2xl text-navy-800">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
