"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Counts from 0 to `value` when scrolled into view.
 * Renders the final value immediately for reduced-motion users
 * (and for SEO, since the target number is in the initial HTML).
 */
export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const state = { n: 0 };
    gsap.to(state, {
      n: value,
      duration: 2.2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${state.n.toLocaleString("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
      },
    });
  });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value.toLocaleString("en-IN", { maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
