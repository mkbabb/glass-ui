#!/bin/bash
# H4-baseline.sh: the pass-4 baseline (D2 pass 4, H4) on the builds H4-build.sh made, one witness
# process at a time, each build with its adapter:
#   head → harness/adapter-head.mjs (Playwright WebKit +shim, then the same witness unshimmed)
#   fv2  → pass-3/adapter-floor-v2.mjs · bp → pass-3/adapter-floor-v2.mjs (B′ keeps the floor's DOM
#   contract) · g → pass-3/adapter-G-p3.mjs (hit() = .dock-hit, edge() = .dock-cap)
# Light theme (no scheme forced) unless a witness runs its own themes (L1 runs light and dark).
#
# SCOPE: what H4 added or changed, witness by witness across the builds:
#   ST  stall.mjs                         (H4-3 nb arms, H4-6 theme-aware markers)
#   W3  w3-morph.mjs --no-faces           (H4-1 splice, H4-2 lanes, H4-5 retarget; the pixel faces pass
#                                          is unchanged by H4 and not run: those cells read UNMEASURED)
#   FM  film.mjs                          (H4-6)
#   R5  r5-hit.mjs                        (H4-4)
#   W1  w1-corner.mjs --cells '^card|^morph·warm'   (H4-7 one card verdict; H4-9 `ran`)
#   CF  c-facility.mjs                    (H4-10, O-88 C1-C7, in the demo app)
#   L1  l1-light.mjs --ref-build fv2      (H4-11, O-87; the reference is floor v2 until floor v3 exists)
# PR (prose.mjs, H4-8) reads source trees, not builds: H4-prose.sh runs it.
# W2, W4-W8, R6 and W1's other cells are unchanged by H4; pass 3's readings stand (H3.md §3).
#   bash H4-baseline.sh <out> [witness-list] [build-list]
# Guards (as H3-baseline.sh): the load gate (LOAD_MAX, GATE_S), the block timeout, the process watchdog.
# Re-runs: every FAIL cell of a run is re-run twice (--cells on its exact name); H4-cells.mjs reads all three.
# Logs: pass-4/H4-records/base-<W>-<label>[-unshimmed][-rerun<k>].log.
set -u
# entry 5: every browser run goes through the machine guard (~/.claude/guard/guarded: 3 heavy slots machine-wide,
# 16 GB tree cap, descendants reaped). GUARD="" runs bare.
GUARD=${GUARD-"$HOME/.claude/guard/guarded --timeout 55 --"}
OUT=$1; WS=${2:-"ST W3 FM R5 W1 CF L1"}; BS=${3:-"fv2 bp g head"}
D=$(cd "$(dirname "$0")/.." && pwd)            # docs/tranches/BL/design/dock
H=$D/harness; P3=$D/pass-3; REC=$D/pass-4/H4-records
mkdir -p "$REC"
adapter() { case $1 in head) echo "$H/adapter-head.mjs";; g) echo "$P3/adapter-G-p3.mjs";; *) echo "$P3/adapter-floor-v2.mjs";; esac; }
script() { case $1 in ST) echo stall.mjs;; W3) echo "w3-morph.mjs --no-faces";; FM) echo film.mjs;; R5) echo r5-hit.mjs;; W1) echo "w1-corner.mjs";; CF) echo c-facility.mjs;; L1) echo "l1-light.mjs --ref-build $OUT/builds/fv2 --ref-adapter $P3/adapter-floor-v2.mjs";; esac; }
cellsArg() { case $1 in W1) echo "^card|^morph·warm";; *) echo "";; esac; }
LOAD_MAX=${LOAD_MAX:-150}; GATE_S=${GATE_S:-7200}; PROC_S=${PROC_S:-3600}
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
GATEF=$REC/.gate-spent; echo 0 > "$GATEF"
load1() { uptime | sed -E 's/.*load averages?: ([0-9.]+).*/\1/'; }
gate() { local t=0; while [ "$(echo "$(load1) > $LOAD_MAX" | bc)" = 1 ] && [ $(cat "$GATEF") -lt $GATE_S ]; do sleep 30; t=$((t+30)); echo $(( $(cat "$GATEF") + 30 )) > "$GATEF"; done; echo "load gate: waited ${t}s (of a ${GATE_S}s budget for the whole script, $(cat "$GATEF")s spent), load $(load1) (max $LOAD_MAX)"; }
run() { # log witness build engines cells out extra…
  local log=$1 w=$2 b=$3 eng=$4 cells=$5 o=$6; shift 6
  (gate; uptime) > "$log" 2>&1
  if [ -n "$cells" ]; then
    $GUARD node $H/$(script $w) --build "$OUT/builds/$b" --adapter "$(adapter $b)" --out "$o" --engine $eng --cells "$cells" "$@" >> "$log" 2>&1 &
  else
    $GUARD node $H/$(script $w) --build "$OUT/builds/$b" --adapter "$(adapter $b)" --out "$o" --engine $eng "$@" >> "$log" 2>&1 &
  fi
  local pid=$! t0=$SECONDS
  while kill -0 $pid 2>/dev/null && [ $((SECONDS - t0)) -lt $PROC_S ]; do sleep 5; done
  if kill -0 $pid 2>/dev/null; then kill -9 $pid; pkill -9 -P $pid; echo "WATCHDOG: killed after ${PROC_S}s" >> "$log"; fi
  wait $pid 2>/dev/null; (echo "exit $?"; uptime) >> "$log" 2>&1
}
# the FAIL cells of a log, as one anchored regex of exact names (engine suffixes stripped by the --cells filter)
reds() { grep -E '^FAIL  [A-Z0-9]+  (Chromium|Playwright WebKit)' "$1" | awk -F'  ' '{print $4}' | sed -E 's/(\+shim|-unshimmed)$//' | sort -u | sed -E 's/[][(){}.*+?^$|\\]/\\&/g' | paste -sd'|' - ; }
one() { # witness build extra-args suffix engines
  local log="$REC/base-$1-$2$4.log"
  run "$log" $1 $2 $5 "$(cellsArg $1)" "$OUT" $3
  local r; r=$(reds "$log")
  if [ -n "$r" ]; then for k in 1 2; do run "$REC/base-$1-$2$4-rerun$k.log" $1 $2 $5 "^($r)\$" "$OUT/rerun$k" $3; done; fi
}
for w in $WS; do for b in $BS; do
  one $w $b "" "" chromium,webkit
  [ $b = head ] && one $w $b "--no-webkit-shim" "-unshimmed" webkit
done; done
echo BASELINE-DONE > "$REC/base-done.txt"
