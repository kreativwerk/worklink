"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { Button, Field, Input, Select, Textarea } from "@/components/form";

const felder = [
  "Logistik & Transport",
  "Pflege & Gesundheit",
  "Bau & Handwerk",
  "Gastronomie & Hotel",
  "Produktion & Industrie",
  "Sonstiges",
];

export function ApplicantForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [fileName, setFileName] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/bewerbung", {
        method: "POST",
        body: new FormData(e.currentTarget), // multipart — includes the CV file
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="glass flex flex-col items-center rounded-[var(--radius-glass)] p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-applicant" strokeWidth={1.6} />
        <h3 className="mt-4 text-2xl font-semibold">Bewerbung gesendet</h3>
        <p className="mt-2 max-w-sm text-fg-muted">
          Faleminderit! Wir prüfen Ihre Unterlagen und melden uns mit passenden
          Stellen bei deutschen Unternehmen.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass rounded-[var(--radius-glass)] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vorname" htmlFor="firstName" required>
          <Input id="firstName" name="firstName" required placeholder="Emri" />
        </Field>
        <Field label="Nachname" htmlFor="lastName" required>
          <Input id="lastName" name="lastName" required placeholder="Mbiemri" />
        </Field>
        <Field label="E-Mail" htmlFor="email" required>
          <Input id="email" name="email" type="email" required placeholder="ju@email.com" />
        </Field>
        <Field label="Telefon / WhatsApp" htmlFor="phone" required>
          <Input id="phone" name="phone" type="tel" required placeholder="+383 …" />
        </Field>
        <Field label="Berufsfeld" htmlFor="field" required>
          <Select id="field" name="field" required defaultValue="">
            <option value="" disabled>
              Zgjidhni / Bitte wählen …
            </option>
            {felder.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Deutschkenntnisse" htmlFor="german" hint="Nach GER-Niveau">
          <Select id="german" name="german" defaultValue="">
            <option value="" disabled>
              Niveau …
            </option>
            {["Keine", "A1", "A2", "B1", "B2", "C1+"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="Über mich / Berufserfahrung"
          htmlFor="about"
          className="sm:col-span-2"
        >
          <Textarea
            id="about"
            name="about"
            placeholder="Përvoja juaj e punës — Ihre bisherige Erfahrung, Ausbildung, Wünsche …"
          />
        </Field>

        {/* CV upload */}
        <Field label="Lebenslauf (CV)" htmlFor="cv" className="sm:col-span-2" hint="PDF, JPG oder PNG — max. 10 MB">
          <label
            htmlFor="cv"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-bg-elevated/40 px-4 py-4 text-sm transition-colors hover:border-applicant"
          >
            <Upload className="h-5 w-5 text-applicant" />
            <span className={fileName ? "text-fg" : "text-fg-subtle"}>
              {fileName ?? "Datei auswählen oder hierher ziehen"}
            </span>
            <input
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="sr-only"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-500">
          Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-fg-subtle">
          Ihre Daten werden gemäß DSGVO vertraulich behandelt.
        </p>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
          Bewerbung senden
        </Button>
      </div>
    </form>
  );
}
