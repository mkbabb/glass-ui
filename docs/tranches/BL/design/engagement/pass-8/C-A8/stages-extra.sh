#!/bin/zsh
# C-A8 extra stages (same contract as stages.sh): feather-re = E-10's feather cell alone on the candidate, a re-read of
# P-E8's WebKit keyboard ×0.58 (P-E8 §0 item 3); on its first call per engine also C-A8's trailstill cell (added mid-seat
# after the WebKit trail film read a persistent 13 px offset: where the body stands after the wheel has stopped).
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
C=$P/pass-8/C-A8; H=$P/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/C-A8/wt
O=$WT/.ca8out/builds; E=${ENGINE:-chromium}
st() {
  local n=$1; shift; local L=$C/logs/$n.log
  [[ -e $L ]] && L=$C/logs/$n-$(date +%H%M%S).log
  { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L
  if [[ -n $INSIDE ]]; then "$@" >> $L 2>&1; else $HOME/.claude/guard/guarded --timeout ${TMO:-60} -- "$@" >> $L 2>&1; fi; local rc=$?
  echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L
  echo "$n exit $rc · $(grep -v '^#' $L | grep -E ' (PASS|FAIL|UNMEASURED|HARNESS ERROR) · ' | tail -1 | cut -c1-220)"
}
for s in ${@}; do
  case $s in
    feather-re) st cand8-$E-E-10-feather-re node $H/e10-continuity.mjs --build $O/cand8 --wt $WT --engine $E --out $C/json/cand8-feather-re --scenes clipstale --part feather
                if [[ ! -e $C/logs/.trailstill-$E ]]; then touch $C/logs/.trailstill-$E
                  st trailstill-cand8-$E node $C/probe/ca8-probe.mjs --build $O/cand8 --engine $E --out $C/json/trailstill-cand8 --frames $C/glance/probe --label cand8 --only trailstill
                  st trailstill-cand7-$E node $C/probe/ca8-probe.mjs --build $O/plant-cand7 --engine $E --out $C/json/trailstill-cand7 --frames $C/glance/probe --label plant-cand7 --only trailstill; fi ;;
    *) echo "unknown stage $s" ;;
  esac
done
