#!/usr/bin/env bash
# The exits gate: every project of `release-11-1-1.config.ts`, in three parts, one
# Playwright process per part and project. A WebKit process that opened about ninety
# pages hung on its next `page.goto`, so no process here opens more than about fifty.
# On a machine with the run guard, each run goes through it, WebKit runs one at a time.
set -euo pipefail
cd "$(dirname "$0")/.."
GUARD="$HOME/.claude/guard/guarded"
parts=(
    "(form|glass|exit|routes|round|weight|lift) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
)
for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for part in "${parts[@]}"; do
        run=(npx playwright test -c release-11-1-1.config.ts --project="$project" --workers=1 -g "$part")
        if [[ -x "$GUARD" ]]; then
            case $project in
                webkit-*) run=("$GUARD" --exclusive webkit --timeout 60 -- "${run[@]}") ;;
                *) run=("$GUARD" --timeout 60 -- "${run[@]}") ;;
            esac
        fi
        echo "== exits · $project · $part"
        "${run[@]}"
    done
done
