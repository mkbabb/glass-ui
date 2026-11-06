#!/bin/zsh
# P-E14 part B (resumed seat): the WebKit list WQ3.q as named acquisitions WK1..WKn, each ONE `guarded --exclusive webkit --timeout 90` call
# running batch14.sh; WKn+1 takes WKn.held unchanged. A guard refusal stops the chain and leaves the held list as the next completion's file.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/PE14-records
list=${1:-$R/WQ3.q}; n=${2:-1}
while (( n <= 8 )); do
  [[ $(grep -cv '^#' $list) -gt 0 ]] || break
  echo "# WK$n queued $(date '+%F %T') · load $(sysctl -n vm.loadavg) · list ${list:t}" >> $R/wk14-chain.log
  ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/batch14.sh WK$n $list >> $R/wk14-chain.log 2>&1; x=$?
  echo "# WK$n guard exit $x · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/wk14-chain.log
  [[ -e $R/WK$n.log ]] || { echo "# WK$n never admitted (no WK$n.log): chain stops; the list ${list:t} is unrun" >> $R/wk14-chain.log; break; }
  list=$R/WK$n.held; n=$((n+1))
done
echo "# chain done $(date '+%F %T')" >> $R/wk14-chain.log
