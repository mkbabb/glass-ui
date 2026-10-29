#!/bin/zsh
# H8 chain: the named stages in order, inside the one guarded call that launched it; a stage list per phase.
#   chain.sh <engine> <stage[:args]> ...   (stage args after ':' are comma-free, split on '+')
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8
e=$1; shift
# a Chromium chain that got its guard slot while this seat's WebKit acquisition runs waits for it (one heavy run per seat)
[[ $e == chromium ]] && while [[ -f $R/logs/wk-running ]]; do sleep 30; done
for s in "$@"; do
  st=${s%%:*}; args=(); [[ $s == *:* ]] && args=(${(s:+:)${s#*:}})
  echo "## $(date '+%T') $st $e ${args[*]} · load $(sysctl -n vm.loadavg)"
  $R/run-h8.sh $st $e $args
done
echo "## $(date '+%T') chain end · load $(sysctl -n vm.loadavg)"
