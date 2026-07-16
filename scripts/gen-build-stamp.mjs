// Erzeugt src/lib/build-info.ts mit dem Build-Zeitpunkt (deutsche Zeit).
// Läuft automatisch vor `next build` und `next dev` (siehe package.json).
import { writeFileSync, mkdirSync } from "node:fs";

const stamp = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Berlin",
}).format(new Date());

mkdirSync("src/lib", { recursive: true });
writeFileSync(
  "src/lib/build-info.ts",
  `// Automatisch generiert — nicht von Hand bearbeiten (scripts/gen-build-stamp.mjs).\nexport const BUILD_STAMP = ${JSON.stringify(stamp)};\n`,
);
console.log("build-stamp:", stamp);
