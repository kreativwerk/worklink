import { NextResponse } from "next/server";

/**
 * POST /api/anfrage — Personalanfrage eines Unternehmens.
 *
 * TODO(persistenz): Hier später die gewählte Backend-Lösung andocken
 * (z. B. Prisma → PostgreSQL, oder Supabase). Aktuell wird die Anfrage
 * validiert und geloggt; Anbindung ist ein einziger Aufruf an dieser Stelle.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Ungültige Daten" }, { status: 400 });
  }

  const required = ["company", "contact", "email", "industry", "message"];
  const missing = required.filter((k) => !String(body[k] ?? "").trim());
  if (missing.length) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen", fields: missing },
      { status: 422 },
    );
  }

  const inquiry = {
    type: "company_inquiry" as const,
    company: String(body.company),
    contact: String(body.contact),
    email: String(body.email),
    phone: String(body.phone ?? ""),
    industry: String(body.industry),
    headcount: Number(body.headcount) || null,
    message: String(body.message),
    receivedAt: new Date().toISOString(),
  };

  // await db.companyInquiry.create({ data: inquiry })
  // await sendMail({ to: "recruiting@…", subject: "Neue Personalanfrage", inquiry })
  console.info("[anfrage] neue Personalanfrage", inquiry);

  return NextResponse.json({ ok: true });
}
