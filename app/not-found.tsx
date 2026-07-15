import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6 text-foreground">
      <section className="max-w-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          404
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="mt-4 leading-7 text-foreground-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/courses"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-background transition hover:bg-accent-strong"
        >
          Browse courses
        </Link>
      </section>
    </main>
  );
}
