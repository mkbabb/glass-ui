#!/usr/bin/env bash
# batch-r4-webkit.sh: the fourth round's Playwright WebKit readings, the plain tree
# (release/11.1.1) on 5361 and the cured tree on 5362, one browser at a time, into
# data/r4/ (logs in logs/r4/). The servers run inside this batch (serve-pair.sh).
# Under the guard: guarded --exclusive webkit --timeout 60 -- ./batch-r4-webkit.sh
set -uo pipefail
cd "$(dirname "$0")"
SEAT="$(pwd)/logs/r4/.seat"
until mkdir "$SEAT" 2>/dev/null; do sleep 5; done
source ./serve-pair.sh
node tapclick.mjs webkit data/r4/tapclick-webkit.json > logs/r4/tapclick-webkit.log 2>&1
node nested.mjs webkit 5361 data/r4/nested-webkit-plain.json nested,scrim > logs/r4/nested-webkit-plain.log 2>&1
node nested.mjs webkit 5362 data/r4/nested-webkit-cure.json nested,scrim > logs/r4/nested-webkit-cure.log 2>&1
node cuts.mjs webkit 5362 data/r4/cuts-webkit-cure.json command,sheet,detents,dialog > logs/r4/cuts-webkit-cure.log 2>&1
echo done
