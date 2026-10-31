#!/bin/zsh
# After this seat's Chromium chain, queue for the one WebKit lock (the run itself is wk-queue.sh inside `guarded --exclusive webkit`).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/E10; cd $R
until [[ -f logs/chromium-done ]]; do sleep 20; done
echo "# $(date '+%F %T') queued for the WebKit lock · load $(sysctl -n vm.loadavg)"
$HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- ./wk-queue.sh $1
echo "# $(date '+%F %T') guard exit $? · load $(sysctl -n vm.loadavg)"
