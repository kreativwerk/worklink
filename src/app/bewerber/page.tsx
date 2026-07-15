import type { Metadata } from "next";
import { FileText, Handshake, Plane, BadgeCheck } from "lucide-react";
import { MeshBackground } from "@/components/mesh-background";
import { SiteHeader } from "@/components/site-header";
import { ApplicantForm } from "./applicant-form";

export const metadata: Metadata = {
  title: "Für Bewerber — WorkLink",
  description:
    "Bewerben Sie sich in Minuten bei deutschen Unternehmen. Apliko tani për kompani gjermane.",
};

const steps = [
  {
    icon: FileText,
    title: "Bewerben",
    text: "Formular ausfüllen und Lebenslauf hochladen — in wenigen Minuten.",
  },
  {
    icon: Handshake,
    title: "Kennenlernen",
    text: "Wir prüfen Ihr Profil und finden passende deutsche Arbeitgeber.",
  },
  {
    icon: BadgeCheck,
    title: "Anerkennung",
    text: "Unterstützung bei Visum, Anerkennung und Sprachnachweis.",
  },
  {
    icon: Plane,
    title: "Ankommen",
    text: "Begleitung bis zum ersten Arbeitstag in Deutschland.",
  },
];

export default function BewerberPage() {
  return (
    <>
      <MeshBackground />
      <SiteHeader />

      <main className="mx-auto w-[min(64rem,calc(100%-2rem))] pb-24 pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-applicant">
            Për kandidatë · Für Bewerber
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Ihre Karriere
            <br />
            in Deutschland.
          </h1>
          <p className="mt-5 text-lg text-fg-muted">
            Bewerben Sie sich bei geprüften deutschen Unternehmen. Wir begleiten
            Sie vom ersten Klick bis zum ersten Arbeitstag.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <s.icon className="h-6 w-6 text-applicant" strokeWidth={1.7} />
                <span className="text-sm font-mono text-fg-subtle">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <section className="mt-16" id="bewerbung">
          <h2 className="text-2xl font-semibold tracking-tight">
            Jetzt bewerben
          </h2>
          <p className="mt-2 text-fg-muted">
            Kostenlos und unverbindlich. Aplikimi është falas.
          </p>
          <div className="mt-6">
            <ApplicantForm />
          </div>
        </section>
      </main>
    </>
  );
}
