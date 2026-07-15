import Link from "next/link";

export function BrandLock({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M7 7 H17 M7 7 V12 H12 M17 7 V10.5 H21"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M12 12 V19 M12 15.5 H17 V19 M3 19 H7 V15"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="7" cy="7" r="1.1" fill="currentColor" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
      <circle cx="12" cy="19" r="1.1" fill="currentColor" />
      <circle cx="17" cy="19" r="1.1" fill="currentColor" />
      <rect
        x="9"
        y="9"
        width="6"
        height="5"
        rx="0.75"
        stroke="currentColor"
        strokeWidth="1.35"
        fill="var(--background, #070707)"
      />
    </svg>
  );
}

export function BrandMark({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`font-display inline-flex items-center gap-2 font-semibold tracking-tight text-foreground transition hover:text-accent ${className}`}
    >
      <BrandLock className="h-5 w-5 text-accent" />
      PhySec.Learn
    </Link>
  );
}
