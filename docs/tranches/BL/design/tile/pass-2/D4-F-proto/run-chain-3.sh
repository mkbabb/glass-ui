#!/bin/sh
# D4-F-proto/run-chain-3.sh · after run-chain-2.sh: the harness changes this seat made (openPage's labelled stall
# re-open in lib.mjs; T-3's absent-migration UNMEASURED) are self-tested on the fixture, then the two Playwright
# WebKit witnesses that failed on an engine stall or hang are re-run on the route build.
D="$(cd "$(dirname "$0")" && pwd)"; H="$(cd "$D/../../harness" && pwd)"; OUT="$1"; L="$D/logs"
until grep -q RUN-CHAIN-2-DONE "$L/run-chain-2.log" 2>/dev/null; do sleep 30; done
log="$L/selftest-T-3-T-7.log"; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · selftest T-3, T-7 (both engines)" > "$log"
node "$H/selftest.mjs" --out "$OUT" --engines chromium,webkit --only T-3,T-7 >> "$log" 2>&1; echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> "$log"
for id in T-3 T-7; do
  f=$( [ $id = T-3 ] && echo t3-selected-separates || echo t7-no-consumer-paint )
  log="$L/$id-f-src-webkit-rerun.log"; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $id webkit (re-run)" > "$log"
  node "$H/$f.mjs" --build "$OUT/builds/f-src" --out "$OUT" --engine webkit --deadline 3600 >> "$log" 2>&1; echo "exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> "$log"
done
echo "RUN-CHAIN-3-DONE $(date '+%F %T')"
