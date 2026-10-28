#!/bin/zsh
# C-E6 WebKit: ONE `guarded --exclusive webkit` acquisition for a whole phase file (queued after the Chromium phases).
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/C-E6
P=$1; K=$C/logs/chain-$(basename $P .txt).log
print -- "# $(date '+%F %T') queued $P · load $(sysctl -n vm.loadavg)" >> $K
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $C/run-ce6.sh phase $P >> $K 2>&1
print -- "# $(date '+%F %T') released · guarded exit $? · load $(sysctl -n vm.loadavg)" >> $K
