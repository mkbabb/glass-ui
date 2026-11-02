#!/bin/zsh
# C-E12: the WebKit stages, run INSIDE one `guarded --exclusive webkit` acquisition (wk-queue.sh), in list order, re-reading the list
# (replaced only by atomic rename) before each stage. No stage starts after 80 min of the acquisition, so the 90-min cap never cuts a
# running stage; any stage left is written to logs/wk-left-<name>.txt for the planned next acquisition (WK-2), recorded.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-12/C-E12
list=$1; name=$2; done_f=$R/logs/$name.done; touch $done_f; T0=$(date +%s)
echo "# $name admitted $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
while true; do
  line=$(grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line ]] && break
  el=$(( ($(date +%s) - T0) / 60 ))
  if (( el >= 80 )); then grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f > $R/logs/wk-left-$name.txt; echo "# $(date '+%T') stop at ${el} min: $(wc -l < $R/logs/wk-left-$name.txt | tr -d ' ') stage(s) left (logs/wk-left-$name.txt)" >> $R/logs/wk-queue.log; break; fi
  echo "# $(date '+%T') start (${el} min): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  set -- ${=line}; zsh $R/scripts/run.sh "$@" >> $R/logs/wk-queue.log 2>&1
  echo "# $(date '+%T') end ($?): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  echo "$line" >> $done_f
done
echo "# $name end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
