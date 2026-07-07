"use client";

import { useReveal } from "@/hooks/useReveal";

/** Article prose with gentle per-paragraph reveals as the reader scrolls. */
export default function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div ref={scope} className="mx-auto mt-14 max-w-3xl px-5 sm:px-8">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          data-reveal
          className={`leading-[1.85] text-ink ${i === 0 ? "font-serif-display text-2xl leading-normal text-navy-800" : "mt-7 text-[1.05rem]"}`}
        >
          {p}
        </p>
      ))}
    </div>
  );
}
