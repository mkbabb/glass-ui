#!/bin/zsh
# H13-complete: the Chromium stages run INSIDE one guarded call (a named batch C-k, c-queue.sh), in list order, re-reading the list before
# each stage. Batched under REGISTRY §P12-7 item 11 (admission waits above 15 min per stage: the head build waited 29+ min at load 16-24
# with 40+ guarded runs machine-wide). No stage starts after 50 min of the batch; a stage the 90-min cap cuts is not marked done and
# re-runs whole in the next batch, recorded.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-13/H13c
list=$1; TAG=$2; done_f=$R/logs/c1.done; touch $done_f; T0=$(date +%s)
echo "# $TAG batch admitted $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/c1.log
while true; do
  line=$(grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line ]] && break
  el=$(( ($(date +%s) - T0) / 60 ))
  if (( el >= 50 )); then echo "# $(date '+%T') $TAG stops at ${el} min; the rest goes to the next named batch" >> $R/logs/c1.log; break; fi
  echo "# $(date '+%T') start (${el} min): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/c1.log
  set -- ${=line}; zsh $R/run-h13c.sh "$@" >> $R/logs/c1.log 2>&1
  echo "# $(date '+%T') end ($?): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/c1.log
  echo "$line" >> $done_f
done
echo "# $TAG batch end $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $R/logs/c1.log
