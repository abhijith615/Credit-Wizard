"use client";

import { useReveal } from "@/hooks/useReveal";
import { site } from "@/lib/site";

const channels = [
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    note: "Direct line to an advisor",
    icon: (
      <path d="M6.5 3h4l2 5-2.5 1.5a11 11 0 0 0 4.5 4.5L16 11.5l5 2v4a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5a2 2 0 0 1 2-2z" />
    ),
  },
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: site.whatsapp,
    note: "Fastest for documents & queries",
    icon: (
      <>
        <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" />
        <path d="M9 8.5c0 4 2.5 6.5 6.5 6.5l1-2-2.2-1-1 .7c-1.1-.5-1.9-1.3-2.4-2.4l.7-1L10.5 7z" />
      </>
    ),
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Replies within one working day",
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  },
  {
    label: "Office",
    value: `${site.address.street}, ${site.address.locality}`,
    href: `https://maps.google.com/?q=${encodeURIComponent(
      `Credit Wizard In, ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`
    )}`,
    note: site.hours,
    icon: (
      <>
        <path d="M12 21c4-4.2 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 3 6.8 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
];

export default function ContactContent() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="bg-white pb-24" aria-label="Contact channels">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-reveal
              className="card-luxe sheen group rounded-3xl p-8"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-700 transition-colors duration-500 group-hover:bg-navy-700 group-hover:text-gold-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                  {c.icon}
                </svg>
              </span>
              <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
                {c.label}
              </h2>
              <p className="mt-2 break-words font-semibold text-navy-800">{c.value}</p>
              <p className="mt-1.5 text-sm text-ink-soft">{c.note}</p>
            </a>
          ))}
        </div>

        {/* Map + hours */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]" data-reveal-group>
          <div data-reveal className="card-luxe overflow-hidden rounded-3xl">
            <iframe
              title="Credit Wizard In office location on Google Maps"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${site.address.street}, ${site.address.locality}, ${site.address.region}`
              )}&z=15&output=embed`}
              className="h-[26rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div data-reveal className="grad-navy flex flex-col justify-between rounded-3xl p-9 text-white">
            <div>
              <h2 className="font-serif-display text-2xl">Business Hours</h2>
              <dl className="mt-6 space-y-4 text-sm">
                {[
                  ["Monday – Friday", "9:30 AM – 7:00 PM"],
                  ["Saturday", "9:30 AM – 7:00 PM"],
                  ["Sunday", "Closed"],
                ].map(([d, h]) => (
                  <div key={d} className="flex items-center justify-between border-b border-white/10 pb-4">
                    <dt className="text-navy-200">{d}</dt>
                    <dd className={`font-semibold ${h === "Closed" ? "text-navy-300" : "text-gold-300"}`}>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-navy-200">
              Prefer to visit? Walk-ins are welcome — but a quick call ahead means an advisor is
              ready with your file.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
