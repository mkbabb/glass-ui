#!/bin/bash
# H4-chain-b.sh: the second half of the H4 seat's fourth entry. It replaces H4-chain.sh after that chain's
# main baseline (chain4-main.txt), because two harness faults were cured while the main baseline ran
# (HARNESS §9, the lifecycle paragraph and H4-2):
#   - makeReport().guard dropped a Playwright WebKit block error whose name Chromium had recorded (ST fv2:
#     the five stall·nb WebKit cells were absent); plant plants/guard-engine.mjs
#   - H4-2's clip lane read an outset (negative inset) as a residue (G's dock-layers, "100000 px")
# Order: W3's lane expectations re-proven; W3 on every build and ST on fv2 re-read; then the rest (W1 whole,
# W2, W4-W8, R6) and the dark theme (ST FM W1 W3 on fv2 bp g), as H4-chain.sh would have.
#   bash H4-chain-b.sh <out>
set -u
OUT=$1
P=$(cd "$(dirname "$0")" && pwd); REC=$P/H4-records
bash "$P/H4-selftest.sh" "$OUT/st7" s7 "W3:pass,lanesnap,lanecancel"; echo "$(date) $(uptime)" > "$REC/chainb-selftest.txt"
bash "$P/H4-baseline.sh" "$OUT" "W3" "fv2 bp g head"; bash "$P/H4-baseline.sh" "$OUT" "ST" "fv2"; echo "$(date) $(uptime)" > "$REC/chainb-main.txt"
SUB=rest bash "$P/H4-baseline-rest.sh" "$OUT" "W1 W2 W4 W5 W6 W7 W8 R6" "fv2 bp g head"; echo "$(date) $(uptime)" > "$REC/chainb-rest.txt"
SUB=dark THEME=dark bash "$P/H4-baseline-rest.sh" "$OUT" "ST FM W1 W3" "fv2 bp g"; echo "$(date) $(uptime)" > "$REC/chainb-dark.txt"
echo CHAINB-DONE > "$REC/chainb-done.txt"
