#!/bin/zsh
# C-E8 stages. `ENGINE=chromium stages.sh <stage...>` runs each stage in its own guarded call (never --light: each starts a
# browser); `ENGINE=webkit INSIDE=1 stages.sh <stage...>` runs them bare inside the ONE `guarded --exclusive webkit`
# acquisition (chain-webkit.sh). Every log opens and closes with the 1/5/15-min load. Builds: .ce8out/builds/{cand8,probe,
# plant-cand7} (builds.sh), the harness's own app. The worktree stays at cand8's bytes for every `--wt` read.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/C-E8
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
P6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6
E8P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/E8/probe/e8-probe.mjs
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/C-E8/wt
O=$WT/.ce8out/builds; E=${ENGINE:-chromium}
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
CLIP=(--scenes clipstale --part vanish,feather,radius,place,film)
st() {
  local n=$1; shift; local L=$C/logs/$n.log
  [[ -e $L ]] && L=$C/logs/$n-$(date +%H%M%S).log
  { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L
  if [[ -n $INSIDE ]]; then "$@" >> $L 2>&1; else $HOME/.claude/guard/guarded --timeout ${TMO:-60} -- "$@" >> $L 2>&1; fi; local rc=$?
  echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L
  echo "$n exit $rc · $(grep -E '^(E-|CE8|E8|CA6|ca6)[^ ]* (chromium|webkit) ' $L | tail -1 | cut -c1-200)"
}
[[ -n $INSIDE ]] && echo "# $(date '+%F %T') admitted · load $(sysctl -n vm.loadavg)"
for s in ${@}; do
  case $s in
    E-*) extra=(); [[ $s == E-2 ]] && extra=(--commit-arms i,ii); [[ $s == E-13 ]] && extra=(--frames $C/glance/loupe/cand8)
         st cand8-$E-$s node $H/${F[$s]}.mjs --build $O/cand8 --wt $WT --engine $E --out $C/json/cand8 $extra ;;
    prmplant) st cand8-$E-E-9-prmplant node $H/e9-prm.mjs --build $O/cand8 --wt $WT --engine $E --out $C/json/cand8-prmplant --prm-plant ;;
    cap)  st cap-cand8-$E node $H/capture.mjs --build $O/cand8 --label cand8 --engine $E --frames $C/glance/cand8/frames --sheets $C/glance/cand8 ;;
    tip)  st tip-cand8-$E node $E8P --build $O/cand8 --engine $E --out $C/json/tip --frames $C/glance/loupe/cand8 ;;
    idle) st idle-cand8-$E node $P6/C-A6/probe/ca6-probe.mjs --build $O/cand8 --engine $E --out $C/json/idle --only idle ;;
    ce8)  st ce8-cand8-$E node $C/probe/ce8-probe.mjs --build $O/cand8 --engine $E --out $C/json/ce8-cand8 --frames $C/glance/ce8/cand8 ;;
    ce8-probe) st ce8-probe-$E node $C/probe/ce8-probe.mjs --build $O/probe --engine $E --out $C/json/ce8-probe --frames $C/glance/ce8/probe ;;
    ce8-cand7) st ce8-cand7-$E node $C/probe/ce8-probe.mjs --build $O/plant-cand7 --engine $E --out $C/json/ce8-cand7 --frames $C/glance/ce8/cand7 --only anc,loupe ;;
    plant-cand7) st plant-cand7-$E-E-10 node $H/e10-continuity.mjs --build $O/plant-cand7 --wt $WT --engine $E --out $C/json/plant-cand7 $CLIP
                 st plant-cand7-$E-E-13 node $H/e13-loupe.mjs --build $O/plant-cand7 --wt $WT --engine $E --out $C/json/plant-cand7 --frames $C/glance/loupe/plant-cand7
                 st plant-cand7-$E-tip node $E8P --build $O/plant-cand7 --engine $E --out $C/json/plant-cand7 --frames $C/glance/loupe/plant-cand7 ;;
    probe-E-10) st probe-$E-E-10 node $H/e10-continuity.mjs --build $O/probe --wt $WT --engine $E --out $C/json/probe ;;
    probe-E-13) st probe-$E-E-13 node $H/e13-loupe.mjs --build $O/probe --wt $WT --engine $E --out $C/json/probe --frames $C/glance/loupe/probe ;;
    probe-E-3)  st probe-$E-E-3 node $H/e3-slider.mjs --build $O/probe --wt $WT --engine $E --out $C/json/probe ;;
    probe-idle) st probe-idle-$E node $P6/C-A6/probe/ca6-probe.mjs --build $O/probe --engine $E --out $C/json/probe-idle --only idle ;;
    *) echo "unknown stage $s" ;;
  esac
done
