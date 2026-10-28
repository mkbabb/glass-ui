#!/bin/zsh
# C-A6 Chromium (and builds) chain: one guarded call per phase line, never --light.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/C-A6
P=$1; CL=$C/logs/chain-$(basename $P .txt).log
print -- "# $(date '+%F %T') chain $P start · load $(sysctl -n vm.loadavg)" >> $CL
while read -r line; do [[ -z $line || $line == \#* ]] && continue
  print -- "## $(date '+%F %T') $line · load $(sysctl -n vm.loadavg)" >> $CL
  ~/.claude/guard/guarded --timeout 60 -- zsh $C/run-ca6.sh ${=line} >> $CL 2>&1
  print -- "## guarded exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $CL
done < $P
print -- "# $(date '+%F %T') chain end · load $(sysctl -n vm.loadavg)" >> $CL
