#!/bin/zsh
# C-A9 Chromium chain: each named stage in its own guarded call, in order (one heavy run at a time for this seat).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-9/C-A9
echo "## $(date '+%F %T') chain start · load $(sysctl -n vm.loadavg)"
for s in "$@"; do
  echo "## $(date '+%T') $s chromium · load $(sysctl -n vm.loadavg)"
  while [[ -f $R/logs/wk-running ]]; do sleep 15; done
  touch $R/logs/c-stage-running
  $HOME/.claude/guard/guarded --timeout 45 -- $R/scripts/run-ca9.sh $s chromium
  rm -f $R/logs/c-stage-running
done
echo "## $(date '+%F %T') chain end · load $(sysctl -n vm.loadavg)"
