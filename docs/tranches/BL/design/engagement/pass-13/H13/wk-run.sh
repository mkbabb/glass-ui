#!/bin/zsh
# H13: the WebKit stages, run INSIDE the one `guarded --exclusive webkit` acquisition (wk-queue.sh), in list order, re-reading the list
# (its list, replaced only by atomic rename) before each stage. No stage starts after 80 min of the acquisition, so the 90-min cap never
# cuts a running stage; any stage left is written to logs/wk-left.txt for a second acquisition, recorded.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/H13
list=$1; TAG=$2; done_f=$R/logs/$TAG.done; touch $done_f; T0=$(date +%s)
echo "# $TAG acquisition admitted $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
while true; do
  line=$(grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line ]] && break
  el=$(( ($(date +%s) - T0) / 60 ))
  if (( el >= 80 )); then grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f > $R/logs/wk-left.txt; echo "# $(date '+%T') stop at ${el} min: $(wc -l < $R/logs/wk-left.txt | tr -d ' ') stage(s) left (logs/wk-left.txt)" >> $R/logs/wk-queue.log; break; fi
  echo "# $(date '+%T') start (${el} min): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  set -- ${=line}; zsh $R/run-h13.sh "$@" >> $R/logs/wk-queue.log 2>&1
  echo "# $(date '+%T') end ($?): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  echo "$line" >> $done_f
done
echo "# $TAG acquisition end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
