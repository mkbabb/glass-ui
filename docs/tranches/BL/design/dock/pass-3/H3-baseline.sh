#!/bin/bash
# H3-baseline.sh: the pass-3 baseline (D2 pass 3, H3) on the four builds H3-build.sh made, one
# witness process at a time (harness runs are serialized), each build with the adapter its pass-2
# seat used:
#   head  → harness/adapter-head.mjs (Playwright WebKit +shim, then the same witness unshimmed)
#   floor → pass-2/adapter-floor.mjs · bp → pass-2/adapter-floor.mjs (B′ kept the floor's DOM
#   contract, D2-Bp-proto.md header) · g → pass-2/adapter-G.mjs. These three have no WebKit shim,
#   so every Playwright WebKit cell on them is unshimmed by construction.
# Light theme (no scheme forced); W7 runs its own light/dark matrix.
#
# SCOPE. A first attempt ran `run.mjs` (every witness) per build; at 1-minute load averages of
# 270-640 (other seats' browsers) HEAD's W3 alone had not finished after 2 h 30 min and was
# stopped (H3.md §3.0). This script runs what H3 added or changed, witness by witness across
# the builds, so every build has each row before the next row starts:
#   ST  stall.mjs                      (H3-4)
#   W3  w3-morph.mjs --no-faces        (H3-1, -2, -3, -5, -6, -7, -10, -11; the pixel faces pass,
#                                       unchanged by H3, is not run: those cells read UNMEASURED)
#   FM  film.mjs                       (H3-8)
#   W7  w7-edge.mjs                    (H3-9)
#   W1  w1-corner.mjs --cells '^card|^vmorph'   (H3-11 card, H3-5 vertical agree)
# W2, W4, W5, W6, W8, R6 and W1's other cells are unchanged by H3 and are NOT re-run here.
#   bash H3-baseline.sh <out> [witness-list, default "ST W3 FM W7 W1"] [build-list, default "floor bp g head"]
# Logs: pass-3/H3-records/base-<W>-<label>[-unshimmed].log; the per-cell digest: H3-cells.mjs.
set -u
OUT=$1; WS=${2:-"ST W3 FM W7 W1"}; BS=${3:-"floor bp g head"}
D=$(cd "$(dirname "$0")/.." && pwd)            # docs/tranches/BL/design/dock
H=$D/harness; P2=$D/pass-2; REC=$D/pass-3/H3-records
mkdir -p "$REC"
adapter() { case $1 in head) echo "$H/adapter-head.mjs";; g) echo "$P2/adapter-G.mjs";; *) echo "$P2/adapter-floor.mjs";; esac; }
script() { case $1 in ST) echo stall.mjs;; W3) echo "w3-morph.mjs --no-faces";; FM) echo film.mjs;; W7) echo w7-edge.mjs;; W1) echo "w1-corner.mjs --cells ^card|^vmorph";; esac; }
# Three guards against the machine's load (H3.md §3.0):
#   · the load gate: a witness starts only once the 1-minute load average is under LOAD_MAX
#     (default 150), polled every 30 s, for at most GATE_S seconds over the whole script
#     (default 3 h); past that budget every witness runs at whatever load there is, and its log says so;
#   · DOCK_HARNESS_BLOCK_TIMEOUT_MS (lib.mjs guard): a hung block's cells read UNMEASURED;
#   · a watchdog kills a witness process that outlives PROC_S seconds (default 50 min).
LOAD_MAX=${LOAD_MAX:-150}; GATE_S=${GATE_S:-10800}; PROC_S=${PROC_S:-3000}
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
GATEF=$(mktemp); echo 0 > "$GATEF"
load1() { uptime | sed -E 's/.*load averages?: ([0-9.]+).*/\1/'; }
gate() { local t=0; while [ "$(echo "$(load1) > $LOAD_MAX" | bc)" = 1 ] && [ $(cat "$GATEF") -lt $GATE_S ]; do sleep 30; t=$((t+30)); echo $(( $(cat "$GATEF") + 30 )) > "$GATEF"; done; echo "load gate: waited ${t}s (of a ${GATE_S}s budget for the whole script, $(cat "$GATEF")s spent), load $(load1) (max $LOAD_MAX)"; }
one() { # witness label extra-args log-suffix engines
  local log="$REC/base-$1-$2$4.log"
  (gate; uptime) > "$log" 2>&1
  node $H/$(script $1) --build "$OUT/builds/$2" --adapter "$(adapter $2)" --out "$OUT" --engine $5 $3 >> "$log" 2>&1 &
  local pid=$! t0=$SECONDS   # wall clock: a counted `sleep 5` loop ran 2.5× slow at load ~450
  while kill -0 $pid 2>/dev/null && [ $((SECONDS - t0)) -lt $PROC_S ]; do sleep 5; done
  if kill -0 $pid 2>/dev/null; then kill -9 $pid; pkill -9 -P $pid; echo "WATCHDOG: killed after ${PROC_S}s" >> "$log"; fi
  wait $pid 2>/dev/null; (echo "exit $?"; uptime) >> "$log" 2>&1
}
for w in $WS; do for b in $BS; do
  one $w $b "" "" chromium,webkit
  [ $b = head ] && one $w $b "--no-webkit-shim" "-unshimmed" webkit
done; done
echo BASELINE-DONE > "$REC/base-done.txt"
