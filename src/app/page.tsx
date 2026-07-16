"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  UserRound,
  MessageCircle,
  Check,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { CONTACT } from "@/lib/content";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const companyPoints = [
  "Geprüfte Kandidaten mit vollständigen Unterlagen",
  "Westbalkanregelung & Visum: wir übernehmen das Verfahren",
  "Antwort innerhalb von 24 Stunden",
];

const applicantPoints = [
  "Apliko në gjuhën tënde — kushte të drejta",
  "Kontratë të rregullt pune në Gjermani",
  "Të shoqërojmë deri në ditën e parë të punës",
];

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col">
      {/* top bar */}
      <motion.header
        custom={0}
        variants={fade}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-[min(76rem,calc(100%-2.5rem))] items-center justify-between py-6"
      >
        <Logo className="text-lg" />
        <nav className="flex items-center gap-2">
          <Link
            href="/unternehmen"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg sm:block"
          >
            Für Unternehmen
          </Link>
          <Link
            href="/bewerber"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg sm:block"
          >
            Für Bewerber
          </Link>
          {CONTACT.whatsapp ? (
            <a href={CONTACT.whatsapp} className="btn btn-ink px-4 py-2 text-sm">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          ) : (
            <a href={`mailto:${CONTACT.email}`} className="btn btn-ink px-4 py-2 text-sm">
              Kontakt
            </a>
          )}
        </nav>
      </motion.header>

      <div className="mx-auto flex w-[min(76rem,calc(100%-2.5rem))] flex-1 flex-col justify-center pb-14">
        {/* headline */}
        <div className="py-10 text-center sm:py-14">
          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl"
          >
            Arbeitskräfte aus dem Westbalkan.
            <br />
            <span className="text-fg-subtle">Für Betriebe, die Verstärkung brauchen.</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-xl text-balance text-lg text-fg-muted"
          >
            WorkLink verbindet beide Seiten — rechtssicher über die
            Westbalkanregelung, persönlich betreut in zwei Sprachen.
          </motion.p>
        </div>

        {/* split: two distinct paths */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Unternehmen — dark petrol */}
          <motion.div custom={3} variants={fade} initial="hidden" animate="show">
            <Link
              href="/unternehmen"
              className="surface-ink group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
                style={{ background: "var(--lime)" }}
                aria-hidden
              />
              <div className="flex items-center justify-between">
                <span className="icon-badge">
                  <Building2 className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-lime-2">
                  Für Unternehmen
                </span>
              </div>
              <h2 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ich suche Personal.
              </h2>
              <ul className="mt-5 flex flex-col gap-2.5">
                {companyPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] on-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-2" strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-lime px-6 py-3 font-semibold text-on-lime transition-transform group-hover:scale-[1.03]">
                Personal anfragen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>

          {/* Bewerber — photo + lime */}
          <motion.div custom={4} variants={fade} initial="hidden" animate="show">
            <Link
              href="/bewerber"
              className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
            >
              <Image
                src="/hero.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in oklab, var(--ink) 88%, transparent) 8%, color-mix(in oklab, var(--ink) 45%, transparent) 45%, transparent 75%)",
                }}
                aria-hidden
              />
              <div className="relative flex items-center justify-between">
                <span className="icon-badge">
                  <UserRound className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-on-lime">
                  Për kandidatë
                </span>
              </div>
              <div className="relative mt-auto pt-40 text-white">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Dua të punoj në Gjermani.
                </h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {applicantPoints.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[15px] text-white/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={2.5} />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-lime px-6 py-3 font-semibold text-on-lime transition-transform group-hover:scale-[1.03]">
                  Apliko tani
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* trust strip */}
        <motion.div
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-fg-subtle"
        >
          <span>Westbalkanregelung § 26 Abs. 2 BeschV</span>
          <span className="hidden h-1 w-1 rounded-full bg-fg-subtle sm:block" />
          <span>Deutsch · Shqip · Bosanski · Hrvatski</span>
          <span className="hidden h-1 w-1 rounded-full bg-fg-subtle sm:block" />
          <span>Antwort in 24 Stunden</span>
        </motion.div>
      </div>
    </main>
  );
}
