#!/bin/sh
# D4-F-proto/witness-chain.sh · the H2 witnesses on the route builds, one process at a time, started only after
# the prototype's own probe has left the harness lock. Each log carries the clock and the load at start and end.
#   sh witness-chain.sh <out> <build-label> <log-dir> "<witness ids>" "<engines>" [deadline-s]
H="$(cd "$(dirname "$0")/../../harness" && pwd)"; OUT="$1"; B="$2"; L="$3"; IDS="$4"; ENGS="$5"; DL="${6:-3600}"
file() { case "$1" in T-1) echo t1-corner-stops;; T-2) echo t2-one-line-stadium;; T-3) echo t3-selected-separates;; T-4) echo t4-ring-whole;; T-5) echo t5-one-of-n-keys;; T-6) echo t6-engagement;; T-7) echo t7-no-consumer-paint;; T-8) echo t8-both-engines;; W-A) echo wa-curvature-content;; W-B) echo wb-choice-card;; W-C) echo wc-selection-behaviour;; W-D) echo wd-declared-cell;; W-E) echo we-one-line;; esac; }
while pgrep -f "D4-F-proto/probe.mjs\|probe.mjs --build" >/dev/null; do sleep 20; done
for id in $IDS; do for e in $ENGS; do
  [ "$id" = "T-8" ] && [ "$e" = "webkit" ] && continue   # T-8 runs both engines itself
  log="$L/$id-$B-$e.log"
  echo "$(date '+%Y-%m-%d %H:%M:%S') · load $(sysctl -n vm.loadavg) · start $id $e" > "$log"
  if [ "$id" = "T-8" ]; then node "$H/$(file $id).mjs" --build "$OUT/builds/$B" --out "$OUT" --deadline "$DL" >> "$log" 2>&1
  else node "$H/$(file $id).mjs" --build "$OUT/builds/$B" --out "$OUT" --engine "$e" --deadline "$DL" >> "$log" 2>&1; fi
  echo "exit $? · $(date '+%Y-%m-%d %H:%M:%S') · load $(sysctl -n vm.loadavg)" >> "$log"
done; done
echo "CHAIN-DONE $(date '+%Y-%m-%d %H:%M:%S') · load $(sysctl -n vm.loadavg)"
