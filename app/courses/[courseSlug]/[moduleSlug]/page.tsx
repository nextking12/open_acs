import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
          <span>{courseModule.title}</span>
        </nav>

        <section className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
            Module {courseModule.order}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {courseModule.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-stone-300">
            Start with the first lesson, or jump directly to any lesson in this
            module.
          </p>
        </section>

        <section className="overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl shadow-black/30">
          <ol className="divide-y divide-stone-800">
            {courseModule.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${course.slug}/${courseModule.slug}/${lesson.slug}`}
                  className="flex items-center justify-between gap-4 p-6 transition hover:bg-stone-800/70"
                >
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
                      Lesson {lesson.order}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-white">
                      {lesson.title}
                    </h2>
                  </div>
                  <span className="text-sm font-semibold text-amber-200">
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
