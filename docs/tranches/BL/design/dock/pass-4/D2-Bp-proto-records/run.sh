#!/bin/bash
# run.sh: the H4 battery on D2-B′ pass 4 (HEAD + floor-v3.patch + D2-Bp-proto.patch), Chromium and Playwright WebKit.
# Adapted from FV3-run.sh: one guarded run per stage; inside it the witnesses run one at a time, each followed by two
# re-runs of its red cells (exact names). Logs: D2-Bp-proto-records/<stage>-<W>[-rerun<k>].log; JSON copied to json/.
#   [ENG=chromium|webkit] bash run.sh <out> <stage>     stage: main | rest | dark | darkrest | extra
# ENG splits the engines across two runs (logs suffixed -<ENG>; give each its own <out>): the WebKit run alone takes the
# machine-wide WebKit lock, so the Chromium run need not queue behind other seats' WebKit runs.
# <out>/builds/bp is the route build (harness/build.mjs --label bp), <out>/builds/fv3 the L1 reference and the cost base.
set -u
OUT=$1; STAGE=$2
REC=$(cd "$(dirname "$0")" && pwd); P4=$(cd "$REC/.." && pwd); D=$(cd "$P4/.." && pwd); H=$D/harness
AD=$D/pass-3/adapter-floor-v2.mjs; B=$OUT/builds/${BUILD:-bp}; E=${ENG:-chromium,webkit}; SFX=${ENG:+-$ENG}
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
script() { case $1 in ST) echo stall.mjs;; W3) echo "w3-morph.mjs --no-faces";; FM) echo film.mjs;; R5) echo r5-hit.mjs;; W1) echo w1-corner.mjs;; W2) echo w2-run.mjs;; W4) echo w4-state.mjs;; W5) echo w5-rim.mjs;; W6) echo w6-collapsed-form.mjs;; W7) echo w7-edge.mjs;; W8) echo w8-motion.mjs;; R6) echo r6-probe.mjs;; CF) echo c-facility.mjs;; L1) echo "l1-light.mjs --ref-build $OUT/builds/fv3 --ref-adapter $AD";; CASES) echo "$REC/probes/cases.mjs";; esac; }
reds() { grep -E '^FAIL  [A-Z0-9]+  (Chromium|Playwright WebKit)' "$1" | awk -F'  ' '{print $4}' | sed -E 's/(\+shim|-unshimmed)$//' | sort -u | sed -E 's/[][(){}.*+?^$|\\]/\\&/g' | paste -sd'|' - ; }
run() { # log witness out [cells]
  local log=$1 w=$2 o=$3 cells=${4:-} s; s=$(script $w); [ "${s:0:1}" = / ] || s="$H/$s"
  uptime > "$log"
  if [ -n "$cells" ]; then node $s --build "$B" --adapter "$AD" --out "$o" --engine "$E" --cells "$cells" >> "$log" 2>&1
  else node $s --build "$B" --adapter "$AD" --out "$o" --engine "$E" >> "$log" 2>&1; fi
  (echo "exit $?"; uptime) >> "$log"
}
one() { # stage witness
  local log="$REC/$1-$2$SFX.log"
  run "$log" $2 "$OUT/$1"
  local r; r=$(reds "$log")
  if [ -n "$r" ]; then for k in 1 2; do run "$REC/$1-$2$SFX-rerun$k.log" $2 "$OUT/$1/rerun$k" "^($r)\$"; done; fi
}
stage() { for w in $2; do one $1 $w; done; }
extra() {
  if [ "$E" != webkit ]; then
    (uptime; node "$H/prose.mjs" "$WT" --out "$OUT/pr"; echo "exit $?"; uptime) > "$REC/extra-PR.log" 2>&1
    (uptime; node "$H/adapter-law.mjs" "$AD"; echo "exit $?") > "$REC/extra-adapter-law.log" 2>&1
  fi
  for b in bp fv3; do (uptime; node "$D/pass-2/D2-Bp-probes.mjs" --build "$OUT/builds/$b" --adapter "$AD" --arm pcost,plead --engine "$E" --out "$REC/cost-$b$SFX.json"; echo "exit $?"; uptime) > "$REC/extra-cost-$b$SFX.log" 2>&1; done
}
X=""; case $E in *webkit*) X="--exclusive webkit";; esac   # a run that starts Playwright WebKit takes the machine-wide WebKit lock
G="$HOME/.claude/guard/guarded $X --timeout ${TMIN:-170} --"
[ -n "${NOGUARD:-}" ] && G=""   # NOGUARD=1: the caller already holds a guarded slot (and the WebKit lock) for several stages
export -f run one stage script reds extra; export OUT B AD H REC D E SFX WT=${WT:-}
case $STAGE in
main) $G bash -c "stage main 'W3 ST R5 CF L1 FM W2 CASES'" ;;
rest) $G bash -c "stage rest 'W1 W4 W5 W6 W7 W8 R6'" ;;
dark) $G env DOCK_HARNESS_THEME=dark bash -c "stage dark 'ST FM W1 W3 W2 R5 CF'" ;;
darkrest) $G env DOCK_HARNESS_THEME=dark bash -c "stage dark 'W4 W5 W6 W7 W8 R6'" ;;
extra) $G bash -c extra ;;
esac
echo "exit $? · $(date) $(uptime)" > "$REC/stage-$STAGE$SFX.txt"
(cd "$OUT" && find . -name '[A-Z]*.json' -path '*runs*' | while read -r f; do mkdir -p "$REC/json${SFX:+/${SFX#-}}/$(dirname "$f")"; cp "$f" "$REC/json${SFX:+/${SFX#-}}/$f"; done)
