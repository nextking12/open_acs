import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Auth.js setup. `auth()` reads the current session, `signIn`/`signOut` drive
// the login flow, and `handlers` are the GET/POST route handlers re-exported
// from app/api/auth/[...nextauth]/route.ts.
//
// The Prisma adapter persists users, sessions, and magic-link tokens to the
// database (the User/Account/Session/VerificationToken tables we just added).
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      // DEV TRANSPORT: these server settings are placeholders. We override
      // sendVerificationRequest below to print the magic link to the terminal
      // instead of sending real email. To send real email later, drop in an
      // SMTP server config (or switch to the Resend provider) and delete the
      // override.
      server: { host: "localhost", port: 587, auth: { user: "", pass: "" } },
      from: "no-reply@open-acs.local",
      async sendVerificationRequest({ identifier, url }) {
        console.log("\n==================== SIGN-IN LINK ====================");
        console.log(`for: ${identifier}`);
        console.log(url);
        console.log("Paste this URL into your browser to finish logging in.");
        console.log("======================================================\n");
      },
    }),
  ],
});
