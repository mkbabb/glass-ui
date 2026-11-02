#!/bin/zsh
# C-A12: one WebKit acquisition (`wk-queue.sh <list> <name>`). guarded --exclusive webkit waits for the machine's one WebKit lock.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/C-A12
echo "# $2 queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
GUARD_TAG=ca12wk $HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/scripts/wk-run.sh $1 $2
echo "# $2 guard exit $? $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
