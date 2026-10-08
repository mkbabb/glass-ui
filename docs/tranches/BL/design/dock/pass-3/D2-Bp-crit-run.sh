#!/bin/bash
# D2-Bp-crit-run.sh: the pass-3 D2-B′ critic's own reading (D2-Bp-critique.md), one browser process
# at a time, after `D2-Bp-p3-run.sh <builds> <out> "full dark"` (PROTO=proto, REC_DIR=D2-Bp-crit-records).
#   bash D2-Bp-crit-run.sh <builds-dir> <out> [step-list]
# <builds-dir>/proto = HEAD + floor-v2.patch + D2-Bp-proto.patch; <builds-dir>/base = HEAD + floor-v2.patch.
# Steps (default "rerun lune probes crit darkrest w8"):
#   rerun     W3 swap-short / swap-long / anchor-end·warm-collapse twice each (the janky-cell rule)
#   lune      D2-Bp-crit-probes.mjs lune on proto and base (R5: corners outside the arc)
#   probes    D2-Bp-p3-probes.mjs retarget (2 reps), hit, trough (2 reps) on proto
#   crit      pass-2/D2-G-crit-probes.mjs vagree, stall, seam, ghosts on proto (the other route's arms)
#   darkrest  W1 (all cells), W2, W4, W5, W6, W7 dark (the prototype ran only ST, W3, FM, W1 card|vmorph dark)
#   w8        W8 again (light), twice
set -u
BD=$1; OUT=$2; STEPS=${3:-"rerun lune probes crit darkrest w8"}
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; A=$D/pass-3/adapter-floor-v2.mjs; REC=$D/pass-3/D2-Bp-crit-records
mkdir -p "$REC"
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
one() { # log-name theme script args...
  local log="$REC/$1.log" theme=$2; shift 2
  uptime > "$log"
  if [ "$theme" = dark ]; then DOCK_HARNESS_THEME=dark timeout 3600 node "$@" >> "$log" 2>&1; else timeout 3600 node "$@" >> "$log" 2>&1; fi
  (echo "exit $?"; uptime) >> "$log"
}
P=$BD/proto
for step in $STEPS; do
  case $step in
    rerun) for k in 1 2; do one rerun-W3-swap-$k light $H/w3-morph.mjs --build "$P" --adapter "$A" --out "$OUT/rerun$k" --engine chromium,webkit --cells '^(swap-short|swap-long|anchor-end·warm-collapse)'; done ;;
    lune) for b in proto base; do one lune-$b light $D/pass-3/D2-Bp-crit-probes.mjs --build "$BD/$b" --adapter "$A" --arm lune --engine all --out "$REC/lune-$b.json"; done ;;
    probes) one probes-proto light $D/pass-3/D2-Bp-p3-probes.mjs --build "$P" --adapter "$A" --arm retarget,hit,trough --engine all --reps 2 --out "$REC/probes-proto.json" ;;
    crit) one crit-proto light $D/pass-2/D2-G-crit-probes.mjs --build "$P" --adapter "$A" --arm vagree,stall,seam,ghosts --engine all --reps 2 --out "$REC/crit-proto.json" ;;
    darkrest) for w in w1-corner w2-run w4-state w5-rim w6-collapsed-form w7-edge; do one dark-$w dark $H/$w.mjs --build "$P" --adapter "$A" --out "$OUT/dark2" --engine chromium,webkit; done ;;
    w8) for k in 1 2; do one rerun-W8-$k light $H/w8-motion.mjs --build "$P" --adapter "$A" --out "$OUT/w8-$k" --engine chromium,webkit; done ;;
  esac
done
echo "DONE $STEPS $(date -u +%FT%TZ)" >> "$REC/crit-done.txt"
