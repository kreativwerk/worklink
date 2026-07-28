import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import { CONTACT } from "@/lib/content";
import { LANGS, type Lang } from "@/lib/apply-i18n";
import { BEWERBER } from "@/lib/bewerber-i18n";

export function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l.code }));
}

export const metadata: Metadata = {
  title: "WorkLink — Apliko · Prijavi se · Аплицирај",
  description:
    "Puno në Gjermani · Radi u Njemačkoj · Работи во Германија — WorkLink.",
};

export default async function BewerberLangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LANGS.some((l) => l.code === lang)) notFound();
  const L = lang as Lang;
  const t = BEWERBER[L];
  const applyHref = `/bewerben?lang=${L}`;

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-[min(72rem,calc(100%-2rem))] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <Reveal>
              <Pill>{t.pill}</Pill>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                {t.title1}
                <br />
                <span className="text-lime-2">{t.title2}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg text-fg-muted">{t.heroText}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={applyHref} className="btn btn-lime">
                  {t.applyCta} <ArrowRight className="h-4 w-4" />
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
                {t.perks.map((p) => (
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
                {t.panelKicker}
              </p>
              <div className="mt-6 flex flex-col gap-6">
                {t.panelStats.map(([v, l]) => (
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

      {/* Berufsfelder */}
      <section className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16">
        <SectionHeading
          pill={t.industriesPill}
          title={t.industriesTitle}
          intro={t.industriesIntro}
        />
        <div className="mt-10">
          <IndustryGrid lang={L} />
        </div>
      </section>

      {/* Ablauf */}
      <section className="surface-soft border-y border-border">
        <div className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16 lg:py-24">
          <SectionHeading pill={t.stepsPill} title={t.stepsTitle} intro={t.stepsIntro} />
          <div className="mt-10">
            <ProcessTimeline steps={t.steps} />
          </div>
        </div>
      </section>

      {/* Versprechen */}
      <section className="mx-auto w-[min(72rem,calc(100%-2rem))] py-16 lg:py-24">
        <SectionHeading pill={t.promisesPill} title={t.promisesTitle} />
        <div className="mt-10">
          <Promises items={t.promises} />
        </div>
      </section>

      {/* CTA → Wizard */}
      <section className="mx-auto w-[min(72rem,calc(100%-2rem))] py-8 pb-24">
        <div className="surface-lime relative overflow-hidden rounded-[var(--radius-card)] p-8 text-center sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-fg-muted">{t.ctaText}</p>
          <Link href={applyHref} className="btn btn-ink mx-auto mt-8">
            {t.ctaButton} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
