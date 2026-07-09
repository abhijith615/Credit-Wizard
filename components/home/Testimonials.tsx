"use client";

import { useReveal } from "@/hooks/useReveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-1" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-gold-500" aria-hidden="true">
          <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * No slider — a floating three-column collage. Columns drift at
 * different parallax speeds while scrolling, so the wall of praise
 * feels alive without any carousel mechanics.
 */
export default function Testimonials() {
  const scope = useReveal<HTMLElement>();

  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;
      if (!window.matchMedia("(min-width: 1024px)").matches) return;

      gsap.utils.toArray<HTMLElement>("[data-t-col]").forEach((col, i) => {
        gsap.to(col, {
          y: [-44, 30, -18][i % 3],
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope }
  );

  const cols = [testimonials.slice(0, 2), testimonials.slice(2, 4), testimonials.slice(4, 6)];

  return (
    <section ref={scope} className="overflow-hidden bg-white py-28 lg:py-36" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Client Stories"
          title="Trusted by the people who build businesses and homes."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cols.map((col, ci) => (
            <div key={ci} data-t-col className={`space-y-6 ${ci === 1 ? "lg:mt-14" : ""}`}>
              {col.map((t) => (
                <figure key={t.name} data-reveal className="card-luxe sheen rounded-3xl p-8">
                  <Stars rating={t.rating} />
                  <blockquote className="mt-5 text-[0.98rem] leading-relaxed text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 font-serif-display text-base text-gold-300"
                      aria-hidden="true"
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-800">{t.name}</p>
                      <p className="text-xs text-ink-soft">
                        {t.role} · {t.location}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
