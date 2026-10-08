#!/bin/sh
# rc2-battery.sh <build-dir> <head-build-dir> : the re-read after the tap fix (--scalar-scale): E-2, E-5, E-8, E-9 on
# the bit and the row, both engines; plus the WebKit accordion pointer cell at HEAD (is the engine close pre-existing?).
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
B=$1; HB=$2; LOG=$(dirname "$0")/../logs/battery-rc2.log; OUT=$B/../../runs/rc2; mkdir -p "$OUT"; : > "$LOG"
run() { id=$1; f=$2; b=$3; shift 3; for e in chromium webkit; do
  echo "=== $id $e $(basename $b) · $(date +%H:%M:%S) · load $(sysctl -n vm.loadavg)" >> "$LOG"
  node "$H/$f" --build "$b" --engine $e --out "$OUT" "$@" >> "$LOG" 2>&1; echo "=== exit $? · $(date +%H:%M:%S)" >> "$LOG"; done; }
run E-2 e2-commit.mjs "$B" --scenes switch,accordion
run E-5 e5-touch.mjs "$B" --scenes accordion,press_switch
run E-8 e8-clock.mjs "$B" --scenes switch,accordion,slider
run E-9 e9-prm.mjs "$B" --scenes switch,accordion,slider
echo "=== HEAD webkit accordion E-2 · $(date +%H:%M:%S) · load $(sysctl -n vm.loadavg)" >> "$LOG"
node "$H/e2-commit.mjs" --build "$HB" --engine webkit --scenes accordion --themes light >> "$LOG" 2>&1
echo "=== HEAD webkit accordion E-5 · $(date +%H:%M:%S) · load $(sysctl -n vm.loadavg)" >> "$LOG"
node "$H/e5-touch.mjs" --build "$HB" --engine webkit --scenes accordion >> "$LOG" 2>&1
echo "=== done $(date +%H:%M:%S)" >> "$LOG"
