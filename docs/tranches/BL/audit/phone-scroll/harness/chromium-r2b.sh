#!/usr/bin/env bash
# chromium-r2b.sh: the follow readings (with the up-top step) and the detents cuts on
# both trees, Chromium, one browser at a time. Shares a lock directory with the WebKit
# batch.  Under the guard: guarded --timeout 30 -- ./chromium-r2b.sh
set -uo pipefail
cd "$(dirname "$0")"
# One heavy run of this seat at a time: the batches share the lock directory logs/r2/.seat.
until mkdir logs/r2/.seat 2>/dev/null; do sleep 5; done
trap 'rmdir logs/r2/.seat' EXIT
node follow.mjs 5361 data/r2/follow-plain.json > logs/r2/follow-plain.log 2>&1
node follow.mjs 5362 data/r2/follow-cure.json > logs/r2/follow-cure.log 2>&1
node cuts.mjs chromium 5361 data/r2/cuts-chromium-plain-detents.json detents > logs/r2/cuts-chromium-plain-detents.log 2>&1
node cuts.mjs chromium 5362 data/r2/cuts-chromium-cure-detents.json detents > logs/r2/cuts-chromium-cure-detents.log 2>&1
