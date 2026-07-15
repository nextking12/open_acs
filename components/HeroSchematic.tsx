export function HeroSchematic({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hero-graphic text-accent ${className}`}
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Door frame */}
      <rect
        x="280"
        y="48"
        width="200"
        height="380"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <rect
        x="300"
        y="72"
        width="160"
        height="332"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      {/* Latch / strike */}
      <rect
        x="448"
        y="230"
        width="18"
        height="36"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />
      {/* Reader panel */}
      <rect
        x="80"
        y="160"
        width="120"
        height="160"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.65"
      />
      <rect
        x="100"
        y="188"
        width="80"
        height="48"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.5"
      />
      <circle cx="140" cy="280" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="140" cy="280" r="5" fill="currentColor" opacity="0.45" />
      {/* Wiring / bus lines */}
      <line
        x1="200"
        y1="240"
        x2="280"
        y2="240"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="4 6"
      />
      <path
        d="M140 320 V380 H320"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
        strokeDasharray="4 6"
      />
      {/* Controller box */}
      <rect
        x="480"
        y="120"
        width="100"
        height="80"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <line
        x1="498"
        y1="145"
        x2="562"
        y2="145"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <line
        x1="498"
        y1="160"
        x2="548"
        y2="160"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      <line
        x1="498"
        y1="175"
        x2="556"
        y2="175"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M466 248 H530 V160"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
        strokeDasharray="4 6"
      />
      {/* Badge silhouette */}
      <rect
        x="108"
        y="198"
        width="36"
        height="28"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle cx="126" cy="208" r="4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
