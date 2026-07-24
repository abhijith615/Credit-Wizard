"use client";

import { useReveal } from "@/hooks/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import EmiCalculator from "@/components/calculator/EmiCalculator";

export default function EmiSection() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="emi-calculator" className="scroll-mt-24 bg-white py-28 lg:py-36" aria-label="EMI calculator">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Plan Before You Borrow"
          title="Know your EMI in seconds."
          description="Move the sliders and watch the numbers respond — monthly EMI, total interest and the full cost of the loan, before you speak to anyone."
          align="center"
        />
        <div data-scale className="mx-auto mt-16 max-w-5xl">
          <EmiCalculator />
        </div>
      </div>
    </section>
  );
}
