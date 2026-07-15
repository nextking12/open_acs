import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { estimateReadingTime } from "@/lib/readingTime";
import { LessonContent } from "@/components/LessonContent";
import { LocalLessonCompletion } from "@/components/LocalProgress";
import { LessonKeyboardNav } from "@/components/LessonKeyboardNav";
import { LessonSidebar } from "@/components/LessonSidebar";
import { BackToTop } from "@/components/BackToTop";

type LessonPageProps = {
  params: Promise<{
    courseSlug: string;
    moduleSlug: string;
    lessonSlug: string;
  }>;
};

type LessonNavigationItem = {
  title: string;
  href: string;
};

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, moduleSlug, lessonSlug } = await params;

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

  const courseModule = course.modules.find((item) => item.slug === moduleSlug);
  const lesson = courseModule?.lessons.find((item) => item.slug === lessonSlug);

  if (!courseModule || !lesson) {
    notFound();
  }

  const lessonPath = course.modules.flatMap((moduleItem) =>
    moduleItem.lessons.map((lessonItem) => ({
      title: lessonItem.title,
      href: `/courses/${course.slug}/${moduleItem.slug}/${lessonItem.slug}`,
      id: lessonItem.id,
    })),
  );
  const currentIndex = lessonPath.findIndex((item) => item.id === lesson.id);
  const previousLesson: LessonNavigationItem | undefined =
    currentIndex > 0 ? lessonPath[currentIndex - 1] : undefined;
  const nextLesson: LessonNavigationItem | undefined =
    currentIndex < lessonPath.length - 1
      ? lessonPath[currentIndex + 1]
      : undefined;

  const readingTime = estimateReadingTime(lesson.content);

  const sidebarModules = course.modules.map((moduleItem) => ({
    title: moduleItem.title,
    slug: moduleItem.slug,
    lessons: moduleItem.lessons.map((lessonItem) => ({
      id: lessonItem.id,
      title: lessonItem.title,
      href: `/courses/${course.slug}/${moduleItem.slug}/${lessonItem.slug}`,
    })),
  }));

  return (
    <main className="flex-1 bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <LessonKeyboardNav
        prevHref={previousLesson?.href}
        nextHref={nextLesson?.href}
      />
      <BackToTop />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="lg:w-56 lg:shrink-0">
          <details className="group border border-border bg-surface lg:hidden">
            <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              Course outline
              <span className="float-right text-foreground-muted group-open:hidden">
                +
              </span>
              <span className="float-right hidden text-foreground-muted group-open:inline">
                −
              </span>
            </summary>
            <div className="max-h-72 overflow-y-auto border-t border-border p-4">
              <LessonSidebar
                modules={sidebarModules}
                currentLessonId={lesson.id}
              />
            </div>
          </details>
          <div className="sticky top-20 hidden lg:block">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Course outline
            </p>
            <LessonSidebar
              modules={sidebarModules}
              currentLessonId={lesson.id}
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-8">
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
            <Link
              href={`/courses/${course.slug}/${courseModule.slug}`}
              className="transition hover:text-accent"
            >
              {courseModule.title}
            </Link>
            <span className="mx-2 text-border">/</span>
            <span>{lesson.title}</span>
          </nav>

          <article className="border border-border bg-surface">
            <header className="border-b border-border bg-background px-6 py-8 sm:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                Module {courseModule.order} / Lesson {lesson.order}
              </p>
              <h1 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {lesson.title}
              </h1>
              <p className="mt-3 text-sm text-foreground-muted">
                {readingTime} min read
              </p>
            </header>

            <div className="px-6 py-8 sm:px-8">
              <div className="prose prose-invert max-w-3xl prose-headings:font-display prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground prose-code:text-accent-strong prose-p:text-foreground-muted prose-li:text-foreground-muted">
                <LessonContent content={lesson.content} />
              </div>
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-background px-6 py-6 sm:px-8">
              <LocalLessonCompletion lessonId={lesson.id} />
            </footer>
          </article>

          <nav
            className="grid gap-3 sm:grid-cols-2"
            aria-label="Lesson navigation"
          >
            {previousLesson ? (
              <Link
                href={previousLesson.href}
                className="border border-border bg-surface p-5 transition hover:border-accent/50"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                  ← Previous
                </p>
                <p className="mt-2 font-medium text-foreground">
                  {previousLesson.title}
                </p>
              </Link>
            ) : (
              <div className="border border-dashed border-border p-5 text-foreground-muted/60">
                First lesson
              </div>
            )}

            {nextLesson ? (
              <Link
                href={nextLesson.href}
                className="border border-border bg-surface p-5 text-right transition hover:border-accent/50"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                  Next →
                </p>
                <p className="mt-2 font-medium text-foreground">
                  {nextLesson.title}
                </p>
              </Link>
            ) : (
              <div className="border border-dashed border-border p-5 text-right text-foreground-muted/60">
                Last lesson
              </div>
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}
