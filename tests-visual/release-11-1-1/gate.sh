#!/usr/bin/env bash
# The exits gate: every project of `release-11-1-1.config.ts`, in four parts, one
# Playwright process per part and project. A WebKit process that opened about ninety
# pages hung on its next `page.goto`, so no process here opens more than about fifty.
# Each process starts its own demo server and stops it when it ends, on the port
# GLASS_UI_DEMO_PORT names or, unset, on a free one chosen for that process. It never
# measures a server it did not start: with GLASS_UI_DEMO_OWN set, the config fails a run
# whose port already answers. On a machine with the run guard, each run goes through it,
# WebKit runs one at a time.
set -euo pipefail
cd "$(dirname "$0")/.."
GUARD="$HOME/.claude/guard/guarded"
parts=(
    "(form|glass|exit|routes|round|weight|lift) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
named_port="${GLASS_UI_DEMO_PORT:-}"
free_port() {
    node -e 'const s = require("net").createServer(); s.listen(0, "localhost", () => { console.log(s.address().port); s.close(); });'
}
export GLASS_UI_DEMO_OWN=1
for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for part in "${parts[@]}"; do
        port="${named_port:-$(free_port)}"
        export GLASS_UI_DEMO_PORT="$port" GLASS_UI_DEMO_URL="http://localhost:$port"
        run=(npx playwright test -c release-11-1-1.config.ts --project="$project" --workers=1 -g "$part")
        if [[ -x "$GUARD" ]]; then
            case $project in
                webkit-*) run=("$GUARD" --exclusive webkit --timeout 60 -- "${run[@]}") ;;
                *) run=("$GUARD" --timeout 60 -- "${run[@]}") ;;
            esac
        fi
        echo "== exits · $project · $part · port $port"
        "${run[@]}"
    done
done
