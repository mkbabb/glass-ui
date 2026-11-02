#!/bin/zsh
# C-A12: a chain of stages, one guarded call per stage (`chain.sh <list>`), one heavy run at a time. The list is re-read before each
# stage (replaced only by atomic rename, never edited in flight); done lines are logged.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/C-A12; S=$R/scripts; GD=$HOME/.claude/guard/guarded
list=$1; tag=${list:t:r}; done_f=$R/logs/$tag.done; touch $done_f
echo "# chain $tag start $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/$tag.log
while true; do
  line=$(grep -v '^#' $S/$list | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line ]] && break
  set -- ${=line}; st=$1
  to=45; [[ $st == *-E-10 || $st == *-E-2 || $st == *-E-12 || $st == cost-bar || $st == *-ca11 || $st == *-ce11 ]] && to=75
  echo "# $(date '+%T') start: $line · load $(sysctl -n vm.loadavg)" >> $R/logs/$tag.log
  GUARD_TAG=ca12 $GD --timeout $to -- zsh $S/run.sh "$@" >> $R/logs/$tag.log 2>&1
  echo "# $(date '+%T') end ($?): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/$tag.log
  echo "$line" >> $done_f
done
echo "# chain $tag end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/$tag.log
