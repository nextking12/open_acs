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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
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
                    className={`flex items-start gap-2 rounded-md px-3 py-2 text-sm transition ${
                      isCurrent
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-foreground-muted hover:bg-surface-strong hover:text-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <span
                        className="mt-0.5 shrink-0 text-success"
                        aria-label="Completed"
                      >
                        ✓
                      </span>
                    ) : (
                      <span
                        className="mt-0.5 h-3 w-3 shrink-0 rounded-full border border-border"
                        aria-hidden="true"
                      />
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
