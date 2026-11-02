#!/bin/zsh
# P-E12: a chain of stages, one guarded call per stage (`chain.sh <list>`), one heavy run at a time. Each list line: <stage> <engine>
# [args]. The list is re-read before each stage, so it may be replaced by atomic rename (never edited in flight); done lines are logged.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/E12; GD=$HOME/.claude/guard/guarded
list=$1; tag=${list:t:r}; done_f=$R/logs/$tag.done; touch $done_f
echo "# chain $tag start $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/$tag.log
while true; do
  line=$(grep -v '^#' $R/$list | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line ]] && break
  set -- ${=line}; st=$1
  to=45; [[ $st == *-E-10 || $st == *-E-2 || $st == *-E-12 || $st == cost-bar ]] && to=75
  echo "# $(date '+%T') start: $line · load $(sysctl -n vm.loadavg)" >> $R/logs/$tag.log
  GUARD_TAG=e12 $GD --timeout $to -- zsh $R/run-e12.sh "$@" >> $R/logs/$tag.log 2>&1
  echo "# $(date '+%T') end ($?): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/$tag.log
  echo "$line" >> $done_f
done
echo "# chain $tag end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/$tag.log
