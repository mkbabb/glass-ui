#!/bin/zsh
# C-E9c Chromium chain: each named stage in its own guarded call, in order (one heavy run at a time for this seat).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-9/C-E9/c
echo "## $(date '+%F %T') chain start · load $(sysctl -n vm.loadavg)"
for s in "$@"; do
  echo "## $(date '+%T') $s chromium · load $(sysctl -n vm.loadavg)"
  $HOME/.claude/guard/guarded --timeout 45 -- $R/scripts/run.sh $s chromium
  echo "## guarded exit $?"
done
echo "## $(date '+%F %T') chain end · load $(sysctl -n vm.loadavg)"
