import type { Metadata } from "next";
import { Search, ShieldCheck, Users, Clock } from "lucide-react";
import { MeshBackground } from "@/components/mesh-background";
import { SiteHeader } from "@/components/site-header";
import { CompanyForm } from "./company-form";

export const metadata: Metadata = {
  title: "Für Unternehmen — WorkLink",
  description:
    "Stellen Sie eine Personalanfrage und erhalten Sie qualifizierte Fachkräfte aus dem Westbalkan.",
};

const benefits = [
  {
    icon: Search,
    title: "Vorqualifiziert",
    text: "Jeder Kandidat wird geprüft — Sprache, Abschlüsse, Berufserfahrung.",
  },
  {
    icon: ShieldCheck,
    title: "Rechtssicher",
    text: "Visa, Anerkennung und Behördengänge begleiten wir vollständig.",
  },
  {
    icon: Clock,
    title: "Schnell",
    text: "Erste passende Profile innerhalb von 24 Stunden nach Anfrage.",
  },
  {
    icon: Users,
    title: "Persönlich",
    text: "Ein fester Ansprechpartner von der Anfrage bis zum ersten Arbeitstag.",
  },
];

export default function UnternehmenPage() {
  return (
    <>
      <MeshBackground />
      <SiteHeader />

      <main className="mx-auto w-[min(64rem,calc(100%-2rem))] pb-24 pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-company">
            Für Unternehmen
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Die richtigen Fachkräfte.
            <br />
            Ohne den Aufwand.
          </h1>
          <p className="mt-5 text-lg text-fg-muted">
            Beschreiben Sie Ihren Bedarf — wir liefern geprüfte Kandidaten aus
            dem Westbalkan und übernehmen den kompletten Vermittlungsprozess.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="glass rounded-2xl p-5"
            >
              <b.icon className="h-6 w-6 text-company" strokeWidth={1.7} />
              <h3 className="mt-3 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{b.text}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <section className="mt-16" id="anfrage">
          <h2 className="text-2xl font-semibold tracking-tight">
            Personalanfrage stellen
          </h2>
          <p className="mt-2 text-fg-muted">
            Unverbindlich und kostenlos. Antwort innerhalb von 24 Stunden.
          </p>
          <div className="mt-6">
            <CompanyForm />
          </div>
        </section>
      </main>
    </>
  );
}
