import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { CONTACT } from "@/lib/content";

/** Slim top bar for interior pages with a back-to-home affordance. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 pt-4">
      <div className="mx-auto flex w-[min(72rem,calc(100%-2rem))] items-center justify-between rounded-full border border-border bg-bg-elevated/80 px-5 py-2.5 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Zurück</span>
        </Link>
        <Link href="/">
          <Logo className="text-[15px]" />
        </Link>
        {CONTACT.whatsapp ? (
          <a href={CONTACT.whatsapp} className="btn btn-lime px-4 py-2 text-sm">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        ) : (
          <a href={`mailto:${CONTACT.email}`} className="btn btn-lime px-4 py-2 text-sm">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Kontakt</span>
          </a>
        )}
      </div>
    </header>
  );
}
