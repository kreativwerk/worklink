import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";

/** Slim top bar for interior pages with a back-to-home affordance. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      <div className="glass mx-auto mt-4 flex w-[min(64rem,calc(100%-2rem))] items-center justify-between rounded-full px-5 py-2.5">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Zurück</span>
        </Link>
        <Link href="/">
          <Logo className="text-[15px]" />
        </Link>
        <Link
          href="/bewerber"
          className="rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Kontakt
        </Link>
      </div>
    </header>
  );
}
