# WorkLink

Recruiting-Plattform, die deutsche **Unternehmen** mit **Fachkräften aus dem
Westbalkan** verbindet. Die Landingpage teilt Besucher direkt in zwei Pfade:

- **Unternehmen** (`/unternehmen`) — Personalanfrage stellen, Fachkräfte finden.
- **Bewerber** (`/bewerber`) — in Minuten bei deutschen Firmen bewerben, inkl. CV-Upload.

Helles, modernes Design (heller Grundton + Lime-Akzent, Petrol für Text/Buttons,
Pill-Labels, Stat-Kacheln, abgerundete Karten, Light-/Dark-Mode,
Scroll-Animationen), zweisprachige Inhalte.

**Bewerbungsformular (`/bewerben`)** ist ein mehrstufiger Wizard:
- Erste Frage = Sprache (Shqip / Bosanski / Hrvatski) → Formular in der Sprache
- Einfachauswahl springt automatisch weiter, Eingaben/Uploads mit „Weiter"
- Erfasst genau die Dashboard-Felder: Identität, Adresse, Kontakt & Größen,
  Vorauswahl (Beschäftigung, Lkw-Führerschein, Berufsfeld, Amazon-Erfahrung),
  Dokumente (Ausweis, Selfie, Führerschein) **plus Zeugnisse/Zertifikate**,
  DSGVO-Einwilligung. Übersetzungen in `src/lib/apply-i18n.ts`.

Die Marketing-Inhalte (Branchen, Vorteile, 5-Schritte-Ablauf, FAQ, Kontakt)
stammen strukturell aus dem Agentur-Gashi-Bestand und liegen zentral in
`src/lib/content.ts`. Branchen-Bilder und Landkarten unter `public/`.

## Tech-Stack

| Ebene | Wahl |
|---|---|
| Framework | **Next.js 16** (App Router) + React 19 + TypeScript |
| Styling | **Tailwind CSS v4** (Design-Tokens in `globals.css`) |
| Animation | **motion** (Framer Motion) |
| Icons | **lucide-react** |
| Datenbank | **PostgreSQL** via **Prisma 7** (pg-Adapter) |
| Datei-Speicher | Lokales VPS-Verzeichnis (`UPLOAD_DIR`) |
| Admin-Login | HTTP Basic Auth (Middleware) |
| Betrieb | **Docker Compose** (App + PostgreSQL + Caddy/HTTPS) |

Alle Daten (Bewerbungen, Dokumente) bleiben auf **eurem VPS** — DSGVO-freundlich,
ohne externe Cloud-Dienste.

## Admin-Bereich

- `/admin` — Liste aller Bewerbungen und Personalanfragen
- `/admin/bewerbung/[id]` — Detailansicht mit Status-Pipeline (Neu → … →
  Eingestellt), allen Feldern und Dokument-Downloads
- Geschützt per Basic Auth (`ADMIN_USER` / `ADMIN_PASSWORD`)

## Projektstruktur

```
src/
├─ app/
│  ├─ page.tsx              # Split-Landing (Hero mit Medien-Frame)
│  ├─ unternehmen/          # Unternehmens-Seite + Personalanfrage
│  ├─ bewerber/             # Bewerber-Seite (Info) → /bewerben
│  ├─ bewerben/             # Mehrstufiger Bewerbungs-Wizard
│  ├─ admin/                # Admin-Dashboard (Bewerbungen, Detail, Status)
│  └─ api/                  # anfrage · bewerbung · admin/document
├─ components/              # UI, MediaFrame, Wizard, Marketing-Sektionen
└─ lib/                     # db (Prisma), storage, content, i18n, status
prisma/                     # schema.prisma + Migrationen
```

## Deployment auf dem VPS (Docker)

Voraussetzung: Docker + Docker Compose, eine Domain, deren A-Record auf den VPS zeigt.

```bash
git clone <repo> worklink && cd worklink
cp .env.example .env          # DOMAIN, Passwörter, ADMIN_* eintragen
docker compose up -d --build  # App, PostgreSQL, Caddy (HTTPS automatisch)
```

- Migrationen laufen beim Start automatisch (`prisma migrate deploy`).
- Hochgeladene Dokumente liegen im Volume `uploads` (`/data/uploads`).
- Caddy holt automatisch ein Let's-Encrypt-Zertifikat für `DOMAIN`.

**Backups (wichtig):** regelmäßig sichern
```bash
docker compose exec db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup.sql   # DB
docker run --rm -v worklink_uploads:/u -v "$PWD":/b alpine tar czf /b/uploads.tgz -C /u .  # Dateien
```

## Entwicklung

```bash
npm install
cp .env.example .env         # DATABASE_URL, UPLOAD_DIR, ADMIN_* setzen
npm run db:migrate           # Schema in die lokale PostgreSQL migrieren
npm run dev                  # http://localhost:3000
```

Benötigt eine erreichbare PostgreSQL (z. B. lokal oder per Docker:
`docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=worklink -e POSTGRES_USER=worklink -e POSTGRES_DB=worklink postgres:16`).

## DSGVO-Hinweis

Es werden personenbezogene Bewerberdaten (inkl. Ausweisdokumenten) verarbeitet.
Das Self-Hosting auf dem eigenen VPS in der EU hält die Daten unter eigener
Kontrolle. Für den Produktivbetrieb: Zugriffe absichern, Backups verschlüsseln
und Aufbewahrungs-/Löschfristen definieren.
