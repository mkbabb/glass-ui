#!/bin/zsh
# C-E11: one waiter, one heavy run at a time: the Chromium chain, the one WebKit acquisition (a second only if the 80-minute stop leaves stages), then the gates.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/C-E11; S=$R/scripts
echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
zsh $S/chain.sh $S/c1.txt >> $R/logs/chain-c1.log 2>&1
echo "# chromium done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
zsh $S/wk-queue.sh $S/w1.txt
if [[ -s $R/logs/wk-left.txt ]]; then mv $R/logs/wk-left.txt $S/w2.txt; echo END >> $S/w2.txt; echo "# second WebKit acquisition for $(($(wc -l < $S/w2.txt)-1)) stage(s) left by the 80-min stop $(date '+%F %T')" >> $R/logs/all.log; zsh $S/wk-queue.sh $S/w2.txt; fi
echo "# webkit done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
zsh $S/gates.sh >> $R/logs/all.log 2>&1
$HOME/.claude/guard/guarded --light --timeout 15 -- bash $S/ck22.sh > $R/logs/ck22-greps.txt 2>&1
echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
