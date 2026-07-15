"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route rendering failed", error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6 text-foreground">
      <section className="max-w-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          Something went wrong
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold text-foreground">
          This page could not be loaded.
        </h1>
        <p className="mt-4 leading-7 text-foreground-muted">
          The database may be temporarily unavailable. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-background transition hover:bg-accent-strong"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
