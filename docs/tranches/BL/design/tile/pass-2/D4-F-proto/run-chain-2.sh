#!/bin/sh
# D4-F-proto/run-chain-2.sh · after run-chain.sh: the DEV name now also counts a child the plate cuts block-wise
# (the unmigrated K2 stage), so the src-dev scene build is rebuilt and the DEV guard re-read. DEV-only code is
# stripped from the src and dist flavours, so they are not rebuilt.
D="$(cd "$(dirname "$0")" && pwd)"; WT="$1"; OUT="$2"; L="$D/logs"
until grep -q RUN-CHAIN-DONE "$L/run-chain.log" 2>/dev/null; do sleep 30; done
sh "$D/build-chain.sh" "$WT" "$OUT" f-src-dev >> "$L/build.log" 2>&1
log="$L/probe-f-src-dev-guard2.log"; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · probe f-src-dev guard (rebuilt)" > "$log"
node "$D/probe.mjs" --build "$OUT/builds/f-src-dev" --only guard --json "$D/runs/probe-f-src-dev-guard2.json" >> "$log" 2>&1; echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> "$log"
echo "RUN-CHAIN-2-DONE $(date '+%F %T')"
