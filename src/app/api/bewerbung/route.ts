import { NextResponse } from "next/server";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

const DOC_SLOTS = ["idFront", "idBack", "selfie", "licenseFront", "licenseBack"];
const REQUIRED_DOCS = ["idFront", "idBack", "selfie"];
const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "dob",
  "nationality",
  "email",
  "phone",
  "field",
];

type FileMeta = { name: string; type: string; size: number };

function checkFile(f: File) {
  if (!ALLOWED.includes(f.type)) return "Dateityp nicht erlaubt (PDF, JPG, PNG)";
  if (f.size > MAX_FILE_BYTES) return "Datei zu groß (max. 10 MB)";
  return null;
}

/**
 * POST /api/bewerbung — mehrstufige Bewerbung (multipart).
 * Felder: Vorauswahl, Identität, Adresse, Kontakt/Größen, Einwilligung.
 * Dateien: Ausweis/Selfie/Führerschein + mehrere Zeugnisse (certificates).
 *
 * TODO(persistenz + storage): Dateien in Objektspeicher (Supabase/R2/S3),
 * Metadaten + Antworten in die DB. Aktuell: validieren + loggen.
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

  // --- single-file documents ---
  const documents: Record<string, FileMeta> = {};
  for (const slot of DOC_SLOTS) {
    const f = form.get(slot);
    if (f instanceof File && f.size > 0) {
      const err = checkFile(f);
      if (err) return NextResponse.json({ error: `${slot}: ${err}` }, { status: 415 });
      documents[slot] = { name: f.name, type: f.type, size: f.size };
      // await storage.upload(`applications/${id}/${slot}`, Buffer.from(await f.arrayBuffer()))
    }
  }
  const missingDocs = REQUIRED_DOCS.filter((d) => !documents[d]);
  if (missingDocs.length) {
    return NextResponse.json(
      { error: "Pflichtdokumente fehlen", documents: missingDocs },
      { status: 422 },
    );
  }

  // --- multiple certificates ---
  const certificates: FileMeta[] = [];
  for (const f of form.getAll("certificates")) {
    if (f instanceof File && f.size > 0) {
      const err = checkFile(f);
      if (err) return NextResponse.json({ error: `certificate: ${err}` }, { status: 415 });
      certificates.push({ name: f.name, type: f.type, size: f.size });
    }
  }

  const application = {
    type: "candidate_application" as const,
    lang: get("lang"),
    // Vorauswahl
    employment: get("employment"),
    truckLicense: get("truckLicense"),
    field: get("field"),
    amazonPartnerExperience: get("amazon"),
    // Identität
    firstName: get("firstName"),
    lastName: get("lastName"),
    dob: get("dob"),
    placeOfBirth: get("placeOfBirth") || null,
    nationality: get("nationality"),
    countryOfBirth: get("countryOfBirth") || null,
    // Adresse
    street: get("street"),
    postal: get("postal") || null,
    city: get("city"),
    livingSince: get("livingSince") || null,
    // Kontakt & Größen
    email: get("email"),
    phone: get("phone"),
    tshirtSize: get("tshirt") || null,
    shoeSize: get("shoe") || null,
    // Dokumente
    documents,
    certificates,
    // DSGVO
    dsgvoConsent: get("dsgvoConsent"),
    dsgvoConsentAt: get("dsgvoConsentAt"),
    receivedAt: new Date().toISOString(),
  };

  // await db.application.create({ data: application })
  console.info("[bewerbung] neue Bewerbung", {
    ...application,
    certificates: certificates.length,
  });

  return NextResponse.json({ ok: true });
}
