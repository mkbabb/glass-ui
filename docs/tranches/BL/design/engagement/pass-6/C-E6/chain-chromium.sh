#!/bin/zsh
# C-E6 Chromium chain: one guarded call per phase line (never --light: each line builds or starts a browser).
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/C-E6
P=$1; K=$C/logs/chain-$(basename $P .txt).log
print -- "# $(date '+%F %T') chain $P start · load $(sysctl -n vm.loadavg)" >> $K
while read -r line; do [[ -z $line || $line == \#* ]] && continue
  print -- "## $(date '+%F %T') $line · load $(sysctl -n vm.loadavg)" >> $K
  ~/.claude/guard/guarded --timeout 60 -- zsh $C/run-ce6.sh ${=line} >> $K 2>&1
  print -- "## guarded exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" >> $K
done < $P
print -- "# $(date '+%F %T') chain end · load $(sysctl -n vm.loadavg)" >> $K
