#!/bin/zsh
# C-A6 WebKit: ONE `guarded --exclusive webkit` acquisition for a whole phase file (queued after the Chromium phases).
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/C-A6
P=$1; CL=$C/logs/chain-$(basename $P .txt).log
print -- "# $(date '+%F %T') queued $P · load $(sysctl -n vm.loadavg)" >> $CL
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $C/run-ca6.sh phase $P >> $CL 2>&1
print -- "# $(date '+%F %T') released · guarded exit $? · load $(sysctl -n vm.loadavg)" >> $CL
