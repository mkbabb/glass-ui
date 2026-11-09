#!/bin/zsh
# C-E14 second deployment, after master.sh: the Chromium extras (X1.., list X.q) then the WebKit re-reads (WKR.., list WKR.q), one heavy run at a time.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-E14-records
until grep -q '# master end' $R/chain.log; do sleep 20; done
echo "# after start $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
zsh $R/chain2.sh X $R/X.q 1
zsh $R/chain2.sh WKR $R/WKR.q 1
echo "# after end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
