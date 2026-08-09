import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";

// Schreibschrift für den "link"-Teil (geschwungene Schlaufen wie im Vorbild).
const script = Pacifico({ weight: "400", subsets: ["latin"] });

/**
 * worklink-Wortmarke: "work" fett und geradlinig, "link" in Schreibschrift
 * mit frischem Grün — nach Vorbild des va-ll-Logos.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline tracking-tight lowercase leading-none",
        className,
      )}
    >
      <span className="font-extrabold">work</span>
      <span
        className={cn(
          script.className,
          "ml-0.5 text-[1.18em] leading-none text-lime-2",
        )}
      >
        link
      </span>
    </span>
  );
}
