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
    <main className="flex min-h-[70vh] items-center justify-center bg-background px-6 text-foreground">
      <section className="max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950/90 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#e4d3bf]">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          This page could not be loaded.
        </h1>
        <p className="mt-4 leading-7 text-zinc-300">
          The database may be temporarily unavailable. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#e4d3bf] px-5 text-sm font-semibold text-zinc-950 transition hover:bg-[#efe3d4]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
