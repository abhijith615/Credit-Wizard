"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    title: "Apply",
    text: "Share your requirement in a short conversation or the enquiry form. An advisor calls back the same day.",
  },
  {
    title: "Document Verification",
    text: "You get an exact checklist. We verify everything once, properly — so banks never bounce your file back.",
  },
  {
    title: "Bank Processing",
    text: "Your file goes to the lenders whose credit policy fits you best, with our advocacy behind it.",
  },
  {
    title: "Approval",
    text: "Sanction letters arrive. We decode the terms with you line by line before you sign anything.",
  },
  {
    title: "Disbursement",
    text: "Funds land in your account. Your relationship manager stays with you for the life of the loan.",
  },
];

/**
 * Scroll-driven journey: a golden progress spine fills as the user
 * scrolls, lighting up each step's node as it passes.
 */
export default function Process() {
  const scope = useReveal<HTMLElement>();
  const spineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !spineRef.current || !listRef.current) return;

      // The golden line grows with scroll
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );

      // Each node ignites as the spine reaches it
      gsap.utils.toArray<HTMLElement>("[data-step-node]").forEach((node) => {
        gsap.to(node, {
          backgroundColor: "#C79A2D",
          borderColor: "#C79A2D",
          color: "#16244A",
          boxShadow: "0 0 24px rgba(199,154,45,0.55)",
          duration: 0.5,
          scrollTrigger: { trigger: node, start: "top 62%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} className="bg-beige py-28 lg:py-36" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Loan Journey"
          title="Five steps. Zero confusion."
          description="A process refined over thousands of loans — you always know exactly where your file is and what happens next."
          align="center"
        />

        <div className="relative mx-auto mt-20 max-w-3xl">
          {/* Track + animated spine */}
          <div className="absolute bottom-6 left-6 top-6 w-px bg-navy-200/70 sm:left-1/2" aria-hidden="true">
            <div ref={spineRef} className="h-full w-full origin-top bg-gradient-to-b from-gold-400 to-gold-600" />
          </div>

          <ol ref={listRef} className="space-y-14">
            {steps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={step.title}
                  data-reveal
                  className={`relative flex gap-8 pl-16 sm:w-1/2 ${
                    right
                      ? "sm:ml-auto sm:flex-row sm:pl-14"
                      : "sm:mr-auto sm:flex-row-reverse sm:pl-0 sm:pr-14 sm:text-right"
                  }`}
                >
                  <span
                    data-step-node
                    className={`absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border border-navy-300 bg-white font-serif-display text-lg text-navy-700 transition-colors ${
                      right ? "sm:-left-6" : "sm:left-auto sm:-right-6"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="card-luxe flex-1 rounded-2xl p-7">
                    <p className="eyebrow !tracking-[0.24em]">Step {i + 1}</p>
                    <h3 className="font-serif-display mt-2 text-2xl text-navy-800">{step.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
