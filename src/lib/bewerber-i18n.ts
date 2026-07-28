import type { Lang } from "@/lib/apply-i18n";

/** Texte der Bewerber-Infoseite in allen vier Sprachen. */
export type BewerberDict = {
  pill: string;
  title1: string;
  title2: string;
  heroText: string;
  applyCta: string;
  perks: string[];
  panelKicker: string;
  panelStats: [string, string][];
  industriesPill: string;
  industriesTitle: string;
  industriesIntro: string;
  stepsPill: string;
  stepsTitle: string;
  stepsIntro: string;
  steps: { no: string; title: string; text: string }[];
  promisesPill: string;
  promisesTitle: string;
  promises: { title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

export const BEWERBER: Record<Lang, BewerberDict> = {
  sq: {
    pill: "Për kandidatë",
    title1: "Karriera jote",
    title2: "në Gjermani.",
    heroText:
      "Puno në Gjermani me kontratë të rregullt — WorkLink të lidh me punëdhënës gjermanë dhe të shoqëron nga aplikimi deri në ditën e parë të punës.",
    applyCta: "Apliko tani",
    perks: ["Çmime të drejta", "Gjermanisht & Shqip", "Mbështetje deri në fund"],
    panelKicker: "Pse WorkLink?",
    panelStats: [
      ["Çmime të drejta", "kushte të qarta dhe transparente — pa kosto të fshehura"],
      ["4 gjuhë", "apliko në gjuhën tënde"],
      ["5 hapa", "nga aplikimi deri në ditën e parë të punës në Gjermani"],
    ],
    industriesPill: "Fushat",
    industriesTitle: "Profesionet që kërkohen në Gjermani",
    industriesIntro: "Këto janë fushat ku punëdhënësit gjermanë kërkojnë njerëz tani.",
    stepsPill: "Rrugëtimi",
    stepsTitle: "Në 5 hapa drejt Gjermanisë",
    stepsIntro: "Nga aplikimi i parë deri te dita e parë e punës – të shoqërojmë në çdo hap.",
    steps: [
      { no: "01", title: "Apliko", text: "Plotëso formularin dhe ngarko dokumentet — për pak minuta." },
      { no: "02", title: "Njihemi", text: "Ne shqyrtojmë profilin tënd dhe gjejmë punëdhënës gjermanë që të përshtaten." },
      { no: "03", title: "Dokumentet", text: "CV, dëftesa, pasaporta dhe kontrata – i përgatisim bashkë për miratimin paraprak." },
      { no: "04", title: "Viza", text: "Të shoqërojmë në procesin e vizës në Ambasadën Gjermane." },
      { no: "05", title: "Mbërritja", text: "Të përcjellim deri në ditën e parë të punës në Gjermani." },
    ],
    promisesPill: "Përparësitë",
    promisesTitle: "Çfarë të garantojmë ne",
    promises: [
      { title: "Një person përgjegjës për ty", text: "Nga aplikimi deri në ditën e parë të punës të shoqëron i njëjti kontakt." },
      { title: "Çmime të drejta", text: "Kushte të qarta dhe transparente që në fillim — pa kosto të fshehura." },
      { title: "Shqip dhe gjermanisht", text: "Flasim gjuhën tënde dhe atë të punëdhënësit — çdo hap të shpjegohet qartë." },
    ],
    ctaTitle: "Apliko tani",
    ctaText: "Formulari është në gjuhën tënde — vetëm pak minuta.",
    ctaButton: "Fillo aplikimin",
  },
  bs: {
    pill: "Za kandidate",
    title1: "Tvoja karijera",
    title2: "u Njemačkoj.",
    heroText:
      "Radi u Njemačkoj s urednim ugovorom — WorkLink te povezuje s njemačkim poslodavcima i prati te od prijave do prvog radnog dana.",
    applyCta: "Prijavi se sada",
    perks: ["Fer uslovi", "Njemački & Bosanski", "Podrška do kraja"],
    panelKicker: "Zašto WorkLink?",
    panelStats: [
      ["Fer cijene", "jasni i transparentni uslovi — bez skrivenih troškova"],
      ["4 jezika", "prijavi se na svom jeziku"],
      ["5 koraka", "od prijave do prvog radnog dana u Njemačkoj"],
    ],
    industriesPill: "Područja",
    industriesTitle: "Zanimanja tražena u Njemačkoj",
    industriesIntro: "Ovo su područja u kojima njemački poslodavci sada traže ljude.",
    stepsPill: "Put",
    stepsTitle: "U 5 koraka do Njemačke",
    stepsIntro: "Od prve prijave do prvog radnog dana – pratimo te u svakom koraku.",
    steps: [
      { no: "01", title: "Prijava", text: "Popuni formular i dodaj dokumente — za nekoliko minuta." },
      { no: "02", title: "Upoznavanje", text: "Pregledamo tvoj profil i nalazimo njemačke poslodavce koji ti odgovaraju." },
      { no: "03", title: "Dokumenti", text: "CV, svjedočanstva, pasoš i ugovor – zajedno ih pripremamo za prethodno odobrenje." },
      { no: "04", title: "Viza", text: "Pratimo te kroz postupak vize u njemačkoj ambasadi." },
      { no: "05", title: "Dolazak", text: "Uz tebe smo do prvog radnog dana u Njemačkoj." },
    ],
    promisesPill: "Prednosti",
    promisesTitle: "Šta ti garantujemo",
    promises: [
      { title: "Jedna osoba za tebe", text: "Od prijave do prvog radnog dana prati te isti kontakt." },
      { title: "Fer cijene", text: "Jasni i transparentni uslovi od početka — bez skrivenih troškova." },
      { title: "Bosanski i njemački", text: "Govorimo tvoj jezik i jezik poslodavca — svaki korak ti je jasan." },
    ],
    ctaTitle: "Prijavi se sada",
    ctaText: "Formular je na tvom jeziku — samo nekoliko minuta.",
    ctaButton: "Započni prijavu",
  },
  hr: {
    pill: "Za kandidate",
    title1: "Tvoja karijera",
    title2: "u Njemačkoj.",
    heroText:
      "Radi u Njemačkoj s urednim ugovorom — WorkLink te povezuje s njemačkim poslodavcima i prati te od prijave do prvog radnog dana.",
    applyCta: "Prijavi se sada",
    perks: ["Fer uvjeti", "Njemački & Hrvatski", "Podrška do kraja"],
    panelKicker: "Zašto WorkLink?",
    panelStats: [
      ["Fer cijene", "jasni i transparentni uvjeti — bez skrivenih troškova"],
      ["4 jezika", "prijavi se na svom jeziku"],
      ["5 koraka", "od prijave do prvog radnog dana u Njemačkoj"],
    ],
    industriesPill: "Područja",
    industriesTitle: "Zanimanja tražena u Njemačkoj",
    industriesIntro: "Ovo su područja u kojima njemački poslodavci sada traže ljude.",
    stepsPill: "Put",
    stepsTitle: "U 5 koraka do Njemačke",
    stepsIntro: "Od prve prijave do prvog radnog dana – pratimo te u svakom koraku.",
    steps: [
      { no: "01", title: "Prijava", text: "Ispuni formular i dodaj dokumente — za nekoliko minuta." },
      { no: "02", title: "Upoznavanje", text: "Pregledavamo tvoj profil i nalazimo njemačke poslodavce koji ti odgovaraju." },
      { no: "03", title: "Dokumenti", text: "Životopis, svjedodžbe, putovnica i ugovor – zajedno ih pripremamo za prethodno odobrenje." },
      { no: "04", title: "Viza", text: "Pratimo te kroz postupak vize u njemačkom veleposlanstvu." },
      { no: "05", title: "Dolazak", text: "Uz tebe smo do prvog radnog dana u Njemačkoj." },
    ],
    promisesPill: "Prednosti",
    promisesTitle: "Što ti jamčimo",
    promises: [
      { title: "Jedna osoba za tebe", text: "Od prijave do prvog radnog dana prati te isti kontakt." },
      { title: "Fer cijene", text: "Jasni i transparentni uvjeti od početka — bez skrivenih troškova." },
      { title: "Hrvatski i njemački", text: "Govorimo tvoj jezik i jezik poslodavca — svaki korak ti je jasan." },
    ],
    ctaTitle: "Prijavi se sada",
    ctaText: "Formular je na tvom jeziku — samo nekoliko minuta.",
    ctaButton: "Započni prijavu",
  },
  mk: {
    pill: "За кандидати",
    title1: "Твојата кариера",
    title2: "во Германија.",
    heroText:
      "Работи во Германија со уреден договор — WorkLink те поврзува со германски работодавци и те следи од апликацијата до првиот работен ден.",
    applyCta: "Аплицирај сега",
    perks: ["Фер услови", "Германски & Македонски", "Поддршка до крај"],
    panelKicker: "Зошто WorkLink?",
    panelStats: [
      ["Фер цени", "јасни и транспарентни услови — без скриени трошоци"],
      ["4 јазици", "аплицирај на својот јазик"],
      ["5 чекори", "од апликација до првиот работен ден во Германија"],
    ],
    industriesPill: "Области",
    industriesTitle: "Барани професии во Германија",
    industriesIntro: "Ова се областите каде германските работодавци сега бараат луѓе.",
    stepsPill: "Патот",
    stepsTitle: "Во 5 чекори до Германија",
    stepsIntro: "Од првата апликација до првиот работен ден – те следиме на секој чекор.",
    steps: [
      { no: "01", title: "Апликација", text: "Пополни го формуларот и додај документи — за неколку минути." },
      { no: "02", title: "Запознавање", text: "Го прегледуваме твојот профил и наоѓаме германски работодавци што ти одговараат." },
      { no: "03", title: "Документи", text: "CV, свидетелства, пасош и договор – заедно ги подготвуваме за претходно одобрение." },
      { no: "04", title: "Виза", text: "Те следиме низ постапката за виза во германската амбасада." },
      { no: "05", title: "Пристигнување", text: "Со тебе сме до првиот работен ден во Германија." },
    ],
    promisesPill: "Предности",
    promisesTitle: "Што ти гарантираме",
    promises: [
      { title: "Една личност за тебе", text: "Од апликацијата до првиот работен ден те следи истиот контакт." },
      { title: "Фер цени", text: "Јасни и транспарентни услови од почеток — без скриени трошоци." },
      { title: "Македонски и германски", text: "Го зборуваме твојот јазик и јазикот на работодавецот — секој чекор ти е јасен." },
    ],
    ctaTitle: "Аплицирај сега",
    ctaText: "Формуларот е на твојот јазик — само неколку минути.",
    ctaButton: "Започни апликација",
  },
};
