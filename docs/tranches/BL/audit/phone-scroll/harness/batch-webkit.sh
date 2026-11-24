#!/usr/bin/env bash
# batch-webkit.sh: every Playwright WebKit reading of the second round, the plain tree on
# 5361 and the cured tree on 5362, one browser at a time, into data/r2/ (logs in logs/r2/).
# Under the guard: guarded --exclusive webkit --timeout 90 -- ./batch-webkit.sh
set -uo pipefail
cd "$(dirname "$0")"
# One heavy run of this seat at a time: the batches share the lock directory logs/r2/.seat.
until mkdir logs/r2/.seat 2>/dev/null; do sleep 5; done
trap 'rmdir logs/r2/.seat' EXIT
node tapclick.mjs webkit data/r2/tapclick-webkit.json > logs/r2/tapclick-webkit.log 2>&1
./run-lane.sh webkit-wheel > logs/r2/lane-webkit-wheel.log 2>&1
./run-lane.sh webkit-touch > logs/r2/lane-webkit-touch.log 2>&1
node cuts.mjs webkit 5361 data/r2/cuts-webkit-plain.json > logs/r2/cuts-webkit-plain.log 2>&1
node cuts.mjs webkit 5362 data/r2/cuts-webkit-cure.json > logs/r2/cuts-webkit-cure.log 2>&1
