import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-100">
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Learn how real access control systems are built and operated.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-300">
              Open ACS is a free, hands-on course covering the building blocks
              of physical access control — credentials, readers, controllers,
              door hardware, schedules, access levels, events, and audit
              trails. Start from the fundamentals and track your progress as
              you go.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex h-12 items-center justify-center rounded-full bg-amber-300 px-6 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
            >
              Browse courses
            </Link>
          </div>
          <p className="text-sm text-stone-400">
            Track lesson progress privately in your browser—no account needed.
          </p>
        </div>
      </section>
    </main>
  );
}
