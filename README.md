# WorkLink

Recruiting-Plattform, die deutsche **Unternehmen** mit **Fachkräften aus dem
Westbalkan** verbindet. Die Landingpage teilt Besucher direkt in zwei Pfade:

- **Unternehmen** (`/unternehmen`) — Personalanfrage stellen, Fachkräfte finden.
- **Bewerber** (`/bewerber`) — in Minuten bei deutschen Firmen bewerben, inkl. CV-Upload.

Modernes Agentur-/Consulting-Design (dunkles Petrol + Lime-Akzent, Pill-Labels,
Stat-Kacheln, abgerundete Karten, Light-/Dark-Mode, Scroll-Animationen),
zweisprachige Inhalte (Deutsch / Albanisch).

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

### Noch offen / nächste Schritte (Backend)

Das Frontend und die API-Routen stehen. Die Persistenz ist bewusst noch **nicht
festgelegt** — die Andockpunkte sind vorbereitet:

- **Datenbank:** PostgreSQL via **Prisma** (empfohlen: Neon oder Supabase, EU-Region).
- **Datei-Storage (CVs):** Supabase Storage / Cloudflare R2 / S3.
- **Auth & Admin:** Auth.js oder Clerk; Admin-Backend custom oder via Payload/Directus.
- **E-Mail:** Resend für Benachrichtigungen.

Die Route-Handler (`src/app/api/*/route.ts`) validieren die Eingaben bereits und
markieren mit `TODO`-Kommentaren genau die Stellen, an denen DB/Storage/E-Mail
angebunden werden.

## Projektstruktur

```
src/
├─ app/
│  ├─ page.tsx              # Split-Landing: Unternehmen | Bewerber
│  ├─ unternehmen/          # Unternehmens-Pfad + Personalanfrage-Formular
│  ├─ bewerber/             # Bewerber-Pfad + Bewerbungsformular (CV-Upload)
│  └─ api/
│     ├─ anfrage/           # POST — Personalanfrage
│     └─ bewerbung/         # POST — Bewerbung (multipart inkl. CV)
├─ components/              # Logo, Header, Formular-Elemente, Hintergrund
└─ lib/                     # Utilities (cn)
```

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
```

## DSGVO-Hinweis

Da personenbezogene Bewerberdaten (inkl. Lebensläufe) verarbeitet werden, sollte
für Datenbank und Storage eine **EU-Region** gewählt und ein AV-Vertrag mit dem
Hoster abgeschlossen werden.
