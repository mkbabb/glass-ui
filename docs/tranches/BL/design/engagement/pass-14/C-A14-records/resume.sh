#!/bin/zsh
# C-A14 resume (2026-11-06 18:0x, after the seat's first session ended at 16:01 mid C-2 stage cand14-E-11, which has a start line and no
# end line in C-2.log: it measured nothing and re-runs whole). The chains run one after another, never together (one heavy run per seat):
# C-3.. on C-1.held unchanged; then CR-1.. on CR.q (the load law's re-reads); then WK-1.. on WQ.q (one --exclusive webkit lock each).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-A14-records
echo "# resume $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
zsh $R/chain.sh C $R/C-1.held 3
zsh $R/chain.sh CR $R/CR.q 1
zsh $R/chain.sh WK $R/WQ.q 1
echo "# resume done $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/chain.log
