#!/bin/zsh
# P-E9's WebKit acquisition: launched as `guarded --exclusive webkit --timeout 90 -- wk-queue.sh <tag>` (the one WebKit lock
# machine-wide). Holding the lock it first waits for this seat's Chromium phase to end (logs/chromium-done, written after the
# chain and its re-reads: one heavy run per seat), then runs the stage lines of wk-<tag>.txt in order, reading the file again after each stage,
# so a re-read stage queued while it runs is taken inside the same acquisition; it ends on a line `END`.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-9/E9; cd $R
tag=$1; Q=wk-$tag.txt; n=0
echo "# $(date '+%F %T') WebKit lock acquired ($tag) · load $(sysctl -n vm.loadavg)"
w0=$(date +%s); until [[ -f logs/chromium-done ]]; do sleep 15; done
echo "# $(date '+%T') waited $(( $(date +%s) - w0 )) s for this seat's Chromium chain to end"
idle=0
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null)
  if [[ -z $line ]]; then (( idle++ > 120 )) && { echo "# $(date '+%T') no stage queued for 20 min: done"; break; }; sleep 10; continue; fi
  idle=0; n=$((n + 1))
  [[ $line == END ]] && { echo "# $(date '+%T') END after $((n - 1)) stages"; break; }
  echo "## $(date '+%T') [$n] $line webkit · load $(sysctl -n vm.loadavg)"
  ./run-e9.sh $line webkit
done
echo "# $(date '+%F %T') WebKit acquisition ($tag) end · load $(sysctl -n vm.loadavg)"
