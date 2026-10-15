#!/bin/bash
# H4-selftest-rerun.sh: the second self-test pass (D2 pass 4, H4). It re-runs every expectation the first
# pass left BAD, and every expectation whose witness changed after the first pass ran (the lane rule's
# zero-inset identity and the engagement-scale exemption; W1's union of rests). Each witness group starts
# under the load gate (LOAD_MAX, polled every 30 s, at most GATE_S per group).
#   bash H4-selftest-rerun.sh <out> <tag>      → H4-records/selftest-<tag>-<group>.log
set -u
OUT=$1; TAG=${2:-rerun}
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; REC=$D/pass-4/H4-records
LOAD_MAX=${LOAD_MAX:-150}; GATE_S=${GATE_S:-1800}
load1() { uptime | sed -E 's/.*load averages?: ([0-9.]+).*/\1/'; }
gate() { local t=0; while [ "$(echo "$(load1) > $LOAD_MAX" | bc)" = 1 ] && [ $t -lt $GATE_S ]; do sleep 30; t=$((t+30)); done; echo "load gate: waited ${t}s, load $(load1) (max $LOAD_MAX)"; }
g() { local log="$REC/selftest-$TAG-$1.log"; shift; (gate; uptime; node "$H/selftest.mjs" --engine all --out "$OUT" "$@"; uptime) > "$log" 2>&1; }
g W3 --only W3 --faults pass,lanesnap,lanecancel,splice,sliver
g ST --only ST --faults pass,pass@dark
g W1 --only W1 --faults pass,csscarrier,hitpair,cardstep,cardlerp,cardspread
echo DONE > "$REC/selftest-$TAG-done.txt"
