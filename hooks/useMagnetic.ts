"use client";

import { useRef, useEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Magnetic hover effect: the element is gently pulled toward the
 * pointer and settles back with an elastic ease on leave.
 * Only active on fine pointers (desktop) and when motion is allowed.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength = 0.32
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.4)" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}
