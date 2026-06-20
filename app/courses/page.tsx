import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import { ProgressBar } from "@/components/ProgressBar";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { title: "asc" },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            select: { id: true },
          },
        },
      },
    },
  });

  // Pull every lesson the current user has finished, once, into a Set for fast
  // membership checks below. Empty when nobody is signed in.
  const user = await getCurrentUser();
  const completedLessonIds = new Set(
    user
      ? (
          await prisma.lessonProgress.findMany({
            where: { userId: user.id },
            select: { lessonId: true },
          })
        ).map((progress) => progress.lessonId)
      : [],
  );

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-10 text-stone-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <nav className="text-sm text-stone-400">
          <Link href="/" className="transition hover:text-amber-300">
            Home
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <span>Courses</span>
        </nav>

        <section className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
            Learning Catalog
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Physical access control courses, from fundamentals up.
          </h1>
        </section>

        {courses.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-stone-700 bg-stone-900/70 p-8">
            <h2 className="text-2xl font-semibold text-white">
              No courses available yet
            </h2>
            <p className="mt-3 text-stone-300">
              New access control courses are on the way — check back soon.
            </p>
          </section>
        ) : (
          <section className="grid gap-6">
            {courses.map((course) => {
              const lessonCount = course.modules.reduce(
                (total, module) => total + module.lessons.length,
                0,
              );
              const completedCount = course.modules.reduce(
                (total, module) =>
                  total +
                  module.lessons.filter((lesson) =>
                    completedLessonIds.has(lesson.id),
                  ).length,
                0,
              );

              return (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl shadow-black/30"
                >
                  <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="border-b border-stone-800 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.25),_transparent_35%),linear-gradient(135deg,_#1c1917,_#0c0a09)] p-8 lg:border-b-0 lg:border-r">
                      <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
                        Course
                      </p>
                      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                        {course.title}
                      </h2>
                      {course.description ? (
                        <p className="mt-4 leading-7 text-stone-300">
                          {course.description}
                        </p>
                      ) : null}
                      <Link
                        href={`/courses/${course.slug}`}
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-amber-300 px-5 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
                      >
                        View course
                      </Link>
                      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                        <div className="rounded-2xl border border-stone-700 bg-black/20 p-4">
                          <dt className="text-stone-400">Modules</dt>
                          <dd className="mt-1 text-2xl font-semibold text-white">
                            {course.modules.length}
                          </dd>
                        </div>
                        <div className="rounded-2xl border border-stone-700 bg-black/20 p-4">
                          <dt className="text-stone-400">Lessons</dt>
                          <dd className="mt-1 text-2xl font-semibold text-white">
                            {lessonCount}
                          </dd>
                        </div>
                      </dl>
                      {user ? (
                        <div className="mt-8">
                          <ProgressBar
                            completed={completedCount}
                            total={lessonCount}
                          />
                        </div>
                      ) : null}
                    </div>

                    <div className="p-8">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">
                        Modules
                      </h3>
                      <ol className="mt-5 divide-y divide-stone-800">
                        {course.modules.map((module) => (
                          <li key={module.id} className="py-4">
                            <Link
                              href={`/courses/${course.slug}/${module.slug}`}
                              className="font-medium text-white transition hover:text-amber-200"
                            >
                              {module.order}. {module.title}
                            </Link>
                            <p className="mt-1 text-sm text-stone-400">
                              {module.lessons.length} lessons
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
