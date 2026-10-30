#!/bin/zsh
# C-E9b's one WebKit acquisition, launched after the Chromium phase ended as
#   guarded --exclusive webkit --timeout 90 -- wk-queue.sh
# It runs the stage lines of wk-stages.txt in order, re-reading the file after each stage (a re-read stage appended
# meanwhile runs inside the same acquisition); it ends on a line END, or after 10 idle minutes.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-9/C-E9/b; cd $R
Q=wk-stages.txt; n=0
echo "# $(date '+%F %T') WebKit lock acquired · load $(sysctl -n vm.loadavg)"
idle=0
while true; do
  line=$(sed -n "$((n + 1))p" $Q 2>/dev/null)
  if [[ -z $line ]]; then (( idle++ > 60 )) && { echo "# $(date '+%T') no stage queued for 10 min: done"; break; }; sleep 10; continue; fi
  idle=0; n=$((n + 1))
  [[ $line == END ]] && { echo "# $(date '+%T') END after $((n - 1)) stages"; break; }
  echo "## $(date '+%T') [$n] $line webkit · load $(sysctl -n vm.loadavg)"
  ./run.sh $line webkit
done
echo "# $(date '+%F %T') WebKit acquisition end · load $(sysctl -n vm.loadavg)"
