import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { saveUpload } from "@/lib/storage";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

const DOC_SLOTS = ["idFront", "idBack", "selfie", "licenseFront", "licenseBack"];
// Führerschein ist Pflicht — wir rekrutieren aktuell Fahrer (Paketfahrer).
const REQUIRED_DOCS = ["idFront", "idBack", "selfie", "licenseFront", "licenseBack"];
const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "dob",
  "nationality",
  "email",
  "phone",
  "field",
];

function checkFile(f: File) {
  if (!ALLOWED.includes(f.type)) return "Dateityp nicht erlaubt (PDF, JPG, PNG)";
  if (f.size > MAX_FILE_BYTES) return "Datei zu groß (max. 10 MB)";
  return null;
}

/**
 * POST /api/bewerbung — mehrstufige Bewerbung (multipart).
 * Speichert Antworten in PostgreSQL und Dateien (Ausweis/Selfie/Führerschein +
 * mehrere Zeugnisse) im Upload-Verzeichnis auf dem VPS.
 */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Ungültige Daten" }, { status: 400 });
  }

  const get = (k: string) => String(form.get(k) ?? "").trim();

  const missing = REQUIRED_FIELDS.filter((k) => !get(k));
  if (missing.length) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen", fields: missing },
      { status: 422 },
    );
  }

  if (get("dsgvoConsent") !== "Ja") {
    return NextResponse.json(
      { error: "DSGVO-Einwilligung erforderlich" },
      { status: 422 },
    );
  }

  // --- collect + validate files (single-slot docs + certificates) ---
  const incoming: { slot: string; file: File }[] = [];
  for (const slot of DOC_SLOTS) {
    const f = form.get(slot);
    if (f instanceof File && f.size > 0) incoming.push({ slot, file: f });
  }
  for (const f of form.getAll("certificates")) {
    if (f instanceof File && f.size > 0) incoming.push({ slot: "certificate", file: f });
  }
  for (const { slot, file } of incoming) {
    const err = checkFile(file);
    if (err) return NextResponse.json({ error: `${slot}: ${err}` }, { status: 415 });
  }

  const presentSlots = new Set(incoming.map((i) => i.slot));
  const missingDocs = REQUIRED_DOCS.filter((d) => !presentSlots.has(d));
  if (missingDocs.length) {
    return NextResponse.json(
      { error: "Pflichtdokumente fehlen", documents: missingDocs },
      { status: 422 },
    );
  }

  const consentAt = get("dsgvoConsentAt");

  try {
    // persist files to disk, then the application + document metadata
    const subdir = new Date().toISOString().slice(0, 7); // yyyy-MM buckets
    const documents = await Promise.all(
      incoming.map(async ({ slot, file }) => {
        const meta = await saveUpload(file, subdir);
        return { slot, ...meta };
      }),
    );

    const created = await db.application.create({
      data: {
        lang: get("lang") || null,
        employment: get("employment") || null,
        truckLicense: get("truckLicense") || null,
        code95: get("code95") || null,
        field: get("field") || null,
        firstName: get("firstName"),
        lastName: get("lastName"),
        dob: get("dob") || null,
        placeOfBirth: get("placeOfBirth") || null,
        nationality: get("nationality") || null,
        countryOfBirth: get("countryOfBirth") || null,
        street: get("street") || null,
        postalCode: get("postal") || null,
        city: get("city") || null,
        livingSince: get("livingSince") || null,
        email: get("email"),
        phone: get("phone"),
        tshirtSize: get("tshirt") || null,
        shoeSize: get("shoe") || null,
        dsgvoConsent: true,
        dsgvoConsentAt: consentAt ? new Date(consentAt) : null,
        documents: { create: documents },
      },
      select: { id: true },
    });

    console.info("[bewerbung] neue Bewerbung", created.id, `(${documents.length} Dokumente)`);
    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    console.error("[bewerbung] Fehler", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
