/**
 * Zentrale Inhalte (aus dem Agentur-Gashi-Bestand übernommen, neu strukturiert).
 * Deutsch = Unternehmensseite, Albanisch = Bewerberseite.
 */

export const CONTACT = {
  phone: "+383 48 119 114",
  phoneHref: "tel:+38348119114",
  email: "info@kosovo-personal.com",
  whatsapp: "https://wa.me/38348119114",
  office: "Prishtinë, Kosovo",
};

export type Industry = { key: string; de: string; sq: string; img: string };

export const INDUSTRIES: Industry[] = [
  { key: "medizin", de: "Medizin", sq: "Mjekësi", img: "/industries/medizin.webp" },
  { key: "reinigung", de: "Reinigung", sq: "Pastrim", img: "/industries/reinigung.webp" },
  { key: "kundenservice", de: "Kundenservice", sq: "Shërbim klientësh", img: "/industries/kundenservice.webp" },
  { key: "transport", de: "Transport", sq: "Transport", img: "/industries/transport.webp" },
  { key: "backoffice", de: "Backoffice", sq: "Backoffice", img: "/industries/backoffice.webp" },
  { key: "marketing", de: "Marketing", sq: "Marketing", img: "/industries/marketing.webp" },
  { key: "handwerk", de: "Handwerk", sq: "Zeje", img: "/industries/handwerk.webp" },
  { key: "logistik", de: "Logistik", sq: "Logjistikë", img: "/industries/logistik.webp" },
  { key: "fastfood", de: "Fast Food", sq: "Fast Food", img: "/industries/fastfood.webp" },
  { key: "gastronomie", de: "Gastronomie", sq: "Gastronomi", img: "/industries/gastronomie.webp" },
  { key: "industrie", de: "Industrie", sq: "Industri", img: "/industries/industrie.webp" },
  { key: "vertrieb", de: "Vertrieb", sq: "Shitje", img: "/industries/vertrieb.webp" },
];

/** Warum Fachkräfte aus dem Westbalkan (Unternehmensseite). */
export const WHY_BALKAN = [
  {
    title: "Jung und dynamisch",
    text: "Die Länder des Westbalkans zählen zu den jüngsten Bevölkerungen Europas. Diese Arbeitskräfte sind technologisch versiert und bringen eine natürliche Affinität für digitale Werkzeuge mit.",
  },
  {
    title: "Motivation und Engagement",
    text: "Aufgrund der wirtschaftlichen Lage im Westbalkan sind viele Menschen hoch motiviert, im Ausland zu arbeiten. Das führt zu hohem Engagement und Loyalität gegenüber Arbeitgebern.",
  },
  {
    title: "Starke Arbeitsmoral",
    text: "Kultur und Erziehung legen großen Wert auf Disziplin, Pflichtbewusstsein und Engagement. Fachkräfte aus der Region arbeiten hart und mit Entschlossenheit an ihren Zielen.",
  },
  {
    title: "Wirtschaftliche Vorteile",
    text: "Die Integration bietet signifikante wirtschaftliche Vorteile durch günstigere Lohnkosten, höhere Flexibilität und Bereitschaft für vielseitige Aufgaben.",
  },
];

/** Drei Kernversprechen (Unternehmensseite). */
export const PROMISES = [
  {
    title: "Faire Konditionen",
    text: "Transparenz und klare Konditionen für Unternehmen und Arbeitskräfte – keine versteckten Gebühren.",
  },
  {
    title: "Deutscher Support",
    text: "Deutschsprachige Ansprechpartner, klare Antworten und saubere Abwicklung vom Erstgespräch bis zum Start.",
  },
  {
    title: "Einfache Kommunikation",
    text: "Kulturelle und sprachliche Nähe sorgt für reibungslose Zusammenarbeit – vom ersten Anruf bis zum Arbeitsalltag.",
  },
];

/** Kernversprechen auf Albanisch (Bewerberseite). */
export const PROMISES_SQ = [
  {
    title: "Kushte të drejta",
    text: "Transparencë dhe kushte të drejta për punëdhënës dhe punëkërkues – pa tarifa të fshehura.",
  },
  {
    title: "Gjermanisht & Shqip",
    text: "Mbështetje në të dy gjuhët – çdo hap i qartë, nga biseda e parë deri në fillimin e punës.",
  },
  {
    title: "Përpunim i shpejtë",
    text: "Procese të optimizuara, vendosje e shpejtë dhe e sigurt e kandidatëve – pa humbje kohe.",
  },
];

/** Ablauf in 5 Schritten (Unternehmensseite). */
export const PROCESS = [
  {
    no: "01",
    title: "Anfrage",
    text: "Sie kontaktieren uns mit Ihrem Personalbedarf – Branche, Qualifikationen, Anzahl und gewünschter Starttermin. Wir klären im Erstgespräch alle offenen Punkte.",
  },
  {
    no: "02",
    title: "Kandidatensuche",
    text: "Wir screenen unseren Pool in Prishtina, führen persönliche Vorgespräche und stellen Ihnen nur Profile vor, die wirklich zu Ihren Anforderungen passen.",
  },
  {
    no: "03",
    title: "Unterlagen",
    text: "Lebenslauf, Zeugnisse, Reisepass, Arbeitsvertrag und alles Notwendige für die Vorabzustimmung der Bundesagentur für Arbeit – wir bereiten die Unterlagen mit Ihnen vor.",
  },
  {
    no: "04",
    title: "Bis zur Ankunft",
    text: "Wir begleiten den Visumsprozess bei der Deutschen Botschaft in Pristina, koordinieren die Anreise und sorgen dafür, dass Ihr neuer Mitarbeiter pünktlich starten kann.",
  },
  {
    no: "05",
    title: "Auch danach für Sie da",
    text: "Nach der Ankunft bleiben wir für Kandidat und Unternehmen zweisprachig erreichbar – bei Rückfragen zu Arbeitsalltag, Behördengängen oder Integration.",
  },
];

export const FAQ = [
  {
    q: "Wie funktioniert die Einstellung von Personal aus dem Westbalkan?",
    a: "Über die Westbalkanregelung können deutsche Unternehmen Arbeitskräfte aus Kosovo, Albanien und Nordmazedonien einstellen – auch ohne formale Berufsausbildung und unabhängig von der konkreten Tätigkeit. Wir übernehmen die Kandidatensuche, bereiten alle Unterlagen vor und begleiten Sie durch das Vorabzustimmungs- und Visumverfahren.",
  },
  {
    q: "Was kostet die Vermittlung für mein Unternehmen?",
    a: "Unsere Vermittlung ist für deutsche Unternehmen komplett kostenlos. Es fallen keine Vermittlungsgebühren, keine Provisionen und keine versteckten Kosten an. Sie zahlen ausschließlich das Gehalt Ihres neuen Mitarbeiters.",
  },
  {
    q: "Wie lange dauert das Visumverfahren für Kandidaten aus dem Westbalkan?",
    a: "Das lässt sich seriös nicht auf Wochen genau sagen. Die Westbalkanstaaten haben zwar ähnliche Kontingente, aber gerade im Kosovo ist die Nachfrage besonders hoch. Deshalb sollten Sie die Einstellung als langfristige Investition planen – nicht als kurzfristige Lückenfüllung.",
  },
  {
    q: "Was passiert, wenn die Vorabzustimmung da ist, mein Bedarf aber weggefallen ist?",
    a: "Kein Problem. Die Vorabzustimmung der Bundesagentur für Arbeit ist ca. 9 Monate gültig. Sie müssen den Kandidaten also nicht sofort einstellen, sondern können das Visumverfahren starten, sobald Ihr Bedarf wieder konkret ist.",
  },
  {
    q: "Wann genau muss der Mitarbeiter nach Visumserteilung einreisen?",
    a: "Die meisten Visa sind zu Beginn ca. 6 Monate gültig – das verschafft Ihnen Spielraum, Probezeit und Arbeitsbeginn flexibel zu planen. Der genaue Einreisezeitpunkt lässt sich an Ihren Einsatzplan anpassen.",
  },
  {
    q: "Müssen die Kandidaten Deutsch sprechen?",
    a: "Viele unserer Kandidaten haben gute bis sehr gute Deutschkenntnisse – Deutsch wird im Westbalkan an vielen Schulen unterrichtet, und die große Diaspora in Deutschland hat Spuren hinterlassen. Wir schlagen Ihnen gezielt Profile vor, die zu Ihren sprachlichen Anforderungen passen.",
  },
  {
    q: "Brauche ich eine anerkannte Berufsausbildung des Kandidaten?",
    a: "Nein. Die Westbalkanregelung erlaubt auch die Beschäftigung ohne formale Anerkennung der Berufsqualifikation – unabhängig davon, ob qualifizierte oder unqualifizierte Tätigkeiten. Reglementierte Berufe (z. B. Pflege oder Medizin) haben eigene Anforderungen, auf die wir gesondert eingehen.",
  },
  {
    q: "Welche Unterlagen muss ich als Arbeitgeber bereitstellen?",
    a: "In der Regel: ein verbindliches Arbeitsplatzangebot oder einen Arbeitsvertrag, eine Stellenbeschreibung sowie Angaben zu Gehalt und Arbeitsbedingungen. Die formalen Anträge bei der Bundesagentur für Arbeit und der Ausländerbehörde bereiten wir gemeinsam mit Ihnen vor.",
  },
  {
    q: "Wer beantragt die Vorabzustimmung bei der Bundesagentur für Arbeit?",
    a: "Die Vorabzustimmung wird durch das einstellende Unternehmen beantragt. Wir stellen Ihnen alle notwendigen Kandidatenunterlagen zusammen und unterstützen Sie beim Ausfüllen des elektronischen Antrags im Arbeitgeber-Portal der Bundesagentur.",
  },
  {
    q: "Was passiert nach der Ankunft in Deutschland?",
    a: "Wir bleiben auch nach der Einreise ansprechbar – für Sie und für den Kandidaten. Bei Fragen zu Anmeldung, Aufenthaltstitel, Arbeitsalltag oder Integration helfen wir zweisprachig (Deutsch und Albanisch) weiter.",
  },
  {
    q: "Wie viele Kandidaten kann ich gleichzeitig einstellen?",
    a: "Ob eine einzelne Fachkraft oder ein ganzes Team – wir vermitteln sowohl Einzelbesetzungen als auch größere Kontingente. Sprechen Sie uns mit Ihrem Bedarf an, wir stimmen Timing und Umfang individuell mit Ihnen ab.",
  },
];

export const STATS = [
  { value: "12", suffix: "", label: "Branchen mit akutem Bedarf" },
  { value: "24", suffix: "h", label: "Antwort auf Ihre Anfrage" },
  { value: "0", suffix: "€", label: "Vermittlungsgebühr für Unternehmen" },
  { value: "2", suffix: "-sprachig", label: "Support: Deutsch & Albanisch" },
];
