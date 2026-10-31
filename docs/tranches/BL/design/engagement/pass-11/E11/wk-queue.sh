#!/bin/zsh
# P-E11's one WebKit acquisition: `wk-queue.sh <list>` queues for `guarded --exclusive webkit --timeout 90` and runs wk-run.sh inside it.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/E11; cd $R
echo "# $(date '+%F %T') queued for the WebKit lock ($1) · load $(sysctl -n vm.loadavg)" >> logs/wk-queue.log
GUARD_TAG=e11wk $HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh $1
echo "# $(date '+%F %T') guard exit $? · load $(sysctl -n vm.loadavg)" >> logs/wk-queue.log
