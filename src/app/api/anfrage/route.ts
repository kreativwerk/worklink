import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { saveUpload } from "@/lib/storage";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

/**
 * POST /api/anfrage — Personalanfrage eines Unternehmens (multipart).
 * Speichert Bedarf, Anforderungen und Unterkunfts-Angaben in PostgreSQL;
 * Unterkunfts-Fotos landen im Upload-Verzeichnis auf dem VPS.
 */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Ungültige Daten" }, { status: 400 });
  }

  const get = (k: string) => String(form.get(k) ?? "").trim();

  const required = ["company", "contact", "email", "industry", "city"];
  const missing = required.filter((k) => !get(k));
  if (missing.length) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen", fields: missing },
      { status: 422 },
    );
  }

  // Unterkunfts-Fotos validieren
  const photoFiles: File[] = [];
  for (const f of form.getAll("photos")) {
    if (f instanceof File && f.size > 0) {
      if (!ALLOWED.includes(f.type)) {
        return NextResponse.json(
          { error: "Dateityp nicht erlaubt (JPG, PNG, WebP, PDF)" },
          { status: 415 },
        );
      }
      if (f.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "Datei zu groß (max. 10 MB)" }, { status: 413 });
      }
      photoFiles.push(f);
    }
  }

  try {
    const subdir = `anfragen/${new Date().toISOString().slice(0, 7)}`;
    const photos = await Promise.all(
      photoFiles.map(async (file) => await saveUpload(file, subdir)),
    );

    const created = await db.companyInquiry.create({
      data: {
        company: get("company"),
        contact: get("contact"),
        email: get("email"),
        phone: get("phone") || null,
        city: get("city") || null,
        industry: get("industry"),
        headcount: get("headcount") || null,
        startDate: get("startDate") || null,
        driverLicense: get("driverLicense") || null,
        germanLevel: get("germanLevel") || null,
        englishLevel: get("englishLevel") || null,
        payType: get("payType") || null,
        payAmount: get("payAmount") || null,
        payExtras: get("payExtras") || null,
        vacationDays: get("vacationDays") || null,
        accommodation: get("accommodation") || null,
        roomType: get("roomType") || null,
        rentWarm: get("rentWarm") || null,
        commuteMinutes: get("commuteMinutes") || null,
        message: get("message") || null,
        photos: { create: photos },
      },
      select: { id: true },
    });

    console.info("[anfrage] neue Personalanfrage", created.id, `(${photos.length} Fotos)`);
    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    console.error("[anfrage] Fehler", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
