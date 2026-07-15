import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Check, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import {
  Pill,
  SectionHeading,
  IndustryGrid,
  ProcessTimeline,
  Promises,
  SiteFooter,
} from "@/components/marketing";
import { PROMISES_SQ, CONTACT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Für Bewerber — WorkLink · Aplikacion",
  description:
    "Bewerben Sie sich in Minuten bei deutschen Unternehmen. Apliko tani për kompani gjermane.",
};

const heroPerks = ["Falas / Kostenlos", "Gjermanisht & Shqip", "Mbështetje deri në fund"];

const STEPS_SQ = [
  { no: "01", title: "Apliko", text: "Plotëso formularin dhe ngarko CV-në — për pak minuta. Formular ausfüllen, CV hochladen." },
  { no: "02", title: "Njihemi", text: "Ne shqyrtojmë profilin tënd dhe gjejmë punëdhënës gjermanë që të përshtaten." },
  { no: "03", title: "Dokumentet", text: "CV, dëftesa, pasaporta dhe kontrata – i përgatisim bashkë për miratimin paraprak." },
  { no: "04", title: "Viza", text: "Të shoqërojmë në procesin e vizës në Ambasadën Gjermane në Prishtinë." },
  { no: "05", title: "Mbërritja", text: "Të përcjellim deri në ditën e parë të punës në Gjermani." },
];

export default function BewerberPage() {
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-[min(72rem,calc(100%-2rem))] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <Reveal>
              <Pill>Për kandidatë · Für Bewerber</Pill>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Karriera jote
                <br />
                <span className="text-ink">në Gjermani.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg text-fg-muted">
                Puno në Gjermani me kontratë të rregullt — WorkLink të lidh
                me punëdhënës gjermanë dhe të shoqëron nga aplikimi deri në
                ditën e parë të punës.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/bewerben" className="btn btn-lime">
                  Apliko tani <ArrowRight className="h-4 w-4" />
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
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/hero.webp"
                alt="Fahrer bei der Arbeit in Deutschland"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in oklab, var(--ink) 80%, transparent) 0%, transparent 55%)",
                }}
                aria-hidden
              />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-3xl font-semibold text-lime">Falas</p>
                <p className="mt-1 text-sm text-white/80">
                  Aplikimi është plotësisht falas për kandidatët
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fushat / Branchen */}
      <section className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16">
        <SectionHeading
          pill="Fushat · Branchen"
          title="Profesionet që kërkohen në Gjermani"
          intro="Këto janë fushat ku punëdhënësit gjermanë kërkojnë njerëz tani — zgjidh atë që të përshtatet."
        />
        <div className="mt-10">
          <IndustryGrid lang="sq" />
        </div>
      </section>

      {/* Ablauf SQ */}
      <section className="surface-soft border-y border-border">
        <div className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16 lg:py-24">
          <SectionHeading
            pill="Rrugëtimi · Ablauf"
            title="Në 5 hapa drejt Gjermanisë"
            intro="Nga aplikimi i parë deri te dita e parë e punës – të shoqërojmë në çdo hap."
          />
          <div className="mt-10">
            <ProcessTimeline steps={STEPS_SQ} />
          </div>
        </div>
      </section>

      {/* Promises SQ */}
      <section className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16 lg:py-24">
        <SectionHeading
          pill="Përparësitë"
          title="Çfarë të garantojmë ne"
        />
        <div className="mt-10">
          <Promises items={PROMISES_SQ} />
        </div>
      </section>

      {/* CTA → Wizard */}
      <section className="mx-auto w-[min(72rem,calc(100%-2rem))] py-8 pb-24">
        <div className="surface-lime relative overflow-hidden rounded-[var(--radius-card)] p-8 text-center sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Apliko tani · Jetzt bewerben
          </h2>
          <p className="mx-auto mt-4 max-w-md text-fg-muted">
            Në Shqip, Bosanski ose Hrvatski. Falas dhe pa detyrime — Formular auf
            Albanisch, Bosnisch oder Kroatisch.
          </p>
          <Link href="/bewerben" className="btn btn-ink mx-auto mt-8">
            Fillo aplikimin <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
