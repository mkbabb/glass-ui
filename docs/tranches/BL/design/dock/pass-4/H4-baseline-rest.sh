#!/bin/bash
# H4-baseline-rest.sh: the rest of the pass-4 baseline (D2 pass 4, H4), beside H4-baseline.sh. It runs the
# witnesses H4 did not change but whose lib and fixtures it touched (W1 whole, W2, W4-W8, R6), so every one
# of the 36 rows has a reading under the H4 harness, and it runs any witness under a forced theme.
#   SUB=rest            bash H4-baseline-rest.sh <out> "W1 W2 W4 W5 W6 W7 W8 R6" "fv2 bp g head"
#   SUB=dark THEME=dark bash H4-baseline-rest.sh <out> "ST FM W3 W1 R5" "fv2 bp g"
# Builds are read from <out>/builds; runs land in <out>/$SUB/runs, re-runs in <out>/$SUB/rerun<k>/runs.
# Logs: pass-4/H4-records/$SUB-<W>-<label>[-rerun<k>].log. Same guards and re-run rule as H4-baseline.sh.
# HEAD's unshimmed Playwright WebKit pass is H4-baseline.sh's (the H4 witnesses); H3.md §3 has the others.
set -u
# entry 5: every browser run goes through the machine guard (~/.claude/guard/guarded: 3 heavy slots machine-wide,
# 16 GB tree cap, descendants reaped). GUARD="" runs bare.
GUARD=${GUARD-"$HOME/.claude/guard/guarded --timeout 55 --"}
OUT=$1; WS=$2; BS=${3:-"fv2 bp g head"}
SUB=${SUB:-rest}; THEME=${THEME:-}
D=$(cd "$(dirname "$0")/.." && pwd)
H=$D/harness; P3=$D/pass-3; REC=$D/pass-4/H4-records
mkdir -p "$REC" "$OUT/$SUB"
[ -n "$THEME" ] && export DOCK_HARNESS_THEME=$THEME
adapter() { case $1 in head) echo "$H/adapter-head.mjs";; g) echo "$P3/adapter-G-p3.mjs";; *) echo "$P3/adapter-floor-v2.mjs";; esac; }
script() { case $1 in ST) echo stall.mjs;; W3) echo "w3-morph.mjs --no-faces";; W3F) echo w3-morph.mjs;; FM) echo film.mjs;; R5) echo r5-hit.mjs;; W1) echo w1-corner.mjs;; W2) echo w2-run.mjs;; W4) echo w4-state.mjs;; W5) echo w5-rim.mjs;; W6) echo w6-collapsed-form.mjs;; W7) echo w7-edge.mjs;; W8) echo w8-motion.mjs;; R6) echo r6-probe.mjs;; CF) echo c-facility.mjs;; L1) echo "l1-light.mjs --ref-build $OUT/builds/fv2 --ref-adapter $P3/adapter-floor-v2.mjs";; esac; }
LOAD_MAX=${LOAD_MAX:-150}; GATE_S=${GATE_S:-7200}; PROC_S=${PROC_S:-3600}
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
GATEF=$REC/.gate-spent-$SUB; echo 0 > "$GATEF"
load1() { uptime | sed -E 's/.*load averages?: ([0-9.]+).*/\1/'; }
gate() { local t=0; while [ "$(echo "$(load1) > $LOAD_MAX" | bc)" = 1 ] && [ $(cat "$GATEF") -lt $GATE_S ]; do sleep 30; t=$((t+30)); echo $(( $(cat "$GATEF") + 30 )) > "$GATEF"; done; echo "load gate: waited ${t}s (of ${GATE_S}s for the script, $(cat "$GATEF")s spent), load $(load1) (max $LOAD_MAX)"; }
run() { # log witness build cells out
  local log=$1 w=$2 b=$3 cells=$4 o=$5
  (gate; uptime) > "$log" 2>&1
  if [ -n "$cells" ]; then $GUARD node $H/$(script $w) --build "$OUT/builds/$b" --adapter "$(adapter $b)" --out "$o" --engine chromium,webkit --cells "$cells" >> "$log" 2>&1 &
  else $GUARD node $H/$(script $w) --build "$OUT/builds/$b" --adapter "$(adapter $b)" --out "$o" --engine chromium,webkit >> "$log" 2>&1 & fi
  local pid=$! t0=$SECONDS
  while kill -0 $pid 2>/dev/null && [ $((SECONDS - t0)) -lt $PROC_S ]; do sleep 5; done
  if kill -0 $pid 2>/dev/null; then kill -9 $pid; pkill -9 -P $pid; echo "WATCHDOG: killed after ${PROC_S}s" >> "$log"; fi
  wait $pid 2>/dev/null; (echo "exit $?"; uptime) >> "$log" 2>&1
}
reds() { grep -E '^FAIL  [A-Z0-9]+  (Chromium|Playwright WebKit)' "$1" | awk -F'  ' '{print $4}' | sed -E 's/(\+shim|-unshimmed)$//' | sort -u | sed -E 's/[][(){}.*+?^$|\\]/\\&/g' | paste -sd'|' - ; }
for w in $WS; do for b in $BS; do
  log="$REC/$SUB-$w-$b.log"
  run "$log" $w $b "" "$OUT/$SUB"
  r=$(reds "$log")
  if [ -n "$r" ]; then for k in 1 2; do run "$REC/$SUB-$w-$b-rerun$k.log" $w $b "^($r)\$" "$OUT/$SUB/rerun$k"; done; fi
done; done
echo DONE > "$REC/$SUB-done.txt"
