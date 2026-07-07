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
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Client Stories"
            title="Trusted by the people who built Tiruppur."
          />
          <div data-reveal className="glass flex items-center gap-4 rounded-2xl px-6 py-4">
            <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
              <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h5.9a5.05 5.05 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.24-4.74 3.24-8.11z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.26-2.66l-3.55-2.76c-.99.66-2.25 1.05-3.71 1.05-2.86 0-5.28-1.93-6.14-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.86 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06L5.86 9.9c.86-2.6 3.28-4.52 6.14-4.52z" />
            </svg>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                4.9 <Stars rating={5} />
              </p>
              <p className="text-xs text-ink-soft">312 Google reviews</p>
            </div>
          </div>
        </div>

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
