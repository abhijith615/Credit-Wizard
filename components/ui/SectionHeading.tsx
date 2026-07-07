interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2";
}

/**
 * Consistent editorial heading block: gold eyebrow, large serif title
 * (SplitText-revealed via data-split), optional supporting copy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  as: Tag = "h2",
}: Props) {
  return (
    <div
      data-reveal-group
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p data-reveal className="eyebrow mb-5">
        {eyebrow}
      </p>
      <Tag
        data-split
        className={`font-serif-display text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl ${
          dark ? "text-white" : "text-navy-800"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          data-reveal
          className={`mt-6 text-lg leading-relaxed ${
            dark ? "text-navy-200" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
