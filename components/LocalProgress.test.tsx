import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  LocalLessonCompletion,
  LocalProgressBar,
} from "./LocalProgress";

const STORAGE_KEY = "open-acs:completed-lessons";

describe("browser-local lesson progress", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("persists a completed lesson and updates progress", () => {
    render(
      <>
        <LocalProgressBar lessonIds={["lesson-1", "lesson-2"]} />
        <LocalLessonCompletion lessonId="lesson-1" />
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Mark as complete" }));

    expect(screen.getByText("1 of 2 lessons complete")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mark as not done" })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]")).toEqual([
      "lesson-1",
    ]);
  });

  it("ignores corrupt stored progress", () => {
    window.localStorage.setItem(STORAGE_KEY, "not-json");

    render(<LocalProgressBar lessonIds={["lesson-1"]} />);

    expect(screen.getByText("0 of 1 lessons complete")).toBeInTheDocument();
  });
});
