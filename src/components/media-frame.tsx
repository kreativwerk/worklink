import Image from "next/image";
import { ImageIcon, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  /** Image path (under /public) — swap the placeholder once you have the asset. */
  src?: string;
  /** Video path (mp4/webm). Takes precedence over `src`. Autoplays muted/looped. */
  video?: string;
  alt?: string;
  /** Tailwind aspect ratio utility, e.g. "aspect-[4/5]". */
  aspect?: string;
  /** Caption shown on the placeholder state. */
  label?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Media surface for hero/feature imagery. Renders a video, an image, or —
 * until an asset is supplied — an on-brand placeholder. Swapping in the real
 * media is a one-prop change: <MediaFrame src="/hero.jpg" /> or video="/hero.mp4".
 */
export function MediaFrame({
  src,
  video,
  alt = "",
  aspect = "aspect-[4/5]",
  label = "Hero-Medium — Foto oder Video folgt",
  className,
  priority,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] border border-white/10",
        aspect,
        className,
      )}
    >
      {video ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={src}
        >
          <source src={video} />
        </video>
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
      ) : (
        <Placeholder label={label} />
      )}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="dot-texture absolute inset-0 grid place-items-center bg-ink-2">
      {/* soft lime glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--lime)" }}
        aria-hidden
      />
      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-ink text-lime-2">
          <ImageIcon className="h-7 w-7" strokeWidth={1.6} />
        </span>
        <p className="max-w-[16rem] text-sm text-white/60">{label}</p>
        <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-xs font-semibold text-on-lime">
          <Play className="h-3.5 w-3.5" /> Platzhalter
        </span>
      </div>
      {/* corner ticks — frame feel */}
      <Corner className="left-4 top-4" />
      <Corner className="right-4 top-4 rotate-90" />
      <Corner className="bottom-4 left-4 -rotate-90" />
      <Corner className="bottom-4 right-4 rotate-180" />
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      className={cn("absolute h-5 w-5 border-l-2 border-t-2 border-lime/50", className)}
      aria-hidden
    />
  );
}
