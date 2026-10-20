#!/bin/zsh
# H5 chain: each line of a phase file runs in ITS OWN guarded call (one heavy run at a time, each <= 90 min):
#   zsh chain.sh <phase-file> [webkit]
# `webkit` runs the WHOLE phase file in ONE `guarded --exclusive webkit` acquisition (the one WebKit lock), capped at
# 90 min by the machine law; a WebKit stage that does not fit takes a further acquisition in its own phase file.
H5=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/H5
G=~/.claude/guard/guarded
if [[ ${2:-} == webkit ]]; then
  print -- "## $(date '+%F %T') queue webkit acquisition for $1 · load $(sysctl -n vm.loadavg)"
  $G --exclusive webkit --timeout 90 -- zsh $H5/run-h5.sh phase $1; rc=$?
  print -- "## $(date '+%F %T') webkit acquisition for $1 ended · guarded exit $rc · load $(sysctl -n vm.loadavg)"; exit $rc
fi
while read -r line; do
  [[ -z $line || $line == \#* ]] && continue
  print -- "## $(date '+%F %T') $line · load $(sysctl -n vm.loadavg)"
  if [[ $line == apply* || $line == plant* ]]; then zsh $H5/run-h5.sh ${=line}
  else $G --timeout 90 -- zsh $H5/run-h5.sh ${=line}; print -- "   guarded exit $?"; fi
done < $1
print -- "## $(date '+%F %T') chain $1 done · load $(sysctl -n vm.loadavg)"
