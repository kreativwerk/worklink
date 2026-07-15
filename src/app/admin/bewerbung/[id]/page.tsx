import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import type { ApplicationStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { STATUS_ORDER, STATUS_LABEL, DOC_LABEL } from "@/lib/status";
import { whatsappLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function updateStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as ApplicationStatus;
  if (!STATUS_ORDER.includes(status)) return;
  await db.application.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/bewerbung/${id}`);
}

export default async function ApplicationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const a = await db.application.findUnique({
    where: { id },
    include: { documents: true },
  });
  if (!a) notFound();

  type Row = [string, string | null];
  const identity: Row[] = [
    ["Vorname", a.firstName],
    ["Nachname", a.lastName],
    ["Geburtsdatum", a.dob],
    ["Geburtsort", a.placeOfBirth],
    ["Staatsangehörigkeit", a.nationality],
    ["Geburtsland", a.countryOfBirth],
  ];
  const address: Row[] = [
    ["Straße", a.street],
    ["PLZ", a.postalCode],
    ["Ort", a.city],
    ["Wohnhaft seit", a.livingSince],
  ];
  const contact: Row[] = [
    ["E-Mail", a.email],
    ["Telefon (WhatsApp)", a.phone],
    ["T-Shirt-Größe", a.tshirtSize],
    ["Schuhgröße", a.shoeSize],
  ];
  const preselect: Row[] = [
    ["Beschäftigung", a.employment],
    ["Lkw-Führerschein", a.truckLicense],
    ["Code 95", a.code95],
    ["Berufsfeld", a.field],
    ["Sprache", a.lang],
  ];

  return (
    <div className="mx-auto w-[min(60rem,calc(100%-2rem))] py-10">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {a.firstName} {a.lastName}
          </h1>
          {whatsappLink(a.phone) && (
            <a
              href={whatsappLink(a.phone, `Përshëndetje ${a.firstName}! WorkLink këtu.`)!}
              target="_blank"
              rel="noreferrer"
              className="btn btn-lime px-4 py-2 text-sm"
            >
              <MessageCircle className="h-4 w-4" /> Per WhatsApp antworten
            </a>
          )}
        </div>

        {/* status changer */}
        <form action={updateStatus} className="flex items-center gap-2">
          <input type="hidden" name="id" value={a.id} />
          <select
            name="status"
            defaultValue={a.status}
            className="rounded-full border border-border bg-bg-elevated px-4 py-2 text-sm"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
          <button className="btn btn-lime px-4 py-2 text-sm">Speichern</button>
        </form>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Section title="Vorauswahl" rows={preselect} />
        <Section title="Identität" rows={identity} />
        <Section title="Adresse" rows={address} />
        <Section title="Kontakt & Größen" rows={contact} />
      </div>

      {/* documents */}
      <h2 className="mb-3 mt-8 text-sm font-medium uppercase tracking-wider text-fg-subtle">
        Dokumente
      </h2>
      <div className="grid gap-2">
        {a.documents.map((d) => (
          <a
            key={d.id}
            href={`/api/admin/document/${d.id}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-elevated p-4 hover:border-lime-2"
          >
            <span>
              <span className="block font-medium">
                {DOC_LABEL[d.slot] ?? d.slot}
              </span>
              <span className="block text-xs text-fg-subtle">
                {d.filename} · {(d.size / 1024).toFixed(0)} KB
              </span>
            </span>
            <ExternalLink className="h-4 w-4 text-fg-subtle" />
          </a>
        ))}
        {a.documents.length === 0 && (
          <p className="text-sm text-fg-subtle">Keine Dokumente.</p>
        )}
      </div>

      <p className="mt-8 text-xs text-fg-subtle">
        DSGVO-Einwilligung: {a.dsgvoConsent ? "Ja" : "Nein"}
        {a.dsgvoConsentAt
          ? ` · ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(a.dsgvoConsentAt)}`
          : ""}
      </p>
    </div>
  );
}

function Section({
  title,
  rows,
}: {
  title: string;
  rows: [string, string | null][];
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-5">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-fg-subtle">
        {title}
      </h2>
      <dl className="divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-4 py-2 text-sm">
            <dt className="w-40 shrink-0 text-fg-subtle">{k}</dt>
            <dd className="font-medium">{v || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
