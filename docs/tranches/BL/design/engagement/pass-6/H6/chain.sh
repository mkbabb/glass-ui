#!/bin/zsh
# H6 chain: each line of a phase file runs in ITS OWN guarded call (one heavy run at a time, each <= 90 min):
#   zsh chain.sh <phase-file> [webkit]
# `webkit` runs the WHOLE phase file in ONE `guarded --exclusive webkit` acquisition (the one WebKit lock), capped at
# 90 min by the machine law.
H6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/H6
G=~/.claude/guard/guarded
if [[ ${2:-} == webkit ]]; then
  print -- "## $(date '+%F %T') queue webkit acquisition for $1 · load $(sysctl -n vm.loadavg)"
  $G --exclusive webkit --timeout 90 -- zsh $H6/run-h6.sh phase $1; rc=$?
  print -- "## $(date '+%F %T') webkit acquisition for $1 ended · guarded exit $rc · load $(sysctl -n vm.loadavg)"; exit $rc
fi
while read -r line; do
  [[ -z $line || $line == \#* ]] && continue
  print -- "## $(date '+%F %T') $line · load $(sysctl -n vm.loadavg)"
  $G --timeout 90 -- zsh $H6/run-h6.sh ${=line}; print -- "   guarded exit $?"
done < $1
print -- "## $(date '+%F %T') chain $1 done · load $(sysctl -n vm.loadavg)"
