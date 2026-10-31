#!/bin/zsh
# C-A10 Chromium chain: each stage (a line of the list: `stage [args…]`) in its own guarded call, one heavy run at a time; a line END ends it.
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/C-A10/scripts; cd $S; Q=$1; n=0
echo "## $(date '+%F %T') chain start · load $(sysctl -n vm.loadavg)"
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null); n=$((n + 1))
  [[ -z $line || $line == END ]] && break
  set -- ${=line}; s=$1; shift
  echo "## $(date '+%T') $s chromium $* · load $(sysctl -n vm.loadavg)"
  $HOME/.claude/guard/guarded --timeout 45 -- ./run-ca10.sh $s chromium "$@"
done
echo "## $(date '+%F %T') chain end · load $(sysctl -n vm.loadavg)"
