#!/bin/zsh
# P-A6 WebKit phase: runs INSIDE one `guarded --exclusive webkit` acquisition (chain-webkit.sh). Every stage in order;
# each log opens and closes with the 1/5/15-min load.
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/A6
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/A6/wt
B=$WT/.a6out/builds/a6
st() { local n=$1; shift; local L=$A/logs/$n.log; { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L; "$@" >> $L 2>&1; local rc=$?; echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L; echo "$n exit $rc · $(tail -2 $L | head -1 | cut -c1-200)"; }
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor)
for s in ${@}; do
  case $s in
    E-*) extra=(); [[ $s == E-2 ]] && extra=(--commit-arms i,ii); st bat-a6-webkit-$s node $H/${F[$s]}.mjs --build $B --wt $WT --engine webkit --out $A/json/a6 $extra ;;
    probe) st probe-a6-webkit node $A/probe/a6-probe.mjs --build $B --engine webkit --out $A/json/probe ;;
    capture) st cap-a6-webkit node $H/capture.mjs --build $B --label a6 --engine webkit --frames $A/glance/frames --sheets $A/glance ;;
  esac
done
