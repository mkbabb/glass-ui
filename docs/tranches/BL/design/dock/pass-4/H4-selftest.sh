#!/bin/bash
# H4-selftest.sh: the self-test of record (D2 pass 4, H4), one witness group per line, each under the
# load gate (LOAD_MAX, polled every 30 s, at most GATE_S per group). A group is "<W>" (every fixture and
# plant of that witness) or "<W>:<fault,fault,…>" (only those fixtures).
#   bash H4-selftest.sh <out> <tag> <group> [<group> …]     → H4-records/selftest-<tag>-<W>.log
set -u
# entry 5: every browser run goes through the machine guard (~/.claude/guard/guarded: 3 heavy slots machine-wide,
# 16 GB tree cap, descendants reaped). GUARD="" runs bare.
GUARD=${GUARD-"$HOME/.claude/guard/guarded --timeout 55 --"}
OUT=$1; TAG=$2; shift 2
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; REC=$D/pass-4/H4-records
mkdir -p "$REC" "$OUT"
LOAD_MAX=${LOAD_MAX:-150}; GATE_S=${GATE_S:-1800}
load1() { uptime | sed -E 's/.*load averages?: ([0-9.]+).*/\1/'; }
gate() { local t=0; while [ "$(echo "$(load1) > $LOAD_MAX" | bc)" = 1 ] && [ $t -lt $GATE_S ]; do sleep 30; t=$((t+30)); done; echo "load gate: waited ${t}s, load $(load1) (max $LOAD_MAX)"; }
for grp in "$@"; do
  w=${grp%%:*}; f=""; [ "$grp" != "$w" ] && f=${grp#*:}
  log="$REC/selftest-$TAG-$w.log"
  if [ -n "$f" ]; then (gate; uptime; $GUARD node "$H/selftest.mjs" --engine all --out "$OUT/$TAG" --only "$w" --faults "$f"; uptime) > "$log" 2>&1
  else (gate; uptime; $GUARD node "$H/selftest.mjs" --engine all --out "$OUT/$TAG" --only "$w"; uptime) > "$log" 2>&1; fi
done
echo DONE > "$REC/selftest-$TAG-done.txt"
