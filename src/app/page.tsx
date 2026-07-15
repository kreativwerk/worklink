"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Building2, UserRound } from "lucide-react";
import { MeshBackground } from "@/components/mesh-background";
import { Logo } from "@/components/logo";

const paths = [
  {
    href: "/unternehmen",
    icon: Building2,
    kicker: "Für Unternehmen",
    title: "Personal finden",
    subtitle: "Qualifizierte Fachkräfte aus dem Westbalkan — direkt anfragen.",
    hue: "var(--company)",
    cta: "Zur Anfrage",
  },
  {
    href: "/bewerber",
    icon: UserRound,
    kicker: "Për kandidatë · Für Bewerber",
    title: "Jetzt bewerben",
    subtitle: "Apliko tani për kompani gjermane — in wenigen Minuten.",
    hue: "var(--applicant)",
    cta: "Aplikacion",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <MeshBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl"
      >
        {/* Brand */}
        <motion.div variants={item} className="mb-14 flex justify-center">
          <Logo className="text-xl" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-balance text-center text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Fachkräfte und Unternehmen,
          <br />
          <span className="bg-gradient-to-r from-company to-applicant bg-clip-text text-transparent">
            intelligent verbunden.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-balance text-center text-lg text-fg-muted"
        >
          Wählen Sie Ihren Weg. Zwei Erlebnisse, eine Plattform.
        </motion.p>

        {/* Split choice */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {paths.map((p) => (
            <motion.div key={p.href} variants={item}>
              <PathCard {...p} />
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={item}
          className="mt-12 text-center text-sm text-fg-subtle"
        >
          Nicht sicher?{" "}
          <Link href="/unternehmen" className="text-accent underline-offset-4 hover:underline">
            So funktioniert WorkLink
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}

function PathCard({
  href,
  icon: Icon,
  kicker,
  title,
  subtitle,
  hue,
  cta,
}: (typeof paths)[number]) {
  return (
    <Link href={href} className="group block h-full focus:outline-none">
      <motion.div
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="glass relative flex h-full flex-col overflow-hidden rounded-[var(--radius-glass)] p-8 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_20px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-transparent transition-shadow group-focus-visible:ring-accent"
        style={{ ["--hue" as string]: hue }}
      >
        {/* Glow accent */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: hue }}
          aria-hidden
        />

        <div
          className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: `color-mix(in oklab, ${hue} 16%, transparent)`, color: hue }}
        >
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </div>

        <p
          className="text-xs font-medium uppercase tracking-[0.14em]"
          style={{ color: hue }}
        >
          {kicker}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-fg-muted">
          {subtitle}
        </p>

        <div className="mt-8 flex items-center gap-2 text-[15px] font-medium">
          <span>{cta}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
            style={{ color: hue }}
          />
        </div>
      </motion.div>
    </Link>
  );
}
