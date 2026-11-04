#!/bin/zsh
# C-A13-complete: a named Chromium batch (`c-batch.sh <list> <name>`), several stages inside ONE guarded call (§P12-7 item 11: admission
# waits under load). The list is re-read before each stage (replaced only by atomic rename); done lines are logged; no stage starts after
# 80 min of the batch, so the 90-min cap never cuts a running stage; what is left goes to logs/left-<name>.txt for the next named batch.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/C-A13c
list=$1; name=$2; done_f=$R/logs/c.done; touch $done_f; T0=$(date +%s)
echo "# $name admitted $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/c.log
while true; do
  line=$(grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line ]] && break
  el=$(( ($(date +%s) - T0) / 60 ))
  if (( el >= 80 )); then grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f > $R/logs/left-$name.txt; echo "# $(date '+%T') $name stop at ${el} min: $(wc -l < $R/logs/left-$name.txt | tr -d ' ') left" >> $R/logs/c.log; break; fi
  echo "# $(date '+%T') start (${el} min): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/c.log
  set -- ${=line}; zsh $R/run.sh "$@" >> $R/logs/c.log 2>&1
  echo "# $(date '+%T') end ($?): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/c.log
  echo "$line" >> $done_f
done
echo "# $name end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/c.log
