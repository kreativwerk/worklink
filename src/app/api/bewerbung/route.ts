import { NextResponse } from "next/server";

const MAX_CV_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

/**
 * POST /api/bewerbung — Bewerbung eines Kandidaten (multipart, inkl. CV-Datei).
 *
 * TODO(persistenz + storage): CV in Objektspeicher ablegen (Supabase Storage /
 * Cloudflare R2 / S3), Metadaten in DB schreiben. Aktuell: validieren + loggen.
 */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Ungültige Daten" }, { status: 400 });
  }

  const get = (k: string) => String(form.get(k) ?? "").trim();
  const required = ["firstName", "lastName", "email", "phone", "field"];
  const missing = required.filter((k) => !get(k));
  if (missing.length) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen", fields: missing },
      { status: 422 },
    );
  }

  const cv = form.get("cv");
  let cvMeta: { name: string; type: string; size: number } | null = null;
  if (cv instanceof File && cv.size > 0) {
    if (!ALLOWED.includes(cv.type)) {
      return NextResponse.json(
        { error: "Dateityp nicht erlaubt (PDF, JPG, PNG)" },
        { status: 415 },
      );
    }
    if (cv.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { error: "Datei zu groß (max. 10 MB)" },
        { status: 413 },
      );
    }
    cvMeta = { name: cv.name, type: cv.type, size: cv.size };
    // const bytes = Buffer.from(await cv.arrayBuffer())
    // const { url } = await storage.upload(`cv/${crypto.randomUUID()}`, bytes)
  }

  const application = {
    type: "candidate_application" as const,
    firstName: get("firstName"),
    lastName: get("lastName"),
    email: get("email"),
    phone: get("phone"),
    field: get("field"),
    german: get("german") || null,
    about: get("about") || null,
    cv: cvMeta,
    receivedAt: new Date().toISOString(),
  };

  // await db.application.create({ data: application })
  console.info("[bewerbung] neue Bewerbung", application);

  return NextResponse.json({ ok: true });
}
