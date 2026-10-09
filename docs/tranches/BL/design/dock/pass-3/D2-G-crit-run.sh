#!/bin/bash
# D2-G-crit-run.sh: the pass-3 D2-G critic's own reading (D2-G-critique.md), one browser process at
# a time, after `REC_DIR=…/D2-G-crit-records PROTO=gp D2-G-p3-run.sh <builds> <out> "full dark probes critB critG"`.
#   bash D2-G-crit-run.sh <builds-dir> <out> [step-list]
# <builds-dir>/gp = HEAD + floor-v2.patch + D2-G-proto.patch; <builds-dir>/base = HEAD + floor-v2.patch;
# <builds-dir>/nohit, /nosub = the prototype's plants (D2-G-p3-plants.py), built in the critic's worktree.
# Steps (default "rerun lunec flow retdiag nosub"):
#   rerun    W3 first-expand / content-add / anchor-end·* / neighbour·* twice on gp (the janky-cell rule)
#   lunec    D2-G-crit-probes.mjs lunec on gp, nohit (positive control) and base (R5 at the door's arc)
#   flow     D2-G-crit-probes.mjs flowblock, edgeblock on gp and base, 2 reps (Q-15 / N1 under a block)
#   retdiag  D2-G-crit-probes.mjs retdiag on gp, both engines
#   nosub    W3 '^stretch' on the nosub plant (N-2: the subscription is load-bearing)
#   probes2  chain 1's probes, critB and critG ran at load 280-897: D2-Bp-p3-probes.mjs hit, retarget,
#            trough (2 reps) and the critic arms again, into probes2-*.json
#   retdiag2 the Chromium retarget context loss narrowed, on gp and on base
#   retdiag3 the retarget arm's own evaluate shape, with and without the frame logger, gp and base
#   retarget2 the retarget arm with the retarget scheduled in the page, both engines, 2 reps (R2)
#   retarget2b retarget2 twice more and the route's hit arm again (the janky-cell rule at lower load)
#   flowcells W3 anchor-end·* and neighbour·* three more times, Playwright WebKit (N1, H3-7)
#   darkrest W2, W4, W5, W6, W7 dark on gp (the prototype ran none of these dark)
#   selftest the harness self-test for W1 after the route seat's hit() change, both engines
#   reversal W3 reversal, first-expand, content-add, stretch·lead-add on gp twice; reversal on the nopainted plant twice
#   chardata W3 ticking on gp and on the nochardata plant, twice each (N-2: characterData load-bearing?)
#   darkw3wk W3 dark, Playwright WebKit, twice (the dark first-expand / stretch·lead-add seat steps seen at load 420)
#   w3w1     W3 and W1 in full on gp, light, again (the janky-cell rule once the load fell)
#   swaplag  D2-G-crit-probes.mjs swaplag, 3 reps, both engines (B2: the swap seam against the glass)
#   hit2     D2-Bp-p3-probes.mjs hit, 3 reps (R5: clipped-away centres)
#   darkre   dark W3 cells red at load 450-876 (content-remove, stretch·lead-add, wide·collapsed-rest)
#            and dark W1 '^vmorph' twice
set -u
BD=$1; OUT=$2; STEPS=${3:-"rerun lunec flow retdiag nosub"}
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; A=$D/pass-3/adapter-G-p3.mjs; AB=$D/pass-3/adapter-floor-v2.mjs; REC=${REC_DIR:-$D/pass-3/D2-G-crit-records}
X=$D/pass-3/D2-G-crit-probes.mjs
mkdir -p "$REC"
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
one() { # log-name script args...
  local log="$REC/$1.log"; shift
  uptime > "$log"; timeout 3600 node "$@" >> "$log" 2>&1; (echo "exit $?"; uptime) >> "$log"
}
for step in $STEPS; do
  case $step in
    rerun) for k in 1 2; do one rerun-W3-$k $H/w3-morph.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/rerun$k" --engine chromium,webkit --cells '^(first-expand|content-add|anchor-end·|neighbour·)'; done ;;
    lunec)
      one lunec-gp $X --build "$BD/gp" --adapter "$A" --arm lunec --engine all --out "$REC/lunec-gp.json"
      one lunec-nohit $X --build "$BD/nohit" --adapter "$A" --arm lunec --engine all --out "$REC/lunec-nohit.json"
      one lunec-base $X --build "$BD/base" --adapter "$AB" --arm lunec --engine all --out "$REC/lunec-base.json" ;;
    flow)
      one flow-gp $X --build "$BD/gp" --adapter "$A" --arm flowblock,edgeblock --engine all --reps 2 --out "$REC/flow-gp.json" --cast "$OUT/cast"
      one flow-base $X --build "$BD/base" --adapter "$AB" --arm flowblock,edgeblock --engine all --reps 2 --out "$REC/flow-base.json" --cast "$OUT/cast" ;;
    retdiag) one retdiag-gp $X --build "$BD/gp" --adapter "$A" --arm retdiag --engine all --out "$REC/retdiag-gp.json" ;;
    probes2)
      one probes2-p3 $D/pass-3/D2-Bp-p3-probes.mjs --build "$BD/gp" --adapter "$A" --arm hit,retarget,trough --engine all --reps 2 --out "$REC/probes2-p3.json"
      one probes2-critB $D/pass-2/D2-Bp-crit-probes.mjs --build "$BD/gp" --adapter "$A" --arm blank,lattice,infanim,popdetail --engine all --out "$REC/probes2-critB.json"
      one probes2-critG $D/pass-2/D2-G-crit-probes.mjs --build "$BD/gp" --adapter "$A" --arm vagree,stall,ghosts --engine all --reps 2 --out "$REC/probes2-critG.json" ;;
    darkre) for k in 1 2; do
      uptime > "$REC/darkre-W3-$k.log"; DOCK_HARNESS_THEME=dark timeout 3600 node $H/w3-morph.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/darkre$k" --engine chromium,webkit --cells '^(content-remove|stretch·lead-add|wide·collapsed-rest)' >> "$REC/darkre-W3-$k.log" 2>&1; (echo "exit $?"; uptime) >> "$REC/darkre-W3-$k.log"
      uptime > "$REC/darkre-W1-$k.log"; DOCK_HARNESS_THEME=dark timeout 3600 node $H/w1-corner.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/darkre$k" --engine chromium,webkit --cells '^vmorph' >> "$REC/darkre-W1-$k.log" 2>&1; (echo "exit $?"; uptime) >> "$REC/darkre-W1-$k.log"
      done ;;
    retdiag2) one retdiag2-gp $X --build "$BD/gp" --adapter "$A" --arm retdiag2 --engine chromium --out "$REC/retdiag2-gp.json"
      one retdiag2-base $X --build "$BD/base" --adapter "$AB" --arm retdiag2 --engine chromium --out "$REC/retdiag2-base.json" ;;
    retdiag3) one retdiag3-gp $X --build "$BD/gp" --adapter "$A" --arm retdiag3 --engine chromium --out "$REC/retdiag3-gp.json"
      one retdiag3-base $X --build "$BD/base" --adapter "$AB" --arm retdiag3 --engine chromium --out "$REC/retdiag3-base.json" ;;
    retarget2) one retarget2-gp $X --build "$BD/gp" --adapter "$A" --arm retarget2 --engine all --reps 2 --out "$REC/retarget2-gp.json" ;;
    retarget2b) for k in b c; do one retarget2$k-gp $X --build "$BD/gp" --adapter "$A" --arm retarget2 --engine all --reps 2 --out "$REC/retarget2$k-gp.json"; done
      one hitb-gp $D/pass-3/D2-Bp-p3-probes.mjs --build "$BD/gp" --adapter "$A" --arm hit --engine all --reps 2 --out "$REC/hitb-gp.json" ;;
    flowcells) for k in 3 4 5; do one rerun-W3-$k $H/w3-morph.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/rerun$k" --engine webkit --cells '^(anchor-end·|neighbour·)'; done ;;
    darkrest) for w in w2-run w4-state w5-rim w6-collapsed-form w7-edge; do
      uptime > "$REC/dark-$w.log"; DOCK_HARNESS_THEME=dark timeout 3600 node $H/$w.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/dark2" --engine chromium,webkit >> "$REC/dark-$w.log" 2>&1; (echo "exit $?"; uptime) >> "$REC/dark-$w.log"; done ;;
    selftest) one selftest-W1 $H/selftest.mjs --engine all --only W1 --out "$OUT/selftest" ;;
    reversal) for k in 1 2; do one rev-gp-$k $H/w3-morph.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/rev$k" --engine chromium,webkit --cells '^(reversal|first-expand|content-add|stretch·lead-add)$' --no-faces
      one rev-nopainted-$k $H/w3-morph.mjs --build "$BD/nopainted" --adapter "$A" --out "$OUT/revnp$k" --engine webkit --cells '^reversal$' --no-faces; done ;;
    chardata) for k in 1 2; do one tick-gp-$k $H/w3-morph.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/tick$k" --engine chromium,webkit --cells '^ticking$' --no-faces
      one tick-nochardata-$k $H/w3-morph.mjs --build "$BD/nochardata" --adapter "$A" --out "$OUT/ticknc$k" --engine chromium,webkit --cells '^ticking$' --no-faces; done ;;
    darkw3wk) for k in 1 2; do
      uptime > "$REC/darkw3wk-$k.log"; DOCK_HARNESS_THEME=dark timeout 3600 node $H/w3-morph.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/darkw3wk$k" --engine webkit --no-faces >> "$REC/darkw3wk-$k.log" 2>&1; (echo "exit $?"; uptime) >> "$REC/darkw3wk-$k.log"; done ;;
    w3w1) one w3-light-low $H/w3-morph.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/w3low" --engine chromium,webkit
      one w1-light-low $H/w1-corner.mjs --build "$BD/gp" --adapter "$A" --out "$OUT/w1low" --engine chromium,webkit ;;
    swaplag) one swaplag-gp $X --build "$BD/gp" --adapter "$A" --arm swaplag --engine all --reps 3 --out "$REC/swaplag-gp.json" --cast "$REC/swaplag-shots" ;;
    hit2) one hit2-gp $D/pass-3/D2-Bp-p3-probes.mjs --build "$BD/gp" --adapter "$A" --arm hit --engine all --reps 3 --out "$REC/hit2-gp.json" ;;
    nosub) one plant-nosub $H/w3-morph.mjs --build "$BD/nosub" --adapter "$A" --out "$OUT/plants/nosub" --engine chromium,webkit --cells '^stretch' --no-faces ;;
  esac
done
echo "DONE $STEPS $(date -u +%FT%TZ)" >> "$REC/crit-done.txt"
