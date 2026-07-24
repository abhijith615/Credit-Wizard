"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { loans } from "@/lib/data/loans";
import { site } from "@/lib/site";

interface FormState {
  name: string;
  phone: string;
  email: string;
  city: string;
  loanType: string;
  amount: string;
  income: string;
  message: string;
}

const empty: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  loanType: "",
  amount: "",
  income: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

const validate = (f: FormState): Errors => {
  const e: Errors = {};
  if (f.name.trim().length < 3) e.name = "Please enter your full name";
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, "")))
    e.phone = "Enter a valid 10-digit mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address";
  if (!f.city.trim()) e.city = "Please enter your city";
  if (!f.loanType) e.loanType = "Select a loan type";
  if (!f.amount) e.amount = "Select a loan amount range";
  return e;
};

const inputCls = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-5 py-4 text-sm text-ink transition-all duration-300
   placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-gold-400/60
   ${hasError ? "border-red-400 animate-[shake_0.4s_ease-in-out]" : "border-navy-100 hover:border-navy-200 focus:border-gold-400"}`;

/**
 * Enquiry form with inline animated validation and a drawn-check
 * success state. Client-side only — wire `submit()` to your CRM or
 * an API route when ready.
 */
export default function EnquiryForm() {
  const scope = useReveal<HTMLElement>();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      // POST to the Google Apps Script web app, which appends a row to
      // the "Credit Wizard In" sheet. A text/plain content-type keeps
      // this a "simple" request so the browser skips the CORS pre-flight
      // that Apps Script cannot answer.
      await fetch(site.enquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...form, source: "Website enquiry form" }),
        redirect: "follow",
      });
    } catch (err) {
      // Apps Script frequently blocks reading its cross-origin response
      // even when the row was written successfully, so a thrown error
      // here doesn't mean the enquiry failed — log it and carry on.
      console.error("Enquiry submission:", err);
    }
    setStatus("done");

    requestAnimationFrame(() => {
      if (prefersReducedMotion() || !successRef.current) return;
      const tl = gsap.timeline();
      tl.from(successRef.current, { scale: 0.9, autoAlpha: 0, duration: 0.6, ease: "back.out(1.6)" });
      const path = successRef.current.querySelector("path");
      if (path instanceof SVGPathElement) {
        const len = path.getTotalLength();
        tl.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
          0.2
        );
      }
    });
  };

  const field = (
    key: keyof FormState,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {}
  ) => (
    <div>
      <label htmlFor={`enq-${key}`} className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
        {label}
      </label>
      <input
        id={`enq-${key}`}
        value={form[key]}
        onChange={set(key)}
        className={inputCls(!!errors[key])}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `enq-${key}-err` : undefined}
        {...props}
      />
      {errors[key] && (
        <p id={`enq-${key}-err`} role="alert" className="mt-2 text-xs font-medium text-red-500">
          {errors[key]}
        </p>
      )}
    </div>
  );

  const selectField = (
    key: keyof FormState,
    label: string,
    options: string[],
    placeholder: string
  ) => (
    <div>
      <label htmlFor={`enq-${key}`} className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
        {label}
      </label>
      <select
        id={`enq-${key}`}
        value={form[key]}
        onChange={set(key)}
        className={`${inputCls(!!errors[key])} ${form[key] ? "" : "text-ink-soft/50"}`}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `enq-${key}-err` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      {errors[key] && (
        <p id={`enq-${key}-err`} role="alert" className="mt-2 text-xs font-medium text-red-500">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <section
      ref={scope}
      id="enquiry"
      className="relative overflow-hidden bg-navy-50 py-28 lg:py-36"
      aria-labelledby="enquiry-heading"
    >
      <style>{`@keyframes shake { 0%,100% { transform: translateX(0);} 25% { transform: translateX(-5px);} 75% { transform: translateX(5px);} }`}</style>

      <div className="mx-auto grid max-w-7xl items-start gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            eyebrow="Start Your Application"
            title="Tell us what you're building. We'll find the money for it."
            description="Share a few details and a senior advisor will call you back within one working day — with real numbers, not sales talk."
          />
          <ul data-reveal-group className="mt-10 space-y-4">
            {[
              "Free consultation, no obligation",
              "Your data stays confidential — never sold",
              "Soft assessment only; your credit score is untouched",
            ].map((t) => (
              <li key={t} data-reveal className="flex items-center gap-3 text-sm text-ink-soft">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                    <path d="m3 8.5 3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div data-scale className="card-luxe relative rounded-3xl p-8 sm:p-11">
          {status === "done" ? (
            <div ref={successRef} className="flex min-h-[28rem] flex-col items-center justify-center text-center">
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gold-100">
                <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-gold-600" aria-hidden="true">
                  <path d="m12 25 8.5 8.5L36 15" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="font-serif-display mt-8 text-3xl text-navy-800">Request received.</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
                Thank you, {form.name.split(" ")[0]}. A senior advisor will call{" "}
                <span className="font-semibold text-navy-700">{form.phone}</span> within one
                working day.
              </p>
              <button
                onClick={() => {
                  setForm(empty);
                  setStatus("idle");
                }}
                className="mt-8 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                {field("name", "Full Name", { placeholder: "Your name", autoComplete: "name" })}
                {field("phone", "Phone", { placeholder: "10-digit mobile", type: "tel", autoComplete: "tel", inputMode: "numeric" })}
                {field("email", "Email", { placeholder: "you@example.com", type: "email", autoComplete: "email" })}
                {field("city", "City", { placeholder: "Your city", autoComplete: "address-level2" })}
                {selectField("loanType", "Loan Type", loans.map((l) => l.name), "Select loan type")}
                {selectField(
                  "amount",
                  "Loan Amount",
                  ["Under ₹10 Lakh", "₹10 – 50 Lakh", "₹50 Lakh – 1 Crore", "₹1 – 5 Crore", "Above ₹5 Crore"],
                  "Select range"
                )}
                {selectField(
                  "income",
                  "Monthly Income",
                  ["Under ₹50,000", "₹50,000 – 1 Lakh", "₹1 – 3 Lakh", "Above ₹3 Lakh"],
                  "Select range (optional)"
                )}
                <div className="sm:col-span-2">
                  <label htmlFor="enq-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
                    Message
                  </label>
                  <textarea
                    id="enq-message"
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us briefly about your requirement (optional)"
                    className={inputCls(false)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-navy-700 py-5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-navy-600 disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Request Callback
                    <svg className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
              <p className="mt-4 text-center text-xs text-ink-soft">
                By submitting, you agree to be contacted by Credit Wizard In about your enquiry, as
                described in our{" "}
                <a href="/privacy-policy" className="font-medium text-gold-600 underline-offset-2 hover:underline">
                  Privacy &amp; Security Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
