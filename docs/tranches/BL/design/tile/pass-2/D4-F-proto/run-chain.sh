#!/bin/sh
# D4-F-proto/run-chain.sh · everything the prototype runs in a browser after its first probe, in one serialized
# queue (the harness lock serializes it against every other D4 seat as well). Each step logs its clock and load.
#   sh run-chain.sh <out>
D="$(cd "$(dirname "$0")" && pwd)"; OUT="$1"; L="$D/logs"; R="$D/runs"
stamp() { echo "$(date '+%Y-%m-%d %H:%M:%S') · load $(sysctl -n vm.loadavg) · $*"; }
while pgrep -f "probe.mjs --build" >/dev/null; do sleep 20; done
probe() { lab="$1"; shift; log="$L/probe-$lab.log"; stamp "probe $lab $*" > "$log"; node "$D/probe.mjs" "$@" --json "$R/probe-$lab.json" >> "$log" 2>&1; echo "exit $? · $(stamp end)" >> "$log"; }
probe f-src-dev-guard --build "$OUT/builds/f-src-dev" --only guard
probe f-dist-guard --build "$OUT/builds/f-dist" --only guard
probe f-src-rerun --build "$OUT/builds/f-src" --only commit,double,guard,contrast
probe f-src-plant-a11y --build "$OUT/builds/f-src" --only contrast --engines chromium --plant a11y
sh "$D/witness-chain.sh" "$OUT" f-src "$L" "T-3 T-7 T-1 T-2 T-5 T-4 T-6 T-8 W-D W-E W-A W-B W-C" "chromium webkit" 3600
sh "$D/witness-chain.sh" "$OUT" f-dist "$L" "W-E T-5" "chromium webkit" 3600
stamp "glance" > "$L/glance.log"; node "$D/glance.mjs" --build "$OUT/builds/f-src" --dir "$D/glance" >> "$L/glance.log" 2>&1; echo "exit $? · $(stamp end)" >> "$L/glance.log"
stamp RUN-CHAIN-DONE
