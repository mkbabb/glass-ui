#!/bin/zsh
# C-A13-complete: one waiter, one heavy run at a time. Chromium named batches C-1..C-3 (each one guarded call), then the WebKit
# acquisitions WK-1 and WK-2 (planned, named), then the gates (one guarded call). Each queue time, admission and exit is logged.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/C-A13c; GD=$HOME/.claude/guard/guarded
left() { grep -v '^#' $1 | grep -v '^\s*$' | grep -vxF -f $2 | wc -l | tr -d ' '; }
{ echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
  touch $R/logs/c.done $R/logs/wk.done
  for n in C-1 C-2 C-3; do (( $(left $R/c1.txt $R/logs/c.done) == 0 )) && break
    echo "# $n queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; GUARD_TAG=ca13c $GD --timeout 90 -- zsh $R/c-batch.sh $R/c1.txt $n; echo "# $n guard exit $? $(date '+%F %T')"; done
  for n in WK-1 WK-2 WK-3; do L=$R/wk1.txt; [[ $n != WK-1 ]] && { cat $R/wk1.txt $R/wk2.txt > $R/logs/wk-all.txt; L=$R/logs/wk-all.txt; }
    (( $(left $L $R/logs/wk.done) == 0 )) && break
    echo "# $n queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)" | tee -a $R/logs/wk-queue.log; GUARD_TAG=ca13cwk $GD --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh $L $n; echo "# $n guard exit $? $(date '+%F %T') · load $(sysctl -n vm.loadavg)" | tee -a $R/logs/wk-queue.log; done
  echo "# gates queued $(date '+%F %T')"; GUARD_TAG=ca13c $GD --timeout 75 -- zsh $R/gates.sh; echo "# gates guard exit $? $(date '+%F %T')"
  echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } >> $R/logs/all.log 2>&1
