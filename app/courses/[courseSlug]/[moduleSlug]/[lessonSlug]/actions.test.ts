import { describe, it, expect, vi, beforeEach } from "vitest";

// Replace the action's three dependencies with fakes. vi.mock is hoisted above
// the imports below, so when actions.ts imports these, it gets the mocks. This
// means the real Prisma client and Auth.js are never loaded, so the test needs
// no database and no Next.js runtime.
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/currentUser", () => ({ getCurrentUser: vi.fn() }));
vi.mock("@/lib/prisma", () => ({
  prisma: {
    lessonProgress: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { toggleLessonComplete } from "./actions";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";

// vi.mocked() just re-types the imports as mock functions for autocomplete.
const getCurrentUserMock = vi.mocked(getCurrentUser);
const findUniqueMock = vi.mocked(prisma.lessonProgress.findUnique);
const createMock = vi.mocked(prisma.lessonProgress.create);
const deleteMock = vi.mocked(prisma.lessonProgress.delete);
const revalidatePathMock = vi.mocked(revalidatePath);

// Small helpers to satisfy the return types without building full Prisma rows.
type CurrentUser = Awaited<ReturnType<typeof getCurrentUser>>;
type ProgressRow = Awaited<ReturnType<typeof prisma.lessonProgress.findUnique>>;

describe("toggleLessonComplete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a progress row when the lesson is not yet complete", async () => {
    getCurrentUserMock.mockResolvedValue({ id: "user-1" } as CurrentUser);
    findUniqueMock.mockResolvedValue(null);

    await toggleLessonComplete("lesson-1", "/courses/a/b/c");

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { userId_lessonId: { userId: "user-1", lessonId: "lesson-1" } },
    });
    expect(createMock).toHaveBeenCalledWith({
      data: { userId: "user-1", lessonId: "lesson-1" },
    });
    expect(deleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).toHaveBeenCalledWith("/courses/a/b/c");
  });

  it("deletes the existing row when the lesson is already complete", async () => {
    getCurrentUserMock.mockResolvedValue({ id: "user-1" } as CurrentUser);
    findUniqueMock.mockResolvedValue({ id: "progress-1" } as ProgressRow);

    await toggleLessonComplete("lesson-1", "/courses/a/b/c");

    expect(deleteMock).toHaveBeenCalledWith({ where: { id: "progress-1" } });
    expect(createMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).toHaveBeenCalledWith("/courses/a/b/c");
  });

  it("throws and touches nothing when no user is signed in", async () => {
    getCurrentUserMock.mockResolvedValue(null);

    await expect(
      toggleLessonComplete("lesson-1", "/courses/a/b/c"),
    ).rejects.toThrow("No current user");

    expect(findUniqueMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
    expect(deleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
