#!/bin/zsh
# C-A9 (D5 pass 9 critic): one stage per call, `run-ca9.sh <stage> <engine>`; each log opens and closes with the load.
# Builds (builds.sh) in C-A9's worktree: cand9, plant-{noread,ancscale,nobelow,loop,glidepx,crest,prmY}, probe9.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-9/C-A9
WT=$G/.claude/worktrees/bl/D5/p9/C-A9/wt; B=$WT/.ca9out/builds
stage=$1; e=$2
log=$R/logs/$stage-$e.log; [[ -e $log ]] && log=$R/logs/$stage-$e-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# C-A9 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
case $stage in
  cand9-E-*) W=${stage#cand9-}; x=(); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/cand9)
             w $H/${F[$W]}.mjs --build $B/cand9 --wt $WT --out $R/json/cand9 $x ;;
  cand9-prmplant) w $H/e9-prm.mjs --build $B/cand9 --out $R/json/cand9-prmplant --prm-plant ;;
  cand9-cap)   w $H/capture.mjs --build $B/cand9 --label cand9 --frames $R/frames/cap/cand9/frames --sheets $R/frames/cap/cand9 ;;
  cand9-tip)   w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand9 --out $R/json/tip ;;
  cand9-e9loop) w $P/pass-9/E9/probe/e9-probe.mjs --build $B/cand9 --out $R/json/e9loop ;;
  cand9-idle)  w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/cand9 --out $R/json/idle --only idle ;;
  cand9-ca9)   w $R/scripts/ca9-probe.mjs --build $B/cand9 --label cand9 --out $R/json/ca9-cand9 --frames $R/frames/ca9 ;;
  cand9-flipstill) w $R/scripts/ca9-probe.mjs --build $B/cand9 --label cand9 --out $R/json/ca9-cand9-flipstill --frames $R/frames/ca9 --only flipstill ;;
  cand9-crest) w $P/pass-8/C-A8/probe/ca8-probe.mjs --build $B/cand9 --label cand9 --out $R/json/crest-cand9 --only crest ;;
  noread-E-10) w $H/e10-continuity.mjs --build $B/plant-noread --out $R/json/plant-noread --part old ;;
  glidepx-E-10) w $H/e10-continuity.mjs --build $B/plant-glidepx --out $R/json/plant-glidepx --scenes clipstale --part glide ;;
  ancscale-E-13) w $H/e13-loupe.mjs --build $B/plant-ancscale --out $R/json/plant-ancscale ;;
  nobelow-E-13) w $H/e13-loupe.mjs --build $B/plant-nobelow --out $R/json/plant-nobelow ;;
  loop-ca9)    w $R/scripts/ca9-probe.mjs --build $B/plant-loop --label plant-loop --out $R/json/ca9-plant-loop --only loop ;;
  crest-crest) w $P/pass-8/C-A8/probe/ca8-probe.mjs --build $B/plant-crest --label plant-crest --out $R/json/crest-plant --only crest ;;
  prmY-E-9)    w $H/e9-prm.mjs --build $B/plant-prmY --out $R/json/plant-prmY ;;
  probe9-E-10) w $H/e10-continuity.mjs --build $B/probe9 --out $R/json/probe9 ;;
  probe9-E-13) w $H/e13-loupe.mjs --build $B/probe9 --out $R/json/probe9 --frames $R/frames/loupe/probe9 ;;
  probe9-ca9)  w $R/scripts/ca9-probe.mjs --build $B/probe9 --label probe9 --out $R/json/ca9-probe9 --frames $R/frames/ca9 ;;
  probe9-cap)  w $H/capture.mjs --build $B/probe9 --label probe9 --frames $R/frames/cap/probe9/frames --sheets $R/frames/cap/probe9 ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|REPORT) · [0-9]+ pass' $log | tail -1 | cut -c1-170) · $(tail -1 $log)"
