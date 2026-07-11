export default function Loading() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-10 text-stone-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl gap-10">
        <div className="hidden h-fit w-56 shrink-0 animate-pulse rounded-2xl bg-stone-800/50 p-4 lg:block">
          <div className="h-4 w-24 rounded bg-stone-800" />
          <div className="mt-4 space-y-3">
            <div className="h-3 w-full rounded bg-stone-800" />
            <div className="h-3 w-3/4 rounded bg-stone-800" />
            <div className="h-3 w-full rounded bg-stone-800" />
          </div>
        </div>
        <div className="flex-1 space-y-8">
          <div className="h-4 w-40 animate-pulse rounded-full bg-stone-800" />
          <div className="h-12 w-3xl animate-pulse rounded-2xl bg-stone-800" />
          <div className="h-96 w-full animate-pulse rounded-3xl bg-stone-800/50" />
        </div>
      </div>
    </main>
  );
}
