#!/bin/zsh
# C-A11: the WebKit stages inside the one acquisition, in list order, the list re-read before each stage (replaced only by atomic
# rename). No stage starts after 78 min, so the 90-min cap never cuts a running stage; stages left go to logs/wk-left.txt.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-11/C-A11; S=$R/scripts; cd $S
list=$1; done_f=$R/logs/wk.done; touch $done_f; T0=$(date +%s)
echo "# $(date '+%F %T') WebKit acquisition admitted ($list) · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
while true; do
  line=$(grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f | head -1)
  [[ -z $line || $line == END ]] && break
  el=$(( ($(date +%s) - T0) / 60 ))
  if (( el >= 78 )); then grep -v '^#' $list | grep -v '^\s*$' | grep -vxF -f $done_f | grep -vx END > $R/logs/wk-left.txt; echo "# $(date '+%T') stop at ${el} min: $(wc -l < $R/logs/wk-left.txt | tr -d ' ') stage(s) left" >> $R/logs/wk-queue.log; break; fi
  echo "# $(date '+%T') start (${el} min): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  set -- ${=line}; s=$1; shift
  ./run-ca11.sh $s webkit "$@" >> $R/logs/wk-queue.log 2>&1
  echo "# $(date '+%T') end ($?): $line · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
  echo "$line" >> $done_f
done
echo "# $(date '+%F %T') WebKit acquisition end · load $(sysctl -n vm.loadavg)" >> $R/logs/wk-queue.log
