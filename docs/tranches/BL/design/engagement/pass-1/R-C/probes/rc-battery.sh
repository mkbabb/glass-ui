#!/bin/sh
# rc-battery.sh <build-dir> <worktree> <label> : the battery on the D5-C prototype's trio + passive atom, both engines,
# full cell output (PASS included) to ../logs/battery-<label>.log, JSON to <build-dir>/../../runs/<label>/.
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
B=$1; WT=$2; L=$3; LOG=$(dirname "$0")/../logs/battery-$L.log; OUT=$B/../../runs/$L
mkdir -p "$OUT"; : > "$LOG"
run() { id=$1; f=$2; shift 2; for e in chromium webkit; do
  echo "=== $id $e · $(date +%H:%M:%S) · load $(sysctl -n vm.loadavg)" >> "$LOG"
  node "$H/$f" --build "$B" --engine $e --out "$OUT" "$@" >> "$LOG" 2>&1; echo "=== exit $? · $(date +%H:%M:%S)" >> "$LOG"; done; }
run E-1 e1-census.mjs
run E-3 e3-slider.mjs
run E-4 e4-momentum.mjs --scenes slider
run E-5 e5-touch.mjs --scenes accordion,press_switch
run E-7 e7-one-writer.mjs --wt "$WT"
run E-8 e8-clock.mjs --scenes switch,accordion,slider
run E-2 e2-commit.mjs --scenes switch,accordion
run E-9 e9-prm.mjs --scenes switch,accordion,slider
echo "=== done $(date +%H:%M:%S)" >> "$LOG"
