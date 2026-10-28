#!/bin/zsh
# P-E6 Chromium chain: one guarded call per phase line (never --light: each line builds or starts a browser).
E6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/E6
P=$1; C=$E6/logs/chain-$(basename $P .txt).log
print -- "# $(date '+%F %T') chain $P start · load $(sysctl -n vm.loadavg)" >> $C
while read -r line; do [[ -z $line || $line == \#* ]] && continue
  print -- "## $(date '+%F %T') $line · load $(sysctl -n vm.loadavg)" >> $C
  ~/.claude/guard/guarded --timeout 60 -- zsh $E6/run-e6.sh ${=line} >> $C 2>&1
  print -- "## guarded exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $C
done < $P
print -- "# $(date '+%F %T') chain end · load $(sysctl -n vm.loadavg)" >> $C
