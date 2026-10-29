#!/bin/zsh
# P-E8 stages. `ENGINE=chromium stages.sh <stage...>` runs each stage in its own guarded call (never --light: each starts a
# browser); `ENGINE=webkit INSIDE=1 stages.sh <stage...>` runs them bare inside the ONE `guarded --exclusive webkit`
# acquisition (chain-webkit.sh). Every log opens and closes with the 1/5/15-min load. Builds: .e8out/builds/{cand8,probe,
# plant-cand7,plant-loupe6} (builds.sh). The worktree stays at cand8's tree (5dc4d9308191) for every `--wt` read.
E8=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/E8
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
P6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/E8/wt
O=$WT/.e8out/builds; E=${ENGINE:-chromium}
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
CLIP=(--scenes clipstale --part vanish,feather,radius,place,film)
st() {
  local n=$1; shift; local L=$E8/logs/$n.log
  [[ -e $L ]] && L=$E8/logs/$n-$(date +%H%M%S).log
  { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L
  if [[ -n $INSIDE ]]; then "$@" >> $L 2>&1; else $HOME/.claude/guard/guarded --timeout ${TMO:-60} -- "$@" >> $L 2>&1; fi; local rc=$?
  echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L
  echo "$n exit $rc · $(grep -v '^#' $L | grep -E ' (PASS|FAIL|UNMEASURED) · ' | tail -1 | cut -c1-200)"
}
[[ -n $INSIDE ]] && echo "# $(date '+%F %T') admitted · load $(sysctl -n vm.loadavg)"
for s in ${@}; do
  case $s in
    E-*) extra=(); [[ $s == E-2 ]] && extra=(--commit-arms i,ii); [[ $s == E-13 ]] && extra=(--frames $E8/glance/loupe/cand8)
         st cand8-$E-$s node $H/${F[$s]}.mjs --build $O/cand8 --wt $WT --engine $E --out $E8/json/cand8 $extra ;;
    prmplant) st cand8-$E-E-9-prmplant node $H/e9-prm.mjs --build $O/cand8 --wt $WT --engine $E --out $E8/json/cand8-prmplant --prm-plant ;;
    cap)  st cap-cand8-$E node $H/capture.mjs --build $O/cand8 --label cand8 --engine $E --frames $E8/glance/cand8/frames --sheets $E8/glance/cand8; cp $E8/glance/cand8/cand8-index.json $E8/glance/cand8/cand8-index-$E.json 2>/dev/null ;;
    tip)  st tip-cand8-$E node $E8/probe/e8-probe.mjs --build $O/cand8 --engine $E --out $E8/json/tip --frames $E8/glance/loupe/cand8 ;;
    idle) st idle-cand8-$E node $P6/C-A6/probe/ca6-probe.mjs --build $O/cand8 --engine $E --out $E8/json/idle --only idle ;;
    plant-cand7) st plant-cand7-$E-E-10 node $H/e10-continuity.mjs --build $O/plant-cand7 --wt $WT --engine $E --out $E8/json/plant-cand7 $CLIP
                 st plant-cand7-$E-E-13 node $H/e13-loupe.mjs --build $O/plant-cand7 --wt $WT --engine $E --out $E8/json/plant-cand7 --frames $E8/glance/loupe/plant-cand7
                 st plant-cand7-$E-tip node $E8/probe/e8-probe.mjs --build $O/plant-cand7 --engine $E --out $E8/json/plant-cand7 --frames $E8/glance/loupe/plant-cand7 ;;
    plant-loupe6) st plant-loupe6-$E-E-13 node $H/e13-loupe.mjs --build $O/plant-loupe6 --wt $WT --engine $E --out $E8/json/plant-loupe6 --scenes slider ;;
    probe-E-10) st probe-$E-E-10 node $H/e10-continuity.mjs --build $O/probe --wt $WT --engine $E --out $E8/json/probe ;;
    probe-E-13) st probe-$E-E-13 node $H/e13-loupe.mjs --build $O/probe --wt $WT --engine $E --out $E8/json/probe --frames $E8/glance/loupe/probe ;;
    probe-E-3)  st probe-$E-E-3 node $H/e3-slider.mjs --build $O/probe --wt $WT --engine $E --out $E8/json/probe ;;
    probe-tip)  st probe-tip-$E node $E8/probe/e8-probe.mjs --build $O/probe --engine $E --out $E8/json/probe ;;
    probe-idle) st probe-idle-$E node $P6/C-A6/probe/ca6-probe.mjs --build $O/probe --engine $E --out $E8/json/probe-idle --only idle ;;
    probe-cap)  st cap-probe-$E node $H/capture.mjs --build $O/probe --label probe --engine $E --frames $E8/glance/probe/frames --sheets $E8/glance/probe; cp $E8/glance/probe/probe-index.json $E8/glance/probe/probe-index-$E.json 2>/dev/null ;;
    *) echo "unknown stage $s" ;;
  esac
done
