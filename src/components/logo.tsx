import { cn } from "@/lib/utils";

/**
 * worklink-Wortmarke mit Kettenglied-Icon (zwei verbundene Glieder,
 * diagonal — in den Markenfarben). "work" in Textfarbe, "link" in Grün,
 * beides fette Sans-Serif.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-extrabold lowercase leading-none tracking-tight",
        className,
      )}
    >
      {/* Kettenglieder: oberes in Grün, unteres in Textfarbe */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="h-[1.1em] w-[1.1em] shrink-0"
      >
        <g transform="translate(15.6 8.4) rotate(-45)">
          <rect
            x="-6.3"
            y="-3.1"
            width="12.6"
            height="6.2"
            rx="3.1"
            className="stroke-lime-2"
            strokeWidth="2.6"
          />
        </g>
        <g transform="translate(8.4 15.6) rotate(-45)">
          <rect
            x="-6.3"
            y="-3.1"
            width="12.6"
            height="6.2"
            rx="3.1"
            stroke="currentColor"
            strokeWidth="2.6"
          />
        </g>
      </svg>
      <span>
        work<span className="text-lime-2">link</span>
      </span>
    </span>
  );
}
