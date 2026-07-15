import type { Metadata } from "next";
import { ApplyWizard } from "@/components/apply/apply-wizard";

export const metadata: Metadata = {
  title: "Aplikacion · Bewerbung — WorkLink",
  description:
    "Bewerbungsformular für Fachkräfte aus dem Westbalkan. Aplikoni në Shqip, Bosanski ose Hrvatski.",
};

export default function BewerbenPage() {
  return <ApplyWizard />;
}
