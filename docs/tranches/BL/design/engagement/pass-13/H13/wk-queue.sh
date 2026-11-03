#!/bin/zsh
# H13: the WebKit acquisition, queued after the Chromium chain (all.sh), in two NAMED parts planned before it starts: WK-1 (wk-w1.txt,
# no stage started after 80 min) and, only if WK-1 leaves stages (logs/wk-left.txt), WK-2 (the same runner on that list), each its own
# `guarded --exclusive webkit --timeout 90` acquisition, queued for the one WebKit lock machine-wide
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/H13
echo "# WK-1 queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
GUARD_TAG=h13wk $HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh $R/wk-w1.txt wk-w1
echo "# WK-1 guard exit $? $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
if [[ -s $R/logs/wk-left.txt ]]; then
  cp $R/logs/wk-left.txt $R/wk-w2.txt; rm -f $R/logs/wk-left.txt
  echo "# WK-2 queued $(date '+%F %T') · $(wc -l < $R/wk-w2.txt | tr -d ' ') stage(s) · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  GUARD_TAG=h13wk2 $HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh $R/wk-w2.txt wk-w2
  echo "# WK-2 guard exit $? $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
fi
