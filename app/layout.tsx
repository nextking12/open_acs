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
  metadataBase: new URL("https://physec-learn.vercel.app"),
  title: "PhySec.Learn",
  description: "A learning platform for physical access control systems.",
  openGraph: {
    title: "PhySec.Learn",
    description: "Learn how real access control systems are built and operated.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhySec.Learn",
    description: "Learn how real access control systems are built and operated.",
  },
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="flex items-center justify-between border-b border-zinc-800/80 bg-black/70 px-6 py-3 text-sm backdrop-blur-sm sm:px-10 lg:px-16">
          <Link href="/" className="font-semibold text-white">
            PhySec.Learn
          </Link>
          <span className="text-zinc-400">Progress saves in this browser</span>
        </header>
        {children}
      </body>
    </html>
  );
}
