"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ProgressBar } from "./ProgressBar";

const STORAGE_KEY = "open-acs:completed-lessons";
const CHANGE_EVENT = "open-acs:progress-change";
const EMPTY_PROGRESS = "[]";

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_PROGRESS;
}

function subscribe(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function useCompletedLessonIds() {
  const storedProgress = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => EMPTY_PROGRESS,
  );

  return useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(storedProgress);
      if (!Array.isArray(parsed)) return new Set<string>();

      return new Set(
        parsed
          .filter((lessonId): lessonId is string => typeof lessonId === "string")
          .slice(0, 10_000),
      );
    } catch {
      return new Set<string>();
    }
  }, [storedProgress]);
}

function toggleLesson(lessonId: string, completedLessonIds: Set<string>) {
  const next = new Set(completedLessonIds);
  if (next.has(lessonId)) {
    next.delete(lessonId);
  } else {
    next.add(lessonId);
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next].sort()));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Browsing still works when storage is blocked or full.
  }
}

export function LocalProgressBar({ lessonIds }: { lessonIds: string[] }) {
  const completedLessonIds = useCompletedLessonIds();
  const completed = lessonIds.filter((id) => completedLessonIds.has(id)).length;

  return <ProgressBar completed={completed} total={lessonIds.length} />;
}

export function LocalProgressSummary({ lessonIds }: { lessonIds: string[] }) {
  const completedLessonIds = useCompletedLessonIds();
  const completed = lessonIds.filter((id) => completedLessonIds.has(id)).length;

  return (
    <p className="text-sm font-medium text-emerald-300">
      {completed} of {lessonIds.length} lessons complete
    </p>
  );
}

export function LocalCompletionMark({ lessonId }: { lessonId: string }) {
  const completedLessonIds = useCompletedLessonIds();

  return completedLessonIds.has(lessonId) ? (
    <span className="mr-2 text-emerald-300" aria-label="Completed">
      ✓
    </span>
  ) : null;
}

export function LocalLessonCompletion({ lessonId }: { lessonId: string }) {
  const completedLessonIds = useCompletedLessonIds();
  const completed = completedLessonIds.has(lessonId);

  return (
    <>
      <p className="text-sm font-medium text-stone-300">
        {completed ? (
          <span className="text-emerald-300">✓ You completed this lesson</span>
        ) : (
          "Not completed yet"
        )}
      </p>
      <button
        type="button"
        onClick={() => toggleLesson(lessonId, completedLessonIds)}
        className={
          completed
            ? "inline-flex h-11 items-center justify-center rounded-full border border-stone-700 px-5 text-sm font-semibold text-stone-300 transition hover:border-stone-500 hover:text-white"
            : "inline-flex h-11 items-center justify-center rounded-full bg-amber-300 px-5 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
        }
      >
        {completed ? "Mark as not done" : "Mark as complete"}
      </button>
    </>
  );
}
