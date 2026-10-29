#!/bin/zsh
# C-A8 stages. `ENGINE=chromium stages.sh <stage...>`: each stage in its own guarded call (never --light: each starts a
# browser). `ENGINE=webkit INSIDE=1 stages.sh <stage...>`: bare, inside the ONE `guarded --exclusive webkit` acquisition
# (chain-webkit.sh). Every log opens and closes with the 1/5/15-min load. Builds: builds.sh (.ca8out/builds/<label>).
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
C=$P/pass-8/C-A8; H=$P/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/C-A8/wt
O=$WT/.ca8out/builds; E=${ENGINE:-chromium}
PR=$C/probe/ca8-probe.mjs; TIP=$P/pass-8/E8/probe/e8-probe.mjs; IDLE=$P/pass-6/C-A6/probe/ca6-probe.mjs
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
CLIP=(--scenes clipstale --part vanish,feather,radius,place,film)
[[ -e $C/logs/wk-running && $E == chromium && -z $FORCE ]] && { echo "webkit acquisition running: chromium stage refused"; exit 4; }
st() {
  local n=$1; shift; local L=$C/logs/$n.log
  [[ -e $L ]] && L=$C/logs/$n-$(date +%H%M%S).log
  { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L
  if [[ -n $INSIDE ]]; then "$@" >> $L 2>&1; else $HOME/.claude/guard/guarded --timeout ${TMO:-60} -- "$@" >> $L 2>&1; fi; local rc=$?
  echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L
  echo "$n exit $rc · $(grep -v '^#' $L | grep -E ' (PASS|FAIL|UNMEASURED|HARNESS ERROR) · ' | tail -1 | cut -c1-220)"
}
[[ -n $INSIDE ]] && echo "# $(date '+%F %T') admitted · load $(sysctl -n vm.loadavg)"
for s in ${@}; do
  case $s in
    E-*) extra=(); [[ $s == E-2 ]] && extra=(--commit-arms i,ii); [[ $s == E-13 ]] && extra=(--frames $C/glance/loupe/cand8)
         st cand8-$E-$s node $H/${F[$s]}.mjs --build $O/cand8 --wt $WT --engine $E --out $C/json/cand8 $extra ;;
    prmplant) st cand8-$E-E-9-prmplant node $H/e9-prm.mjs --build $O/cand8 --wt $WT --engine $E --out $C/json/cand8-prmplant --prm-plant ;;
    cap)  st cap-cand8-$E node $H/capture.mjs --build $O/cand8 --label cand8 --engine $E --frames $C/glance/cand8/frames --sheets $C/glance/cand8 ;;
    tip)  st tip-cand8-$E node $TIP --build $O/cand8 --engine $E --out $C/json/tip --frames $C/glance/loupe/cand8 ;;
    idle) st idle-cand8-$E node $IDLE --build $O/cand8 --engine $E --out $C/json/idle --only idle ;;
    ca8)  st ca8-cand8-$E node $PR --build $O/cand8 --engine $E --out $C/json/ca8-cand8 --frames $C/glance/probe --label cand8 --only trail,ancestor,glidescale,feather,crest
          st ca8dlg-cand8-$E node $PR --build $O/dlg-cand8 --engine $E --out $C/json/ca8dlg-cand8 --frames $C/glance/probe --label cand8 --only dlg ;;
    ca8-probe) st ca8-probe-$E node $PR --build $O/probe --engine $E --out $C/json/ca8-probe --frames $C/glance/probe --label probe --only trail,ancestor,glidescale,feather
          st ca8dlg-probe-$E node $PR --build $O/dlg-probe --engine $E --out $C/json/ca8dlg-probe --frames $C/glance/probe --label probe --only dlg ;;
    ca8-cand7) st ca8-plant-cand7-$E node $PR --build $O/plant-cand7 --engine $E --out $C/json/ca8-plant-cand7 --label plant-cand7 --only trail,feather ;;
    plant-cand7) st plant-cand7-$E-E-10 node $H/e10-continuity.mjs --build $O/plant-cand7 --wt $WT --engine $E --out $C/json/plant-cand7 $CLIP
                 st plant-cand7-$E-E-13 node $H/e13-loupe.mjs --build $O/plant-cand7 --wt $WT --engine $E --out $C/json/plant-cand7 --frames $C/glance/loupe/plant-cand7
                 st plant-cand7-$E-tip node $TIP --build $O/plant-cand7 --engine $E --out $C/json/plant-cand7 --frames $C/glance/loupe/plant-cand7 ;;
    plant-loupe6) st plant-loupe6-$E-E-13 node $H/e13-loupe.mjs --build $O/plant-loupe6 --wt $WT --engine $E --out $C/json/plant-loupe6 --scenes slider ;;
    plant-chipfaint) st plant-chipfaint-$E-E-12 node $H/e12-floor.mjs --build $O/plant-chipfaint --wt $WT --engine $E --out $C/json/plant-chipfaint --scenes capsule ;;
    plant-crest) st plant-crest-$E-ca8 node $PR --build $O/plant-crest --engine $E --out $C/json/plant-crest --label plant-crest --only crest ;;
    plant-prmY) st plant-prmY-$E-E-9 node $H/e9-prm.mjs --build $O/plant-prmY --wt $WT --engine $E --out $C/json/plant-prmY ;;
    plant-nomask) st plant-nomask-$E-E-10 node $H/e10-continuity.mjs --build $O/plant-nomask --wt $WT --engine $E --out $C/json/plant-nomask --scenes clipstale --part feather
                  st plant-nomask-$E-ca8 node $PR --build $O/plant-nomask --engine $E --out $C/json/plant-nomask --label plant-nomask --only feather ;;
    probe-E-10) st probe-$E-E-10 node $H/e10-continuity.mjs --build $O/probe --wt $WT --engine $E --out $C/json/probe ;;
    probe-E-13) st probe-$E-E-13 node $H/e13-loupe.mjs --build $O/probe --wt $WT --engine $E --out $C/json/probe --frames $C/glance/loupe/probe ;;
    probe-E-3)  st probe-$E-E-3 node $H/e3-slider.mjs --build $O/probe --wt $WT --engine $E --out $C/json/probe ;;
    probe-tip)  st probe-tip-$E node $TIP --build $O/probe --engine $E --out $C/json/probe --frames $C/glance/loupe/probe ;;
    probe-idle) st probe-idle-$E node $IDLE --build $O/probe --engine $E --out $C/json/probe-idle --only idle ;;
    probe-cap)  st cap-probe-$E node $H/capture.mjs --build $O/probe --label probe --engine $E --frames $C/glance/probe-cap/frames --sheets $C/glance/probe-cap ;;
    *) echo "unknown stage $s" ;;
  esac
done
