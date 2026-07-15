import type { Metadata } from "next";
import { InquiryWizard } from "@/components/inquiry/inquiry-wizard";

export const metadata: Metadata = {
  title: "Personalanfrage — WorkLink",
  description:
    "Stellen Sie Ihre Personalanfrage in wenigen Schritten — Branche, Bedarf, Anforderungen und Unterkunft.",
};

export default function AnfragePage() {
  return <InquiryWizard />;
}
