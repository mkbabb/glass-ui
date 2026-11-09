#!/bin/zsh
# C-E14 second deployment: the Chromium resume chain (C2.., list C2r.q), then the WebKit chain (WK1.., list WK1.q), one heavy run at a time.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-E14-records
echo "# master start $(date '+%F %T') · load $(sysctl -n vm.loadavg) · second deployment" >> $R/chain.log
zsh $R/chain.sh C $R/C2r.q 2
zsh $R/chain.sh WK $R/WK1.q 1
echo "# master end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
