"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/currentUser";

// Toggle completion for one lesson: create the progress row if it's missing,
// delete it if it's already there. `pathToRevalidate` tells Next.js which
// page to re-render with fresh data after the change.
export async function toggleLessonComplete(
  lessonId: string,
  pathToRevalidate: string,
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No current user; run `pnpm db:seed` to create the dev user.");
  }

  const existing = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId } },
  });

  if (existing) {
    await prisma.lessonProgress.delete({ where: { id: existing.id } });
  } else {
    await prisma.lessonProgress.create({
      data: { userId: user.id, lessonId },
    });
  }

  revalidatePath(pathToRevalidate);
}
