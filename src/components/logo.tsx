import { cn } from "@/lib/utils";

/** WorkLink wordmark with a linked-nodes glyph. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-lime text-on-lime">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="3.2" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="17" cy="17" r="3.2" stroke="currentColor" strokeWidth="2.2" />
          <path d="M9.4 9.4 14.6 14.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <span>
        Work<span className="text-fg-subtle">Link</span>
      </span>
    </span>
  );
}
