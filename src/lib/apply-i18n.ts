/**
 * Mehrsprachiges Bewerbungsformular (Shqip / Bosanski / Hrvatski).
 * Berufsbezeichnungen bleiben bewusst auf Deutsch (so wie am Arbeitsplatz).
 */

export type Lang = "sq" | "bs" | "hr";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "sq", label: "Shqip", flag: "🇦🇱" },
  { code: "bs", label: "Bosanski", flag: "🇧🇦" },
  { code: "hr", label: "Hrvatski", flag: "🇭🇷" },
];

export const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
export const SHOE_SIZES = Array.from({ length: 15 }, (_, i) => String(36 + i)); // 36–50

type Dict = {
  // chrome
  chooseLanguage: string;
  next: string;
  back: string;
  submit: string;
  submitting: string;
  step: string;
  of: string;
  optional: string;
  autoHint: string;
  yes: string;
  no: string;
  // preselection questions
  q_employment: string;
  employment_full: string;
  employment_part: string;
  q_truck: string;
  q_field: string;
  q_amazon: string;
  // identity
  sec_identity: string;
  firstName: string;
  lastName: string;
  dob: string;
  placeOfBirth: string;
  nationality: string;
  countryOfBirth: string;
  // address
  sec_address: string;
  street: string;
  postal: string;
  city: string;
  livingSince: string;
  // contact & sizing
  sec_contact: string;
  email: string;
  phone: string;
  tshirt: string;
  shoe: string;
  // documents
  sec_documents: string;
  docHint: string;
  doc_idFront: string;
  doc_idBack: string;
  doc_selfie: string;
  doc_licenseFront: string;
  doc_licenseBack: string;
  doc_certificates: string;
  doc_certificatesHint: string;
  uploadCta: string;
  // consent + done
  sec_consent: string;
  consentText: string;
  consentLabel: string;
  done_title: string;
  done_body: string;
  intro: string;
};

export const DICT: Record<Lang, Dict> = {
  sq: {
    chooseLanguage: "Zgjidhni gjuhën",
    next: "Vazhdo",
    back: "Prapa",
    submit: "Dërgo aplikimin",
    submitting: "Duke dërguar …",
    step: "Hapi",
    of: "nga",
    optional: "opsionale",
    autoHint: "Zgjidh një opsion për të vazhduar",
    yes: "Po",
    no: "Jo",
    q_employment: "Çfarë lloj pune dëshiron?",
    employment_full: "Kohë e plotë",
    employment_part: "Kohë e pjesshme",
    q_truck: "A ke patentë kamioni (Lkw)?",
    q_field: "Në cilën fushë dëshiron të punosh?",
    q_amazon: "A ke përvojë si Amazon partner ose shofer?",
    sec_identity: "Të dhënat personale",
    firstName: "Emri",
    lastName: "Mbiemri",
    dob: "Data e lindjes",
    placeOfBirth: "Vendlindja",
    nationality: "Shtetësia",
    countryOfBirth: "Shteti i lindjes",
    sec_address: "Adresa",
    street: "Rruga dhe numri",
    postal: "Kodi postar",
    city: "Qyteti",
    livingSince: "Banoj këtu që nga",
    sec_contact: "Kontakti dhe madhësitë",
    email: "Email",
    phone: "Telefoni (WhatsApp)",
    tshirt: "Madhësia e bluzës",
    shoe: "Numri i këpucëve",
    sec_documents: "Dokumentet",
    docHint: "Foto ose PDF · maksimumi 10 MB",
    doc_idFront: "Pasaporta / Letërnjoftimi · Ana e parë",
    doc_idBack: "Letërnjoftimi · Ana e prapme",
    doc_selfie: "Selfie · Foto për badge",
    doc_licenseFront: "Patenta · Ana e parë",
    doc_licenseBack: "Patenta · Ana e prapme",
    doc_certificates: "Dëftesa / Certifikata (kualifikime)",
    doc_certificatesHint: "Mund të ngarkosh disa skedarë",
    uploadCta: "Zgjidh skedarin",
    sec_consent: "Pëlqimi",
    consentText:
      "Pajtohem që të dhënat e mia të përpunohen sipas GDPR-së për qëllime të ndërmjetësimit të punës.",
    consentLabel: "Pranoj përpunimin e të dhënave (GDPR).",
    done_title: "Aplikimi u dërgua!",
    done_body:
      "Faleminderit! Do t'i shqyrtojmë dokumentet dhe do të kontaktojmë me hapat e ardhshëm.",
    intro: "Plotësoje në pak minuta. Të gjitha të dhënat trajtohen në mënyrë konfidenciale.",
  },
  bs: {
    chooseLanguage: "Odaberite jezik",
    next: "Dalje",
    back: "Nazad",
    submit: "Pošalji prijavu",
    submitting: "Slanje …",
    step: "Korak",
    of: "od",
    optional: "opcionalno",
    autoHint: "Odaberi opciju za nastavak",
    yes: "Da",
    no: "Ne",
    q_employment: "Kakav posao želiš?",
    employment_full: "Puno radno vrijeme",
    employment_part: "Skraćeno radno vrijeme",
    q_truck: "Imaš li vozačku za kamion (Lkw)?",
    q_field: "U kojem području želiš raditi?",
    q_amazon: "Imaš li iskustva kao Amazon partner ili vozač?",
    sec_identity: "Lični podaci",
    firstName: "Ime",
    lastName: "Prezime",
    dob: "Datum rođenja",
    placeOfBirth: "Mjesto rođenja",
    nationality: "Državljanstvo",
    countryOfBirth: "Zemlja rođenja",
    sec_address: "Adresa",
    street: "Ulica i broj",
    postal: "Poštanski broj",
    city: "Grad",
    livingSince: "Ovdje živim od",
    sec_contact: "Kontakt i veličine",
    email: "Email",
    phone: "Telefon (WhatsApp)",
    tshirt: "Veličina majice",
    shoe: "Broj cipela",
    sec_documents: "Dokumenti",
    docHint: "Foto ili PDF · maks. 10 MB",
    doc_idFront: "Pasoš / Lična karta · Prednja strana",
    doc_idBack: "Lična karta · Zadnja strana",
    doc_selfie: "Selfie · Fotografija za badge",
    doc_licenseFront: "Vozačka dozvola · Prednja strana",
    doc_licenseBack: "Vozačka dozvola · Zadnja strana",
    doc_certificates: "Svjedočanstva / Certifikati (kvalifikacije)",
    doc_certificatesHint: "Možeš dodati više datoteka",
    uploadCta: "Odaberi datoteku",
    sec_consent: "Saglasnost",
    consentText:
      "Slažem se da se moji podaci obrađuju u skladu s GDPR-om u svrhu posredovanja pri zapošljavanju.",
    consentLabel: "Prihvaćam obradu podataka (GDPR).",
    done_title: "Prijava je poslana!",
    done_body:
      "Hvala! Pregledat ćemo dokumente i javiti se sa sljedećim koracima.",
    intro: "Ispuni za nekoliko minuta. Svi podaci se tretiraju povjerljivo.",
  },
  hr: {
    chooseLanguage: "Odaberite jezik",
    next: "Dalje",
    back: "Natrag",
    submit: "Pošalji prijavu",
    submitting: "Slanje …",
    step: "Korak",
    of: "od",
    optional: "neobavezno",
    autoHint: "Odaberi opciju za nastavak",
    yes: "Da",
    no: "Ne",
    q_employment: "Kakav posao želiš?",
    employment_full: "Puno radno vrijeme",
    employment_part: "Skraćeno radno vrijeme",
    q_truck: "Imaš li vozačku za kamion (Lkw)?",
    q_field: "U kojem području želiš raditi?",
    q_amazon: "Imaš li iskustva kao Amazon partner ili vozač?",
    sec_identity: "Osobni podaci",
    firstName: "Ime",
    lastName: "Prezime",
    dob: "Datum rođenja",
    placeOfBirth: "Mjesto rođenja",
    nationality: "Državljanstvo",
    countryOfBirth: "Zemlja rođenja",
    sec_address: "Adresa",
    street: "Ulica i broj",
    postal: "Poštanski broj",
    city: "Grad",
    livingSince: "Ovdje živim od",
    sec_contact: "Kontakt i veličine",
    email: "Email",
    phone: "Telefon (WhatsApp)",
    tshirt: "Veličina majice",
    shoe: "Broj cipela",
    sec_documents: "Dokumenti",
    docHint: "Foto ili PDF · maks. 10 MB",
    doc_idFront: "Putovnica / Osobna iskaznica · Prednja strana",
    doc_idBack: "Osobna iskaznica · Stražnja strana",
    doc_selfie: "Selfie · Fotografija za badge",
    doc_licenseFront: "Vozačka dozvola · Prednja strana",
    doc_licenseBack: "Vozačka dozvola · Stražnja strana",
    doc_certificates: "Svjedodžbe / Certifikati (kvalifikacije)",
    doc_certificatesHint: "Možeš dodati više datoteka",
    uploadCta: "Odaberi datoteku",
    sec_consent: "Suglasnost",
    consentText:
      "Slažem se da se moji podaci obrađuju u skladu s GDPR-om u svrhu posredovanja pri zapošljavanju.",
    consentLabel: "Prihvaćam obradu podataka (GDPR).",
    done_title: "Prijava je poslana!",
    done_body:
      "Hvala! Pregledat ćemo dokumente i javiti se sa sljedećim koracima.",
    intro: "Ispuni u nekoliko minuta. Svi podaci se tretiraju povjerljivo.",
  },
};
