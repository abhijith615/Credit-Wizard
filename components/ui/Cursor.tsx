"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Premium two-part cursor: a gold dot that tracks tightly and a ring
 * that lags with smooth interpolation. The ring expands over
 * interactive elements. Hidden on touch devices and for reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
        visible = true;
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
      ring.classList.toggle("is-hover", !!interactive);
    };

    const onLeave = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
      visible = false;
    };
    const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35, ease: "back.out(2)" });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cw-cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={ringRef} className="cw-cursor-ring hidden md:block" aria-hidden="true" />
    </>
  );
}
