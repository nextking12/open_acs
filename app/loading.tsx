export default function Loading() {
  return (
    <main className="flex-1 bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <div className="space-y-5">
          <div className="h-4 w-48 animate-pulse rounded bg-surface-strong" />
          <div className="h-12 max-w-xl animate-pulse rounded bg-surface-strong" />
          <div className="h-4 max-w-md animate-pulse rounded bg-surface-strong" />
        </div>
        <div className="h-72 w-full animate-pulse rounded-lg bg-surface" />
      </div>
    </main>
  );
}
