"use client";

import Link from "next/link";
import { useId, useState } from "react";

/* ------------------------------------------------------------------ */
/*  EMI math                                                           */
/* ------------------------------------------------------------------ */

function calculateEMI(principal: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  return {
    emi: emi.toFixed(2),
    totalPayment: (emi * n).toFixed(2),
    totalInterest: (emi * n - principal).toFixed(2),
  };
}

/* Chart series — validated pair (CVD ΔE 101, contrast ≥ 3:1 on white). */
const PRINCIPAL_COLOR = "#3B5BA9";
const INTEREST_COLOR = "#A98322";

const fmtINR = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

/** ₹62,50,000 → "₹62.5 L", ₹1,50,00,000 → "₹1.5 Cr" */
const fmtShort = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1).replace(/\.0$/, "")} L`;
  return fmtINR(n);
};

/* ------------------------------------------------------------------ */
/*  Slider control: label · editable value · gold-filled range         */
/* ------------------------------------------------------------------ */

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  minLabel: string;
  maxLabel: string;
  inputSuffix?: string;
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  minLabel,
  maxLabel,
  inputSuffix,
}: SliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
          {label}
        </label>
        <div className="flex items-baseline gap-1.5">
          <output htmlFor={id} className="font-serif-display text-2xl text-navy-800">
            {display}
          </output>
          {inputSuffix && <span className="text-sm font-medium text-ink-soft">{inputSuffix}</span>}
        </div>
      </div>
      <input
        id={id}
        type="range"
        className="cw-range mt-4"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        style={{
          background: `linear-gradient(to right, #C79A2D 0%, #C79A2D ${pct}%, #E2E9F6 ${pct}%, #E2E9F6 100%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-[0.7rem] font-medium text-ink-soft/70">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Donut: principal vs interest, 2px surface gaps, animated           */
/* ------------------------------------------------------------------ */

function BreakupDonut({ principal, interest }: { principal: number; interest: number }) {
  const R = 62;
  const C = 2 * Math.PI * R;
  const GAP = 4; // 2px surface gap on each side of the seam
  const total = principal + interest;
  const pFrac = principal / total;

  const pLen = Math.max(pFrac * C - GAP, 0);
  const iLen = Math.max((1 - pFrac) * C - GAP, 0);

  return (
    <svg
      viewBox="0 0 160 160"
      className="h-44 w-44"
      role="img"
      aria-label={`Loan break-up: principal ${fmtINR(principal)} (${Math.round(pFrac * 100)}%), interest ${fmtINR(interest)} (${Math.round((1 - pFrac) * 100)}%)`}
    >
      <g transform="rotate(-90 80 80)">
        <circle cx="80" cy="80" r={R} fill="none" stroke="#F2F5FB" strokeWidth="17" />
        <circle
          cx="80"
          cy="80"
          r={R}
          fill="none"
          stroke={PRINCIPAL_COLOR}
          strokeWidth="17"
          strokeLinecap="round"
          strokeDasharray={`${pLen} ${C - pLen}`}
          strokeDashoffset={-GAP / 2}
          style={{ transition: "stroke-dasharray 0.45s cubic-bezier(0.16,1,0.3,1), stroke-dashoffset 0.45s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <title>{`Principal · ${fmtINR(principal)}`}</title>
        </circle>
        <circle
          cx="80"
          cy="80"
          r={R}
          fill="none"
          stroke={INTEREST_COLOR}
          strokeWidth="17"
          strokeLinecap="round"
          strokeDasharray={`${iLen} ${C - iLen}`}
          strokeDashoffset={-(pFrac * C + GAP / 2)}
          style={{ transition: "stroke-dasharray 0.45s cubic-bezier(0.16,1,0.3,1), stroke-dashoffset 0.45s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <title>{`Total Interest · ${fmtINR(interest)}`}</title>
        </circle>
      </g>
      <text x="80" y="74" textAnchor="middle" className="fill-ink-soft" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em" }}>
        INTEREST
      </text>
      <text x="80" y="96" textAnchor="middle" className="fill-navy-800" style={{ fontSize: "22px", fontWeight: 600 }}>
        {Math.round((1 - pFrac) * 100)}%
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Calculator                                                         */
/* ------------------------------------------------------------------ */

interface Props {
  defaultAmount?: number;
  defaultRate?: number;
  defaultYears?: number;
}

export default function EmiCalculator({
  defaultAmount = 2500000,
  defaultRate = 10,
  defaultYears = 10,
}: Props) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);

  const { emi, totalPayment, totalInterest } = calculateEMI(amount, rate, years);
  const emiN = Number(emi);
  const totalPaymentN = Number(totalPayment);
  const totalInterestN = Number(totalInterest);

  return (
    <div className="card-luxe overflow-hidden rounded-3xl">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* ---- Controls ---- */}
        <div className="space-y-10 p-8 sm:p-11">
          <SliderControl
            label="Loan Amount"
            value={amount}
            min={100000}
            max={50000000}
            step={100000}
            onChange={setAmount}
            display={fmtShort(amount)}
            minLabel="₹1 L"
            maxLabel="₹5 Cr"
          />
          <SliderControl
            label="Interest Rate"
            value={rate}
            min={6}
            max={20}
            step={0.1}
            onChange={setRate}
            display={rate.toFixed(1)}
            inputSuffix="% p.a."
            minLabel="6%"
            maxLabel="20%"
          />
          <SliderControl
            label="Loan Tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            display={String(years)}
            inputSuffix={years === 1 ? "year" : "years"}
            minLabel="1 yr"
            maxLabel="30 yrs"
          />
          <p className="!mt-8 text-xs leading-relaxed text-ink-soft/80">
            Indicative calculation on reducing balance. Your exact rate depends on your
            profile — we negotiate it down across 35+ banks.
          </p>
        </div>

        {/* ---- Results ---- */}
        <div className="relative border-t border-navy-100/70 bg-navy-50/60 p-8 sm:p-11 lg:border-l lg:border-t-0">
          <div aria-live="polite">
            <p className="eyebrow">Your Monthly EMI</p>
            <p className="font-serif-display mt-3 text-5xl tracking-tight text-navy-800 sm:text-6xl">
              {fmtINR(emiN)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <BreakupDonut principal={amount} interest={totalInterestN} />
              {/* Legend — identity never color-alone */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 h-3.5 w-3.5 shrink-0 rounded-[4px]"
                    style={{ background: PRINCIPAL_COLOR }}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-xs font-medium text-ink-soft">Principal</span>
                    <span className="text-sm font-semibold tabular-nums text-navy-800">{fmtINR(amount)}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 h-3.5 w-3.5 shrink-0 rounded-[4px]"
                    style={{ background: INTEREST_COLOR }}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-xs font-medium text-ink-soft">Total Interest</span>
                    <span className="text-sm font-semibold tabular-nums text-navy-800">{fmtINR(totalInterestN)}</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100">
              <div className="bg-white p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Total Interest
                </p>
                <p className="mt-1.5 text-lg font-semibold tabular-nums text-navy-800">
                  {fmtINR(totalInterestN)}
                </p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Total Payment
                </p>
                <p className="mt-1.5 text-lg font-semibold tabular-nums text-navy-800">
                  {fmtINR(totalPaymentN)}
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/contact#enquiry"
            className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-500 py-4 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-gold-400"
          >
            Get This Rate Beaten
            <svg
              className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
