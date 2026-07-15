export default function Loading() {
  return (
    <main className="flex-1 bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-4">
          <div className="h-4 w-40 animate-pulse rounded bg-surface-strong" />
          <div className="h-12 max-w-xl animate-pulse rounded bg-surface-strong" />
        </div>
        <div className="divide-y divide-border border-y border-border">
          <div className="h-48 animate-pulse bg-surface/60 py-10" />
          <div className="h-48 animate-pulse bg-surface/40 py-10" />
        </div>
      </div>
    </main>
  );
}
