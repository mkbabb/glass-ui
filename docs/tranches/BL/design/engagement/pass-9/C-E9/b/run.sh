#!/bin/zsh
# C-E9b: one stage per call, `run.sh <stage> <engine>`; each log opens and closes with the 1/5/15-minute load.
# The first seat's stage list (../run-ce9.sh) plus probe9-tip and cand9-ce8 / probe9-ce8 (C-E8's own pass-8 cells replayed).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-9/C-E9/b
WT=$G/.claude/worktrees/bl/D5/p9/C-E9b/wt; B=$WT/.ce9out/builds; CE9=$P/pass-9/C-E9/probe/ce9-probe.mjs; CE8=$P/pass-8/C-E8/probe/ce8-probe.mjs
stage=$1; e=$2
log=$R/logs/$stage-$e.log; [[ -e $log ]] && log=$R/logs/$stage-$e-$(date +%H%M%S).log
NEW10=(--scenes clipstale,presented --part anc,dlg,trail,glide,feather)
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# C-E9b $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
case $stage in
  cand9-E-*) W=${stage#cand9-}; x=(); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/cand9)
             w $H/${F[$W]}.mjs --build $B/cand9 --wt $WT --out $R/json/cand9 $x ;;
  cand9-prmplant) w $H/e9-prm.mjs --build $B/cand9 --wt $WT --out $R/json/cand9-prmplant --prm-plant ;;
  cand9-cap)  w $H/capture.mjs --build $B/cand9 --label cand9 --frames $R/frames/cap-cand9/frames --sheets $R/frames/cap-cand9 ;;
  cand9-tip)  w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand9 --out $R/json/tip --frames $R/frames/loupe/cand9 ;;
  cand9-idle) w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/cand9 --out $R/json/idle --only idle ;;
  cand9-loop) w $P/pass-9/E9/probe/e9-probe.mjs --build $B/cand9 --out $R/json/loop ;;
  cand9-ce9)  w $CE9 --build $B/cand9 --label cand9 --out $R/json/ce9-cand9 --frames $R/frames/ce9 ;;
  cand9-ce8)  w $CE8 --build $B/cand9 --out $R/json/ce8-cand9 --frames $R/frames/ce8/cand9 ;;
  cand8-E-10new)  w $H/e10-continuity.mjs --build $B/cand8 --out $R/json/cand8 $NEW10 ;;
  noread-E-10)    w $H/e10-continuity.mjs --build $B/plant-noread --out $R/json/plant-noread ;;
  nolens-E-13)    w $H/e13-loupe.mjs --build $B/plant-nolens --out $R/json/plant-nolens ;;
  loop-plant)     w $P/pass-9/E9/probe/e9-probe.mjs --build $B/plant-loop --out $R/json/plant-loop ;;
  probe9-E-10)  w $H/e10-continuity.mjs --build $B/probe9 --out $R/json/probe9 ;;
  probe9-E-13)  w $H/e13-loupe.mjs --build $B/probe9 --out $R/json/probe9 --frames $R/frames/loupe/probe9 ;;
  probe9-tip)   w $P/pass-8/E8/probe/e8-probe.mjs --build $B/probe9 --out $R/json/probe9-tip ;;
  probe9-idle)  w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/probe9 --out $R/json/probe9-idle --only idle ;;
  probe9-ce9)   w $CE9 --build $B/probe9 --label probe9 --out $R/json/ce9-probe9 --frames $R/frames/ce9 ;;
  probe9-ce8)   w $CE8 --build $B/probe9 --out $R/json/ce8-probe9 --frames $R/frames/ce8/probe9 ;;
  probe9-cap)   w $H/capture.mjs --build $B/probe9 --label probe9 --frames $R/frames/cap-probe9/frames --sheets $R/frames/cap-probe9 ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|HARNESS ERROR) · ' $log | tail -1 | cut -c1-170) · $(tail -1 $log)"
