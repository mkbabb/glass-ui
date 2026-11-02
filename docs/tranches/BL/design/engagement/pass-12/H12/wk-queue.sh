#!/bin/zsh
# H12: the one WebKit acquisition, queued after the Chromium chain (`all.sh`). guarded --exclusive webkit waits for the lock.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/H12
echo "# wk queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
GUARD_TAG=h12wk $HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh
echo "# wk guard exit $? $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
