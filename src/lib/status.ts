import type { ApplicationStatus } from "@prisma/client";

/** Pipeline stages in order, with German labels (mirrors the dashboard). */
export const STATUS_ORDER: ApplicationStatus[] = [
  "NEU",
  "ZAV_ANFRAGE",
  "VORABZUSTIMMUNG",
  "VERTRAG_EZB",
  "ONBOARDED",
  "SCHEDULED_TRAINING",
  "EINGESTELLT",
  "REJECTED",
];

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  NEU: "Neu",
  ZAV_ANFRAGE: "ZAV Anfrage",
  VORABZUSTIMMUNG: "Vorabzustimmung",
  VERTRAG_EZB: "Vertrag/EZB",
  ONBOARDED: "Onboarded",
  SCHEDULED_TRAINING: "Scheduled training",
  EINGESTELLT: "Eingestellt",
  REJECTED: "Rejected",
};

export const DOC_LABEL: Record<string, string> = {
  idFront: "Pass / Personalausweis · Vorderseite",
  idBack: "Personalausweis · Rückseite",
  selfie: "Selfie · Driver Badge",
  licenseFront: "Führerschein · Vorderseite",
  licenseBack: "Führerschein · Rückseite",
  certificate: "Zeugnis / Zertifikat",
};
