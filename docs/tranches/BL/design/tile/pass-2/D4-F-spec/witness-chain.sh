#!/bin/sh
# D4-F-spec/witness-chain.sh · the H2 witnesses on the route build, one process at a time, AFTER the seat's own
# probes have left the harness lock. A witness's deadline counts its lock wait: the first attempt queued T-1 behind
# a 28-minute probe, and it died on "no verdict within 1800 s" without opening a page
# (logs/aborted-battery-lock-wait.log).
#   sh witness-chain.sh <out> <build-label> <log-dir> "<witness ids>" "<engines>"
H="$(cd "$(dirname "$0")/../../harness" && pwd)"; OUT="$1"; B="$2"; L="$3"; IDS="$4"; ENGS="$5"
file() { case "$1" in T-1) echo t1-corner-stops;; T-2) echo t2-one-line-stadium;; T-3) echo t3-selected-separates;; T-4) echo t4-ring-whole;; T-5) echo t5-one-of-n-keys;; T-6) echo t6-engagement;; T-7) echo t7-no-consumer-paint;; W-D) echo wd-declared-cell;; W-E) echo we-one-line;; esac; }
while pgrep -f "probe.mjs --build" >/dev/null; do sleep 20; done
for id in $IDS; do for e in $ENGS; do
  log="$L/$id-$B-$e.log"
  echo "$(date '+%Y-%m-%d %H:%M:%S') · load $(sysctl -n vm.loadavg) · start $id $e" > "$log"
  node "$H/$(file $id).mjs" --build "$OUT/builds/$B" --out "$OUT" --engine "$e" --deadline 1500 >> "$log" 2>&1
  echo "exit $? · $(date '+%Y-%m-%d %H:%M:%S') · load $(sysctl -n vm.loadavg)" >> "$log"
done; done
echo CHAIN-DONE
