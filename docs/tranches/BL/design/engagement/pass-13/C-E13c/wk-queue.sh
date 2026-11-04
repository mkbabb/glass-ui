#!/bin/zsh
# C-E13-complete: the WebKit list (wk.txt) in NAMED acquisitions planned before the start: WK-1, WK-2, WK-3 (WK-4 only if WK-3 leaves a stage, recorded), each its own
# `guarded --exclusive webkit --timeout 90` call queued for the one WebKit lock machine-wide, consecutively; each runs the list from the
# first stage not done and starts no stage after 80 min (wk-run.sh). The queue ends when the list is done; a refusal stops it.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/C-E13c; GD=$HOME/.claude/guard/guarded
touch $R/logs/wk.done
for k in 1 2 3 4; do
  left=$(grep -v '^#' $R/wk.txt | grep -v '^\s*$' | grep -vxF -f $R/logs/wk.done | wc -l | tr -d ' ')
  (( left == 0 )) && break
  echo "# WK-$k queued $(date '+%F %T') · $left stage(s) left · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  tmp=$R/logs/.wk.last; GUARD_TAG=ce13cwk$k $GD --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh $R/wk.txt WK-$k > $tmp 2>&1; rc=$?
  cat $tmp >> $R/logs/wk-queue.log
  echo "# WK-$k guard exit $rc $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  if (( rc != 0 )) && grep -qi 'refus' $tmp; then echo "# WK-$k GUARDED REFUSED: queue stops" >> $R/logs/wk-queue.log; rm -f $tmp; exit 75; fi
  rm -f $tmp
done
echo "# wk queue end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
