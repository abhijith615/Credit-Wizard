import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/blog/ArticleBody";
import JsonLd from "@/components/seo/JsonLd";
import { blogPosts, getPost, relatedPosts } from "@/lib/data/blog";
import { blogPostSchema, breadcrumbSchema } from "@/lib/schema";
import { CoverArt } from "@/components/blog/BlogIndex";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ];

  return (
    <>
      <JsonLd data={blogPostSchema(post)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <article className="bg-white pb-24 pt-36 lg:pt-44">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink-soft">
              <li>
                <Link href="/" className="transition-colors hover:text-navy-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-navy-200">/</li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-navy-700">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-navy-200">/</li>
              <li aria-current="page" className="text-gold-600">
                {post.category}
              </li>
            </ol>
          </nav>

          <header className="mt-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-ink-soft">
              <span className="rounded-full bg-gold-100 px-3 py-1 font-semibold text-gold-700">
                {post.category}
              </span>
              <span>{post.readingTime} min read</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <h1 className="font-serif-display mt-6 text-balance text-4xl leading-[1.1] text-navy-800 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>
            <p className="mt-8 flex items-center gap-3 border-y border-navy-100 py-5 text-sm font-medium text-navy-800">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-700 font-serif-display text-sm text-gold-300" aria-hidden="true">
                CW
              </span>
              {post.author}
            </p>
          </header>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden px-5 sm:rounded-3xl sm:px-8">
          <CoverArt post={post} large />
        </div>

        <ArticleBody paragraphs={post.content} />

        {/* Related posts */}
        <aside className="mx-auto mt-20 max-w-5xl px-5 sm:px-8" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-serif-display border-t border-navy-100 pt-14 text-3xl text-navy-800">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="card-luxe group block overflow-hidden rounded-2xl">
                <div className="overflow-hidden">
                  <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                    <CoverArt post={r} />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-gold-600">{r.category}</p>
                  <h3 className="font-serif-display mt-2 text-lg leading-snug text-navy-800">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </article>
    </>
  );
}
