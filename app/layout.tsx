import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open ACS",
  description: "A learning platform for physical access control systems.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100">
        <header className="flex items-center justify-between border-b border-stone-800 px-6 py-3 text-sm sm:px-10 lg:px-16">
          <Link href="/" className="font-semibold text-white">
            Open ACS
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-4">
              <span className="text-stone-400">{session.user.email}</span>
              {/* Inline server action: runs on the server, ends the session. */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="rounded-full border border-stone-700 px-4 py-1.5 font-medium text-stone-200 transition hover:border-stone-500 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <button
                type="submit"
                className="rounded-full bg-amber-300 px-4 py-1.5 font-semibold text-stone-950 transition hover:bg-amber-200"
              >
                Sign in
              </button>
            </form>
          )}
        </header>
        {children}
      </body>
    </html>
  );
}
