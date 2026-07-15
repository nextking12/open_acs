import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/80 bg-background/80 px-6 py-3 text-sm backdrop-blur-md sm:px-10 lg:px-16">
          <BrandMark />
          <div className="flex items-center gap-6">
            <Link
              href="/courses"
              className="font-medium text-foreground-muted transition hover:text-accent"
            >
              Courses
            </Link>
            <span className="hidden text-foreground-muted/70 sm:inline">
              Progress saves in this browser
            </span>
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="mt-auto border-t border-border/80 px-6 py-8 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <BrandMark className="text-sm" />
            <p className="text-sm text-foreground-muted">
              Free physical access control training. No account required.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
