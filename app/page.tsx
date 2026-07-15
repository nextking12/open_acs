import Link from "next/link";
import { HeroSchematic } from "@/components/HeroSchematic";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative flex flex-1 overflow-hidden bg-background text-foreground">
      <div className="atmosphere-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] items-center justify-center lg:flex">
        <HeroSchematic className="h-[min(78vh,520px)] w-auto opacity-80" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent lg:via-background/75" />

      <section className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="max-w-xl space-y-8 lg:max-w-2xl">
          <p className="hero-rise font-display text-4xl font-semibold tracking-tight text-accent sm:text-5xl lg:text-6xl">
            PhySec.Learn
          </p>
          <div className="space-y-5">
            <h1 className="hero-rise-delay-1 font-display max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Learn how real access control systems are built and operated.
            </h1>
            <p className="hero-rise-delay-2 max-w-lg text-lg leading-8 text-foreground-muted">
              Free, hands-on training on credentials, readers, controllers, door
              hardware, schedules, access levels, events, and audit trails.
            </p>
          </div>
          <div className="hero-rise-delay-3 flex flex-col gap-4">
            <Link
              href="/courses"
              className="inline-flex h-12 w-fit items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-background transition hover:bg-accent-strong"
            >
              Browse courses
            </Link>
            <p className="text-sm text-foreground-muted">
              Track lesson progress privately in your browser—no account needed.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
