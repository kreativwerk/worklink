import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Logo } from "@/components/logo";
import { CONTACT, INDUSTRIES, STATS } from "@/lib/content";
import { cn } from "@/lib/utils";

/* --- Pill label -------------------------------------------------------- */
export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="pill">
      <span className="pill-dot" />
      {children}
    </span>
  );
}

/* --- Section heading --------------------------------------------------- */
export function SectionHeading({
  pill,
  title,
  intro,
  align = "left",
}: {
  pill?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {pill && (
        <Reveal>
          <Pill>{pill}</Pill>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-fg-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/* --- Stat tiles -------------------------------------------------------- */
export function StatTiles() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06}>
          <div className="border-t-2 border-lime pt-4">
            <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {s.value}
              <span className="text-lime-2">{s.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* --- Industry grid ----------------------------------------------------- */
export function IndustryGrid({ lang = "de" }: { lang?: "de" | "sq" }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {INDUSTRIES.map((ind, i) => (
        <Reveal key={ind.key} delay={(i % 4) * 0.05}>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card-sm)]">
            <Image
              src={ind.img}
              alt={ind[lang]}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <span className="absolute bottom-3 left-4 text-lg font-semibold text-white">
              {ind[lang]}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* --- Process timeline -------------------------------------------------- */
export function ProcessTimeline({
  steps,
}: {
  steps: { no: string; title: string; text: string }[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-5 sm:grid-cols-2">
      {steps.map((s, i) => (
        <Reveal key={s.no} delay={i * 0.06}>
          <div className="card h-full p-6">
            <span className="font-mono text-2xl font-semibold text-lime-2">
              {s.no}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-fg-muted">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* --- Promises (3-up) --------------------------------------------------- */
export function Promises({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.08}>
          <div className="card h-full p-7">
            <div className="icon-badge">
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-fg-muted">{p.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* --- Contact CTA ------------------------------------------------------- */
export function ContactCTA({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  const items = [
    { icon: Phone, label: "Telefon", value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Mail, label: "E-Mail", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Kontakt per Klick", href: CONTACT.whatsapp },
  ];
  return (
    <div className="surface-ink dot-texture relative overflow-hidden rounded-[var(--radius-card)] p-8 sm:p-12">
      <div className="relative max-w-xl">
        <Pill>Kontakt</Pill>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg on-ink-muted">{intro}</p>
      </div>
      <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            className="card flex items-center gap-3 p-4 transition-colors hover:bg-ink-3"
          >
            <span className="icon-badge h-10 w-10 shrink-0">
              <it.icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs on-ink-muted">{it.label}</span>
              <span className="block truncate font-medium">{it.value}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* --- Footer ------------------------------------------------------------ */
export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-[min(72rem,calc(100%-2rem))] flex-col items-center justify-between gap-4 text-sm text-fg-muted sm:flex-row">
        <Logo className="text-[15px]" />
        <p className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" /> {CONTACT.office} · {CONTACT.phone}
        </p>
        <div className="flex gap-5">
          <Link href="/impressum" className="hover:text-fg">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-fg">Datenschutz</Link>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-fg-subtle">
        © 2026 WorkLink · Vermittlung von Fachkräften aus dem Westbalkan
      </p>
    </footer>
  );
}
