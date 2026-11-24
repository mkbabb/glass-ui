#!/usr/bin/env bash
# batch-r3-webkit.sh: every Playwright WebKit reading of the third round, the plain tree
# (release/11.1.1) on 5361 and the cured tree on 5362, one browser at a time, into
# data/r3/ (logs in logs/r3/). The probe lanes read the cells the third round's change
# touches (the non-modal surfaces, the detented sheet) and the two controls.
# Under the guard: guarded --exclusive webkit --timeout 60 -- ./batch-r3-webkit.sh
set -uo pipefail
cd "$(dirname "$0")"
# One heavy run of this seat at a time: the third round's runs share logs/r3/.seat.
SEAT="$(pwd)/logs/r3/.seat"
until mkdir "$SEAT" 2>/dev/null; do sleep 5; done
trap 'rmdir "$SEAT"' EXIT
for t in plain:5361 cure:5362; do
    tree=${t%%:*}; port=${t##*:}
    node nested.mjs webkit $port data/r3/nested-webkit-$tree.json nested,dsel > logs/r3/nested-webkit-$tree.log 2>&1
    node probe.mjs webkit-wheel $port data/r3/$tree-webkit-wheel.json page,ob-control,select,dock-select,drawer,pdrawer,detents,popover,dropdown > logs/r3/lane-webkit-wheel-$tree.log 2>&1
    node probe.mjs webkit-touch $port data/r3/$tree-webkit-touch.json page,ob-control,select,dock-select,drawer,pdrawer,detents,popover,dropdown > logs/r3/lane-webkit-touch-$tree.log 2>&1
done
node cuts.mjs webkit 5361 data/r3/cuts-webkit-plain.json detents,pdrawer-free > logs/r3/cuts-webkit-plain.log 2>&1
node cuts.mjs webkit 5362 data/r3/cuts-webkit-cure.json > logs/r3/cuts-webkit-cure.log 2>&1
