#!/bin/zsh
# C-A11: one waiter, one heavy run at a time: gates, the Chromium chain (c1.txt), then the one WebKit acquisition (w1.txt).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/C-A11; S=$R/scripts; cd $S
echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
zsh ./gates.sh >> $R/logs/all.log 2>&1
zsh ./chain.sh $S/c1.txt >> $R/logs/chain-c1.log 2>&1
echo "# chromium done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
zsh ./wk-queue.sh $S/w1.txt
echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/all.log
