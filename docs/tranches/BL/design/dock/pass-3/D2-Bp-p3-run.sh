#!/bin/bash
# D2-Bp-p3-run.sh: the D2-B′ prototype's pass-3 reading (D2-Bp-proto.md), one browser process at a time.
#   bash D2-Bp-p3-run.sh <builds-dir> <out> [step-list]
# <builds-dir> holds the builds by label (harness/build.mjs --out <x> --label <l> writes <x>/builds/<l>):
#   $PROTO (default b8) the prototype (HEAD + floor v2 + D2-Bp-proto.patch); base HEAD + floor v2;
#   the plants by name (D2-Bp-p3-plants.py; D2-Bp-proto.md §5).
# Steps (default "full dark probes crit cost plants"):
#   full    harness/run.mjs on the prototype, every witness, both engines, --safari (light: no scheme forced)
#   dark    ST, W3 (faces from pixels), FM, W1 '^card|^vmorph' on the prototype with DOCK_HARNESS_THEME=dark
#   probes  pass-3/D2-Bp-p3-probes.mjs retarget (3 reps), hit, trough, subpx and recheck (2 reps) on
#           the prototype; trough, subpx and recheck on base
#   crit    pass-2/D2-G-crit-probes.mjs vagree, stall, seam, ghosts on the prototype and base
#   cost    pass-2/D2-Bp-probes.mjs pcost, plead, idle and pblock on the prototype; pcost, plead on base
#   plants  the targeted W3 cells on each plant
#   rerun:<W>:<cells>  one witness's cells on the prototype again (the janky-cell rule)
# Adapter: pass-3/adapter-floor-v2.mjs, unchanged. No WebKit shim: every Playwright WebKit cell is unshimmed.
# Logs: $REC/<step>-*.log with uptime before and after each process (default pass-3/D2-Bp-proto-records).
set -u
BD=$1; OUT=$2; STEPS=${3:-"full dark probes crit cost plants"}
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; A=$D/pass-3/adapter-floor-v2.mjs; REC=${REC_DIR:-$D/pass-3/D2-Bp-proto-records}
mkdir -p "$REC"
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
PROC_S=${PROC_S:-5400}
one() { # log-name theme script args...
  local log="$REC/$1.log" theme=$2; shift 2
  uptime > "$log"
  if [ "$theme" = dark ]; then DOCK_HARNESS_THEME=dark node "$@" >> "$log" 2>&1 & else node "$@" >> "$log" 2>&1 & fi
  local pid=$! t0=$SECONDS
  while kill -0 $pid 2>/dev/null && [ $((SECONDS - t0)) -lt $PROC_S ]; do sleep 5; done
  if kill -0 $pid 2>/dev/null; then kill -9 $pid; pkill -9 -P $pid; echo "WATCHDOG: killed after ${PROC_S}s" >> "$log"; fi
  wait $pid 2>/dev/null; (echo "exit $?"; uptime) >> "$log"
}
B=$BD/${PROTO:-b8}
for step in $STEPS; do
  case $step in
    full) one full-light light $H/run.mjs --build "$B" --adapter "$A" --out "$OUT/light" --safari ;;
    dark)
      one ST-dark dark $H/stall.mjs --build "$B" --adapter "$A" --out "$OUT/dark" --engine chromium,webkit
      one W3-dark dark $H/w3-morph.mjs --build "$B" --adapter "$A" --out "$OUT/dark" --engine chromium,webkit
      one FM-dark dark $H/film.mjs --build "$B" --adapter "$A" --out "$OUT/dark" --engine chromium,webkit
      one W1-dark dark $H/w1-corner.mjs --build "$B" --adapter "$A" --out "$OUT/dark" --engine chromium,webkit --cells '^card|^vmorph'
      ;;
    probes)
      one probes-proto light $D/pass-3/D2-Bp-p3-probes.mjs --build "$B" --adapter "$A" --arm retarget,hit --engine all --reps 3 --out "$REC/probes-proto.json"
      one probes-proto-2 light $D/pass-3/D2-Bp-p3-probes.mjs --build "$B" --adapter "$A" --arm trough,subpx,recheck --engine all --reps 2 --out "$REC/probes-proto-2.json"
      one probes-base light $D/pass-3/D2-Bp-p3-probes.mjs --build "$BD/base" --adapter "$A" --arm trough,subpx,recheck --engine all --reps 2 --out "$REC/probes-base.json"
      ;;
    crit)
      for b in "${PROTO:-b8}" base; do one crit-$b light $D/pass-2/D2-G-crit-probes.mjs --build "$BD/$b" --adapter "$A" --arm vagree,stall,seam,ghosts --engine all --reps 2 --out "$REC/crit-$b.json"; done
      ;;
    cost)
      one cost-proto light $D/pass-2/D2-Bp-probes.mjs --build "$B" --adapter "$A" --arm pcost,plead,idle,pblock --engine all --out "$REC/cost-proto.json"
      one cost-base light $D/pass-2/D2-Bp-probes.mjs --build "$BD/base" --adapter "$A" --arm pcost,plead --engine all --out "$REC/cost-base.json"
      ;;
    plants)
      one plant-noclip light $H/w3-morph.mjs --build "$BD/noclip" --adapter "$A" --out "$OUT/plants" --engine chromium,webkit --cells '^(warm-collapse|warm-expand|swap-long|compaction)'
      one plant-nowipe light $H/w3-morph.mjs --build "$BD/nowipe" --adapter "$A" --out "$OUT/plants" --engine chromium,webkit --no-faces --cells '^(swap-long|swap-short|warm-collapse|compaction)'
      one plant-noflow light $H/w3-morph.mjs --build "$BD/noflow" --adapter "$A" --out "$OUT/plants" --engine chromium,webkit --no-faces --cells '^neighbour'
      one plant-nohold light $D/pass-3/D2-Bp-p3-probes.mjs --build "$BD/nohold" --adapter "$A" --arm recheck --engine all --reps 1 --out "$REC/plant-nohold.json"
      one plant-nosub light $H/w3-morph.mjs --build "$BD/nosub" --adapter "$A" --out "$OUT/plants" --engine chromium,webkit --no-faces --cells '^(ticking|lead|content|stretch)'
      one plant-nochardata light $H/w3-morph.mjs --build "$BD/nochardata" --adapter "$A" --out "$OUT/plants" --engine chromium,webkit --no-faces --cells '^ticking'
      one plant-single light $D/pass-3/D2-Bp-p3-probes.mjs --build "$BD/single" --adapter "$A" --arm retarget --engine all --reps 1 --out "$REC/plant-single.json"
      one plant-noghost light $H/w3-morph.mjs --build "$BD/noghost" --adapter "$A" --out "$OUT/plants" --engine chromium,webkit --no-faces --cells '^(lead-remove|content-remove)'
      one plant-nosubpx light $H/w3-morph.mjs --build "$BD/nosubpx" --adapter "$A" --out "$OUT/plants" --engine chromium,webkit --no-faces --cells '^lattice'
      one plant-nocadence light $H/stall.mjs --build "$BD/nocadence" --adapter "$A" --out "$OUT/plants" --engine chromium,webkit
      ;;
    rerun:*)
      IFS=: read -r _ w cells <<< "$step"
      n=$(ls "$REC" | grep -c "^rerun-$w-" || true)
      lw=$(echo "$w" | tr A-Z a-z); f=$(cd $H && ls $lw-*.mjs 2>/dev/null | head -1); [ -z "$f" ] && f=stall.mjs
      one "rerun-$w-$((n + 1))" light $H/$f --build "$B" --adapter "$A" --out "$OUT/rerun$((n + 1))" --engine chromium,webkit --cells "$cells"
      ;;
  esac
done
echo "DONE $STEPS $(date -u +%FT%TZ)" >> "$REC/run-done.txt"
