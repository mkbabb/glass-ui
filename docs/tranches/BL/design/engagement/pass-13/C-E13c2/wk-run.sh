#!/bin/zsh
# C-E13-complete: the WebKit stages, run INSIDE one `guarded --exclusive webkit` acquisition (wk-queue.sh), in list order (H13/wk-run.sh's
# rule). No stage starts after 80 min of the acquisition, so the 90-min cap never cuts a running stage.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/C-E13c2
list=$1; TAG=$2; done_f=$R/logs/wk.done; touch $done_f; T0=$(date +%s)
echo "# $TAG acquisition admitted $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
while true; do
  line=$(grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line ]] && break
  el=$(( ($(date +%s) - T0) / 60 ))
  if (( el >= 80 )); then echo "# $(date '+%T') $TAG stops at ${el} min: $(grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f | wc -l | tr -d ' ') stage(s) left for the next named acquisition" >> $R/logs/wk-queue.log; break; fi
  echo "# $(date '+%T') start (${el} min): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  set -- ${=line}; zsh $R/run.sh "$@" >> $R/logs/wk-queue.log 2>&1
  echo "# $(date '+%T') end ($?): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  echo "$line" >> $done_f
done
echo "# $TAG acquisition end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
