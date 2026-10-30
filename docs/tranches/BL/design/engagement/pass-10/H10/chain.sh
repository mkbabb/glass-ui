#!/bin/zsh
# H10 chain: the named stages in order, inside the one guarded call that launched it (one heavy run at a time for this seat).
#   chain.sh <engine> <stage[:args]> ...   (stage args after ':' split on '+')
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/H10
e=$1; shift
# one heavy run for this seat: a Chromium stage does not start while this seat's WebKit acquisition runs (logs/wk-running),
# and marks itself (logs/c-running) so the WebKit runner starts between stages, never inside one
for s in "$@"; do
  st=${s%%:*}; args=(); [[ $s == *:* ]] && args=(${(s:+:)${s#*:}})
  [[ $e == chromium ]] && while [[ -f $R/logs/wk-running ]]; do sleep 20; done
  [[ $e == chromium ]] && touch $R/logs/c-running
  echo "## $(date '+%T') $st $e ${args[*]} · load $(sysctl -n vm.loadavg)"
  $R/run-h10.sh $st $e $args
  rm -f $R/logs/c-running
done
echo "## $(date '+%T') chain end · load $(sysctl -n vm.loadavg)"
