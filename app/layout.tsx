import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <span className="text-stone-400">Progress saves in this browser</span>
        </header>
        {children}
      </body>
    </html>
  );
}
