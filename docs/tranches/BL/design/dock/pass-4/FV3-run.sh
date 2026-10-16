#!/bin/bash
# FV3-run.sh: H4 on floor v3 (D2 pass 4, FLOOR-V3 seat), the 36 rows, Chromium and Playwright WebKit.
# One guarded run per stage (the machine guard's slot, RSS cap and reaping); inside it the witnesses run one
# at a time, bare, each followed by two re-runs of its red cells (exact names), as H4-baseline.sh does.
#   bash FV3-run.sh <out> <stage>      stage: main | rest | dark | n8 | ctrl
# ctrl: the control on floor v2 (<out>/builds/fv2): W1 and W8 by default, CTRL_W='W1 W2 W4 W5 W6 W7 W8 R6' for every
# witness the H4 baseline left without a light floor-v2 reading (H4.md §4).
# <out>/builds/fv3 is floor v3 (build.mjs --label fv3), <out>/builds/fv2 the L1 reference (floor v2).
# Adapter: pass-3/adapter-floor-v2.mjs (floor v3 keeps the floor's DOM contract).
# Logs: pass-4/FV3-records/<stage>-<W>[-rerun<k>].log; the witness JSON is copied to FV3-records/json/.
set -u
OUT=$1; STAGE=$2
P=$(cd "$(dirname "$0")" && pwd); D=$(cd "$P/.." && pwd); H=$D/harness; P3=$D/pass-3; REC=$P/FV3-records
mkdir -p "$REC"
AD=$P3/adapter-floor-v2.mjs; B=$OUT/builds/${BUILD:-fv3}
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
script() { case $1 in ST) echo stall.mjs;; W3) echo "w3-morph.mjs --no-faces";; FM) echo film.mjs;; R5) echo r5-hit.mjs;; W1) echo w1-corner.mjs;; W2) echo w2-run.mjs;; W4) echo w4-state.mjs;; W5) echo w5-rim.mjs;; W6) echo w6-collapsed-form.mjs;; W7) echo w7-edge.mjs;; W8) echo w8-motion.mjs;; R6) echo r6-probe.mjs;; CF) echo c-facility.mjs;; L1) echo "l1-light.mjs --ref-build $OUT/builds/fv2 --ref-adapter $AD";; esac; }
reds() { grep -E '^FAIL  [A-Z0-9]+  (Chromium|Playwright WebKit)' "$1" | awk -F'  ' '{print $4}' | sed -E 's/(\+shim|-unshimmed)$//' | sort -u | sed -E 's/[][(){}.*+?^$|\\]/\\&/g' | paste -sd'|' - ; }
run() { # log witness out [cells]
  local log=$1 w=$2 o=$3 cells=${4:-}
  uptime > "$log"
  if [ -n "$cells" ]; then node $H/$(script $w) --build "$B" --adapter "$AD" --out "$o" --engine chromium,webkit --cells "$cells" >> "$log" 2>&1
  else node $H/$(script $w) --build "$B" --adapter "$AD" --out "$o" --engine chromium,webkit >> "$log" 2>&1; fi
  (echo "exit $?"; uptime) >> "$log"
}
one() { # stage witness
  local log="$REC/$1-$2.log"
  run "$log" $2 "$OUT/$1"
  local r; r=$(reds "$log")
  if [ -n "$r" ]; then for k in 1 2; do run "$REC/$1-$2-rerun$k.log" $2 "$OUT/$1/rerun$k" "^($r)\$"; done; fi
}
stage() { for w in $2; do one $1 $w; done; }
G="$HOME/.claude/guard/guarded --timeout ${TMIN:-170} --"
export -f run one stage script reds; export OUT B AD H REC
case $STAGE in
main) $G bash -c "stage main 'W3 ST R5 CF L1 FM W2'" ;;
rest) $G bash -c "stage rest 'W1 W4 W5 W6 W7 W8 R6'" ;;
ctrl) BUILD=fv2; B=$OUT/builds/fv2; export B; $G bash -c "stage ctrl '${CTRL_W:-W1 W8}'" ;;
dark) $G env DOCK_HARNESS_THEME=dark bash -c "stage dark 'ST FM W1 W3 W2'" ;;
n8)   $G bash -c "uptime; node '$P/FV3-n8-probe.mjs' --build '$OUT/builds/${N8B:-fv3}' --adapter '$AD' --engine chromium,webkit --out '$REC/n8-${N8B:-fv3}.json'; echo exit \$?; uptime" > "$REC/n8-${N8B:-fv3}.log" 2>&1 ;;
esac
echo "exit $? · $(date) $(uptime)" > "$REC/stage-$STAGE.txt"
(cd "$OUT" && find . -name '[A-Z]*.json' -path '*runs*' | while read -r f; do mkdir -p "$REC/json/$(dirname "$f")"; cp "$f" "$REC/json/$f"; done)
