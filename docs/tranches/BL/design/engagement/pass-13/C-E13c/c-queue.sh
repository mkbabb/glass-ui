#!/bin/zsh
# C-E13-complete: the Chromium list (c1.txt) in named batches C-1..C-10, each one `guarded --timeout 90` call (c-run.sh), consecutively.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/C-E13c; GD=$HOME/.claude/guard/guarded
touch $R/logs/c1.done
for k in 1 2 3 4 5 6 7 8 9 10; do
  left=$(grep -v '^#' $R/c1.txt | grep -v '^\s*$' | grep -vxF -f $R/logs/c1.done | wc -l | tr -d ' ')
  (( left == 0 )) && break
  echo "# C-$k queued $(date '+%F %T') · $left stage(s) left · load $(sysctl -n vm.loadavg)" >> $R/logs/c1.log
  tmp=$R/logs/.c.last; GUARD_TAG=ce13cc$k $GD --timeout 90 -- zsh $R/c-run.sh $R/c1.txt C-$k > $tmp 2>&1; rc=$?
  cat $tmp >> $R/logs/c1.log
  echo "# C-$k guard exit $rc $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/c1.log
  if (( rc != 0 )) && grep -qi 'refus' $tmp; then echo "# C-$k GUARDED REFUSED: queue stops" >> $R/logs/c1.log; rm -f $tmp; exit 75; fi
  rm -f $tmp
done
echo "# c queue end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/c1.log
