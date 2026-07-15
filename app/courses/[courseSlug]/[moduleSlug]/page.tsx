import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  LocalCompletionMark,
  LocalProgressSummary,
} from "@/components/LocalProgress";

type ModulePageProps = {
  params: Promise<{
    courseSlug: string;
    moduleSlug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ModulePage({ params }: ModulePageProps) {
  const { courseSlug, moduleSlug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        where: { slug: moduleSlug },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  const courseModule = course?.modules[0];

  if (!course || !courseModule) {
    notFound();
  }

  const lessonIds = courseModule.lessons.map((lesson) => lesson.id);

  return (
    <main className="flex-1 bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <nav className="text-sm text-foreground-muted">
          <Link href="/" className="transition hover:text-accent">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link href="/courses" className="transition hover:text-accent">
            Courses
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link
            href={`/courses/${course.slug}`}
            className="transition hover:text-accent"
          >
            {course.title}
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>{courseModule.title}</span>
        </nav>

        <section className="space-y-4 border-b border-border pb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Module {courseModule.order}
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {courseModule.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-foreground-muted">
            Start with the first lesson, or jump directly to any lesson in this
            module.
          </p>
          <LocalProgressSummary lessonIds={lessonIds} />
        </section>

        <section>
          <ol className="divide-y divide-border border-y border-border">
            {courseModule.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${course.slug}/${courseModule.slug}/${lesson.slug}`}
                  className="flex items-center justify-between gap-4 py-6 transition hover:bg-surface-strong/40"
                >
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-foreground-muted">
                      Lesson {lesson.order}
                    </p>
                    <h2 className="font-display mt-2 text-xl font-semibold text-foreground">
                      <LocalCompletionMark lessonId={lesson.id} />
                      {lesson.title}
                    </h2>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-accent">
                    Read lesson
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
