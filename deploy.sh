#!/bin/sh
# WorkLink — Live-Update auf dem VPS.
# Holt den neuesten Stand vom Git-Branch und baut die App neu.
# Aufruf auf dem VPS:  ./deploy.sh   (im Projektordner)
set -e

BRANCH="${1:-claude/recruitment-webapp-stack-wczm2v}"

echo "→ Hole neuesten Stand von '$BRANCH' …"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "→ Baue und starte Container neu …"
docker compose up -d --build app

echo "→ Aufräumen alter Images …"
docker image prune -f >/dev/null

echo "✓ Deployment fertig: https://$(grep -E '^DOMAIN=' .env | cut -d= -f2)"
