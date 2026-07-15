"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Building2, UserRound, Check } from "lucide-react";
import { Logo } from "@/components/logo";

const paths = [
  {
    href: "/unternehmen",
    icon: Building2,
    kicker: "Für Unternehmen",
    title: "Personal finden",
    subtitle: "Qualifizierte Fachkräfte aus dem Westbalkan — direkt anfragen.",
    cta: "Zur Anfrage",
  },
  {
    href: "/bewerber",
    icon: UserRound,
    kicker: "Për kandidatë · Für Bewerber",
    title: "Jetzt bewerben",
    subtitle: "Apliko tani për kompani gjermane — in wenigen Minuten.",
    cta: "Aplikacion",
  },
];

const perks = ["Faire Konditionen", "Deutscher Support", "Komplett kostenfrei"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  return (
    <main className="surface-ink dot-texture relative flex min-h-dvh flex-col overflow-hidden">
      {/* ambient lime glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--lime)" }}
        aria-hidden
      />

      <div className="relative mx-auto flex w-[min(72rem,calc(100%-2rem))] flex-1 flex-col justify-center py-14">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-10 flex justify-center">
            <Logo className="text-xl" />
          </motion.div>

          <motion.div variants={item} className="flex justify-center">
            <span className="pill">
              <span className="pill-dot" />
              Willkommen bei WorkLink
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mx-auto mt-6 max-w-4xl text-balance text-center text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Fachkräfte aus dem Westbalkan,{" "}
            <span className="text-lime-2">professionell vermittelt.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-balance text-center text-lg on-ink-muted"
          >
            Wir verbinden deutsche Unternehmen mit Personal aus Kosovo, Albanien
            und Nordmazedonien. Wählen Sie Ihren Weg.
          </motion.p>

          {/* Split choice */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {paths.map((p) => (
              <motion.div key={p.href} variants={item}>
                <PathCard {...p} />
              </motion.div>
            ))}
          </div>

          {/* perks */}
          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm on-ink-muted"
          >
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-lime-2" strokeWidth={2.5} />
                {perk}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </main>
  );
}

function PathCard({
  href,
  icon: Icon,
  kicker,
  title,
  subtitle,
  cta,
}: (typeof paths)[number]) {
  return (
    <Link href={href} className="group block h-full focus:outline-none">
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-ink-2 p-8 ring-1 ring-transparent transition group-hover:border-lime/40 group-focus-visible:ring-lime"
      >
        <div className="flex items-center justify-between">
          <span className="icon-badge">
            <Icon className="h-6 w-6" strokeWidth={1.9} />
          </span>
          <ArrowRight className="h-5 w-5 text-lime-2 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-lime-2">
          {kicker}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 max-w-xs text-[15px] leading-relaxed on-ink-muted">
          {subtitle}
        </p>

        <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-on-lime">
          {cta}
        </span>
      </motion.div>
    </Link>
  );
}
