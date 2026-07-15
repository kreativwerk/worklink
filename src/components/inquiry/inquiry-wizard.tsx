"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { MultiFileSlot } from "@/components/apply/file-slot";
import { INDUSTRIES } from "@/lib/content";
import { cn } from "@/lib/utils";

type Field = {
  key: string;
  label: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
};

type Step =
  | { kind: "single"; key: string; question: string; hint?: string; options: string[]; grid?: boolean }
  | { kind: "accommodation-details" }
  | { kind: "fields"; section: string; fields: Field[] }
  | { kind: "message" };

const NIVEAUS = ["Keine", "Grundkenntnisse (A1–A2)", "Gut (B1–B2)", "Sehr gut (C1+)"];

function buildSteps(hasAccommodation: boolean): Step[] {
  return [
    {
      kind: "single",
      key: "industry",
      question: "Für welche Branche suchen Sie Personal?",
      grid: true,
      options: [...INDUSTRIES.map((i) => i.de), "Sonstiges"],
    },
    {
      kind: "single",
      key: "headcount",
      question: "Wie viele Mitarbeiter suchen Sie?",
      options: ["1", "2–5", "6–10", "Mehr als 10"],
    },
    {
      kind: "single",
      key: "startDate",
      question: "Wann sollen die Mitarbeiter starten?",
      hint: "Realistisch: Das Visumverfahren braucht mehrere Monate Vorlauf.",
      options: ["So bald wie möglich", "In 3–6 Monaten", "In 6–12 Monaten", "Flexibel"],
    },
    {
      kind: "single",
      key: "driverLicense",
      question: "Brauchen die Mitarbeiter einen Führerschein?",
      options: [
        "Ja, Pkw (Klasse B) — Pflicht",
        "Ja, Lkw (C/CE) — Pflicht",
        "Wünschenswert, kein Muss",
        "Nicht erforderlich",
      ],
    },
    {
      kind: "single",
      key: "germanLevel",
      question: "Welche Deutschkenntnisse werden benötigt?",
      options: NIVEAUS,
    },
    {
      kind: "single",
      key: "englishLevel",
      question: "Welche Englischkenntnisse werden benötigt?",
      options: NIVEAUS,
    },
    {
      kind: "single",
      key: "accommodation",
      question: "Können Sie eine Unterkunft stellen?",
      hint: "Eine gestellte Unterkunft erhöht die Chancen auf passende Kandidaten deutlich.",
      options: ["Ja", "Nein"],
    },
    ...(hasAccommodation
      ? ([
          {
            kind: "single",
            key: "roomType",
            question: "Welche Zimmer stehen zur Verfügung?",
            options: ["Einzelzimmer", "2-Bett-Zimmer", "Beides möglich"],
          },
          { kind: "accommodation-details" },
          {
            kind: "single",
            key: "commuteMinutes",
            question: "Wie weit ist die Unterkunft von der Arbeit entfernt?",
            hint: "Weg zur Arbeit in Minuten",
            options: ["Unter 15 Min", "15–30 Min", "30–45 Min", "Über 45 Min"],
          },
        ] as Step[])
      : []),
    {
      kind: "fields",
      section: "Ihr Unternehmen",
      fields: [
        { key: "company", label: "Firmenname", placeholder: "Muster GmbH", required: true },
        { key: "contact", label: "Ansprechpartner", placeholder: "Vor- und Nachname", required: true },
        { key: "email", label: "E-Mail", type: "email", placeholder: "kontakt@firma.de", required: true },
        { key: "phone", label: "Telefon / WhatsApp", type: "tel", placeholder: "+49 …" },
        { key: "city", label: "Einsatzort (PLZ, Ort)", placeholder: "z. B. 70173 Stuttgart", required: true },
      ],
    },
    { kind: "message" },
  ];
}

export function InquiryWizard() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const hasAccommodation = data.accommodation === "Ja";
  const steps = useMemo(() => buildSteps(hasAccommodation), [hasAccommodation]);
  const total = steps.length;
  const step = steps[index];

  function go(next: number, direction: number) {
    setDir(direction);
    setIndex(next);
  }
  const advance = () => go(Math.min(index + 1, total - 1), 1);
  const goBack = () => go(Math.max(index - 1, 0), -1);

  function pickSingle(key: string, value: string) {
    setData((d) => {
      const next = { ...d, [key]: value };
      if (key === "accommodation" && value === "Nein") {
        delete next.roomType;
        delete next.rentWarm;
        delete next.commuteMinutes;
        setPhotos([]);
      }
      return next;
    });
    window.setTimeout(advance, 220);
  }

  function fieldsValid(fields: Field[]) {
    return fields.every((f) => !f.required || (data[f.key] ?? "").trim());
  }

  async function submit() {
    setStatus("sending");
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.set(k, v));
      photos.forEach((f) => fd.append("photos", f));
      const res = await fetch("/api/anfrage", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="grid min-h-dvh place-items-center px-6">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-on-lime">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            Anfrage erhalten!
          </h2>
          <p className="mt-3 max-w-sm text-fg-muted">
            Vielen Dank. Wir melden uns innerhalb von 24 Stunden mit konkreten
            nächsten Schritten und passenden Kandidatenprofilen.
          </p>
          <Link href="/" className="btn btn-outline mt-8">
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((index + 1) / total) * 100;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex w-[min(46rem,calc(100%-2rem))] items-center justify-between py-4">
          <Logo className="text-[15px]" />
          <span className="text-sm text-fg-subtle">
            Schritt {index + 1} von {total}
          </span>
        </div>
        <div className="h-1 w-full bg-border">
          <motion.div
            className="h-full bg-lime"
            animate={{ width: `${progress}%` }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          />
        </div>
      </header>

      <main className="mx-auto flex w-[min(46rem,calc(100%-2rem))] flex-1 flex-col py-10 sm:py-14">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col"
          >
            {step.kind === "single" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.question}
                </h2>
                <p className="mt-2 text-sm text-fg-subtle">
                  {step.hint ?? "Wählen Sie eine Option, um fortzufahren"}
                </p>
                <div
                  className={cn(
                    "mt-8 grid gap-3",
                    step.grid ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
                  )}
                >
                  {step.options.map((o) => {
                    const active = data[step.key] === o;
                    return (
                      <button
                        key={o}
                        onClick={() => pickSingle(step.key, o)}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-2xl border p-4 text-left text-[15px] font-medium transition-all",
                          active
                            ? "border-lime-2 bg-lime/10"
                            : "border-border bg-bg-elevated hover:border-lime-2",
                        )}
                      >
                        {o}
                        <span
                          className={cn(
                            "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
                            active ? "border-lime-2 bg-lime text-on-lime" : "border-border",
                          )}
                        >
                          {active && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step.kind === "accommodation-details" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Details zur Unterkunft
                </h2>
                <p className="mt-2 text-sm text-fg-subtle">
                  Beide Angaben sind optional — sie helfen den Kandidaten bei der
                  Entscheidung.
                </p>
                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rentWarm" className="text-sm font-medium">
                      Warmmiete pro Monat (optional)
                    </label>
                    <input
                      id="rentWarm"
                      type="text"
                      inputMode="numeric"
                      placeholder="z. B. 350 € warm"
                      value={data.rentWarm ?? ""}
                      onChange={(e) =>
                        setData((d) => ({ ...d, rentWarm: e.target.value }))
                      }
                      className="w-full rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-[15px] outline-none transition-shadow placeholder:text-fg-subtle focus:border-lime-2 focus:ring-4 focus:ring-lime/25"
                    />
                  </div>
                  <MultiFileSlot
                    label="Bilder der Unterkunft"
                    hint="JPG, PNG oder PDF · max. 10 MB pro Datei"
                    cta="Fotos auswählen"
                    optionalLabel="optional"
                    onChange={setPhotos}
                  />
                </div>
              </div>
            )}

            {step.kind === "fields" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.section}
                </h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {step.fields.map((f) => (
                    <div
                      key={f.key}
                      className={cn("flex flex-col gap-1.5", f.key === "city" && "sm:col-span-2")}
                    >
                      <label htmlFor={f.key} className="text-sm font-medium">
                        {f.label}
                        {f.required && <span className="ml-0.5 text-lime-2">*</span>}
                      </label>
                      <input
                        id={f.key}
                        type={f.type ?? "text"}
                        placeholder={f.placeholder}
                        value={data[f.key] ?? ""}
                        onChange={(e) =>
                          setData((d) => ({ ...d, [f.key]: e.target.value }))
                        }
                        className="w-full rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-[15px] outline-none transition-shadow placeholder:text-fg-subtle focus:border-lime-2 focus:ring-4 focus:ring-lime/25"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step.kind === "message" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Noch etwas, das wir wissen sollten?
                </h2>
                <p className="mt-2 text-sm text-fg-subtle">
                  Optional — z. B. Qualifikationen, Schichtmodell, Besonderheiten.
                </p>
                <textarea
                  value={data.message ?? ""}
                  onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                  placeholder="Ihre Nachricht …"
                  className="mt-8 min-h-32 w-full resize-y rounded-xl border border-border bg-bg-elevated px-4 py-3 text-[15px] outline-none transition-shadow placeholder:text-fg-subtle focus:border-lime-2 focus:ring-4 focus:ring-lime/25"
                />

                {/* Zusammenfassung */}
                <dl className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-elevated">
                  {[
                    ["Branche", data.industry],
                    ["Anzahl Mitarbeiter", data.headcount],
                    ["Start", data.startDate],
                    ["Führerschein", data.driverLicense],
                    ["Deutsch", data.germanLevel],
                    ["Englisch", data.englishLevel],
                    ["Unterkunft", data.accommodation],
                    ["Zimmer", data.roomType],
                    ["Warmmiete", data.rentWarm],
                    ["Weg zur Arbeit", data.commuteMinutes],
                    ["Firma", data.company],
                    ["Einsatzort", data.city],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k} className="flex items-center gap-4 px-5 py-2.5 text-sm">
                        <dt className="w-40 shrink-0 text-fg-subtle">{k}</dt>
                        <dd className="font-medium">{v}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* nav */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {index > 0 ? (
            <button onClick={goBack} className="btn btn-outline">
              <ArrowLeft className="h-4 w-4" /> Zurück
            </button>
          ) : (
            <Link href="/unternehmen" className="btn btn-outline">
              <ArrowLeft className="h-4 w-4" /> Zurück
            </Link>
          )}

          {step.kind === "message" ? (
            <button onClick={submit} disabled={status === "sending"} className="btn btn-lime">
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet …
                </>
              ) : (
                <>
                  Anfrage senden <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          ) : step.kind === "fields" ? (
            <button onClick={advance} disabled={!fieldsValid(step.fields)} className="btn btn-lime">
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          ) : step.kind === "accommodation-details" ? (
            <button onClick={advance} className="btn btn-lime">
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <span />
          )}
        </div>
        {status === "error" && (
          <p className="mt-4 text-right text-sm text-red-500">
            Senden fehlgeschlagen — bitte erneut versuchen.
          </p>
        )}
      </main>
    </div>
  );
}
