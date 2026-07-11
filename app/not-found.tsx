import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-stone-950 px-6 text-stone-100">
      <section className="max-w-lg rounded-3xl border border-stone-800 bg-stone-900 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-4 leading-7 text-stone-300">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/courses"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-amber-300 px-5 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
        >
          Browse courses
        </Link>
      </section>
    </main>
  );
}
