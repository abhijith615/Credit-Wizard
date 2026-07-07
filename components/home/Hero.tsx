"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

/* Film-grain texture generated inline — no asset request. */
const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.5'/></svg>";

const TICKER_ITEMS = [
  "20+ Years of Expertise",
  "5,000+ Happy Clients",
  "35+ Banking Partners",
  "₹850+ Crore Facilitated",
  "CGTMSE Specialists",
  "Free Consultation",
  "Trusted Since 2006",
];

/**
 * Gold-dust particle field on a lightweight canvas. Particles drift
 * upward and lean gently toward the pointer. Runs only while the
 * hero is on screen; skipped entirely for reduced motion.
 */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const COUNT = fine ? 52 : 26;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const mouse = { x: 0.5, y: 0.5 };

    interface P { x: number; y: number; r: number; vy: number; vx: number; tw: number; ph: number }
    let dots: P[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      dots = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.12 + Math.random() * 0.3,
        vx: (Math.random() - 0.5) * 0.08,
        tw: 0.4 + Math.random() * 0.6,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const pull = (mouse.x - 0.5) * 0.35;
      for (const p of dots) {
        p.y -= p.vy;
        p.x += p.vx + pull * p.vy;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const a = p.tw * (0.45 + 0.55 * Math.sin(t / 900 + p.ph));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(227, 190, 110, ${a * 0.55})`;
        ctx.shadowColor = "rgba(199,154,45,0.8)";
        ctx.shadowBlur = p.r * 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    resize();
    seed();

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    const onResize = () => { resize(); seed(); };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/**
 * Immersive hero: a full-bleed brand film (horizontal cut on desktop,
 * vertical cut on mobile) under layered navy scrims, a film-grain
 * pass, drifting gold particles and floating glass stat cards. The
 * video slowly zooms as you scroll; every layer answers the pointer.
 * Reduced-motion users get a calm gradient — no video, no particles.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Pick the desktop or mobile cut once on the client; never load both.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(mobile ? "/videos/hero-mobile.mp4" : "/videos/hero-desktop.mp4");
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;

      /* ---- Entrance ---- */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      const split = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines" });
      tl.from(split.lines, { yPercent: 118, duration: 1.5, stagger: 0.14 }, 0.35);

      // Gold beam sweeps across the headline once it lands
      tl.fromTo(
        "[data-hero-beam]",
        { xPercent: -130, opacity: 0 },
        { xPercent: 260, opacity: 1, duration: 1.4, ease: "power2.inOut" },
        1.15
      ).set("[data-hero-beam]", { opacity: 0 });

      tl.from("[data-hero-fade]", { y: 38, autoAlpha: 0, duration: 1.1, stagger: 0.12 }, 0.9);
      tl.from(
        "[data-glass-card]",
        { y: 70, autoAlpha: 0, rotate: 2, duration: 1.4, stagger: 0.2, ease: "power3.out" },
        1.2
      );
      tl.from("[data-hero-ticker]", { yPercent: 100, autoAlpha: 0, duration: 1 }, 1.5);

      /* ---- Scroll story: video zooms, content drifts away ---- */
      gsap.fromTo(
        "[data-hero-video]",
        { scale: 1.06 },
        {
          scale: 1.22,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        }
      );
      gsap.to("[data-hero-inner]", {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
      });

      /* ---- Pointer parallax across depth layers ---- */
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]");
      const setters = layers.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 1.3, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.3, ease: "power3.out" }),
        depth: parseFloat(el.dataset.depth || "10"),
      }));
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => { s.x(nx * s.depth); s.y(ny * s.depth); });
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grad-hero relative flex min-h-svh items-center overflow-hidden"
      aria-label="CreditWizard introduction"
    >
      {/* ---------- Layer 0 · brand film ---------- */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {videoSrc && (
          <video
            ref={videoRef}
            data-hero-video
            data-depth="6"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => {
              setVideoReady(true);
              videoRef.current?.play().catch(() => {});
            }}
            className={`h-full w-full scale-[1.06] object-cover transition-opacity duration-[1400ms] ease-out ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Scrims: left text-protection, top navbar fade, bottom hand-off */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-900/55 to-navy-800/25" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-950/80 to-transparent" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 42%, transparent 55%, rgba(13,20,40,0.55) 100%)" }}
        />
        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
          style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: "160px 160px" }}
        />
        {/* Gold light ray */}
        <div
          data-depth="26"
          className="absolute -top-40 right-[16%] h-[46rem] w-44 rotate-[24deg] opacity-20"
          style={{ background: "linear-gradient(180deg, #F1DFBA, transparent 72%)", filter: "blur(30px)" }}
        />
        {/* Gold dust */}
        <ParticleField />
      </div>

      {/* ---------- Layer 1 · content ---------- */}
      <div
        data-hero-inner
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-36 pt-36 sm:px-8 lg:pb-40"
      >
        <div className="max-w-3xl">
          <p
            data-hero-fade
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-navy-950/30 px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-gold-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            Trusted in Tiruppur since 2006
          </p>

          <div className="relative overflow-hidden">
            <h1
              data-hero-title
              className="font-serif-display text-balance text-[2.9rem] leading-[1.04] text-white drop-shadow-[0_2px_24px_rgba(13,20,40,0.45)] sm:text-6xl lg:text-7xl"
            >
              Finance Made Simple.
              <br />
              <span className="text-gold-shimmer">Growth Made Possible.</span>
            </h1>
            {/* One-shot beam sweep */}
            <span
              data-hero-beam
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-0"
              style={{
                background:
                  "linear-gradient(100deg, transparent, rgba(241,223,186,0.14) 45%, rgba(241,223,186,0.28) 50%, rgba(241,223,186,0.14) 55%, transparent)",
              }}
            />
          </div>

          <p
            data-hero-fade
            className="mt-8 max-w-xl text-lg leading-relaxed text-navy-100/95 drop-shadow-[0_1px_12px_rgba(13,20,40,0.6)]"
          >
            Helping businesses, entrepreneurs and families secure the right financial
            solutions with trusted guidance, fast approvals and personalised support —
            backed by 20+ years of expertise.
          </p>

          <div data-hero-fade className="mt-11 flex flex-wrap items-center gap-5">
            <MagneticButton href="/contact#enquiry" variant="gold">
              Get Started
            </MagneticButton>
            <MagneticButton href="/business-loan" variant="ghost-light">
              Explore Loan Solutions
            </MagneticButton>
          </div>
        </div>

        {/* Floating glass stat cards */}
        <div className="pointer-events-none absolute right-8 top-[24%] hidden xl:block" aria-hidden="true">
          <div data-glass-card data-depth="20" className="glass-dark animate-float w-60 rounded-2xl p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-300">
              Loan Facilitated
            </p>
            <p className="font-serif-display mt-2 text-3xl text-white">₹850+ Cr</p>
            <div className="mt-3 flex h-8 items-end gap-1">
              {[35, 50, 42, 62, 58, 78, 70, 92].map((hh, i) => (
                <span
                  key={i}
                  className="w-3 rounded-sm bg-gradient-to-t from-gold-600/60 to-gold-300"
                  style={{ height: `${hh}%` }}
                />
              ))}
            </div>
          </div>
          <div
            data-glass-card
            data-depth="32"
            className="glass-dark animate-float-slow ml-24 mt-6 w-52 rounded-2xl p-5"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-300">
              Approval Status
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path d="m3 8.5 3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Sanctioned</p>
                <p className="text-xs text-navy-200">Avg. 5 working days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Layer 2 · trust ticker ---------- */}
      <div
        data-hero-ticker
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-navy-950/40 backdrop-blur-md"
        aria-hidden="true"
      >
        <div className="overflow-hidden py-4">
          <div className="animate-marquee flex w-max items-center gap-10 motion-reduce:animate-none">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap">
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-navy-100/80">
                  {item}
                </span>
                <svg viewBox="0 0 8 8" className="h-2 w-2 fill-gold-500/80">
                  <path d="M4 0l4 4-4 4-4-4z" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-hero-fade
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-white/60"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <span className="block h-10 w-px overflow-hidden bg-white/15">
            <span className="block h-1/2 w-full animate-[scrollhint_1.8s_ease-in-out_infinite] bg-gold-400" />
          </span>
        </div>
        <style>{`@keyframes scrollhint { 0% { transform: translateY(-100%);} 100% { transform: translateY(220%);} }`}</style>
      </div>
    </section>
  );
}
