#!/bin/zsh
# C-A14 batch runner (PE14-records/batch14.sh's rule): one named acquisition, `batch.sh <name> <list>`, inside ONE guarded call. Lines are
# `<est-min> <stage> <engine> [args]`. THE START CUTOFF (class 6 (i)): a stage starts only if the minutes elapsed plus its estimate stay
# within LIMIT (88 of the 90-minute timeout); one that does not fit goes unchanged to <name>.held for the next named acquisition.
# A stage killed anyway has a start line and no end line in <name>.log; it measured nothing and is re-run whole, never scored.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-A14-records
name=$1; list=$2; LIMIT=${LIMIT:-88}
t0=$(date +%s); : > $R/$name.held
echo "# $name · $(date '+%F %T') · admitted · load $(sysctl -n vm.loadavg) · list ${list:t} ($(grep -cv '^#' $list) stages) · cutoff $LIMIT min" >> $R/$name.log
grep -v '^#' $list | grep -v '^[[:space:]]*$' | while read -r est rest; do
  el=$(( ($(date +%s) - t0) / 60 ))
  if (( el + est > LIMIT )); then echo "$est $rest" >> $R/$name.held; echo "  HELD (cutoff: $el min elapsed + $est est > $LIMIT) · $rest" >> $R/$name.log; continue; fi
  echo "  start $(date '+%T') · +$el min · $rest" >> $R/$name.log
  out=$(zsh $R/run.sh ${=rest} 2>&1)
  echo "  end   $(date '+%T') · $out" >> $R/$name.log
done
echo "# $name · $(date '+%F %T') · done · load $(sysctl -n vm.loadavg) · held $(wc -l < $R/$name.held | tr -d ' ')" >> $R/$name.log
