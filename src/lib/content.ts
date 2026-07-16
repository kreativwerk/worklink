/**
 * Zentrale Inhalte — eigene WorkLink-Texte.
 * Deutsch = Unternehmensseite, Albanisch = Bewerberseite.
 */

export const CONTACT = {
  email: "info@worklink-recruiting.com",
  // TODO: WhatsApp-Business-Link eintragen, sobald er vorliegt.
  // Solange das Feld leer ist, werden WhatsApp-Buttons automatisch ausgeblendet.
  whatsapp: "",
};

export type Industry = { key: string; de: string; sq: string };

export const INDUSTRIES: Industry[] = [
  { key: "pflege", de: "Pflege & Medizin", sq: "Kujdes & Mjekësi" },
  { key: "reinigung", de: "Gebäudereinigung", sq: "Pastrim profesional" },
  { key: "service", de: "Callcenter & Service", sq: "Qendër thirrjesh" },
  { key: "transport", de: "Transport & Fahrer", sq: "Transport & Shoferë" },
  { key: "buero", de: "Büro & Verwaltung", sq: "Zyrë & Administratë" },
  { key: "marketing", de: "Marketing & Medien", sq: "Marketing & Media" },
  { key: "handwerk", de: "Bau & Handwerk", sq: "Ndërtim & Zeje" },
  { key: "logistik", de: "Lager & Logistik", sq: "Depo & Logjistikë" },
  { key: "systemgastro", de: "Systemgastronomie", sq: "Gastronomi e shpejtë" },
  { key: "hotel", de: "Hotel & Gastronomie", sq: "Hotel & Gastronomi" },
  { key: "produktion", de: "Produktion & Industrie", sq: "Prodhim & Industri" },
  { key: "handel", de: "Handel & Vertrieb", sq: "Tregti & Shitje" },
];

/** Warum Arbeitskräfte aus dem Westbalkan (Unternehmensseite). */
export const WHY_POINTS = [
  {
    title: "Junge Jahrgänge, echte Motivation",
    text: "Während Deutschland altert, wächst im Westbalkan eine junge Generation heran, die im Ausland etwas aufbauen will. Wer sich bei uns bewirbt, hat sich bewusst für Deutschland entschieden.",
  },
  {
    title: "Deutsch ist dort kein Fremdwort",
    text: "Fast jede Familie in der Region hat Verwandte in Deutschland, Österreich oder der Schweiz. Viele Kandidaten bringen Sprachkenntnisse und ein realistisches Bild vom Arbeitsalltag mit.",
  },
  {
    title: "Zupacken gehört zur Kultur",
    text: "Handwerkliches Können und Verlässlichkeit haben in der Region einen hohen Stellenwert. Unsere Kandidaten wollen bleiben und sich beweisen — nicht nur eine Saison überbrücken.",
  },
  {
    title: "Rechtlich klar geregelt",
    text: "Die Westbalkanregelung schafft einen sauberen, planbaren Weg zur Beschäftigung — auch ohne formale Anerkennung eines Berufsabschlusses. Wir kennen das Verfahren im Detail.",
  },
];

/** Kernversprechen (Unternehmensseite). */
export const PROMISES = [
  {
    title: "Ein fester Ansprechpartner",
    text: "Keine Hotline, kein Ticketsystem: Von der ersten Anfrage bis zum Arbeitsbeginn betreut Sie durchgehend dieselbe Person.",
  },
  {
    title: "Faire, transparente Preise",
    text: "Sie kennen alle Kosten, bevor Sie sich binden — eine faire Pauschale, kein Kleingedrucktes, keine Überraschungen im Nachgang.",
  },
  {
    title: "Zwei Sprachen, kurze Wege",
    text: "Wir sprechen Deutsch mit Ihnen und Albanisch mit den Kandidaten. Missverständnisse werden gelöst, bevor sie entstehen.",
  },
];

/** Kernversprechen auf Albanisch (Bewerberseite). */
export const PROMISES_SQ = [
  {
    title: "Një person përgjegjës për ty",
    text: "Nga aplikimi deri në ditën e parë të punës të shoqëron i njëjti kontakt — pa u humbur nëpër zyra.",
  },
  {
    title: "Çmime të drejta",
    text: "Kushte të qarta dhe transparente që në fillim — pa kosto të fshehura dhe pa surpriza.",
  },
  {
    title: "Shqip dhe gjermanisht",
    text: "Flasim gjuhën tënde dhe atë të punëdhënësit — çdo hap të shpjegohet qartë.",
  },
];

/** Ablauf (Unternehmensseite). */
export const PROCESS = [
  {
    no: "01",
    title: "Bedarf verstehen",
    text: "Im Erstgespräch klären wir Positionen, Anforderungen, Zeitrahmen und Konditionen — damit wir gezielt suchen statt breit zu streuen.",
  },
  {
    no: "02",
    title: "Kandidaten vorstellen",
    text: "Sie erhalten geprüfte Profile inklusive Dokumenten und Sprachstand. Interviews organisieren wir per Video, auf Wunsch mit Dolmetscher.",
  },
  {
    no: "03",
    title: "Unterlagen & Vorabzustimmung",
    text: "Arbeitsvertrag, Stellenbeschreibung, Antrag bei der Bundesagentur für Arbeit: Wir bereiten alles vor und begleiten Sie durch das Verfahren.",
  },
  {
    no: "04",
    title: "Visum & Anreise",
    text: "Wir koordinieren Botschaftstermin, Visumsantrag und Anreise, damit der Starttermin hält.",
  },
  {
    no: "05",
    title: "Ankommen & bleiben",
    text: "Auch nach dem ersten Arbeitstag bleiben wir für beide Seiten erreichbar — bei Behördengängen, Wohnungssuche oder Fragen im Alltag.",
  },
];

export const FAQ = [
  {
    q: "Auf welcher rechtlichen Grundlage stellen wir Personal aus dem Westbalkan ein?",
    a: "Grundlage ist die Westbalkanregelung (§ 26 Abs. 2 BeschV). Sie erlaubt deutschen Unternehmen die Einstellung von Staatsangehörigen aus Kosovo, Albanien, Nordmazedonien, Serbien, Bosnien-Herzegowina und Montenegro — für jede Art von Tätigkeit, auch ohne anerkannten Berufsabschluss.",
  },
  {
    q: "Was kostet uns die Zusammenarbeit?",
    a: "Sie zahlen eine faire, vorab vereinbarte Vermittlungspauschale und das Gehalt Ihres neuen Mitarbeiters. Alle Konditionen stehen im Angebot, bevor Sie sich binden — versteckte Gebühren gibt es bei uns nicht.",
  },
  {
    q: "Wie lange dauert es vom Auftrag bis zum ersten Arbeitstag?",
    a: "Profile erhalten Sie meist innerhalb weniger Tage. Der Gesamtprozess hängt vor allem vom Visumverfahren ab und ist realistisch in Monaten zu denken, nicht in Wochen. Planen Sie die Einstellung deshalb als Aufbau von Personal, nicht als kurzfristige Aushilfe.",
  },
  {
    q: "Muss der Kandidat einen anerkannten Berufsabschluss haben?",
    a: "Nein. Die Westbalkanregelung setzt keine formale Anerkennung voraus. Ausnahme sind reglementierte Berufe wie die Pflege — dort gelten eigene Anerkennungsverfahren, zu denen wir Sie gesondert beraten.",
  },
  {
    q: "Welche Unterlagen müssen wir als Arbeitgeber beisteuern?",
    a: "Im Kern: ein konkretes Arbeitsplatzangebot oder einen Arbeitsvertrag sowie Angaben zu Tätigkeit, Gehalt und Arbeitszeit. Die Anträge bei der Bundesagentur für Arbeit bereiten wir gemeinsam mit Ihnen vor.",
  },
  {
    q: "Was ist die Vorabzustimmung und wie lange ist sie gültig?",
    a: "Mit der Vorabzustimmung bestätigt die Bundesagentur für Arbeit vorab, dass der Beschäftigung nichts entgegensteht — das beschleunigt das Visumverfahren deutlich. Sie ist mehrere Monate gültig; verschiebt sich Ihr Bedarf, verfällt sie also nicht sofort.",
  },
  {
    q: "Wie gut sprechen die Kandidaten Deutsch?",
    a: "Das ist unterschiedlich — und genau deshalb erfassen wir den Sprachstand jedes Kandidaten und schlagen Ihnen nur Profile vor, die zu Ihren Anforderungen passen. Für viele Tätigkeiten reicht ein solides Grundniveau, das sich im Betrieb schnell ausbaut.",
  },
  {
    q: "Was passiert nach der Einreise?",
    a: "Wir lassen weder Sie noch den Kandidaten allein: Anmeldung, Aufenthaltstitel, Kontoeröffnung, Fragen im Alltag — wir bleiben zweisprachig ansprechbar, bis der neue Mitarbeiter wirklich angekommen ist.",
  },
];

export const STATS = [
  { value: "12", suffix: "", label: "Branchen, für die wir rekrutieren" },
  { value: "24", suffix: "h", label: "Reaktionszeit auf Ihre Anfrage" },
  { value: "6", suffix: "", label: "Länder der Westbalkanregelung" },
  { value: "2", suffix: "", label: "Sprachen: Deutsch & Albanisch" },
];
