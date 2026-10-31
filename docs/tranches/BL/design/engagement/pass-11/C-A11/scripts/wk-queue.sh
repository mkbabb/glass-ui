#!/bin/zsh
# C-A11's one WebKit acquisition: queue for `guarded --exclusive webkit --timeout 90`, run wk-run.sh inside it.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/C-A11; S=$R/scripts; cd $S
echo "# $(date '+%F %T') queued for the WebKit lock ($1) · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
GUARD_TAG=ca11wk $HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $S/wk-run.sh $1
echo "# $(date '+%F %T') guard exit $? · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
