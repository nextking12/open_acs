import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Pull the first course and its modules so the outline below always reflects
  // the seeded curriculum instead of a hard-coded list that can drift.
  const course = await prisma.course.findFirst({
    orderBy: { createdAt: "asc" },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: { _count: { select: { lessons: true } } },
      },
    },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-100">
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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

          <div className="rounded-[2rem] border border-stone-800 bg-stone-900/80 p-6 shadow-2xl shadow-black/40">
            <div className="rounded-[1.5rem] border border-stone-700 bg-black/30 p-6">
              {course ? (
                <>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {course.title}
                  </p>
                  <ol className="mt-6 grid gap-3">
                    {course.modules.map((module) => (
                      <li
                        key={module.id}
                        className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950 p-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-300/10 text-sm font-semibold text-amber-200">
                          {module.order}
                        </span>
                        <span className="font-medium text-stone-100">
                          {module.title}
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <p className="text-sm text-stone-400">
                  No courses published yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
