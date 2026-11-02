#!/bin/zsh
# P-E12: one WebKit acquisition (`wk-queue.sh <list> <name>`), queued after the Chromium chain (all.sh). guarded --exclusive webkit
# waits for the machine's one WebKit lock. WK-1 runs wk-w1.txt; WK-2 (planned, run only if WK-1's 80-minute stop leaves stages) runs
# the remainder WK-1 wrote to logs/wk-left.txt.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/E12
echo "# $2 queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
GUARD_TAG=e12wk $HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh $1 $2
echo "# $2 guard exit $? $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
