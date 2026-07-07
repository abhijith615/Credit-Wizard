"use client";

import { useRef, type RefObject } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Reusable scroll-reveal hook.
 *
 * Inside the returned ref's subtree it animates, on scroll into view:
 *  - [data-split]      → SplitText line-mask reveal (serif headlines)
 *  - [data-reveal]     → rise + fade (optionally staggered per parent)
 *  - [data-reveal-x]   → slide in from the side ("left" | "right")
 *  - [data-scale]      → gentle scale-in for imagery / cards
 *
 * All of it is skipped for prefers-reduced-motion users.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;

      const triggerFor = (el: Element) => ({
        trigger: el,
        start: "top 86%",
        once: true,
      });

      // Serif headline reveals — masked lines rising with a luxe ease
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.09,
          ease: "power4.out",
          scrollTrigger: triggerFor(el),
        });
      });

      // Grouped rise+fade: children of [data-reveal-group] stagger together
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.from(group.querySelectorAll("[data-reveal]"), {
          y: 44,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: triggerFor(group),
          clearProps: "transform",
        });
      });

      // Solo rise+fade
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]:not([data-reveal-group] [data-reveal])")
        .forEach((el) => {
          gsap.from(el, {
            y: 44,
            autoAlpha: 0,
            duration: 1.1,
            scrollTrigger: triggerFor(el),
            clearProps: "transform",
          });
        });

      // Directional slides
      gsap.utils.toArray<HTMLElement>("[data-reveal-x]").forEach((el) => {
        const dir = el.dataset.revealX === "right" ? 72 : -72;
        gsap.from(el, {
          x: dir,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: triggerFor(el),
          clearProps: "transform",
        });
      });

      // Scale-in for visual blocks
      gsap.utils.toArray<HTMLElement>("[data-scale]").forEach((el) => {
        gsap.from(el, {
          scale: 0.92,
          autoAlpha: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: triggerFor(el),
          clearProps: "transform",
        });
      });
    },
    { scope }
  );

  return scope;
}
