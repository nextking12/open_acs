import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LocalProgressBar } from "@/components/LocalProgress";

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

  const lessonCount = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  const lessonIds = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => lesson.id),
  );

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-10 text-stone-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <nav className="text-sm text-stone-400">
          <Link href="/" className="transition hover:text-amber-300">
            Home
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <Link href="/courses" className="transition hover:text-amber-300">
            Courses
          </Link>
          <span className="mx-2 text-stone-600">/</span>
          <span>{course.title}</span>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Course
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {course.title}
            </h1>
          </div>
          <div className="w-full lg:justify-self-end">
            <LocalProgressBar lessonIds={lessonIds} />
          </div>
        </section>

        <section className="grid gap-6">
          {course.modules.map((module) => (
            <article
              key={module.id}
              className="overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl shadow-black/30"
            >
              <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="border-b border-stone-800 bg-stone-950 p-8 lg:border-b-0 lg:border-r">
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
                    Module {module.order}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                    {module.title}
                  </h2>
                  <Link
                    href={`/courses/${course.slug}/${module.slug}`}
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-amber-300/50 px-5 text-sm font-semibold text-amber-200 transition hover:border-amber-200 hover:text-amber-100"
                  >
                    View module
                  </Link>
                </div>

                <div className="p-8">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">
                    Lessons
                  </h3>
                  <ol className="mt-5 divide-y divide-stone-800">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id} className="py-4">
                        <Link
                          href={`/courses/${course.slug}/${module.slug}/${lesson.slug}`}
                          className="flex items-center justify-between gap-4 text-white transition hover:text-amber-200"
                        >
                          <span>
                            {lesson.order}. {lesson.title}
                          </span>
                          <span className="text-sm text-stone-500">
                            Read lesson
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
