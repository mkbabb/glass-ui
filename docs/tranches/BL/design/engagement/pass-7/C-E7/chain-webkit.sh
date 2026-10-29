#!/bin/zsh
# C-E7 WebKit: ONE `guarded --exclusive webkit` acquisition for every WebKit stage, queued after the Chromium phase.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-E7
echo "# $(date '+%F %T') queued · load $(sysctl -n vm.loadavg)"
~/.claude/guard/guarded --exclusive webkit --timeout 90 -- env ENGINE=webkit INSIDE=1 $C/stages.sh ${@}
echo "# $(date '+%F %T') released · guarded exit $? · load $(sysctl -n vm.loadavg)"
