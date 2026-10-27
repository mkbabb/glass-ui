#!/bin/zsh
# P-A6 WebKit: ONE `guarded --exclusive webkit` acquisition for every WebKit stage (queued after the Chromium phase).
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/A6
echo "# $(date '+%F %T') queued · load $(sysctl -n vm.loadavg)"
W=(${@}); (( ${#W} )) || W=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12 probe capture)
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- $A/phase-webkit.sh $W
echo "# $(date '+%F %T') released · guarded exit $? · load $(sysctl -n vm.loadavg)"
