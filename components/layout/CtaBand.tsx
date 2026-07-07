"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/lib/site";

/** Closing call-to-action band reused across inner pages. */
export default function CtaBand({
  title = "Ready when you are.",
  text = "One conversation with a senior advisor — free, honest and specific to your numbers.",
}: {
  title?: string;
  text?: string;
}) {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="grad-hero relative overflow-hidden py-24 text-white lg:py-32">
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full opacity-25"
        style={{ background: "radial-gradient(closest-side, rgba(199,154,45,0.7), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 data-split className="font-serif-display text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-navy-200">
          {text}
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <MagneticButton href="/contact#enquiry" variant="gold">
            Get Free Consultation
          </MagneticButton>
          <MagneticButton href={site.phoneHref} variant="ghost-light">
            Call {site.phone}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
