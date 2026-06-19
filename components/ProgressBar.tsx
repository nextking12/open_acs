// Presentational progress bar. No data fetching or "use client" — it just
// renders the numbers it's given, so it works inside server components.
export function ProgressBar({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-stone-300">
          {completed} of {total} lessons complete
        </span>
        <span className="text-stone-400">{percent}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-stone-800"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-amber-300 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
