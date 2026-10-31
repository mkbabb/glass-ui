#!/bin/zsh
# After this seat's Chromium chain, queue for the one WebKit lock.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/C-E10/scripts; cd $R
until [[ -f ../logs/chromium-done ]]; do /bin/sleep 20; done
echo "# $(date '+%F %T') queued for the WebKit lock · load $(sysctl -n vm.loadavg)"
$HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- ./wk-queue.sh w1.txt
echo "# $(date '+%F %T') guard exit $? · load $(sysctl -n vm.loadavg)"
