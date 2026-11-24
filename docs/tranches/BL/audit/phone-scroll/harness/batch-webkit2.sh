#!/usr/bin/env bash
# batch-webkit2.sh: the WebKit cuts on the rebuilt cured tree (5362), after the scrim's
# press change. Under the guard: guarded --exclusive webkit --timeout 45 -- ./batch-webkit2.sh
set -uo pipefail
cd "$(dirname "$0")"
until mkdir logs/r2/.seat 2>/dev/null; do sleep 5; done
trap 'rmdir logs/r2/.seat' EXIT
node cuts.mjs webkit 5362 data/r2/cuts-webkit-cure.json > logs/r2/cuts-webkit-cure.log 2>&1
