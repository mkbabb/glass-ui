#!/bin/zsh
# H11: the one WebKit acquisition, queued after the Chromium chain (`all.sh`). guarded --exclusive webkit waits for the lock.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/H11
echo "# wk queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
GUARD_TAG=h11wk $HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh
echo "# wk guard exit $? $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
