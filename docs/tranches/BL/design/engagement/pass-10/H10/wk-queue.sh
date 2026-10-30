#!/bin/zsh
# H10's WebKit acquisition: launched as `guarded --exclusive webkit --timeout 90 -- wk-queue.sh <tag>` (the one WebKit lock
# machine-wide). Once it holds the lock it runs the stage lines of wk-<tag>.txt in order (`stage engine-free args`, one per
# line, args split on '+'), reading the file again after each stage, so a re-read stage the seat queues while it runs is
# taken inside the same acquisition; it ends on a line `END`, or when no new line arrives for 20 minutes.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/H10; cd $R
tag=$1; Q=wk-$tag.txt; n=0
echo "# $(date '+%F %T') WebKit lock acquired ($tag) · load $(sysctl -n vm.loadavg)"
touch logs/wk-running; trap 'rm -f logs/wk-running' EXIT
# a Chromium stage of this seat that was running when the lock came finishes first (one heavy run per seat)
w0=$(date +%s); while [[ -f logs/c-running ]]; do sleep 10; done; echo "# $(date '+%T') waited $(( $(date +%s) - w0 )) s for this seat's running Chromium stage"
idle=0
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null)
  if [[ -z $line ]]; then (( idle++ > 120 )) && { echo "# $(date '+%T') no stage queued for 20 min: done"; break; }; sleep 10; continue; fi
  idle=0; n=$((n + 1))
  [[ $line == END ]] && { echo "# $(date '+%T') END after $((n - 1)) stages"; break; }
  st=${line%%:*}; args=(); [[ $line == *:* ]] && args=(${(s:+:)${line#*:}})
  echo "## $(date '+%T') [$n] $st webkit ${args[*]} · load $(sysctl -n vm.loadavg)"
  ./run-h10.sh $st webkit $args
done
echo "# $(date '+%F %T') WebKit acquisition ($tag) end · load $(sysctl -n vm.loadavg)"
