export default function Loading() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-5">
          <div className="h-4 w-40 animate-pulse rounded-full bg-zinc-800" />
          <div className="h-12 w-3xl animate-pulse rounded-2xl bg-zinc-800" />
        </div>
        <div className="grid gap-6">
          <div className="h-48 w-full animate-pulse rounded-3xl bg-zinc-900/50" />
          <div className="h-48 w-full animate-pulse rounded-3xl bg-zinc-900/50" />
        </div>
      </div>
    </main>
  );
}
