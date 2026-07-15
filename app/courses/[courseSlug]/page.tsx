import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LocalProgressBar, LocalProgressSummary } from "@/components/LocalProgress";

type CoursePageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const lessonIds = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => lesson.id),
  );

  return (
    <main className="flex-1 bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <nav className="text-sm text-foreground-muted">
          <Link href="/" className="transition hover:text-accent">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link href="/courses" className="transition hover:text-accent">
            Courses
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>{course.title}</span>
        </nav>

        <section className="grid gap-6 border-b border-border pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Course
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {course.title}
            </h1>
          </div>
          <div className="w-full lg:justify-self-end">
            <LocalProgressBar lessonIds={lessonIds} />
          </div>
        </section>

        <section className="divide-y divide-border">
          {course.modules.map((module) => (
            <article
              key={module.id}
              className="grid gap-8 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
            >
              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
                  Module {module.order}
                </p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  {module.title}
                </h2>
                <LocalProgressSummary
                  lessonIds={module.lessons.map((l) => l.id)}
                />
                <Link
                  href={`/courses/${course.slug}/${module.slug}`}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-accent/50 px-5 text-sm font-semibold text-accent transition hover:border-accent hover:bg-accent/5"
                >
                  View module
                </Link>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground-muted">
                  Lessons
                </h3>
                <ol className="mt-4 divide-y divide-border">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="py-3.5">
                      <Link
                        href={`/courses/${course.slug}/${module.slug}/${lesson.slug}`}
                        className="flex items-center justify-between gap-4 text-foreground transition hover:text-accent"
                      >
                        <span>
                          {lesson.order}. {lesson.title}
                        </span>
                        <span className="shrink-0 text-sm text-foreground-muted">
                          Read
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
