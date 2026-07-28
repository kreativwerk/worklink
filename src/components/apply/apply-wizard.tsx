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
import { FileSlot, MultiFileSlot } from "@/components/apply/file-slot";
import {
  DICT,
  LANGS,
  SHOE_SIZES,
  TSHIRT_SIZES,
  type Lang,
} from "@/lib/apply-i18n";
import { INDUSTRIES } from "@/lib/content";
import { cn } from "@/lib/utils";

/* Aktuell rekrutieren wir nur Paketfahrer — andere Kategorien sind sichtbar,
   aber ausgegraut ("Säe shpejti / Uskoro"). Gespeichert wird der deutsche Wert. */
const ACTIVE_FIELD = {
  value: "Paketfahrer",
  label: { sq: "Shofer paketash", bs: "Vozač dostave paketa", hr: "Vozač dostave paketa", mk: "Возач за достава на пакети" },
};

type Field = {
  key: string;
  label: string;
  type?: "text" | "date" | "email" | "tel";
  required?: boolean;
};
type DocSlot = { key: string; label: string; required?: boolean };

type Step =
  | { kind: "lang" }
  | { kind: "field" }
  | { kind: "single"; key: string; question: string; options: { value: string; label: string }[]; grid?: boolean }
  | { kind: "fields"; title: string; fields: Field[] }
  | { kind: "docs"; title: string; slots: DocSlot[] }
  | { kind: "certs"; title: string }
  | { kind: "consent" };

function buildSteps(t: (typeof DICT)[Lang], hasTruck: boolean): Step[] {
  const yn = [
    { value: "Ja", label: t.yes },
    { value: "Nein", label: t.no },
  ];
  return [
    { kind: "lang" },
    { kind: "field" },
    {
      kind: "single",
      key: "employment",
      question: t.q_employment,
      options: [
        { value: "Vollzeit", label: t.employment_full },
        { value: "Teilzeit", label: t.employment_part },
      ],
    },
    { kind: "single", key: "truckLicense", question: t.q_truck, options: yn },
    ...(hasTruck
      ? [{ kind: "single", key: "code95", question: t.q_code95, options: yn } as Step]
      : []),
    {
      kind: "fields",
      title: t.q_name,
      fields: [
        { key: "firstName", label: t.firstName, required: true },
        { key: "lastName", label: t.lastName, required: true },
      ],
    },
    {
      kind: "fields",
      title: t.q_birth,
      fields: [
        { key: "dob", label: t.dob, type: "date", required: true },
        { key: "placeOfBirth", label: t.placeOfBirth },
      ],
    },
    {
      kind: "fields",
      title: t.q_nationality,
      fields: [
        { key: "nationality", label: t.nationality, required: true },
        { key: "countryOfBirth", label: t.countryOfBirth },
      ],
    },
    {
      kind: "fields",
      title: t.q_address,
      fields: [
        { key: "street", label: t.street, required: true },
        { key: "postal", label: t.postal },
        { key: "city", label: t.city, required: true },
        { key: "livingSince", label: t.livingSince, type: "date" },
      ],
    },
    {
      kind: "fields",
      title: t.q_contact,
      fields: [
        { key: "email", label: t.email, type: "email", required: true },
        { key: "phone", label: t.phone, type: "tel", required: true },
      ],
    },
    {
      kind: "single",
      key: "tshirt",
      question: t.q_tshirt,
      grid: true,
      options: TSHIRT_SIZES.map((s) => ({ value: s, label: s })),
    },
    {
      kind: "single",
      key: "shoe",
      question: t.q_shoe,
      grid: true,
      options: SHOE_SIZES.map((s) => ({ value: s, label: s })),
    },
    {
      kind: "docs",
      title: t.doc_id_title,
      slots: [
        { key: "idFront", label: t.doc_idFront, required: true },
        { key: "idBack", label: t.doc_idBack, required: true },
      ],
    },
    {
      kind: "docs",
      title: t.doc_selfie_title,
      slots: [{ key: "selfie", label: t.doc_selfie, required: true }],
    },
    {
      // Führerschein ist Pflicht (wir rekrutieren aktuell Fahrer).
      kind: "docs",
      title: t.doc_license_title,
      slots: [
        { key: "licenseFront", label: t.doc_licenseFront, required: true },
        { key: "licenseBack", label: t.doc_licenseBack, required: true },
      ],
    },
    { kind: "certs", title: t.doc_certs_title },
    { kind: "consent" },
  ];
}

export function ApplyWizard({ initialLang }: { initialLang?: Lang }) {
  // Kommt die Sprache schon aus dem Link (?lang=…), wird der Sprach-Schritt übersprungen.
  const [lang, setLang] = useState<Lang | null>(initialLang ?? null);
  const [index, setIndex] = useState(initialLang ? 1 : 0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [certs, setCerts] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const t = DICT[lang ?? "sq"];
  const hasTruck = data.truckLicense === "Ja";
  const steps = useMemo(() => buildSteps(t, hasTruck), [t, hasTruck]);
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
      if (key === "truckLicense" && value === "Nein") delete next.code95;
      return next;
    });
    window.setTimeout(advance, 220);
  }

  const fieldsValid = (fields: Field[]) =>
    fields.every((f) => !f.required || (data[f.key] ?? "").trim());
  const docsValid = (slots: DocSlot[]) =>
    slots.every((s) => !s.required || files[s.key]);

  async function submit() {
    setStatus("sending");
    try {
      const fd = new FormData();
      fd.set("lang", lang ?? "");
      fd.set("field", data.field ?? ACTIVE_FIELD.value);
      fd.set("dsgvoConsent", consent ? "Ja" : "Nein");
      fd.set("dsgvoConsentAt", new Date().toISOString());
      Object.entries(data).forEach(([k, v]) => fd.set(k, v));
      Object.entries(files).forEach(([k, f]) => f && fd.set(k, f));
      certs.forEach((f) => fd.append("certificates", f));

      const res = await fetch("/api/bewerbung", { method: "POST", body: fd });
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
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">{t.done_title}</h2>
          <p className="mt-3 max-w-sm text-fg-muted">{t.done_body}</p>
          <Link href="/" className="btn btn-outline mt-8">
            WorkLink
          </Link>
        </div>
      </div>
    );
  }

  const progress = (index / (total - 1)) * 100;
  const control =
    "w-full rounded-xl border border-border bg-bg-elevated px-4 py-3 text-base outline-none transition-shadow placeholder:text-fg-subtle focus:border-lime-2 focus:ring-4 focus:ring-lime/25";

  return (
    <div className="flex min-h-dvh flex-col">
      {/* progress header */}
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex w-[min(46rem,calc(100%-2rem))] items-center justify-between py-4">
          <Logo className="text-[15px]" />
          {lang && (
            <span className="text-sm text-fg-subtle">
              {t.step} {index} {t.of} {total - 1}
            </span>
          )}
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
            {/* Sprache — Flaggen im runden Kreis */}
            {step.kind === "lang" && (
              <div className="flex flex-1 flex-col justify-center py-10 text-center">
                <div className="mx-auto mb-8">
                  <Logo className="text-xl" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Zgjidhni gjuhën · Odaberite jezik
                </h1>
                <div className="mx-auto mt-8 grid w-full max-w-md gap-3">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        go(1, 1);
                      }}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-bg-elevated p-4 text-left transition-colors hover:border-lime-2"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-bg text-2xl">
                        {l.flag}
                      </span>
                      <span className="flex-1 text-lg font-semibold">{l.label}</span>
                      <ArrowRight className="h-5 w-5 text-fg-subtle transition-colors group-hover:text-lime-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Berufsfeld — nur Paketfahrer aktiv, Rest ausgegraut */}
            {step.kind === "field" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t.q_field}
                </h2>
                <p className="mt-2 text-sm text-fg-subtle">{t.autoHint}</p>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* aktive Kategorie */}
                  <button
                    onClick={() => pickSingle("field", ACTIVE_FIELD.value)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left text-base font-semibold transition-all",
                      data.field === ACTIVE_FIELD.value
                        ? "border-lime-2 bg-lime/10"
                        : "border-lime-2/60 bg-bg-elevated hover:border-lime-2 hover:bg-lime/5",
                    )}
                  >
                    <span>
                      {ACTIVE_FIELD.label[lang ?? "sq"]}
                      <span className="block text-xs font-normal text-fg-subtle">
                        Paketfahrer
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
                        data.field === ACTIVE_FIELD.value
                          ? "border-lime-2 bg-lime text-on-lime"
                          : "border-lime-2/60",
                      )}
                    >
                      {data.field === ACTIVE_FIELD.value && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  {/* ausgegraute Kategorien */}
                  {INDUSTRIES.filter((i) => i.key !== "transport").map((i) => (
                    <div
                      key={i.key}
                      aria-disabled
                      className="flex cursor-not-allowed items-center justify-between gap-3 rounded-2xl border border-border bg-bg-elevated p-4 text-base font-medium opacity-45"
                    >
                      <span>{i[lang ?? "sq"]}</span>
                      <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-subtle">
                        {t.comingSoon}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Einfachauswahl (auch Größen als Buttons) */}
            {step.kind === "single" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.question}
                </h2>
                <p className="mt-2 text-sm text-fg-subtle">{t.autoHint}</p>
                <div
                  className={cn(
                    "mt-8 grid gap-3",
                    step.grid
                      ? "grid-cols-3 sm:grid-cols-5"
                      : "grid-cols-1 sm:grid-cols-2",
                  )}
                >
                  {step.options.map((o) => {
                    const active = data[step.key] === o.value;
                    return (
                      <button
                        key={o.value}
                        onClick={() => pickSingle(step.key, o.value)}
                        className={cn(
                          "flex items-center justify-center gap-2 rounded-2xl border p-4 text-center text-base font-semibold transition-all",
                          active
                            ? "border-lime-2 bg-lime/10"
                            : "border-border bg-bg-elevated hover:border-lime-2",
                        )}
                      >
                        {o.label}
                        {active && <Check className="h-4 w-4 text-lime-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Kleine Eingabe-Schritte */}
            {step.kind === "fields" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.title}
                </h2>
                <div className="mt-8 grid gap-5">
                  {step.fields.map((f) => (
                    <div key={f.key} className="flex flex-col gap-1.5">
                      <label htmlFor={f.key} className="text-sm font-medium">
                        {f.label}
                        {f.required && <span className="ml-0.5 text-lime-2">*</span>}
                        {!f.required && (
                          <span className="ml-2 text-xs font-normal text-fg-subtle">
                            {t.optional}
                          </span>
                        )}
                      </label>
                      <input
                        id={f.key}
                        type={f.type ?? "text"}
                        value={data[f.key] ?? ""}
                        onChange={(e) =>
                          setData((d) => ({ ...d, [f.key]: e.target.value }))
                        }
                        className={control}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dokument-Schritte (klein, Pflicht wo nötig) */}
            {step.kind === "docs" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm text-fg-subtle">{t.docHint}</p>
                <div className="mt-8 grid gap-5">
                  {step.slots.map((s) => (
                    <FileSlot
                      key={s.key}
                      label={s.label}
                      cta={t.uploadCta}
                      required={s.required}
                      optionalLabel={t.optional}
                      onChange={(f) => setFiles((prev) => ({ ...prev, [s.key]: f }))}
                    />
                  ))}
                </div>
              </div>
            )}

            {step.kind === "certs" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm text-fg-subtle">{t.docHint}</p>
                <div className="mt-8">
                  <MultiFileSlot
                    label={t.doc_certificates}
                    hint={t.doc_certificatesHint}
                    cta={t.uploadCta}
                    optionalLabel={t.optional}
                    onChange={setCerts}
                  />
                </div>
              </div>
            )}

            {/* Einwilligung + Zusammenfassung */}
            {step.kind === "consent" && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t.sec_consent}
                </h2>
                <dl className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-elevated">
                  {(
                    [
                      [t.firstName, data.firstName],
                      [t.lastName, data.lastName],
                      [t.email, data.email],
                      [t.phone, data.phone],
                      [t.q_field, ACTIVE_FIELD.label[lang ?? "sq"]],
                    ] as [string, string | undefined][]
                  )
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k} className="flex items-center gap-4 px-5 py-3 text-sm">
                        <dt className="w-32 shrink-0 text-fg-subtle">{k}</dt>
                        <dd className="font-medium">{v}</dd>
                      </div>
                    ))}
                </dl>
                <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-bg-elevated p-5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-5 w-5 accent-lime-2"
                  />
                  <span>
                    <span className="block font-medium">{t.consentLabel}</span>
                    <span className="mt-1 block text-sm text-fg-muted">{t.consentText}</span>
                  </span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step.kind !== "lang" && (
          <div className="mt-10 flex items-center justify-between gap-4">
            <button onClick={goBack} className="btn btn-outline">
              <ArrowLeft className="h-4 w-4" /> {t.back}
            </button>

            {step.kind === "consent" ? (
              <button onClick={submit} disabled={!consent || status === "sending"} className="btn btn-lime">
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {t.submitting}
                  </>
                ) : (
                  <>
                    {t.submit} <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            ) : step.kind === "fields" ? (
              <button onClick={advance} disabled={!fieldsValid(step.fields)} className="btn btn-lime">
                {t.next} <ArrowRight className="h-4 w-4" />
              </button>
            ) : step.kind === "docs" ? (
              <button onClick={advance} disabled={!docsValid(step.slots)} className="btn btn-lime">
                {t.next} <ArrowRight className="h-4 w-4" />
              </button>
            ) : step.kind === "certs" ? (
              <button onClick={advance} className="btn btn-lime">
                {t.next} <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <span />
            )}
          </div>
        )}
        {status === "error" && (
          <p className="mt-4 text-right text-sm text-red-500">
            {t.submitting} — {t.back}?
          </p>
        )}
      </main>
    </div>
  );
}
