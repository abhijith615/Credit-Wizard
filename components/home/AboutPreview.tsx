"use client";

import { useReveal } from "@/hooks/useReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const stats = [
  { value: site.stats.years, suffix: "+", label: "Years of Experience" },
  { value: site.stats.clients, suffix: "+", label: "Happy Customers" },
  { value: site.stats.banks, suffix: "+", label: "Banking Partners" },
  { value: site.stats.croresFacilitated, prefix: "₹", suffix: " Cr+", label: "Loans Facilitated" },
];

export default function AboutPreview() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="bg-white py-28 lg:py-36" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About CreditWizard"
              title="Two decades of financial expertise, one promise: the right loan, honestly."
              description="Since 2006, CreditWizard has guided Tiruppur's businesses and families through every kind of financial decision — from a first home to a factory expansion. We are advisors first, brokers second."
            />
            <div data-reveal className="mt-10">
              <MagneticButton href="/about" variant="navy">
                Our Story
              </MagneticButton>
            </div>
          </div>

          <div data-reveal-x="right" className="relative">
            {/* Gold frame accent */}
            <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl border border-gold-300/50" aria-hidden="true" />
            <div className="card-luxe sheen relative grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-navy-100/60">
              {stats.map((s) => (
                <div key={s.label} className="bg-white p-8 sm:p-10">
                  <p className="font-serif-display text-4xl text-navy-700 sm:text-5xl">
                    <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust markers */}
        <ul
          data-reveal-group
          className="mt-20 grid gap-5 border-t border-navy-100 pt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            "Trusted Banking Network",
            "Transparent Process",
            "Personalised Consultation",
            "Zero-Pressure Guidance",
          ].map((item) => (
            <li key={item} data-reveal className="flex items-center gap-3 text-sm font-medium text-navy-800">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                  <path d="m3 8.5 3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
