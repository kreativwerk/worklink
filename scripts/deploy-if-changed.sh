#!/bin/bash
# WorkLink — Auto-Deploy-Wächter (läuft per Cron auf dem VPS).
# Prüft, ob es neue Commits auf dem Branch gibt, und deployt nur dann.
# Installation: siehe README („Automatisches Deployment").
set -e

cd "$(dirname "$0")/.."
BRANCH="claude/recruitment-webapp-stack-wczm2v"

# Nie zwei Deployments gleichzeitig laufen lassen.
exec 9>/tmp/worklink-deploy.lock
flock -n 9 || exit 0

git fetch origin "$BRANCH" --quiet
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse "origin/$BRANCH")
[ "$LOCAL" = "$REMOTE" ] && exit 0

echo "[$(date '+%F %T')] Neue Version erkannt: ${REMOTE:0:10} — deploye …"
git reset --hard "origin/$BRANCH" --quiet
docker compose up -d --build app 2>&1 | tail -3
docker image prune -f >/dev/null
echo "[$(date '+%F %T')] ✓ Live: ${REMOTE:0:10}"
