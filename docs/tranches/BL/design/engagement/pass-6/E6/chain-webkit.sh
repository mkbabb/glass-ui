#!/bin/zsh
# P-E6 WebKit: ONE `guarded --exclusive webkit` acquisition for a whole phase file (queued after the Chromium phases).
E6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/E6
P=$1; C=$E6/logs/chain-$(basename $P .txt).log
print -- "# $(date '+%F %T') queued $P · load $(sysctl -n vm.loadavg)" >> $C
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $E6/run-e6.sh phase $P >> $C 2>&1
print -- "# $(date '+%F %T') released · guarded exit $? · load $(sysctl -n vm.loadavg)" >> $C
