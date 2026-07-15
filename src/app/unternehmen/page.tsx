import type { Metadata } from "next";
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
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WHY_POINTS, PROMISES, PROCESS, CONTACT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Für Unternehmen — WorkLink",
  description:
    "Arbeitskräfte aus dem Westbalkan für deutsche Betriebe — geprüft, dokumentiert und durch das komplette Visumverfahren begleitet.",
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
                Die richtigen Arbeitskräfte.
                <br />
                <span className="text-lime-2">Ohne den Aufwand.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg text-fg-muted">
                WorkLink rekrutiert Arbeitskräfte aus dem
                Westbalkan für deutsche Betriebe — geprüft, dokumentiert und
                durch das komplette Visumverfahren begleitet.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/anfrage" className="btn btn-lime">
                  Zur Anfrage <ArrowRight className="h-4 w-4" />
                </Link>
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
            <div className="surface-ink relative overflow-hidden rounded-[var(--radius-card)] p-8 sm:p-10">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
                style={{ background: "var(--lime)" }}
                aria-hidden
              />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-lime-2">
                So schnell geht es
              </p>
              <div className="mt-6 flex flex-col gap-6">
                {[
                  ["24h", "bis zur ersten Rückmeldung auf Ihre Anfrage"],
                  ["Tage", "bis Sie geprüfte Kandidatenprofile erhalten"],
                  ["1", "fester Ansprechpartner durch das ganze Verfahren"],
                ].map(([v, l]) => (
                  <div key={l} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                    <p className="text-4xl font-semibold text-lime-2">{v}</p>
                    <p className="mt-1 text-sm on-ink-muted">{l}</p>
                  </div>
                ))}
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

      {/* Warum Westbalkan (dunkel, wie Landing-Karte) */}
      <section className="mx-auto w-[min(72rem,calc(100%-2rem))] py-8">
        <div className="surface-ink relative overflow-hidden rounded-[var(--radius-card)] p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--lime)" }}
            aria-hidden
          />
          <SectionHeading
            pill="Arbeitskräfte aus dem Westbalkan"
            title="Warum der Westbalkan?"
            intro="Vier Gründe, warum die Region für deutsche Arbeitgeber so gut funktioniert."
          />
          <div className="relative mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {WHY_POINTS.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 0.08}>
                <div className="border-t border-white/10 pt-5">
                  <h3 className="text-xl font-semibold text-lime-2">{w.title}</h3>
                  <p className="mt-2.5 on-ink-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="relative mt-12">
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

      {/* CTA → Anfrage-Wizard */}
      <section id="anfrage" className="mx-auto w-[min(72rem,calc(100%-2rem))] py-8 pb-20">
        <div className="surface-lime relative overflow-hidden rounded-[var(--radius-card)] p-8 text-center sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Personalanfrage stellen
          </h2>
          <p className="mx-auto mt-4 max-w-md text-fg-muted">
            In 2 Minuten ausgefüllt: Branche, Bedarf, Anforderungen und
            Unterkunft — wir melden uns innerhalb von 24 Stunden.
          </p>
          <Link href="/anfrage" className="btn btn-ink mx-auto mt-8">
            Anfrage starten <ArrowRight className="h-4 w-4" />
          </Link>
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
