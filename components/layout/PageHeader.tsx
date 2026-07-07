"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Crumb {
  name: string;
  path: string;
}

/**
 * Inner-page hero: light canvas, oversized serif title with masked
 * SplitText entrance, breadcrumb trail for orientation + SEO.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      const split = SplitText.create("[data-ph-title]", { type: "lines", mask: "lines" });
      tl.from("[data-ph-fade]", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.15);
      tl.from(split.lines, { yPercent: 115, duration: 1.25, stagger: 0.1 }, 0.3);
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-navy-50 via-white to-white pb-16 pt-40 lg:pb-24 lg:pt-48"
    >
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full opacity-40"
        style={{ background: "radial-gradient(closest-side, rgba(199,154,45,0.18), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <nav aria-label="Breadcrumb" data-ph-fade>
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink-soft">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-navy-200" aria-hidden="true">
                    /
                  </span>
                )}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-gold-600">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="transition-colors hover:text-navy-700">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p data-ph-fade className="eyebrow mb-5 mt-10">
          {eyebrow}
        </p>
        <h1
          data-ph-title
          className="font-serif-display max-w-4xl text-balance text-5xl leading-[1.06] text-navy-800 sm:text-6xl lg:text-7xl"
        >
          {title}
        </h1>
        {description && (
          <p data-ph-fade className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
