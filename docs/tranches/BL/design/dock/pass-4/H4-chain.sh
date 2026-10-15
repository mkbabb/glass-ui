#!/bin/bash
# H4-chain.sh: the fourth entry of the H4 seat (2026-10-14), after three process deaths. One browser-owning
# process at a time, in this order:
#   1. the self-test groups the earlier entries left unproven on the final harness (W1 whole: w1-corner.mjs
#      changed after its H4 expectations ran; W4: three expectations died with Node under load 600-1000 and
#      two never ran; W5-W8 and R6: never run on the H4 lib and fixtures)
#   2. the main baseline (H4-baseline.sh) over every H4 witness, fresh, on the builds H4-build.sh made today
#   3. W1 whole (it supersedes the main card/morph subset), W2, W4-W8 and R6 under H4
#   4. the dark theme for ST, FM, W1 and W3 on fv2, bp and g
# Each step writes a marker to H4-records/chain4-<step>.txt when it ends.
#   bash H4-chain.sh <out>
set -u
OUT=$1
P=$(cd "$(dirname "$0")" && pwd); REC=$P/H4-records
bash "$P/H4-selftest.sh" "$OUT/st6" s6 W1 W4 W5 W6 W7 W8 R6; echo "$(date) $(uptime)" > "$REC/chain4-selftest.txt"
bash "$P/H4-baseline.sh" "$OUT" "R5 ST W3 L1 CF FM" "fv2 bp g head"; echo "$(date) $(uptime)" > "$REC/chain4-main.txt"
SUB=rest bash "$P/H4-baseline-rest.sh" "$OUT" "W1 W2 W4 W5 W6 W7 W8 R6" "fv2 bp g head"; echo "$(date) $(uptime)" > "$REC/chain4-rest.txt"
SUB=dark THEME=dark bash "$P/H4-baseline-rest.sh" "$OUT" "ST FM W1 W3" "fv2 bp g"; echo "$(date) $(uptime)" > "$REC/chain4-dark.txt"
echo CHAIN4-DONE > "$REC/chain4-done.txt"
