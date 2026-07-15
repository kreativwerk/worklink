import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MessageCircle, Mail } from "lucide-react";
import { db } from "@/lib/db";
import { whatsappLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function InquiryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const q = await db.companyInquiry.findUnique({
    where: { id },
    include: { photos: true },
  });
  if (!q) notFound();

  type Row = [string, string | null];
  const firma: Row[] = [
    ["Firmenname", q.company],
    ["Ansprechpartner", q.contact],
    ["E-Mail", q.email],
    ["Telefon", q.phone],
    ["Einsatzort", q.city],
  ];
  const bedarf: Row[] = [
    ["Branche", q.industry],
    ["Anzahl Mitarbeiter", q.headcount],
    ["Start", q.startDate],
  ];
  const anforderungen: Row[] = [
    ["Führerschein", q.driverLicense],
    ["Deutsch", q.germanLevel],
    ["Englisch", q.englishLevel],
  ];
  const bezahlung: Row[] = [
    ["Lohnart", q.payType],
    ["Betrag", q.payAmount],
    ["Zusätzliche Zahlungen", q.payExtras],
    ["Urlaubstage", q.vacationDays],
  ];
  const unterkunft: Row[] = [
    ["Unterkunft vorhanden", q.accommodation],
    ["Zimmertyp", q.roomType],
    ["Warmmiete", q.rentWarm],
    ["Weg zur Arbeit", q.commuteMinutes],
  ];

  return (
    <div className="mx-auto w-[min(60rem,calc(100%-2rem))] py-10">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{q.company}</h1>
        {q.phone && whatsappLink(q.phone) && (
          <a
            href={whatsappLink(q.phone, `Guten Tag ${q.contact}, hier ist WorkLink — danke für Ihre Personalanfrage!`)!}
            target="_blank"
            rel="noreferrer"
            className="btn btn-lime px-4 py-2 text-sm"
          >
            <MessageCircle className="h-4 w-4" /> Per WhatsApp antworten
          </a>
        )}
        <a href={`mailto:${q.email}`} className="btn btn-outline px-4 py-2 text-sm">
          <Mail className="h-4 w-4" /> E-Mail
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Section title="Unternehmen" rows={firma} />
        <Section title="Bedarf" rows={bedarf} />
        <Section title="Bezahlung & Konditionen" rows={bezahlung} />
        <Section title="Anforderungen" rows={anforderungen} />
        <Section title="Unterkunft" rows={unterkunft} />
      </div>

      {q.message && (
        <div className="mt-5 rounded-2xl border border-border bg-bg-elevated p-5">
          <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-fg-subtle">
            Nachricht
          </h2>
          <p className="whitespace-pre-wrap text-[15px]">{q.message}</p>
        </div>
      )}

      {q.photos.length > 0 && (
        <>
          <h2 className="mb-3 mt-8 text-sm font-medium uppercase tracking-wider text-fg-subtle">
            Fotos der Unterkunft
          </h2>
          <div className="grid gap-2">
            {q.photos.map((p) => (
              <a
                key={p.id}
                href={`/api/admin/photo/${p.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-elevated p-4 hover:border-lime-2"
              >
                <span>
                  <span className="block font-medium">Unterkunft · Foto</span>
                  <span className="block text-xs text-fg-subtle">
                    {p.filename} · {(p.size / 1024).toFixed(0)} KB
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 text-fg-subtle" />
              </a>
            ))}
          </div>
        </>
      )}

      <p className="mt-8 text-xs text-fg-subtle">
        Eingegangen:{" "}
        {new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(q.createdAt)}
      </p>
    </div>
  );
}

function Section({ title, rows }: { title: string; rows: [string, string | null][] }) {
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
