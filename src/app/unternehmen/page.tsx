import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import {
  Pill,
  SectionHeading,
  StatTiles,
  IndustryGrid,
  ProcessTimeline,
  Promises,
  ContactCTA,
  SiteFooter,
} from "@/components/marketing";
import { FaqAccordion } from "@/components/faq";
import { WHY_POINTS, PROMISES, PROCESS, CONTACT } from "@/lib/content";
import { CompanyForm } from "./company-form";

export const metadata: Metadata = {
  title: "Für Unternehmen — WorkLink",
  description:
    "Fachkräfte aus dem Westbalkan für deutsche Betriebe — geprüft, dokumentiert und durch das komplette Visumverfahren begleitet.",
};

const heroPerks = ["Fester Ansprechpartner", "Transparente Konditionen", "Antwort in 24h"];

export default function UnternehmenPage() {
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-[min(72rem,calc(100%-2rem))] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <Reveal>
              <Pill>Für Unternehmen</Pill>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Die richtigen Fachkräfte.
                <br />
                <span className="text-ink">Ohne den Aufwand.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg text-fg-muted">
                WorkLink rekrutiert Fachkräfte und Arbeitskräfte aus dem
                Westbalkan für deutsche Betriebe — geprüft, dokumentiert und
                durch das komplette Visumverfahren begleitet.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#anfrage" className="btn btn-lime">
                  Zur Anfrage
                </a>
                {CONTACT.whatsapp && (
                  <a href={CONTACT.whatsapp} className="btn btn-outline">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
                {heroPerks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-lime-2" strokeWidth={2.5} /> {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="surface-soft relative flex aspect-square items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-border p-8">
              <Image
                src="/germany-map.svg"
                alt="Deutschland"
                width={340}
                height={340}
                className="relative opacity-90"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border bg-bg-elevated p-5">
                <p className="text-3xl font-semibold text-lime-2">24h</p>
                <p className="mt-1 text-sm text-fg-muted">
                  bis zur Rückmeldung mit konkreten Kandidatenprofilen
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Branchen */}
      <section id="branchen" className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16">
        <SectionHeading
          pill="Branchen"
          title="Für diese Branchen vermitteln wir"
          intro="Ob Pflege, Lager oder Baustelle: Wir besetzen die Bereiche, in denen der Arbeitsmarkt am engsten ist — mit Menschen, die bleiben wollen."
        />
        <div className="mt-10">
          <IndustryGrid lang="de" />
        </div>
      </section>

      {/* Warum Westbalkan */}
      <section className="surface-soft border-y border-border">
        <div className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16 lg:py-24">
          <SectionHeading
            pill="Fachkräfte aus dem Westbalkan"
            title="Warum der Westbalkan?"
            intro="Vier Gründe, warum die Region für deutsche Arbeitgeber so gut funktioniert."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {WHY_POINTS.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 0.08}>
                <div className="rounded-[var(--radius-card)] border border-border bg-bg-elevated p-7">
                  <h3 className="text-xl font-semibold text-lime-2">{w.title}</h3>
                  <p className="mt-3 text-fg-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <StatTiles />
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section id="ablauf" className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16 lg:py-24">
        <SectionHeading
          pill="Ablauf"
          title="So arbeiten wir mit Ihnen"
          intro="Ein klarer Prozess von der Anfrage bis zum ersten Arbeitstag — wir übernehmen Verfahren, Behördenanträge und Koordination."
        />
        <div className="mt-10">
          <ProcessTimeline steps={PROCESS} />
        </div>
      </section>

      {/* Versprechen */}
      <section id="vorteile" className="mx-auto w-[min(72rem,calc(100%-2rem))] py-8 pb-16">
        <SectionHeading
          pill="Ihre Vorteile"
          title="Worauf Sie bei WorkLink zählen können"
        />
        <div className="mt-10">
          <Promises items={PROMISES} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16">
        <SectionHeading
          pill="FAQ"
          title="Häufige Fragen von Arbeitgebern"
          intro="Die häufigsten Fragen zur Einstellung über die Westbalkanregelung — kompakt beantwortet."
        />
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </section>

      {/* Formular */}
      <section id="anfrage" className="mx-auto w-[min(72rem,calc(100%-2rem))] py-8 pb-20">
        <SectionHeading
          pill="Personalanfrage"
          title="Stellen Sie Ihre Anfrage"
          intro="Unverbindlich und kostenlos. Antwort innerhalb von 24 Stunden."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="surface-soft rounded-[var(--radius-card)] border border-border p-8">
            <h3 className="text-2xl font-semibold">Lieber direkt schreiben?</h3>
            <p className="mt-3 text-fg-muted">
              Eine Nachricht reicht. Wir melden uns innerhalb von 24 Stunden mit
              konkreten nächsten Schritten zurück.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {CONTACT.whatsapp && (
                <a href={CONTACT.whatsapp} className="btn btn-lime w-full">
                  <MessageCircle className="h-4 w-4" /> WhatsApp öffnen
                </a>
              )}
              <a
                href={`mailto:${CONTACT.email}`}
                className={CONTACT.whatsapp ? "btn btn-outline w-full" : "btn btn-lime w-full"}
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
          <CompanyForm />
        </div>
      </section>

      {/* Kontakt */}
      <section className="mx-auto w-[min(72rem,calc(100%-2rem))] pb-20">
        <ContactCTA
          title="Kontaktieren Sie uns!"
          intro="Schreiben Sie uns — Sie erhalten innerhalb von 24 Stunden eine konkrete Rückmeldung."
        />
      </section>

      <SiteFooter />
    </>
  );
}
