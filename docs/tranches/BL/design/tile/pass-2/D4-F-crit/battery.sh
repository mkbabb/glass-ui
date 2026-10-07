#!/bin/sh
# D4-F-crit/battery.sh · the critic's H2 battery on the route build: T-1..T-8 in Chromium and Playwright WebKit
# (src flavour), then T-5 on dist (the interactive descendant in production). One witness at a time under the
# harness lock; run.mjs prints one line per witness with its load.   sh battery.sh <out>
D="$(cd "$(dirname "$0")" && pwd)"; H="$(cd "$D/../../harness" && pwd)"; OUT="$1"
st() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"; }
st "battery crit-src start"
node "$H/run.mjs" --build "$OUT/builds/crit-src" --out "$OUT" --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,T-8 --webkit
st "battery crit-src end (exit $?)"
for e in chromium webkit; do node "$H/t5-one-of-n-keys.mjs" --build "$OUT/builds/crit-dist" --out "$OUT" --engine $e | tail -2; done
st "BATTERY-DONE"
