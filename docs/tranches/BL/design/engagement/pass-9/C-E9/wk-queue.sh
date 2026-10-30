#!/bin/zsh
# C-E9's one WebKit acquisition: launched as `guarded --exclusive webkit --timeout 90 -- wk-queue.sh`. Holding the lock it
# first waits for this seat's Chromium phase to end (logs/chromium-done), then runs the stage lines of wk-w1.txt in order,
# re-reading the file after each stage (re-read stages queued while it runs are taken inside the same acquisition); ends on END.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-9/C-E9; cd $R
Q=wk-w1.txt; n=0
echo "# $(date '+%F %T') WebKit lock acquired · load $(sysctl -n vm.loadavg)"
w0=$(date +%s); until [[ -f logs/chromium-done ]]; do sleep 15; done
echo "# $(date '+%T') waited $(( $(date +%s) - w0 )) s for this seat's Chromium phase to end"
idle=0
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null)
  if [[ -z $line ]]; then (( idle++ > 120 )) && { echo "# $(date '+%T') no stage queued for 20 min: done"; break; }; sleep 10; continue; fi
  idle=0; n=$((n + 1))
  [[ $line == END ]] && { echo "# $(date '+%T') END after $((n - 1)) stages"; break; }
  echo "## $(date '+%T') [$n] $line webkit · load $(sysctl -n vm.loadavg)"
  ./run-ce9.sh $line webkit
done
echo "# $(date '+%F %T') WebKit acquisition end · load $(sysctl -n vm.loadavg)"
