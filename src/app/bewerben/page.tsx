import type { Metadata } from "next";
import { ApplyWizard } from "@/components/apply/apply-wizard";
import { LANGS, type Lang } from "@/lib/apply-i18n";

export const metadata: Metadata = {
  title: "Aplikacion · Prijava · Апликација — WorkLink",
  description:
    "Bewerbungsformular für Arbeitskräfte aus dem Westbalkan — Shqip, Bosanski, Hrvatski, Македонски.",
};

export default async function BewerbenPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const initialLang = LANGS.some((l) => l.code === lang)
    ? (lang as Lang)
    : undefined;
  return <ApplyWizard initialLang={initialLang} />;
}
