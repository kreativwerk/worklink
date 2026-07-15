"use client";

import { useRef, useState } from "react";
import { Upload, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPT = ".pdf,.jpg,.jpeg,.png";

/** Single-file upload slot with filename preview. */
export function FileSlot({
  label,
  cta,
  required,
  optionalLabel,
  onChange,
}: {
  label: string;
  cta: string;
  required?: boolean;
  optionalLabel: string;
  onChange: (file: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        {!required && <span className="text-xs text-fg-subtle">{optionalLabel}</span>}
      </div>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 text-left text-sm transition-colors",
          name ? "border-lime-2 bg-lime/5" : "border-border hover:border-lime-2",
        )}
      >
        <span
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
            name ? "bg-lime text-on-lime" : "bg-bg text-fg-muted",
          )}
        >
          {name ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
        </span>
        <span className={cn("min-w-0 flex-1 truncate", !name && "text-fg-subtle")}>
          {name ?? cta}
        </span>
        {name && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setName(null);
              onChange(null);
              if (ref.current) ref.current.value = "";
            }}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-fg-subtle hover:bg-fg/10 hover:text-fg"
            aria-label="remove"
          >
            <X className="h-4 w-4" />
          </span>
        )}
      </button>
      <input
        ref={ref}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          setName(f?.name ?? null);
          onChange(f);
        }}
      />
    </div>
  );
}

/** Multi-file upload slot (certificates / qualifications). */
export function MultiFileSlot({
  label,
  hint,
  cta,
  optionalLabel,
  onChange,
}: {
  label: string;
  hint: string;
  cta: string;
  optionalLabel: string;
  onChange: (files: File[]) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  function update(next: File[]) {
    setFiles(next);
    onChange(next);
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-fg-subtle">{optionalLabel}</span>
      </div>

      {files.length > 0 && (
        <ul className="mb-2 flex flex-col gap-1.5">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-lg border border-lime-2/40 bg-lime/5 px-3 py-2 text-sm"
            >
              <Check className="h-4 w-4 shrink-0 text-lime-2" />
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => update(files.filter((_, j) => j !== i))}
                className="grid h-6 w-6 place-items-center rounded-full text-fg-subtle hover:bg-fg/10 hover:text-fg"
                aria-label="remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="flex w-full items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3.5 text-left text-sm transition-colors hover:border-lime-2"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bg text-fg-muted">
          <Upload className="h-4 w-4" />
        </span>
        <span className="text-fg-subtle">{cta}</span>
      </button>
      <p className="mt-1.5 text-xs text-fg-subtle">{hint}</p>

      <input
        ref={ref}
        type="file"
        accept={ACCEPT}
        multiple
        className="sr-only"
        onChange={(e) => {
          const added = Array.from(e.target.files ?? []);
          if (added.length) update([...files, ...added]);
          if (ref.current) ref.current.value = "";
        }}
      />
    </div>
  );
}
