#!/bin/bash
# floor-v2-run.sh: H3 on HEAD + floor v2 (D2 pass 3, FLOOR-V2.md), one witness process at a time.
# The pass-3 baseline's scope (H3-baseline.sh): ST, W3 --no-faces, FM, W7, W1 '^card|^vmorph',
# light (no scheme forced) and dark (DOCK_HARNESS_THEME=dark; W7 carries its own light/dark
# matrix and runs once); then W2, W4, W5, W6 light, the floor rows' witnesses, as a regression read.
# Adapter: pass-3/adapter-floor-v2.mjs. No WebKit shim: every Playwright WebKit cell is unshimmed.
#   bash floor-v2-run.sh <build-dir> <out> [step-list, default "light dark rows"]
# Logs: $REC_DIR/run-<W>-<theme>.log, load before and after each (default pass-3/FLOOR-V2-records, where the
# draft build fv2's run sits; the final build fv2c's run is in FLOOR-V2-records/fv2c/).
set -u
B=$1; OUT=$2; STEPS=${3:-"light dark rows"}
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; A=$D/pass-3/adapter-floor-v2.mjs; REC=${REC_DIR:-$D/pass-3/FLOOR-V2-records}
mkdir -p "$REC"
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
PROC_S=${PROC_S:-3600}
one() { # label theme script args...
  local log="$REC/run-$1-$2.log" theme=$2; shift 2
  uptime > "$log"
  if [ "$theme" = dark ]; then DOCK_HARNESS_THEME=dark node "$@" >> "$log" 2>&1 & else node "$@" >> "$log" 2>&1 & fi
  local pid=$! t0=$SECONDS
  while kill -0 $pid 2>/dev/null && [ $((SECONDS - t0)) -lt $PROC_S ]; do sleep 5; done
  if kill -0 $pid 2>/dev/null; then kill -9 $pid; pkill -9 -P $pid; echo "WATCHDOG: killed after ${PROC_S}s" >> "$log"; fi
  wait $pid 2>/dev/null; (echo "exit $?"; uptime) >> "$log"
}
for step in $STEPS; do
  case $step in
    light|dark)
      t=$step
      one ST $t $H/stall.mjs --build "$B" --adapter "$A" --out "$OUT/$t" --engine chromium,webkit
      one W3 $t $H/w3-morph.mjs --build "$B" --adapter "$A" --out "$OUT/$t" --engine chromium,webkit --no-faces
      one FM $t $H/film.mjs --build "$B" --adapter "$A" --out "$OUT/$t" --engine chromium,webkit
      [ $t = light ] && one W7 $t $H/w7-edge.mjs --build "$B" --adapter "$A" --out "$OUT/$t" --engine chromium,webkit
      one W1 $t $H/w1-corner.mjs --build "$B" --adapter "$A" --out "$OUT/$t" --engine chromium,webkit --cells '^card|^vmorph'
      ;;
    rows)
      for w in w2-run w4-state w5-rim w6-collapsed-form; do one ${w%%-*} light $H/$w.mjs --build "$B" --adapter "$A" --out "$OUT/light" --engine chromium,webkit; done
      ;;
    *) one "$step" light $H/w3-morph.mjs --build "$B" --adapter "$A" --out "$OUT/$step" --engine chromium,webkit --no-faces ;;
  esac
done
echo "DONE $STEPS" >> "$REC/run-done.txt"
