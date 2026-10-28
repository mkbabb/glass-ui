#!/bin/zsh
# C-A7 stage runner: `run.sh <log-name> <guard args...> -- <cmd...>`; each log opens and closes with the 1/5/15-min load.
L=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-A7/logs/$1.log; shift
mkdir -p ${L:h}
{ echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $*"; } > $L
~/.claude/guard/guarded "$@" >> $L 2>&1; rc=$?
echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L
exit $rc
