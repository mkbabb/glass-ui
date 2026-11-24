#!/usr/bin/env bash
# batch-chromium.sh: every Chromium reading of the second round, the plain tree on 5361
# and the cured tree on 5362, one browser at a time, into data/r2/ (logs in logs/r2/).
# Under the guard: guarded --timeout 90 -- ./batch-chromium.sh
set -uo pipefail
cd "$(dirname "$0")"
./run-lane.sh chromium > logs/r2/lane-chromium.log 2>&1
node cuts.mjs chromium 5361 data/r2/cuts-chromium-plain.json > logs/r2/cuts-chromium-plain.log 2>&1
node cuts.mjs chromium 5362 data/r2/cuts-chromium-cure.json > logs/r2/cuts-chromium-cure.log 2>&1
node follow.mjs 5361 data/r2/follow-plain.json > logs/r2/follow-plain.log 2>&1
node follow.mjs 5362 data/r2/follow-cure.json > logs/r2/follow-cure.log 2>&1
