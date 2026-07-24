"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger
 * and Lenis share a single rAF loop (no double-updates, no jank).
 * Disabled entirely for reduced-motion users.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const NAV_OFFSET = -96; // clear the fixed navbar when landing on an anchor

    // Reduced motion: still honour in-page anchor jumps, just instantly.
    if (prefersReducedMotion()) {
      const onClickReduced = (e: MouseEvent) => {
        const el = anchorTarget(e);
        if (el) {
          e.preventDefault();
          el.scrollIntoView();
        }
      };
      document.addEventListener("click", onClickReduced);
      return () => document.removeEventListener("click", onClickReduced);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Smooth-scroll same-page anchors; queue cross-page ones until the
    // target element is rendered after navigation.
    const scrollToHash = (hash: string) => {
      const el = document.querySelector(hash);
      if (el) lenis.scrollTo(el as HTMLElement, { offset: NAV_OFFSET });
      return !!el;
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.includes("#")) return;
      const url = new URL(a.href, window.location.href);
      if (!url.hash || url.hash === "#") return;

      if (url.pathname === window.location.pathname) {
        e.preventDefault();
        scrollToHash(url.hash);
      } else {
        // Different route — let Next navigate, then chase the element.
        let tries = 0;
        const chase = () => {
          if (scrollToHash(url.hash) || tries++ > 60) return;
          requestAnimationFrame(chase);
        };
        setTimeout(() => requestAnimationFrame(chase), 120);
      }
    };

    document.addEventListener("click", onClick);

    // Deep-link on first load (e.g. someone opens /#emi-calculator directly).
    if (window.location.hash) {
      let tries = 0;
      const chase = () => {
        if (scrollToHash(window.location.hash) || tries++ > 60) return;
        requestAnimationFrame(chase);
      };
      setTimeout(() => requestAnimationFrame(chase), 200);
    }

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

/** Returns the same-page target element of an anchor click, if any. */
function anchorTarget(e: MouseEvent): HTMLElement | null {
  const a = (e.target as HTMLElement)?.closest?.("a");
  if (!a) return null;
  const href = a.getAttribute("href");
  if (!href || !href.includes("#")) return null;
  const url = new URL(a.href, window.location.href);
  if (!url.hash || url.hash === "#" || url.pathname !== window.location.pathname) return null;
  return document.querySelector(url.hash);
}
