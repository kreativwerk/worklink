import { redirect } from "next/navigation";

/** Ohne Sprachangabe zur albanischen Version (größte Zielgruppe). */
export default function BewerberIndex() {
  redirect("/bewerber/sq");
}
