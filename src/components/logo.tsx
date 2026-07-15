import { cn } from "@/lib/utils";

/** WorkLink wordmark with a linked-nodes glyph. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-semibold", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <linearGradient id="wl-g" x1="0" y1="0" x2="26" y2="26">
            <stop stopColor="var(--company)" />
            <stop offset="1" stopColor="var(--applicant)" />
          </linearGradient>
        </defs>
        <circle cx="7" cy="7" r="4" stroke="url(#wl-g)" strokeWidth="2.2" />
        <circle cx="19" cy="19" r="4" stroke="url(#wl-g)" strokeWidth="2.2" />
        <path
          d="M9.5 9.5 16.5 16.5"
          stroke="url(#wl-g)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="tracking-tight">
        Work<span className="text-fg-subtle">Link</span>
      </span>
    </span>
  );
}
