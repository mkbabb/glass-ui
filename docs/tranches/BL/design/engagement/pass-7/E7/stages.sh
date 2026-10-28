#!/bin/zsh
# P-E7 stages. `ENGINE=chromium stages.sh <stage...>` runs each stage in its own guarded call (never --light: each starts a
# browser); `ENGINE=webkit INSIDE=1 stages.sh <stage...>` runs them bare, inside the ONE `guarded --exclusive webkit`
# acquisition (chain-webkit.sh). Every log opens and closes with the 1/5/15-min load.
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/E7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
P6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/E7/wt
O=$WT/.e7out/builds; B=$O/e7; E=${ENGINE:-chromium}
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor)
st() {
  local n=$1; shift; local L=$A/logs/$n.log
  if [[ -n $INSIDE ]]; then
    { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L
    "$@" >> $L 2>&1; local rc=$?
    echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L
  else
    $A/run.sh $n --timeout ${TMO:-60} -- "$@"; local rc=$?
  fi
  echo "$n exit $rc · $(grep -v '^#' $L | tail -1 | cut -c1-200)"
}
[[ -n $INSIDE ]] && echo "# $(date '+%F %T') admitted · load $(sysctl -n vm.loadavg)"
for s in ${@}; do
  case $s in
    E-*) extra=(); [[ $s == E-2 ]] && extra=(--commit-arms i,ii); st bat-e7-$E-$s node $H/${F[$s]}.mjs --build $B --wt $WT --engine $E --out $A/json/e7 $extra ;;
    prmplant) st bat-e7-$E-E-9-prmplant node $H/e9-prm.mjs --build $B --wt $WT --engine $E --out $A/json/e7-prmplant --prm-plant ;;
    cap) st cap-e7-$E node $H/capture.mjs --build $B --label e7 --engine $E --frames $A/glance/frames --sheets $A/glance; cp $A/glance/e7-index.json $A/glance/e7-index-$E.json ;;
    probe) st probe-e7-$E node $A/probe/e7-probe.mjs --build $B --engine $E --out $A/json/e7-probe --frames $A/glance/loupe --label e7 ;;
    idle) st idle-e7-$E node $P6/C-A6/probe/ca6-probe.mjs --build $B --engine $E --out $A/json/e7-idle --only idle ;;
    plant-clip6) st plant-clip6-$E-E-10 node $H/e10-continuity.mjs --build $O/plant-clip6 --wt $WT --engine $E --out $A/json/plant-clip6 --scenes clipstale
                 st plant-clip6-$E-probe node $A/probe/e7-probe.mjs --build $O/plant-clip6 --engine $E --out $A/json/plant-clip6 --only cliptouch ;;
    plant-fling6) st plant-fling6-$E-probe node $A/probe/e7-probe.mjs --build $O/plant-fling6 --engine $E --out $A/json/plant-fling6 --only carry ;;
    plant-loupe6) st plant-loupe6-$E-probe node $A/probe/e7-probe.mjs --build $O/plant-loupe6 --engine $E --out $A/json/plant-loupe6 --only loupe --frames $A/plants/loupe --label plant-loupe6 ;;
  esac
done
