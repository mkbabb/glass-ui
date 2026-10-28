#!/bin/zsh
# P-E7 WebKit: ONE `guarded --exclusive webkit` acquisition for every WebKit stage, queued after the Chromium phase.
# Inside it each stage runs in order with its own log (no nested guarded: the acquisition is the guard).
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/E7
echo "# $(date '+%F %T') queued · load $(sysctl -n vm.loadavg)"
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- env ENGINE=webkit INSIDE=1 $A/stages.sh ${@}
echo "# $(date '+%F %T') released · guarded exit $? · load $(sysctl -n vm.loadavg)"
