import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { estimateReadingTime } from "@/lib/readingTime";
import { LessonContent } from "@/components/LessonContent";
import { LocalLessonCompletion } from "@/components/LocalProgress";
import { LessonKeyboardNav } from "@/components/LessonKeyboardNav";
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

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <LessonKeyboardNav
        prevHref={previousLesson?.href}
        nextHref={nextLesson?.href}
      />
      <BackToTop />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <nav className="text-sm text-zinc-400">
          <Link href="/" className="transition hover:text-[#e4d3bf]">
            Home
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <Link href="/courses" className="transition hover:text-[#e4d3bf]">
            Courses
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <Link
            href={`/courses/${course.slug}`}
            className="transition hover:text-[#e4d3bf]"
          >
            {course.title}
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <Link
            href={`/courses/${course.slug}/${courseModule.slug}`}
            className="transition hover:text-[#e4d3bf]"
          >
            {courseModule.title}
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          <span>{lesson.title}</span>
        </nav>

        <article className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black/30">
          <header className="border-b border-zinc-800 bg-black p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#e4d3bf]">
              Module {courseModule.order} / Lesson {lesson.order}
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {lesson.title}
            </h1>
            <p className="mt-3 text-sm text-zinc-500">{readingTime} min read</p>
          </header>

          <div className="p-8">
            <div className="prose prose-invert prose-zinc max-w-3xl prose-headings:text-white prose-a:text-[#e4d3bf] prose-strong:text-white prose-code:text-[#efe3d4]">
              <LessonContent content={lesson.content} />
            </div>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 bg-black p-8">
            <LocalLessonCompletion lessonId={lesson.id} />
          </footer>
        </article>

        <nav className="grid gap-4 sm:grid-cols-2" aria-label="Lesson navigation">
          {previousLesson ? (
            <Link
              href={previousLesson.href}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-5 transition hover:border-[#e4d3bf]/50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
                ← Previous
              </p>
              <p className="mt-2 font-medium text-white">{previousLesson.title}</p>
            </Link>
          ) : (
            <div className="rounded-3xl border border-dashed border-zinc-800 p-5 text-zinc-600">
              First lesson
            </div>
          )}

          {nextLesson ? (
            <Link
              href={nextLesson.href}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-5 text-right transition hover:border-[#e4d3bf]/50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Next →
              </p>
              <p className="mt-2 font-medium text-white">{nextLesson.title}</p>
            </Link>
          ) : (
            <div className="rounded-3xl border border-dashed border-zinc-800 p-5 text-right text-zinc-600">
              Last lesson
            </div>
          )}
        </nav>
      </div>
    </main>
  );
}
