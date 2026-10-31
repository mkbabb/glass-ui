#!/bin/zsh
# P-E11: one waiter, one heavy run at a time: the gates, the Chromium chain (c1.txt), then the one WebKit acquisition (w1.txt).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/E11; cd $R
echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> logs/all.log
zsh ./gates.sh cand11 >> logs/all.log 2>&1
zsh ./chain.sh c1.txt >> logs/chain-c1.log 2>&1
echo "# chromium done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> logs/all.log
zsh ./wk-queue.sh w1.txt
echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> logs/all.log
