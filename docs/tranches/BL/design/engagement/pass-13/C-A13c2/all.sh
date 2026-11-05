#!/bin/zsh
# C-A13-complete-2 (D5 pass 13, wave c3b): one waiter, one heavy run at a time.
# Plan, fixed before any stage starts (the held list does not fit one 90-minute acquisition: WK-1's pace and C-A13c's Chromium
# times put its 29 stages at about 85 min, and wk-run.sh starts no stage after 80 min):
#   B     builds.sh (the parent's builds, unchanged but for this seat's paths), one guarded call
#   WK-2a wk2a.txt = held-wk2.txt stages 1-14, one guarded --exclusive webkit --timeout 90 acquisition (estimate 45 min)
#   WK-2b wk2b.txt = held-wk2.txt stages 15-29, one acquisition (estimate 45 min)
#   WK-2c contingency: held-wk2.txt itself, the done file skipping every stage already run; queued only if a stage is left
#   gates gates.sh, one guarded --timeout 75 call
# A refusal (guard exit 75) stops everything after it.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/C-A13c2; GD=$HOME/.claude/guard/guarded
left() { grep -v '^#' $1 | grep -v '^\s*$' | grep -vxF -f $2 | wc -l | tr -d ' '; }
stop() { echo "# STOP: guard refused ($1) $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; echo "# all done (stopped) $(date '+%F %T')"; exit 75; }
{ echo "# all start $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; touch $R/logs/wk.done
  echo "# builds queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
  GUARD_TAG=ca13c2 $GD --timeout 30 -- zsh $R/builds.sh head cand13 cand12 cand11 cand8 level child stale noown typedom reachzero > $R/logs/builds.log 2>&1; x=$?
  echo "# builds guard exit $x $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; (( x == 75 )) && stop builds; (( x != 0 )) && { echo "# builds failed, nothing further"; exit $x; }
  for n in WK-2a WK-2b WK-2c; do
    case $n in WK-2a) L=$R/wk2a.txt;; WK-2b) L=$R/wk2b.txt;; WK-2c) L=$R/held-wk2.txt;; esac
    (( $(left $L $R/logs/wk.done) == 0 )) && { echo "# $n: nothing left on $(basename $L)"; continue; }
    echo "# $n queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)" | tee -a $R/logs/wk-queue.log
    GUARD_TAG=ca13c2wk $GD --exclusive webkit --timeout 90 -- zsh $R/wk-run.sh $L $n; x=$?
    echo "# $n guard exit $x $(date '+%F %T') · load $(sysctl -n vm.loadavg)" | tee -a $R/logs/wk-queue.log; (( x == 75 )) && stop $n
  done
  echo "# gates queued $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; GUARD_TAG=ca13c2 $GD --timeout 75 -- zsh $R/gates.sh; x=$?; echo "# gates guard exit $x $(date '+%F %T')"; (( x == 75 )) && stop gates
  echo "# all done $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; } >> $R/logs/all.log 2>&1
