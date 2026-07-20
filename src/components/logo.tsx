import { cn } from "@/lib/utils";

/**
 * worklink-Wortmarke mit Hotspot-Glyphe (Punkt + Funkwellen).
 * "work" fett & etwas größer, "link" dünn und unterstrichen.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 tracking-tight", className)}
    >
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime text-on-lime">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="17.5" r="2.4" fill="currentColor" />
          <path
            d="M8.6 13.6a5.1 5.1 0 0 1 6.8 0"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M5.6 10.2a9.6 9.6 0 0 1 12.8 0"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="lowercase leading-none">
        <span className="text-[1.12em] font-extrabold">work</span>
        <span className="font-light underline decoration-lime-2 decoration-2 underline-offset-[3px]">
          link
        </span>
      </span>
    </span>
  );
}
