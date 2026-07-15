"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button, Field, Input, Select, Textarea } from "@/components/form";

const branchen = [
  "Logistik & Transport",
  "Pflege & Gesundheit",
  "Bau & Handwerk",
  "Gastronomie & Hotel",
  "Produktion & Industrie",
  "Sonstiges",
];

export function CompanyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        <CheckCircle2 className="h-12 w-12 text-company" strokeWidth={1.6} />
        <h3 className="mt-4 text-2xl font-semibold">Anfrage erhalten</h3>
        <p className="mt-2 max-w-sm text-fg-muted">
          Vielen Dank. Unser Team meldet sich innerhalb von 24 Stunden mit
          passenden Kandidatenprofilen bei Ihnen.
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
        <Field label="Firmenname" htmlFor="company" required>
          <Input id="company" name="company" required placeholder="Muster GmbH" />
        </Field>
        <Field label="Ansprechpartner" htmlFor="contact" required>
          <Input id="contact" name="contact" required placeholder="Max Mustermann" />
        </Field>
        <Field label="E-Mail" htmlFor="email" required>
          <Input id="email" name="email" type="email" required placeholder="kontakt@firma.de" />
        </Field>
        <Field label="Telefon" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" placeholder="+49 …" />
        </Field>
        <Field label="Branche" htmlFor="industry" required>
          <Select id="industry" name="industry" required defaultValue="">
            <option value="" disabled>
              Bitte wählen …
            </option>
            {branchen.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Anzahl benötigter Fachkräfte" htmlFor="headcount">
          <Input id="headcount" name="headcount" type="number" min={1} placeholder="z. B. 5" />
        </Field>
        <Field label="Ihre Personalanfrage" htmlFor="message" className="sm:col-span-2" required>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Welche Positionen möchten Sie besetzen? Qualifikationen, Zeitraum, Standort …"
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-500">
          Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-fg-subtle">
          Mit dem Absenden stimmen Sie der Verarbeitung gemäß DSGVO zu.
        </p>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
          Anfrage senden
        </Button>
      </div>
    </form>
  );
}
