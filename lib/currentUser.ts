import { prisma } from "@/lib/prisma";

// Until real authentication exists, every request acts as this seeded user.
// This is the single place to change when we add login (Step 2b), so the
// rest of the app can keep calling getCurrentUser() unchanged.
export const DEV_USER_EMAIL = "dev@open-acs.local";

export async function getCurrentUser() {
  return prisma.user.findUnique({ where: { email: DEV_USER_EMAIL } });
}
