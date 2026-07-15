import Link from "next/link";
import {
  MessageCircle,
  Mail,
  ArrowUpRight,
  HeartPulse,
  Sparkles,
  Headset,
  Truck,
  Briefcase,
  Megaphone,
  Hammer,
  Warehouse,
  UtensilsCrossed,
  ConciergeBell,
  Factory,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Logo } from "@/components/logo";
import { CONTACT, INDUSTRIES, STATS } from "@/lib/content";
import { cn } from "@/lib/utils";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  pflege: HeartPulse,
  reinigung: Sparkles,
  service: Headset,
  transport: Truck,
  buero: Briefcase,
  marketing: Megaphone,
  handwerk: Hammer,
  logistik: Warehouse,
  systemgastro: UtensilsCrossed,
  hotel: ConciergeBell,
  produktion: Factory,
  handel: ShoppingCart,
};

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

/* --- Industry grid (icon cards) ---------------------------------------- */
export function IndustryGrid({ lang = "de" }: { lang?: "de" | "sq" }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {INDUSTRIES.map((ind, i) => {
        const Icon = INDUSTRY_ICONS[ind.key] ?? Briefcase;
        return (
          <Reveal key={ind.key} delay={(i % 4) * 0.05}>
            <div className="group flex h-full items-center gap-3.5 rounded-2xl border border-border bg-bg-elevated p-4 transition-colors hover:border-lime-2 sm:p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime/15 text-lime-2 transition-colors group-hover:bg-lime group-hover:text-on-lime">
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <span className="text-[15px] font-semibold leading-snug">
                {ind[lang]}
              </span>
            </div>
          </Reveal>
        );
      })}
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
    ...(CONTACT.whatsapp
      ? [{ icon: MessageCircle, label: "WhatsApp", value: "Kontakt per Klick", href: CONTACT.whatsapp }]
      : []),
    { icon: Mail, label: "E-Mail", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];
  return (
    <div className="surface-soft relative overflow-hidden rounded-[var(--radius-card)] border border-border p-8 sm:p-12">
      <div className="relative max-w-xl">
        <Pill>Kontakt</Pill>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-fg-muted">{intro}</p>
      </div>
      <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            className="flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated p-4 transition-colors hover:border-lime-2"
          >
            <span className="icon-badge h-10 w-10 shrink-0">
              <it.icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-fg-subtle">{it.label}</span>
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
        <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-fg">
          <Mail className="h-4 w-4" /> {CONTACT.email}
        </a>
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
