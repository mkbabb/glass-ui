#!/bin/zsh
# P-E14 batch runner (H14's batch.sh, this seat's run14.sh): one named acquisition, `batch.sh <name> <list>`, run inside ONE guarded call (Chromium: `guarded --timeout 90`; WebKit:
# `guarded --exclusive webkit --timeout 90`). The list's lines are `<est-min> <stage> <engine> [args]`; `#` lines are comments.
# THE START CUTOFF (class 6 (i), completion 2 §P13c2-5 item 2): a stage starts only if the minutes elapsed in this acquisition plus its own
# estimate (its longest run, with its load gate) stay within LIMIT (88 of the 90-minute timeout). A stage that does not fit is written,
# unchanged, to <name>.held for the next acquisition, never started to be killed. A stage the timeout kills anyway measured nothing: its
# start line has no end line in <name>.log, and it is re-run whole in the next acquisition, never scored.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/PE14-records
name=$1; list=$2; LIMIT=${LIMIT:-88}
t0=$(date +%s); : > $R/$name.held
echo "# $name · $(date '+%F %T') · admitted · load $(sysctl -n vm.loadavg) · list ${list:t} ($(grep -cv '^#' $list) stages) · cutoff $LIMIT min" >> $R/$name.log
grep -v '^#' $list | grep -v '^[[:space:]]*$' | while read -r est rest; do
  el=$(( ($(date +%s) - t0) / 60 ))
  if (( el + est > LIMIT )); then echo "$est $rest" >> $R/$name.held; echo "  HELD (cutoff: $el min elapsed + $est est > $LIMIT) · $rest" >> $R/$name.log; continue; fi
  echo "  start $(date '+%T') · +$el min · $rest" >> $R/$name.log
  out=$(zsh $R/run14.sh ${=rest} 2>&1)
  echo "  end   $(date '+%T') · $out" >> $R/$name.log
done
echo "# $name · $(date '+%F %T') · done · load $(sysctl -n vm.loadavg) · held $(wc -l < $R/$name.held | tr -d ' ')" >> $R/$name.log
