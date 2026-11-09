#!/bin/zsh
# C-E14 batch runner (P-E14 batch14.sh, this seat run.sh): one named acquisition, `batch.sh <name> <list>`, run inside ONE guarded call (Chromium: `guarded --timeout 90`; WebKit:
# `guarded --exclusive webkit --timeout 90`). The list's lines are `<est-min> <stage> <engine> [args]`; `#` lines are comments.
# THE START CUTOFF (class 6 (i), completion 2 §P13c2-5 item 2): a stage starts only if the minutes elapsed in this acquisition plus its own
# estimate stay within LIMIT (88 of the 90-minute timeout). A stage that does not fit is written, unchanged, to <name>.held for the next
# acquisition, never started to be killed. A stage the timeout kills anyway measured nothing: its start line has no end line in <name>.log,
# and it is re-run whole in the next acquisition, never scored.
# RESUME FIX (second deployment, 2026-11-06): <name>.held is written BEFORE each stage as (stages held by the cutoff so far) + (this stage and
# every later one), so a guard kill leaves the killed stage and the unrun rest in .held; the first deployment's C1 was killed inside
# cand14-E-11 with an empty .held and its chain stopped there (chain.log 14:27:14).
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-14/C-E14-records
name=$1; list=$2; LIMIT=${LIMIT:-88}
t0=$(date +%s); cut=$R/$name.cut; : > $cut
L=("${(@f)$(grep -v '^#' $list | grep -v '^[[:space:]]*$')}")
print -l -- $L > $R/$name.held
echo "# $name · $(date '+%F %T') · admitted · load $(sysctl -n vm.loadavg) · list ${list:t} (${#L} stages) · cutoff $LIMIT min" >> $R/$name.log
for (( i = 1; i <= ${#L}; i++ )); do
  line=$L[i]; est=${line%% *}; rest=${line#* }
  el=$(( ($(date +%s) - t0) / 60 ))
  if (( el + est > LIMIT )); then echo "$line" >> $cut; echo "  HELD (cutoff: $el min elapsed + $est est > $LIMIT) · $rest" >> $R/$name.log
    { cat $cut; (( i < ${#L} )) && print -l -- $L[i+1,-1]; } > $R/$name.held; continue; fi
  { cat $cut; print -l -- $L[i,-1]; } > $R/$name.held
  echo "  start $(date '+%T') · +$el min · $rest" >> $R/$name.log
  out=$(zsh $R/run.sh ${=rest} 2>&1)
  echo "  end   $(date '+%T') · $out" >> $R/$name.log
  { cat $cut; (( i < ${#L} )) && print -l -- $L[i+1,-1]; } > $R/$name.held
done
rm -f $cut
echo "# $name · $(date '+%F %T') · done · load $(sysctl -n vm.loadavg) · held $(grep -c . $R/$name.held)" >> $R/$name.log
