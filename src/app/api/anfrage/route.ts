import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** POST /api/anfrage — Personalanfrage eines Unternehmens (→ PostgreSQL). */
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

  try {
    await db.companyInquiry.create({
      data: {
        company: String(body.company),
        contact: String(body.contact),
        email: String(body.email),
        phone: body.phone ? String(body.phone) : null,
        industry: String(body.industry),
        headcount: Number(body.headcount) || null,
        message: String(body.message),
      },
    });
  } catch (err) {
    console.error("[anfrage] DB error", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
