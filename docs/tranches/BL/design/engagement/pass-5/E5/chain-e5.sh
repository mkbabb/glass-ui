#!/bin/zsh
# each line of a phase file in ITS OWN guarded call; `webkit` runs the whole file in ONE `guarded --exclusive webkit`
#   zsh chain-e5.sh <phase-file> [webkit]
E5=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/E5
G=~/.claude/guard/guarded
if [[ ${2:-} == webkit ]]; then
  print -- "## $(date '+%F %T') queue webkit acquisition for $1 · load $(sysctl -n vm.loadavg)"
  $G --exclusive webkit --timeout 90 -- zsh $E5/run-e5.sh phase $1; rc=$?
  print -- "## $(date '+%F %T') webkit acquisition for $1 ended · guarded exit $rc · load $(sysctl -n vm.loadavg)"; exit $rc
fi
while read -r line; do
  [[ -z $line || $line == \#* ]] && continue
  print -- "## $(date '+%F %T') $line · load $(sysctl -n vm.loadavg)"
  if [[ $line == TAG=* ]]; then t=${line%% *}; rest=${line#* }; env ${t} $G --timeout 90 -- zsh $E5/run-e5.sh ${=rest}
  else $G --timeout 90 -- zsh $E5/run-e5.sh ${=line}; fi
  print -- "   guarded exit $?"
done < $1
print -- "## $(date '+%F %T') chain $1 done · load $(sysctl -n vm.loadavg)"
