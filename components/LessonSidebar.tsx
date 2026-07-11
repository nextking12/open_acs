"use client";

import Link from "next/link";
import { useCompletedLessonIds } from "./LocalProgress";

type SidebarLesson = {
  id: string;
  title: string;
  href: string;
};

type SidebarModule = {
  title: string;
  slug: string;
  lessons: SidebarLesson[];
};

export function LessonSidebar({
  modules,
  currentLessonId,
}: {
  modules: SidebarModule[];
  currentLessonId: string;
}) {
  const completedLessonIds = useCompletedLessonIds();

  return (
    <nav aria-label="Course lessons" className="space-y-6">
      {modules.map((moduleItem) => (
        <div key={moduleItem.slug}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            {moduleItem.title}
          </p>
          <ol className="mt-3 space-y-1">
            {moduleItem.lessons.map((lesson) => {
              const isCurrent = lesson.id === currentLessonId;
              const isCompleted = completedLessonIds.has(lesson.id);

              return (
                <li key={lesson.id}>
                  <Link
                    href={lesson.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      isCurrent
                        ? "bg-amber-300/10 font-medium text-amber-200"
                        : "text-stone-400 hover:bg-stone-800/60 hover:text-stone-200"
                    }`}
                  >
                    {isCompleted ? (
                      <span className="mt-0.5 shrink-0 text-emerald-400" aria-label="Completed">
                        ✓
                      </span>
                    ) : (
                      <span className="mt-0.5 shrink-0 h-3 w-3 rounded-full border border-stone-700" aria-hidden="true" />
                    )}
                    <span>{lesson.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </nav>
  );
}
