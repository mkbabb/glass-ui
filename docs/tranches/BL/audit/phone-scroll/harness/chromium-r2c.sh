#!/usr/bin/env bash
# chromium-r2c.sh: the Chromium cuts on the rebuilt cured tree (5362), after the scrim's
# press change. Under the guard: guarded --timeout 30 -- ./chromium-r2c.sh
set -uo pipefail
cd "$(dirname "$0")"
until mkdir logs/r2/.seat 2>/dev/null; do sleep 5; done
trap 'rmdir logs/r2/.seat' EXIT
node cuts.mjs chromium 5362 data/r2/cuts-chromium-cure.json > logs/r2/cuts-chromium-cure.log 2>&1
