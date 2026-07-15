#!/bin/sh
set -e

echo "→ Datenbank-Migrationen anwenden …"
./node_modules/.bin/prisma migrate deploy

echo "→ WorkLink startet auf Port ${PORT:-3000} …"
exec ./node_modules/.bin/next start -p "${PORT:-3000}"
