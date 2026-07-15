export default function Loading() {
  return (
    <main className="flex-1 bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="h-4 w-28 animate-pulse rounded bg-surface-strong" />
          <div className="mt-6 space-y-3">
            <div className="h-3 w-full animate-pulse rounded bg-surface-strong" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-surface-strong" />
            <div className="h-3 w-full animate-pulse rounded bg-surface-strong" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-surface-strong" />
          </div>
        </aside>
        <div className="min-w-0 flex-1 space-y-8">
          <div className="h-4 w-64 animate-pulse rounded bg-surface-strong" />
          <div className="border border-border bg-surface">
            <div className="space-y-4 border-b border-border bg-background px-6 py-8 sm:px-8">
              <div className="h-4 w-40 animate-pulse rounded bg-surface-strong" />
              <div className="h-10 max-w-lg animate-pulse rounded bg-surface-strong" />
            </div>
            <div className="h-72 animate-pulse bg-surface/80" />
          </div>
        </div>
      </div>
    </main>
  );
}
