import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";

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

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-10 text-stone-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <nav className="text-sm text-stone-400">
          <Link href="/" className="transition hover:text-amber-300">
            Home
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <Link href="/courses" className="transition hover:text-amber-300">
            Courses
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <Link
            href={`/courses/${course.slug}`}
            className="transition hover:text-amber-300"
          >
            {course.title}
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <Link
            href={`/courses/${course.slug}/${courseModule.slug}`}
            className="transition hover:text-amber-300"
          >
            {courseModule.title}
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <span>{lesson.title}</span>
        </nav>

        <article className="overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl shadow-black/30">
          <header className="border-b border-stone-800 bg-stone-950 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Module {courseModule.order} / Lesson {lesson.order}
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {lesson.title}
            </h1>
          </header>

          <div className="p-8">
            <div className="prose prose-invert prose-stone max-w-3xl prose-headings:text-white prose-a:text-amber-300 prose-strong:text-white prose-code:text-amber-200">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        <nav className="grid gap-4 sm:grid-cols-2">
          {previousLesson ? (
            <Link
              href={previousLesson.href}
              className="rounded-3xl border border-stone-800 bg-stone-900 p-5 transition hover:border-amber-300/50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
                Previous
              </p>
              <p className="mt-2 font-medium text-white">
                {previousLesson.title}
              </p>
            </Link>
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-800 p-5 text-stone-600">
              First lesson
            </div>
          )}

          {nextLesson ? (
            <Link
              href={nextLesson.href}
              className="rounded-3xl border border-stone-800 bg-stone-900 p-5 text-right transition hover:border-amber-300/50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
                Next
              </p>
              <p className="mt-2 font-medium text-white">{nextLesson.title}</p>
            </Link>
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-800 p-5 text-right text-stone-600">
              Last lesson
            </div>
          )}
        </nav>
      </div>
    </main>
  );
}
