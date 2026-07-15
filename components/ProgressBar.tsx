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
        <span className="font-medium text-foreground-muted">
          {completed} of {total} lessons complete
        </span>
        <span className="text-foreground-muted/80">{percent}%</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-sm bg-surface-strong"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-sm bg-accent transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
