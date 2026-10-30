#!/bin/zsh
# P-E9 (D5 pass 9): one stage per call, `run-e9.sh <stage> <engine>`; each log opens and closes with the 1/5/15-minute
# load and the build's label. Builds (builds.sh) in the worktree: cand9, plant-noread, plant-nolens, plant-loop, cand8,
# probe9. Logs logs/<stage>-<engine>.log (a re-run gets a time suffix); JSON json/<stage>/. Chromium stages run one per
# guarded call (chain.sh); the WebKit stages inside the one `guarded --exclusive webkit` acquisition (wk-queue.sh).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-9/E9
WT=$G/.claude/worktrees/bl/D5/p9/E9/wt; B=$WT/.e9out/builds
stage=$1; e=$2
log=$R/logs/$stage-$e.log; [[ -e $log ]] && log=$R/logs/$stage-$e-$(date +%H%M%S).log
NEW10=(--scenes clipstale,presented --part anc,dlg,trail,glide,feather)
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# P-E9 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
case $stage in
  # the candidate's whole battery, witness by witness (E-2 both commit arms; E-13 frames kept for the glance set)
  cand9-E-*) W=${stage#cand9-}; x=(); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/glance/loupe/cand9)
             w $H/${F[$W]}.mjs --build $B/cand9 --wt $WT --out $R/json/cand9 $x ;;
  cand9-prmplant) w $H/e9-prm.mjs --build $B/cand9 --wt $WT --out $R/json/cand9-prmplant --prm-plant ;;
  cand9-cap)  w $H/capture.mjs --build $B/cand9 --label cand9 --frames $R/glance/cand9/frames --sheets $R/glance/cand9; cp $R/glance/cand9/cand9-index.json $R/glance/cand9/cand9-index-$e.json 2>/dev/null ;;
  cand9-tip)  w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand9 --out $R/json/tip --frames $R/glance/loupe/cand9 ;;
  cand9-idle) w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/cand9 --out $R/json/idle --only idle ;;
  cand9-loop) w $R/probe/e9-probe.mjs --build $B/cand9 --out $R/json/loop ;;
  # the plants
  cand8-E-10new)  w $H/e10-continuity.mjs --build $B/cand8 --out $R/json/cand8 $NEW10 ;;
  noread-E-10)    w $H/e10-continuity.mjs --build $B/plant-noread --out $R/json/plant-noread ;;
  nolens-E-13)    w $H/e13-loupe.mjs --build $B/plant-nolens --out $R/json/plant-nolens --frames $R/glance/loupe/plant-nolens ;;
  loop-plant)     w $R/probe/e9-probe.mjs --build $B/plant-loop --out $R/json/plant-loop ;;
  # the probe (the promoted construction with the shared loupe items), on H9's whole family
  probe9-E-10)  w $H/e10-continuity.mjs --build $B/probe9 --out $R/json/probe9 ;;
  probe9-E-13)  w $H/e13-loupe.mjs --build $B/probe9 --out $R/json/probe9 --frames $R/glance/loupe/probe9 ;;
  probe9-tip)   w $P/pass-8/E8/probe/e8-probe.mjs --build $B/probe9 --out $R/json/probe9-tip --frames $R/glance/loupe/probe9 ;;
  probe9-idle)  w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/probe9 --out $R/json/probe9-idle --only idle ;;
  probe9-cap)   w $H/capture.mjs --build $B/probe9 --label probe9 --frames $R/glance/probe9/frames --sheets $R/glance/probe9; cp $R/glance/probe9/probe9-index.json $R/glance/probe9/probe9-index-$e.json 2>/dev/null ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED) · [0-9]+ pass' $log | tail -1 | cut -c1-160) · $(tail -1 $log)"
