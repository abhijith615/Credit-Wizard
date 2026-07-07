import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grad-hero flex min-h-svh items-center justify-center px-5 text-center text-white">
      <div>
        <p className="eyebrow !text-gold-300">Page not found</p>
        <h1 className="font-serif-display mt-6 text-6xl sm:text-8xl">404</h1>
        <p className="mx-auto mt-6 max-w-md text-navy-200">
          This page seems to have been disbursed elsewhere. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
