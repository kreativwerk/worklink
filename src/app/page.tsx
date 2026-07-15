"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Building2, UserRound, MessageCircle, Clock } from "lucide-react";
import { Logo } from "@/components/logo";
import { MediaFrame } from "@/components/media-frame";
import { CONTACT } from "@/lib/content";

const paths = [
  {
    href: "/unternehmen",
    icon: Building2,
    kicker: "Für Unternehmen",
    title: "Personal finden",
    subtitle: "Geprüfte Fachkräfte aus dem Westbalkan — direkt anfragen.",
  },
  {
    href: "/bewerber",
    icon: UserRound,
    kicker: "Për kandidatë · Für Bewerber",
    title: "Jetzt bewerben",
    subtitle: "Apliko tani për kompani gjermane — in wenigen Minuten.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* top bar */}
      <motion.header
        custom={0}
        variants={fade}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-[min(80rem,calc(100%-2.5rem))] items-center justify-between py-6"
      >
        <Logo className="text-lg" />
        <a href={CONTACT.whatsapp} className="btn btn-lime px-4 py-2 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </motion.header>

      {/* soft ambient tints */}
      <div
        className="pointer-events-none absolute right-[-8%] top-[-6%] h-[34rem] w-[34rem] rounded-full opacity-[0.18] blur-[130px]"
        style={{ background: "var(--lime)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[-10%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full opacity-[0.10] blur-[130px]"
        style={{ background: "var(--ink)" }}
        aria-hidden
      />

      {/* hero */}
      <section className="relative mx-auto grid w-[min(80rem,calc(100%-2.5rem))] flex-1 items-center gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-16">
        {/* left: copy + audience chooser */}
        <div>
          <motion.span custom={1} variants={fade} initial="hidden" animate="show" className="pill">
            <span className="pill-dot" />
            Personalvermittlung Westbalkan → Deutschland
          </motion.span>

          <motion.h1
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Menschen, die
            <br />
            <span className="text-lime-2">weitermachen wollen.</span>
          </motion.h1>

          <motion.p
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-md text-lg text-fg-muted"
          >
            Wir bringen deutsche Unternehmen und Fachkräfte aus Kosovo, Albanien
            und Nordmazedonien zusammen. Sagen Sie uns, wer Sie sind.
          </motion.p>

          {/* audience chooser — editorial list */}
          <div className="mt-9 flex flex-col gap-3">
            {paths.map((p, i) => (
              <motion.div key={p.href} custom={4 + i} variants={fade} initial="hidden" animate="show">
                <ChooserRow {...p} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* right: media placeholder with floating chips */}
        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="relative"
        >
          <MediaFrame
            src="/hero.webp"
            alt="Fahrer aus dem Westbalkan bei der Arbeit in Deutschland"
            aspect="aspect-[4/5]"
            priority
          />

          {/* floating chips */}
          <div className="absolute -left-4 bottom-8 hidden rounded-2xl border border-border bg-bg-elevated px-4 py-3 shadow-xl sm:block">
            <div className="flex items-center gap-2 text-lime-2">
              <Clock className="h-4 w-4" />
              <span className="text-2xl font-semibold text-fg">24h</span>
            </div>
            <p className="mt-0.5 text-xs text-fg-muted">bis zur Rückmeldung</p>
          </div>
          <div className="absolute -right-3 top-8 hidden rounded-full border border-border bg-bg-elevated px-4 py-2 text-sm font-medium shadow-xl sm:block">
            🇽🇰 🇦🇱 🇲🇰 <span className="text-fg-muted">· zweisprachig</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function ChooserRow({
  href,
  icon: Icon,
  kicker,
  title,
  subtitle,
}: (typeof paths)[number]) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-bg-elevated p-4 transition-all hover:border-lime-2 hover:shadow-lg focus:outline-none focus-visible:border-lime-2 sm:p-5"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime text-on-lime transition-transform group-hover:scale-105">
        <Icon className="h-6 w-6" strokeWidth={1.9} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium uppercase tracking-[0.12em] text-lime-2">
          {kicker}
        </span>
        <span className="mt-0.5 block text-lg font-semibold">{title}</span>
        <span className="mt-0.5 block text-sm text-fg-muted">{subtitle}</span>
      </span>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-subtle transition-all group-hover:text-lime-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
