#!/bin/zsh
# P-E10 Chromium chain: gates first, then each stage (a line of the list file: `stage [args…]`) in its own guarded call, one heavy run at a time.
# `chain.sh <list file> [gates-tag]`. The list is re-read after each stage, so a re-read can be queued by atomic rename; a line END ends it.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/E10; cd $R; Q=$1; n=0
echo "## $(date '+%F %T') chain start · load $(sysctl -n vm.loadavg)"
[[ -n $2 ]] && ./gates.sh $2
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null); n=$((n + 1))
  [[ -z $line || $line == END ]] && break
  set -- ${=line}; s=$1; shift
  echo "## $(date '+%T') $s chromium $* · load $(sysctl -n vm.loadavg)"
  $HOME/.claude/guard/guarded --timeout 45 -- ./run-e10.sh $s chromium "$@"
done
touch logs/chromium-done
echo "## $(date '+%F %T') chain end · load $(sysctl -n vm.loadavg)"
