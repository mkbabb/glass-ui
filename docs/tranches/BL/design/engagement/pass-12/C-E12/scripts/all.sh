#!/bin/zsh
# C-E12: one waiter, one heavy run at a time: the gates, the CK-22 greps (grep only), the Chromium chain, then WK-1 and, only if WK-1
# left stages, the planned WK-2 (both `guarded --exclusive webkit --timeout 90`).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/C-E12; S=$R/scripts; GD=$HOME/.claude/guard/guarded
wq() { echo "# $2 queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  GUARD_TAG=ce12wk $GD --exclusive webkit --timeout 90 -- zsh $S/wk-run.sh $1 $2
  echo "# $2 guard exit $? $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log; }
{ echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
  zsh $S/gates.sh
  $GD --light --timeout 20 -- bash $S/ck22.sh > $R/logs/ck22-greps.txt 2>&1; echo "ck22 exit $?"
  zsh $S/chain.sh c1.txt; echo "chain done $(date '+%T')"
  wq $S/wk-w1.txt WK-1
  [[ -s $R/logs/wk-left-WK-1.txt ]] && { cp $R/logs/wk-left-WK-1.txt $S/wk-w2.txt; wq $S/wk-w2.txt WK-2; }
  echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } >> $R/logs/all.log 2>&1
