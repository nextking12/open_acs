import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LocalProgressBar } from "@/components/LocalProgress";

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

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <nav className="text-sm text-zinc-400">
          <Link href="/" className="transition hover:text-[#e4d3bf]">
            Home
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <span>Courses</span>
        </nav>

        <section className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#e4d3bf]">
            Learning Catalog
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Physical access control courses, from fundamentals up.
          </h1>
        </section>

        {courses.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-950/70 p-8">
            <h2 className="text-2xl font-semibold text-white">
              No courses available yet
            </h2>
            <p className="mt-3 text-zinc-300">
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
              const lessonIds = course.modules.flatMap((module) =>
                module.lessons.map((lesson) => lesson.id),
              );

              return (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black/30"
                >
                  <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="border-b border-zinc-800 bg-[radial-gradient(circle_at_top_left,_rgba(228,211,191,0.2),_transparent_40%),linear-gradient(135deg,_#141414,_#040404)] p-8 lg:border-b-0 lg:border-r">
                      <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#e4d3bf]">
                        Course
                      </p>
                      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                        {course.title}
                      </h2>
                      {course.description ? (
                        <p className="mt-4 leading-7 text-zinc-300">
                          {course.description}
                        </p>
                      ) : null}
                      <Link
                        href={`/courses/${course.slug}`}
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#e4d3bf] px-5 text-sm font-semibold text-zinc-950 transition hover:bg-[#efe3d4]"
                      >
                        View course
                      </Link>
                      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                        <div className="rounded-2xl border border-zinc-700 bg-black/50 p-4">
                          <dt className="text-zinc-400">Modules</dt>
                          <dd className="mt-1 text-2xl font-semibold text-white">
                            {course.modules.length}
                          </dd>
                        </div>
                        <div className="rounded-2xl border border-zinc-700 bg-black/50 p-4">
                          <dt className="text-zinc-400">Lessons</dt>
                          <dd className="mt-1 text-2xl font-semibold text-white">
                            {lessonCount}
                          </dd>
                        </div>
                      </dl>
                      <div className="mt-8">
                        <LocalProgressBar lessonIds={lessonIds} />
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
                        Modules
                      </h3>
                      <ol className="mt-5 divide-y divide-zinc-800">
                        {course.modules.map((module) => (
                          <li key={module.id} className="py-4">
                            <Link
                              href={`/courses/${course.slug}/${module.slug}`}
                              className="font-medium text-white transition hover:text-[#efe3d4]"
                            >
                              {module.order}. {module.title}
                            </Link>
                            <p className="mt-1 text-sm text-zinc-400">
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
