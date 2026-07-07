"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { blogCategories, blogPosts, type BlogPost } from "@/lib/data/blog";

const accentStyles: Record<BlogPost["accent"], string> = {
  navy: "from-navy-700 to-navy-500",
  gold: "from-gold-600 to-gold-400",
  royal: "from-navy-500 to-navy-300",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Abstract editorial cover art — deterministic per post, no image assets needed. */
export function CoverArt({ post, large = false }: { post: BlogPost; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${accentStyles[post.accent]} ${
        large ? "h-72 sm:h-96" : "h-52"
      }`}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 240" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-20 220 C 90 200, 150 140, 220 120 S 350 60, 430 10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" />
        <path d="M-20 240 C 110 230, 180 170, 250 150 S 380 90, 430 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <circle cx="220" cy="120" r="4" fill="#F1DFBA" />
        <circle cx="220" cy="120" r="10" stroke="rgba(241,223,186,0.5)" />
      </svg>
      <span className="font-serif-display absolute bottom-5 left-6 text-6xl text-white/15 sm:text-7xl">
        {post.category.split(" ")[0]}
      </span>
    </div>
  );
}

export default function BlogIndex() {
  const scope = useReveal<HTMLElement>();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      const inQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  return (
    <section ref={scope} className="bg-white pb-28" aria-label="Blog articles">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Search + filters */}
        <div data-reveal className="flex flex-col gap-6 border-b border-navy-100 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <svg
              className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-full border border-navy-100 bg-mist py-3.5 pl-12 pr-5 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {["All", ...blogCategories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  category === c
                    ? "bg-navy-700 text-white shadow-[0_8px_20px_-8px_rgba(36,62,115,0.5)]"
                    : "border border-navy-100 text-ink-soft hover:border-gold-400 hover:text-gold-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Article grid */}
        {filtered.length === 0 ? (
          <p className="py-24 text-center text-ink-soft">
            No articles match your search. Try a different keyword or category.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {filtered.map((post) => (
              <article key={post.slug} data-reveal>
                <Link href={`/blog/${post.slug}`} className="card-luxe group block overflow-hidden rounded-3xl">
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                      <CoverArt post={post} />
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3 text-xs font-medium text-ink-soft">
                      <span className="rounded-full bg-gold-100 px-3 py-1 font-semibold text-gold-700">
                        {post.category}
                      </span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h2 className="font-serif-display mt-4 text-xl leading-snug text-navy-800 transition-colors duration-300 group-hover:text-navy-600">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-navy-50 pt-5 text-xs text-ink-soft">
                      <span>{post.author}</span>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div data-reveal className="grad-navy relative mt-20 overflow-hidden rounded-3xl px-8 py-14 text-center text-white sm:px-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30"
            style={{ background: "radial-gradient(closest-side, rgba(199,154,45,0.8), transparent)" }}
            aria-hidden="true"
          />
          <h2 className="font-serif-display relative text-3xl sm:text-4xl">
            Smart money, once a month.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-navy-200">
            Rate movements, scheme updates and practical borrowing advice — written for Tamil Nadu's
            businesses and families.
          </p>
          {subscribed ? (
            <p className="relative mt-8 font-medium text-gold-300">You&apos;re subscribed — see you in your inbox.</p>
          ) : (
            <form
              className="relative mx-auto mt-8 flex max-w-md overflow-hidden rounded-full border border-white/20 bg-white/10 focus-within:border-gold-400"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSubscribed(true);
              }}
            >
              <label htmlFor="blog-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="blog-newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-transparent px-6 py-4 text-sm text-white placeholder:text-navy-300 focus:outline-none"
              />
              <button type="submit" className="shrink-0 bg-gold-500 px-7 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
