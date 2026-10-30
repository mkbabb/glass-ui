#!/bin/zsh
# C-A9's one WebKit acquisition: run as `guarded --exclusive webkit --timeout 90 -- wk-queue.sh`. Holding the lock it waits for
# this seat's Chromium phase to end (logs/chromium-done), then runs the stage lines of wk-stages.txt in order, re-reading the
# file after each stage (a re-read stage queued meanwhile runs inside the same acquisition); it ends on a line `END`.
# No idle hold: on admission it raises logs/wk-running (the Chromium chain pauses between stages while it exists) and waits
# only for a Chromium stage already in flight (logs/c-stage-running) to end, so the seat runs one heavy run at a time.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-9/C-A9; cd $R
Q=scripts/wk-stages.txt; n=0
echo "# $(date '+%F %T') WebKit lock acquired · load $(sysctl -n vm.loadavg)"
touch logs/wk-running; trap 'rm -f logs/wk-running' EXIT
w0=$(date +%s); while [[ -f logs/c-stage-running ]]; do sleep 5; done
echo "# $(date '+%T') waited $(( $(date +%s) - w0 )) s for an in-flight Chromium stage"
idle=0
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null)
  if [[ -z $line ]]; then (( idle++ > 120 )) && { echo "# $(date '+%T') no stage queued for 20 min: done"; break; }; sleep 10; continue; fi
  idle=0; n=$((n + 1))
  [[ $line == END ]] && { echo "# $(date '+%T') END after $((n - 1)) stages"; break; }
  echo "## $(date '+%T') [$n] $line webkit · load $(sysctl -n vm.loadavg)"
  scripts/run-ca9.sh $line webkit
done
echo "# $(date '+%F %T') WebKit acquisition end · load $(sysctl -n vm.loadavg)"
