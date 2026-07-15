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
    <main className="flex-1 bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <nav className="text-sm text-foreground-muted">
          <Link href="/" className="transition hover:text-accent">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Courses</span>
        </nav>

        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Learning Catalog
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Physical access control courses, from fundamentals up.
          </h1>
        </section>

        {courses.length === 0 ? (
          <section className="border border-dashed border-border bg-surface p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              No courses available yet
            </h2>
            <p className="mt-3 text-foreground-muted">
              New access control courses are on the way — check back soon.
            </p>
          </section>
        ) : (
          <section className="divide-y divide-border border-y border-border">
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
                  className="grid gap-8 py-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12"
                >
                  <div className="space-y-5">
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
                      Course
                    </p>
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                      {course.title}
                    </h2>
                    {course.description ? (
                      <p className="leading-7 text-foreground-muted">
                        {course.description}
                      </p>
                    ) : null}
                    <p className="text-sm text-foreground-muted">
                      {course.modules.length} modules · {lessonCount} lessons
                    </p>
                    <div className="max-w-sm">
                      <LocalProgressBar lessonIds={lessonIds} />
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-background transition hover:bg-accent-strong"
                    >
                      View course
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground-muted">
                      Modules
                    </h3>
                    <ol className="mt-4 divide-y divide-border">
                      {course.modules.map((module) => (
                        <li key={module.id} className="py-3.5">
                          <Link
                            href={`/courses/${course.slug}/${module.slug}`}
                            className="font-medium text-foreground transition hover:text-accent"
                          >
                            {module.order}. {module.title}
                          </Link>
                          <p className="mt-1 text-sm text-foreground-muted">
                            {module.lessons.length} lessons
                          </p>
                        </li>
                      ))}
                    </ol>
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
