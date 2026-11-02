#!/bin/zsh
# C-A12: one waiter, one heavy run at a time: the gates, the Chromium chain, then WK-1 and, only if WK-1 left stages, the planned WK-2.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/C-A12; S=$R/scripts
{ echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
  zsh $S/gates.sh
  zsh $S/chain.sh c1.txt; echo "chain done $(date '+%T')"
  zsh $S/wk-queue.sh $S/w1.txt WK-1
  [[ -s $R/logs/wk-left-WK-1.txt ]] && { cp $R/logs/wk-left-WK-1.txt $S/w2.txt; zsh $S/wk-queue.sh $S/w2.txt WK-2; }
  echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } >> $R/logs/all.log 2>&1
