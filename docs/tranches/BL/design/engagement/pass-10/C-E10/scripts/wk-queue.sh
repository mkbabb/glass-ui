#!/bin/zsh
# C-E10's one WebKit acquisition: `guarded --exclusive webkit --timeout 90 -- wk-queue.sh <list>`; the list re-read after each stage; END ends it.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/C-E10/scripts; cd $R; Q=$1; n=0; idle=0
echo "# $(date '+%F %T') WebKit lock acquired ($Q) · load $(sysctl -n vm.loadavg)"
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null)
  if [[ -z $line ]]; then (( idle++ > 120 )) && { echo "# $(date '+%T') no stage queued for 20 min: done"; break; }; sleep 10; continue; fi
  idle=0; n=$((n + 1))
  [[ $line == END ]] && { echo "# $(date '+%T') END after $((n - 1)) stages"; break; }
  set -- ${=line}; s=$1; shift
  echo "## $(date '+%T') [$n] $s webkit $* · load $(sysctl -n vm.loadavg)"
  ./run.sh $s webkit "$@"
done
echo "# $(date '+%F %T') WebKit acquisition ($Q) end · load $(sysctl -n vm.loadavg)"
