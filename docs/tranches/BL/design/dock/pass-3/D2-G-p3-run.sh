#!/bin/bash
# D2-G-p3-run.sh: the D2-G prototype's pass-3 reading (D2-G-proto.md), one browser process at a time.
#   bash D2-G-p3-run.sh <builds-dir> <out> [step-list]
# <builds-dir> holds the builds by label (harness/build.mjs --out <x> --label <l> writes <x>/builds/<l>):
#   $PROTO (default gp) the prototype (HEAD + floor v2 + D2-G-proto.patch); the plants by name
#   (D2-G-p3-plants.py, built inside the prototype worktree and restored).
# Steps (default "full dark probes critB critG cost plants"):
#   full    harness/run.mjs, every witness, both engines, --safari (light: no scheme forced)
#   dark    ST, W3 (faces from pixels), FM, W1 '^card|^vmorph' with DOCK_HARNESS_THEME=dark
#   probes  pass-3/D2-Bp-crit-probes.mjs lune (Q-7 at the arc); pass-3/D2-Bp-p3-probes.mjs trough
#           (Both a/b), hit and retarget
#   critB   the other route's critic arms: pass-2/D2-Bp-crit-probes.mjs blank, lattice, infanim,
#           popdetail, film; pass-2/D2-Bp-probes.mjs stretch, idle
#   critG   pass-2/D2-G-crit-probes.mjs vagree, stall, seam, ghosts (2 reps)
#   cost    pass-2/D2-Bp-probes.mjs pcost, plead, pblock; pass-2/D2-G-cost.mjs (block 2 rAFs in)
#   plants  the targeted witness on each plant
#   rerun:<W>:<cells>  one witness's cells on the prototype again (the janky-cell rule)
# Adapter: pass-3/adapter-G-p3.mjs. G has no WebKit shim: every Playwright WebKit cell is unshimmed.
# Logs: $REC/<step>-*.log with uptime before and after each process (default pass-3/D2-G-proto-records).
set -u
BD=$1; OUT=$2; STEPS=${3:-"full dark probes critB critG cost plants"}
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; A=$D/pass-3/adapter-G-p3.mjs; REC=${REC_DIR:-$D/pass-3/D2-G-proto-records}
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
B=$BD/${PROTO:-gp}
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
      one probe-lune light $D/pass-3/D2-Bp-crit-probes.mjs --build "$B" --adapter "$A" --arm lune --engine all --out "$REC/probe-lune.json"
      one probe-p3 light $D/pass-3/D2-Bp-p3-probes.mjs --build "$B" --adapter "$A" --arm trough,hit,retarget --engine all --reps 2 --out "$REC/probe-p3.json"
      ;;
    critB)
      one critB-crit light $D/pass-2/D2-Bp-crit-probes.mjs --build "$B" --adapter "$A" --arm blank,lattice,infanim,popdetail,film --engine all --out "$REC/critB-crit.json" --film "$OUT/critB-film"
      one critB-proto light $D/pass-2/D2-Bp-probes.mjs --build "$B" --adapter "$A" --arm stretch,idle --engine all --out "$REC/critB-proto.json"
      ;;
    critG) one critG light $D/pass-2/D2-G-crit-probes.mjs --build "$B" --adapter "$A" --arm vagree,stall,seam,ghosts --engine all --reps 2 --out "$REC/critG.json" ;;
    cost)
      one cost-proto light $D/pass-2/D2-Bp-probes.mjs --build "$B" --adapter "$A" --arm pcost,plead,pblock --engine all --out "$REC/cost-proto.json"
      one cost-block light $D/pass-2/D2-G-cost.mjs --build "$B" --adapter "$A" --label "${PROTO:-gp}" --out "$OUT/cost-block" --engine chromium,webkit --reps 2
      ;;
    plants)
      one plant-noseam light $H/w3-morph.mjs --build "$BD/noseam" --adapter "$A" --out "$OUT/plants/noseam" --engine chromium,webkit --no-faces
      one plant-noreach light $H/w3-morph.mjs --build "$BD/noreach" --adapter "$A" --out "$OUT/plants/noreach" --engine chromium,webkit --no-faces
      one plant-nostale light $H/stall.mjs --build "$BD/nostale" --adapter "$A" --out "$OUT/plants/nostale" --engine chromium,webkit
      one plant-nopainted light $H/w3-morph.mjs --build "$BD/nopainted" --adapter "$A" --out "$OUT/plants/nopainted" --engine webkit --no-faces
      one plant-nosizes light $H/stall.mjs --build "$BD/nosizes" --adapter "$A" --out "$OUT/plants/nosizes" --engine webkit
      one plant-nosub light $H/w3-morph.mjs --build "$BD/nosub" --adapter "$A" --out "$OUT/plants/nosub" --engine chromium,webkit --no-faces
      one plant-nohit light $D/pass-3/D2-Bp-crit-probes.mjs --build "$BD/nohit" --adapter "$A" --arm lune --engine all --out "$REC/plant-nohit.json"
      one plant-novis light $D/pass-3/D2-Bp-p3-probes.mjs --build "$BD/novis" --adapter "$A" --arm hit --engine all --reps 1 --out "$REC/plant-novis.json"
      one plant-nochardata light $H/w3-morph.mjs --build "$BD/nochardata" --adapter "$A" --out "$OUT/plants/nochardata" --engine chromium,webkit --cells '^ticking' --no-faces
      one plant-noflow light $H/w3-morph.mjs --build "$BD/noflow" --adapter "$A" --out "$OUT/plants/noflow" --engine chromium --no-faces
      one plant-noset light $D/pass-3/D2-Bp-p3-probes.mjs --build "$BD/noset" --adapter "$A" --arm retarget --engine webkit --reps 1 --out "$REC/plant-noset.json"
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
