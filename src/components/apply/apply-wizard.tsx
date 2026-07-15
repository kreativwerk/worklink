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

type Field = {
  key: string;
  label: string;
  type?: "text" | "date" | "email" | "tel" | "select";
  options?: string[];
  required?: boolean;
};
type Step =
  | { kind: "lang" }
  | {
      kind: "single";
      key: string;
      question: string;
      options: { value: string; label: string }[];
      grid?: boolean;
    }
  | { kind: "fields"; section: string; fields: Field[] }
  | { kind: "documents"; section: string }
  | { kind: "consent"; section: string };

function buildSteps(t: (typeof DICT)[Lang]): Step[] {
  const yn = [
    { value: "Ja", label: t.yes },
    { value: "Nein", label: t.no },
  ];
  return [
    { kind: "lang" },
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
    {
      kind: "single",
      key: "field",
      question: t.q_field,
      grid: true,
      options: INDUSTRIES.map((i) => ({ value: i.de, label: i.de })),
    },
    { kind: "single", key: "amazon", question: t.q_amazon, options: yn },
    {
      kind: "fields",
      section: t.sec_identity,
      fields: [
        { key: "firstName", label: t.firstName, required: true },
        { key: "lastName", label: t.lastName, required: true },
        { key: "dob", label: t.dob, type: "date", required: true },
        { key: "placeOfBirth", label: t.placeOfBirth },
        { key: "nationality", label: t.nationality, required: true },
        { key: "countryOfBirth", label: t.countryOfBirth },
      ],
    },
    {
      kind: "fields",
      section: t.sec_address,
      fields: [
        { key: "street", label: t.street, required: true },
        { key: "postal", label: t.postal },
        { key: "city", label: t.city, required: true },
        { key: "livingSince", label: t.livingSince, type: "date" },
      ],
    },
    {
      kind: "fields",
      section: t.sec_contact,
      fields: [
        { key: "email", label: t.email, type: "email", required: true },
        { key: "phone", label: t.phone, type: "tel", required: true },
        { key: "tshirt", label: t.tshirt, type: "select", options: TSHIRT_SIZES },
        { key: "shoe", label: t.shoe, type: "select", options: SHOE_SIZES },
      ],
    },
    { kind: "documents", section: t.sec_documents },
    { kind: "consent", section: t.sec_consent },
  ];
}

const REQUIRED_DOCS = ["idFront", "idBack", "selfie"];

export function ApplyWizard() {
  const [lang, setLang] = useState<Lang | null>(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [certs, setCerts] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const t = DICT[lang ?? "sq"];
  const steps = useMemo(() => buildSteps(t), [t]);
  const total = steps.length;
  const step = steps[index];

  function go(next: number, direction: number) {
    setDir(direction);
    setIndex(next);
  }
  const advance = () => go(Math.min(index + 1, total - 1), 1);
  const goBack = () => go(Math.max(index - 1, 0), -1);

  function pickSingle(key: string, value: string) {
    setData((d) => ({ ...d, [key]: value }));
    // auto-advance on single choice
    window.setTimeout(advance, 220);
  }

  function fieldsValid(fields: Field[]) {
    return fields.every((f) => !f.required || (data[f.key] ?? "").trim());
  }

  async function submit() {
    setStatus("sending");
    try {
      const fd = new FormData();
      fd.set("lang", lang ?? "");
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
      <Centered>
        <div className="flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-on-lime">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            {t.done_title}
          </h2>
          <p className="mt-3 max-w-sm text-fg-muted">{t.done_body}</p>
          <Link href="/" className="btn btn-outline mt-8">
            WorkLink
          </Link>
        </div>
      </Centered>
    );
  }

  const progress = (index / (total - 1)) * 100;

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
            {step.kind === "lang" && (
              <LangStep
                onPick={(l) => {
                  setLang(l);
                  go(1, 1);
                }}
              />
            )}

            {step.kind === "single" && (
              <SingleStep
                step={step}
                value={data[step.key]}
                hint={t.autoHint}
                onPick={(v) => pickSingle(step.key, v)}
              />
            )}

            {step.kind === "fields" && (
              <FieldsStep
                section={step.section}
                fields={step.fields}
                data={data}
                onChange={(k, v) => setData((d) => ({ ...d, [k]: v }))}
              />
            )}

            {step.kind === "documents" && (
              <DocumentsStep
                t={t}
                onFile={(k, f) => setFiles((s) => ({ ...s, [k]: f }))}
                onCerts={setCerts}
              />
            )}

            {step.kind === "consent" && (
              <ConsentStep
                t={t}
                data={data}
                consent={consent}
                onConsent={setConsent}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* nav (hidden on language step) */}
        {step.kind !== "lang" && (
          <div className="mt-10 flex items-center justify-between gap-4">
            <button onClick={goBack} className="btn btn-outline">
              <ArrowLeft className="h-4 w-4" /> {t.back}
            </button>

            {step.kind === "consent" ? (
              <button
                onClick={submit}
                disabled={!consent || status === "sending"}
                className="btn btn-lime"
              >
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
              <button
                onClick={advance}
                disabled={!fieldsValid(step.fields)}
                className="btn btn-lime"
              >
                {t.next} <ArrowRight className="h-4 w-4" />
              </button>
            ) : step.kind === "documents" ? (
              <button
                onClick={advance}
                disabled={!REQUIRED_DOCS.every((k) => files[k])}
                className="btn btn-lime"
              >
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

/* ---- step renderers -------------------------------------------------- */

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh place-items-center px-6">{children}</div>
  );
}

function LangStep({ onPick }: { onPick: (l: Lang) => void }) {
  return (
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
            onClick={() => onPick(l.code)}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-bg-elevated p-5 text-left transition-colors hover:border-lime-2"
          >
            <span className="text-3xl">{l.flag}</span>
            <span className="flex-1 text-lg font-semibold">{l.label}</span>
            <ArrowRight className="h-5 w-5 text-fg-subtle transition-colors group-hover:text-lime-2" />
          </button>
        ))}
      </div>
    </div>
  );
}

function SingleStep({
  step,
  value,
  hint,
  onPick,
}: {
  step: Extract<Step, { kind: "single" }>;
  value?: string;
  hint: string;
  onPick: (v: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {step.question}
      </h2>
      <p className="mt-2 text-sm text-fg-subtle">{hint}</p>
      <div
        className={cn(
          "mt-8 grid gap-3",
          step.grid ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
        )}
      >
        {step.options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              onClick={() => onPick(o.value)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl border p-4 text-left text-[15px] font-medium transition-all",
                active
                  ? "border-lime-2 bg-lime/10"
                  : "border-border bg-bg-elevated hover:border-lime-2",
              )}
            >
              {o.label}
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
  );
}

function FieldsStep({
  section,
  fields,
  data,
  onChange,
}: {
  section: string;
  fields: Field[];
  data: Record<string, string>;
  onChange: (k: string, v: string) => void;
}) {
  const control =
    "w-full rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-[15px] outline-none transition-shadow placeholder:text-fg-subtle focus:border-lime-2 focus:ring-4 focus:ring-lime/25";
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {section}
      </h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <label htmlFor={f.key} className="text-sm font-medium">
              {f.label}
              {f.required && <span className="ml-0.5 text-lime-2">*</span>}
            </label>
            {f.type === "select" ? (
              <select
                id={f.key}
                value={data[f.key] ?? ""}
                onChange={(e) => onChange(f.key, e.target.value)}
                className={cn(control, "appearance-none")}
              >
                <option value="">—</option>
                {f.options!.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.key}
                type={f.type ?? "text"}
                value={data[f.key] ?? ""}
                onChange={(e) => onChange(f.key, e.target.value)}
                className={control}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsStep({
  t,
  onFile,
  onCerts,
}: {
  t: (typeof DICT)[Lang];
  onFile: (k: string, f: File | null) => void;
  onCerts: (f: File[]) => void;
}) {
  const docs: { key: string; label: string; required?: boolean }[] = [
    { key: "idFront", label: t.doc_idFront, required: true },
    { key: "idBack", label: t.doc_idBack, required: true },
    { key: "selfie", label: t.doc_selfie, required: true },
    { key: "licenseFront", label: t.doc_licenseFront },
    { key: "licenseBack", label: t.doc_licenseBack },
  ];
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t.sec_documents}
      </h2>
      <p className="mt-2 text-sm text-fg-subtle">{t.docHint}</p>
      <div className="mt-8 grid gap-5">
        {docs.map((d) => (
          <FileSlot
            key={d.key}
            label={d.label}
            cta={t.uploadCta}
            required={d.required}
            optionalLabel={t.optional}
            onChange={(f) => onFile(d.key, f)}
          />
        ))}
        <MultiFileSlot
          label={t.doc_certificates}
          hint={t.doc_certificatesHint}
          cta={t.uploadCta}
          optionalLabel={t.optional}
          onChange={onCerts}
        />
      </div>
    </div>
  );
}

function ConsentStep({
  t,
  data,
  consent,
  onConsent,
}: {
  t: (typeof DICT)[Lang];
  data: Record<string, string>;
  consent: boolean;
  onConsent: (v: boolean) => void;
}) {
  const summary = [
    [t.firstName, data.firstName],
    [t.lastName, data.lastName],
    [t.email, data.email],
    [t.phone, data.phone],
    [t.q_field, data.field],
  ].filter(([, v]) => v);

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t.sec_consent}
      </h2>

      {summary.length > 0 && (
        <dl className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-elevated">
          {summary.map(([k, v]) => (
            <div key={k} className="flex items-center gap-4 px-5 py-3 text-sm">
              <dt className="w-40 shrink-0 text-fg-subtle">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-bg-elevated p-5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsent(e.target.checked)}
          className="mt-0.5 h-5 w-5 accent-lime-2"
        />
        <span>
          <span className="block font-medium">{t.consentLabel}</span>
          <span className="mt-1 block text-sm text-fg-muted">{t.consentText}</span>
        </span>
      </label>
    </div>
  );
}
