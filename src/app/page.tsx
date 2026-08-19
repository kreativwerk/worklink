"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Building2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { DriverPromo } from "@/components/driver-promo";
import { BUILD_STAMP } from "@/lib/build-info";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** Bewerber-Sprachen → lokalisierte Infoseite. */
const APPLICANT_LANGS = [
  { code: "sq", flag: "🇦🇱", label: "Shqip", sub: "Apliko për punë në Gjermani" },
  { code: "bs", flag: "🇧🇦", label: "Bosanski", sub: "Prijavi se za posao u Njemačkoj" },
  { code: "hr", flag: "🇭🇷", label: "Hrvatski", sub: "Prijavi se za posao u Njemačkoj" },
  { code: "mk", flag: "🇲🇰", label: "Македонски", sub: "Аплицирај за работа во Германија" },
];

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col">
      <div className="mx-auto flex w-[min(44rem,calc(100%-2.5rem))] flex-1 flex-col justify-center py-12">
        {/* Brand */}
        <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="flex justify-center">
          <Logo className="text-2xl" />
        </motion.div>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-8 text-balance text-center text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Willkommen · Mirë se vini
          <br />
          Dobrodošli · Добредојдовте
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mx-auto mt-4 max-w-md text-balance text-center text-fg-muted"
        >
          Zgjidhni gjuhën · Odaberite jezik · Изберете јазик · Sprache wählen
        </motion.p>

        {/* Deutsch → Unternehmen (hervorgehoben, dunkel) */}
        <motion.div custom={3} variants={fade} initial="hidden" animate="show" className="mt-10">
          <Link
            href="/unternehmen"
            className="surface-ink group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl"
              style={{ background: "var(--lime)" }}
              aria-hidden
            />
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-ink-2 text-2xl">
              🇩🇪
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-semibold">Deutsch</span>
              <span className="flex items-center gap-1.5 text-sm on-ink-muted">
                <Building2 className="h-3.5 w-3.5" /> Für Unternehmen · Personal aus dem Westbalkan finden
              </span>
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime text-on-lime transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </motion.div>

        {/* Bewerber-Sprachen */}
        <div className="mt-4 grid gap-3">
          {APPLICANT_LANGS.map((l, i) => (
            <motion.div key={l.code} custom={4 + i} variants={fade} initial="hidden" animate="show">
              <Link
                href={`/bewerber/${l.code}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-bg-elevated p-5 transition-all hover:-translate-y-0.5 hover:border-lime-2"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-bg text-2xl">
                  {l.flag}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold">{l.label}</span>
                  <span className="block text-sm text-fg-muted">{l.sub}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-fg-subtle transition-all group-hover:translate-x-0.5 group-hover:text-lime-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Aktions-Kampagne: Paketfahrer (Shqip) */}
        <motion.div custom={8} variants={fade} initial="hidden" animate="show">
          <DriverPromo />
        </motion.div>

        {/* Vertrauens-Zeile + Stempel */}
        <motion.p
          custom={9}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10 text-center text-sm text-fg-subtle"
        >
          Westbalkanregelung § 26 Abs. 2 BeschV · Antwort in 24h
        </motion.p>
        <p className="mt-4 text-center text-[11px] text-fg-subtle/60">
          Stand: {BUILD_STAMP} Uhr
        </p>
      </div>
    </main>
  );
}
