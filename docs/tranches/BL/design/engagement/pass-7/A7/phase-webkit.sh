#!/bin/zsh
# P-A7 WebKit phase: runs INSIDE one `guarded --exclusive webkit` acquisition (chain-webkit.sh).
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/A7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/A7/wt
O=$WT/.a7out/builds; B=$O/a7; E=webkit
echo "# $(date '+%F %T') admitted · load $(sysctl -n vm.loadavg)"
st() { local n=$1; shift; local L=$A/logs/$n.log; { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L; "$@" >> $L 2>&1; local rc=$?; echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L; echo "$n exit $rc · $(tail -2 $L | head -1 | cut -c1-220)"; }
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor)
for s in ${@}; do
  case $s in
    E-*) extra=(); [[ $s == E-2 ]] && extra=(--commit-arms i,ii); st bat-a7-$E-$s node $H/${F[$s]}.mjs --build $B --wt $WT --engine $E --out $A/json/a7 $extra ;;
    prmplant) st bat-a7-$E-E-9-prmplant node $H/e9-prm.mjs --build $B --wt $WT --engine $E --out $A/json/a7-prmplant --prm-plant ;;
    cap) st cap-a7-$E node $H/capture.mjs --build $B --label a7 --engine $E --frames $A/glance/frames --sheets $A/glance; cp $A/glance/a7-index.json $A/glance/a7-index-$E.json ;;
    plant-chipmute) st plant-chipmute-$E-E-12 node $H/e12-floor.mjs --build $O/plant-chipmute --wt $WT --engine $E --out $A/json/plant-chipmute --scenes capsule ;;
    plant-prmY) st plant-prmY-$E-E-9 node $H/e9-prm.mjs --build $O/plant-prmY --wt $WT --engine $E --out $A/json/plant-prmY ;;
    plant-crest) st plant-crest-$E-cap node $H/capture.mjs --build $O/plant-crest --label plant-crest --engine $E --frames $A/plants/glance/frames --sheets $A/plants/glance --scenes button; cp $A/plants/glance/plant-crest-index.json $A/plants/glance/plant-crest-index-$E.json ;;
    plant-thumb) st plant-thumb-$E-cap node $H/capture.mjs --build $O/plant-thumb --label plant-thumb --engine $E --frames $A/plants/glance/frames --sheets $A/plants/glance --scenes switch --pointers coarse; cp $A/plants/glance/plant-thumb-index.json $A/plants/glance/plant-thumb-index-$E.json ;;
  esac
done
echo "# $(date '+%F %T') phase end · load $(sysctl -n vm.loadavg)"
