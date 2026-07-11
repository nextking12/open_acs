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
    <main className="flex min-h-[70vh] items-center justify-center bg-stone-950 px-6 text-stone-100">
      <section className="max-w-lg rounded-3xl border border-stone-800 bg-stone-900 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          This page could not be loaded.
        </h1>
        <p className="mt-4 leading-7 text-stone-300">
          The database may be temporarily unavailable. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-amber-300 px-5 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
