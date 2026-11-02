#!/bin/zsh
# P-E12: one waiter, one heavy run at a time: the gates, the builds, the CK-22 greps (grep only), the Chromium chain, then WK-1 and,
# only if WK-1 left stages, the planned WK-2.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/E12
{ echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
  zsh $R/gates.sh cand12
  zsh $R/builds.sh cand12 noframe framethen glideframe nopivot roomframe listcheck unitread cand11 cand8 > $R/logs/builds.log 2>&1; tail -3 $R/logs/builds.log
  $HOME/.claude/guard/guarded --light --timeout 15 -- bash $R/check-patch.sh > $R/logs/apply-check.txt 2>&1; echo "check-patch exit $?"
  $HOME/.claude/guard/guarded --light --timeout 20 -- bash $R/ck22-greps.sh > $R/logs/ck22-greps.txt 2>&1; echo "ck22 exit $?"
  zsh $R/chain.sh c1.txt; echo "chain done $(date '+%T')"
  zsh $R/wk-queue.sh $R/wk-w1.txt WK-1
  [[ -s $R/logs/wk-left-WK-1.txt ]] && { cp $R/logs/wk-left-WK-1.txt $R/wk-w2.txt; zsh $R/wk-queue.sh $R/wk-w2.txt WK-2; }
  echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } >> $R/logs/all.log 2>&1
