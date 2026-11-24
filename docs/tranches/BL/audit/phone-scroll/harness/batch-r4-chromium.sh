#!/usr/bin/env bash
# batch-r4-chromium.sh: the fourth round's Chromium readings, the plain tree (release/11.1.1)
# on 5361 and the cured tree on 5362, one browser at a time, into data/r4/ (logs in
# logs/r4/). The servers run inside this batch (serve-pair.sh).
# Under the guard: guarded --timeout 45 -- ./batch-r4-chromium.sh
set -uo pipefail
cd "$(dirname "$0")"
SEAT="$(pwd)/logs/r4/.seat"
until mkdir "$SEAT" 2>/dev/null; do sleep 5; done
source ./serve-pair.sh
node tapclick.mjs chromium data/r4/tapclick-chromium.json > logs/r4/tapclick-chromium.log 2>&1
node nested.mjs chromium 5361 data/r4/nested-chromium-plain.json nested,scrim > logs/r4/nested-chromium-plain.log 2>&1
node nested.mjs chromium 5362 data/r4/nested-chromium-cure.json nested,scrim,nopan > logs/r4/nested-chromium-cure.log 2>&1
node cuts.mjs chromium 5362 data/r4/cuts-chromium-cure.json command,sheet,detents,dialog > logs/r4/cuts-chromium-cure.log 2>&1
echo done
