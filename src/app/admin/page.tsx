import Link from "next/link";
import { Users, Building2, FileText, MessageCircle } from "lucide-react";
import { db } from "@/lib/db";
import { STATUS_LABEL } from "@/lib/status";
import { Logo } from "@/components/logo";
import { whatsappLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin — WorkLink" };

function fmt(d: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default async function AdminPage() {
  const [applications, inquiries, counts] = await Promise.all([
    db.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { _count: { select: { documents: true } } },
    }),
    db.companyInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    db.application.count(),
  ]);

  return (
    <div className="mx-auto w-[min(76rem,calc(100%-2rem))] py-10">
      <header className="mb-8 flex items-center justify-between">
        <Logo className="text-lg" />
        <span className="pill">
          <span className="pill-dot" /> Admin
        </span>
      </header>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat icon={Users} label="Bewerbungen" value={counts} />
        <Stat icon={Building2} label="Personalanfragen" value={inquiries.length} />
        <Stat
          icon={FileText}
          label="Neu (unbearbeitet)"
          value={applications.filter((a) => a.status === "NEU").length}
        />
      </div>

      {/* Applications */}
      <section className="mb-12">
        <h2 className="mb-3 text-lg font-semibold">Bewerbungen</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-left text-fg-subtle">
                <tr>
                  <Th>Name</Th>
                  <Th>Berufsfeld</Th>
                  <Th>Kontakt</Th>
                  <Th>Dok.</Th>
                  <Th>Status</Th>
                  <Th>Eingegangen</Th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} className="border-b border-border last:border-0 hover:bg-bg">
                    <Td>
                      <Link
                        href={`/admin/bewerbung/${a.id}`}
                        className="font-medium text-fg hover:text-lime-2"
                      >
                        {a.firstName} {a.lastName}
                      </Link>
                    </Td>
                    <Td>{a.field ?? "—"}</Td>
                    <Td className="text-fg-muted">
                      <span className="flex items-center gap-2">
                        {a.email}
                        {whatsappLink(a.phone) && (
                          <a
                            href={whatsappLink(a.phone)!}
                            target="_blank"
                            rel="noreferrer"
                            title="Per WhatsApp schreiben"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-lime text-on-lime"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </span>
                    </Td>
                    <Td>{a._count.documents}</Td>
                    <Td>
                      <span className="inline-flex rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs font-medium">
                        {STATUS_LABEL[a.status]}
                      </span>
                    </Td>
                    <Td className="whitespace-nowrap text-fg-muted">{fmt(a.createdAt)}</Td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-fg-subtle">
                      Noch keine Bewerbungen.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inquiries */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Personalanfragen (Unternehmen)</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-left text-fg-subtle">
                <tr>
                  <Th>Firma</Th>
                  <Th>Ansprechpartner</Th>
                  <Th>Stelle</Th>
                  <Th>Bedarf</Th>
                  <Th>Unterkunft</Th>
                  <Th>Eingegangen</Th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((q) => (
                  <tr key={q.id} className="border-b border-border last:border-0 hover:bg-bg">
                    <Td>
                      <Link
                        href={`/admin/anfrage/${q.id}`}
                        className="font-medium text-fg hover:text-lime-2"
                      >
                        {q.company}
                      </Link>
                    </Td>
                    <Td className="text-fg-muted">
                      {q.contact}
                      <br />
                      <span className="text-xs">{q.email}</span>
                    </Td>
                    <Td className="max-w-56">
                      <span className="line-clamp-2">{q.jobDescription ?? q.industry ?? "—"}</span>
                    </Td>
                    <Td>{q.headcount ?? "—"}</Td>
                    <Td>{q.accommodation ?? "—"}</Td>
                    <Td className="whitespace-nowrap text-fg-muted">{fmt(q.createdAt)}</Td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-fg-subtle">
                      Noch keine Anfragen.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-5">
      <Icon className="h-5 w-5 text-lime-2" />
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="text-sm text-fg-muted">{label}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
