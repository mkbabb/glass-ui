#!/usr/bin/env bash
# batch-r3-chromium.sh: every Chromium reading of the third round, the plain tree
# (release/11.1.1) on 5361 and the cured tree on 5362, one browser at a time, into
# data/r3/ (logs in logs/r3/).  Under the guard: guarded --timeout 45 -- ./batch-r3-chromium.sh
set -uo pipefail
cd "$(dirname "$0")"
for t in plain:5361 cure:5362; do
    tree=${t%%:*}; port=${t##*:}
    node nested.mjs chromium $port data/r3/nested-chromium-$tree.json > logs/r3/nested-chromium-$tree.log 2>&1
    node follow.mjs $port data/r3/follow-$tree.json follow > logs/r3/follow-$tree.log 2>&1
    node probe.mjs chromium $port data/r3/$tree-chromium.json > logs/r3/lane-chromium-$tree.log 2>&1
done
node cuts.mjs chromium 5361 data/r3/cuts-chromium-plain.json detents,pdrawer-free > logs/r3/cuts-chromium-plain.log 2>&1
node cuts.mjs chromium 5362 data/r3/cuts-chromium-cure.json > logs/r3/cuts-chromium-cure.log 2>&1
