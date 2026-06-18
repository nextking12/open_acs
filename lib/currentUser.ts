import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Returns the logged-in user, or null if nobody is signed in. This is the same
// seam the rest of the app already calls — only its implementation changed:
// it now reads the real Auth.js session instead of a hardcoded dev user.
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }
  return prisma.user.findUnique({ where: { email: session.user.email } });
}
