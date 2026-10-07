#!/bin/sh
# D4-F-crit/probe-chain.sh · after battery.sh: the prototype's own probe re-run on this seat's builds, then this
# seat's probes (vacuity plants, the refusal's holes, the census rows, captures). Serialized under the harness lock.
#   sh probe-chain.sh <out>
D="$(cd "$(dirname "$0")" && pwd)"; P="$D/../D4-F-proto/probe.mjs"; C="$D/probes/crit.mjs"; OUT="$1"; L="$D/logs"; B="$OUT/builds"
until grep -q BATTERY-DONE "$L/battery.log" 2>/dev/null; do sleep 15; done
st() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"; }
run() { log="$L/$1.log"; shift; st "start $*" > "$log"; node "$@" >> "$log" 2>&1; echo "exit $? · $(st end)" >> "$log"; }
run proto-probe-src "$P" --build "$B/crit-src" --only q2,q3,q4,q5,commit,hover,ink,double,contrast --json "$D/runs/proto-probe-src.json"
run proto-probe-src-dev-guard "$P" --build "$B/crit-src-dev" --only guard --json "$D/runs/proto-probe-src-dev-guard.json"
run proto-probe-dist-guard "$P" --build "$B/crit-dist" --only guard --json "$D/runs/proto-probe-dist-guard.json"
run crit-plants "$C" --build "$B/crit-src" --part plants
for part in tone x3 x6 a11yvalid; do run crit-$part "$C" --build "$B/crit-src" --part $part; done
run crit-desc-src-dev "$C" --build "$B/crit-src-dev" --part desc
for f in src-dev dist; do for part in tworow br late; do run crit-$part-$f "$C" --build "$B/crit-$f" --part $part --dir "$D/captures"; done; done
run crit-capture "$C" --build "$B/crit-src" --part capture --engines chromium,webkit --dir "$D/captures"
run crit-clip "$C" --build "$B/crit-src" --part clip
st PROBE-CHAIN-DONE >> "$L/battery.log"
