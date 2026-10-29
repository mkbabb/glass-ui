#!/bin/zsh
# C-E7 stages. `ENGINE=chromium stages.sh <stage...>` runs each stage in its own guarded call (never --light: each starts a
# browser); `ENGINE=webkit INSIDE=1 stages.sh <stage...>` runs them bare inside the ONE `guarded --exclusive webkit`
# acquisition (chain-webkit.sh). Every log opens and closes with the 1/5/15-min load. Build: the candidate (P-E7.patch
# a6c82db1 on HEAD) as `ce7`, the harness's own scene app; plants as plant-<name>.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-E7
P7=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
P6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/C-E7/wt
O=$WT/.ce7out/builds; B=$O/ce7; E=${ENGINE:-chromium}
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor)
st() {
  local n=$1; shift; local L=$C/logs/$n.log
  if [[ -n $INSIDE ]]; then
    { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L
    "$@" >> $L 2>&1; local rc=$?
    echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L
  else
    $C/run.sh $n --timeout ${TMO:-60} -- "$@"; local rc=$?
  fi
  echo "$(date '+%T') $n exit $rc · $(grep -v '^#' $L | grep -v '^  note' | tail -1 | cut -c1-200)"
}
[[ -n $INSIDE ]] && echo "# $(date '+%F %T') admitted · load $(sysctl -n vm.loadavg)"
for s in ${@}; do
  case $s in
    E-*) extra=(); [[ $s == E-2 ]] && extra=(--commit-arms i,ii); st bat-ce7-$E-$s node $H/${F[$s]}.mjs --build $B --wt $WT --engine $E --out $C/json/ce7 $extra ;;
    prmplant) st bat-ce7-$E-E-9-prmplant node $H/e9-prm.mjs --build $B --wt $WT --engine $E --out $C/json/ce7-prmplant --prm-plant ;;
    cap) st cap-ce7-$E node $H/capture.mjs --build $B --label ce7 --engine $E --frames $C/glance/frames --sheets $C/glance; cp $C/glance/ce7-index.json $C/glance/ce7-index-$E.json ;;
    e7probe) st e7probe-ce7-$E node $P7/E7/probe/e7-probe.mjs --build $B --engine $E --out $C/json/e7probe --frames $C/glance/loupe --label ce7 ;;
    idle) st idle-ce7-$E node $P6/C-A6/probe/ca6-probe.mjs --build $B --engine $E --out $C/json/idle --only idle ;;
    ce7probe) st ce7probe-ce7-$E node $C/probe/ce7-probe.mjs --build $B --engine $E --out $C/film --frames $C/glance/clip --label ce7 ;;
    sheetv) st sheetv-ce7-$E node $H/e4-momentum.mjs --build $B --wt $WT --engine $E --out $C/json/sheetv --scenes sheet --repeat 10 --repeat-gaps 16,40 ;;
    plant-clip6) st plant-clip6-$E-E-10 node $H/e10-continuity.mjs --build $O/plant-clip6 --wt $WT --engine $E --out $C/json/plant-clip6 --scenes clipstale
                 st plant-clip6-$E-ce7probe node $C/probe/ce7-probe.mjs --build $O/plant-clip6 --engine $E --out $C/film --frames $C/glance/clip --label plant-clip6 --only film ;;
    plant-clipOnly) st plant-clipOnly-$E-E-10 node $H/e10-continuity.mjs --build $O/plant-clipOnly --wt $WT --engine $E --out $C/json/plant-clipOnly --scenes clipstale
                 st plant-clipOnly-$E-e7probe node $P7/E7/probe/e7-probe.mjs --build $O/plant-clipOnly --engine $E --out $C/json/plant-clipOnly --only cliptouch ;;
    plant-pvOnly) st plant-pvOnly-$E-E-10 node $H/e10-continuity.mjs --build $O/plant-pvOnly --wt $WT --engine $E --out $C/json/plant-pvOnly --scenes clipstale
                 st plant-pvOnly-$E-e7probe node $P7/E7/probe/e7-probe.mjs --build $O/plant-pvOnly --engine $E --out $C/json/plant-pvOnly --only cliptouch ;;
    plant-fling6) st plant-fling6-$E-e7probe node $P7/E7/probe/e7-probe.mjs --build $O/plant-fling6 --engine $E --out $C/json/plant-fling6 --only carry ;;
    plant-loupe6) st plant-loupe6-$E-e7probe node $P7/E7/probe/e7-probe.mjs --build $O/plant-loupe6 --engine $E --out $C/json/plant-loupe6 --only loupe --frames $C/plants/loupe --label plant-loupe6 ;;
    plant-chipmute) st plant-chipmute-$E-E-12 node $H/e12-floor.mjs --build $O/plant-chipmute --wt $WT --engine $E --out $C/json/plant-chipmute --scenes capsule ;;
    plant-prmY) st plant-prmY-$E-E-9 node $H/e9-prm.mjs --build $O/plant-prmY --wt $WT --engine $E --out $C/json/plant-prmY ;;
    plant-crest) st plant-crest-$E-cap node $H/capture.mjs --build $O/plant-crest --label plant-crest --engine $E --frames $C/plants/glance/frames --sheets $C/plants/glance --scenes button; cp $C/plants/glance/plant-crest-index.json $C/plants/glance/plant-crest-index-$E.json ;;
    plant-thumb) st plant-thumb-$E-cap node $H/capture.mjs --build $O/plant-thumb --label plant-thumb --engine $E --frames $C/plants/glance/frames --sheets $C/plants/glance --scenes switch --pointers coarse; cp $C/plants/glance/plant-thumb-index.json $C/plants/glance/plant-thumb-index-$E.json ;;
  esac
done
