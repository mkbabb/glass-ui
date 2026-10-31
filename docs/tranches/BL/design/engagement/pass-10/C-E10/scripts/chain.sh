#!/bin/zsh
# C-E10 chain: `chain.sh <engine list>`: each stage in order. Chromium: one guarded call per stage. Re-read after each stage (additions by atomic rename); END ends it.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/C-E10/scripts; cd $R; Q=$1; n=0
echo "## $(date '+%F %T') chain start · load $(sysctl -n vm.loadavg)"
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null); n=$((n + 1))
  [[ -z $line || $line == END ]] && break
  set -- ${=line}; s=$1; shift
  echo "## $(date '+%T') $s chromium $* · load $(sysctl -n vm.loadavg)"
  $HOME/.claude/guard/guarded --timeout 45 -- ./run.sh $s chromium "$@"
done
touch ../logs/chromium-done
echo "## $(date '+%F %T') chain end · load $(sysctl -n vm.loadavg)"
