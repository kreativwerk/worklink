import "dotenv/config";
import { defineConfig } from "prisma/config";

// DATABASE_URL ist nur für Migrationen/Introspection nötig (Laufzeit/CLI).
// Beim Docker-Build (prisma generate) existiert sie nicht — daher optional.
const url = process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  ...(url ? { datasource: { url } } : {}),
});
