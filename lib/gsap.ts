"use client";

/**
 * Central GSAP registration. Import gsap from here everywhere so
 * plugins are registered exactly once on the client.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

/** True when the user prefers reduced motion — every effect checks this. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, useGSAP };
