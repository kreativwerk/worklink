import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";

/**
 * Aktions-Kampagne auf der Startseite: Paketfahrer für Deutschland (Shqip),
 * mit Vertragspreis-Angebot und Direkt-Bewerben-Button.
 */
export function DriverPromo() {
  return (
    <div className="surface-ink relative mt-8 overflow-hidden rounded-[var(--radius-card)] p-7 sm:p-10">
      {/* Akzent */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--lime)" }}
        aria-hidden
      />
      <div className="dot-texture pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-center">
        {/* linke Spalte: Stelle */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Kërkojmë shoferë poste
          </h2>
          <p className="mt-2 flex items-center gap-2 text-lg on-ink-muted">
            <MapPin className="h-5 w-5 text-lime-2" /> në Gjermani
          </p>

          <p className="mt-5 text-3xl font-semibold text-lime-2 sm:text-4xl">
            2.250 € – 2.500 €
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {[
              "Pa përvojë pune",
              "Nuk kërkohet gjuha gjermane",
              "Akomodimi organizohet",
            ].map((p) => (
              <li key={p} className="flex items-center gap-3 font-medium">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border-2 border-lime-2">
                  <Check className="h-4 w-4 text-lime-2" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <Link href="/bewerben?lang=sq" className="btn btn-lime mt-8">
            Apliko tani <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* rechte Spalte: Preis-Badge */}
        <div className="surface-lime rounded-[26px] p-7 text-center sm:p-8">
          <p className="text-lg font-semibold">
            Më parë: <s className="opacity-70">1.200 €</s>
          </p>
          <p className="mt-1 text-6xl font-semibold tracking-tight sm:text-7xl">
            600&thinsp;€
          </p>
          <p className="mt-2 text-lg font-semibold">për kontratën</p>
        </div>
      </div>
    </div>
  );
}
