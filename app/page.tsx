import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-100">
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200">
              Physical Access Control Training
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Learn how real access control systems are built and operated.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-300">
                Open ACS is a learning platform for doors, readers, credentials,
                controllers, schedules, access levels, events, and alarms. The
                first course is already stored in Postgres and loaded with
                Prisma.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex h-12 items-center justify-center rounded-full bg-amber-300 px-6 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              >
                Browse courses
              </Link>
              <a
                href="https://www.siaonline.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-stone-700 px-6 text-sm font-semibold text-stone-200 transition hover:border-stone-500 hover:bg-stone-900"
              >
                Industry context
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-800 bg-stone-900/80 p-6 shadow-2xl shadow-black/40">
            <div className="rounded-[1.5rem] border border-stone-700 bg-black/30 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Current Stack
              </p>
              <dl className="mt-6 grid gap-4">
                {[
                  ["Database", "Postgres running in Docker"],
                  ["Data Layer", "Prisma schema, migration, and seed data"],
                  ["App", "Next.js server components reading from the DB"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-stone-800 bg-stone-950 p-4"
                  >
                    <dt className="text-sm text-stone-400">{label}</dt>
                    <dd className="mt-1 font-medium text-stone-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
