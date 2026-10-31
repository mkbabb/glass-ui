#!/bin/zsh
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/C-A10/scripts; L=${S%/scripts}/logs; cd $S
./builds.sh swap nohyst owed fixed fast zero reducetravel clock exitfrozen noread nolens loop crest prmY zoomcure loudcure cand8 > $L/builds-2.log 2>&1
tail -3 $L/builds-2.log
./gates.sh > $L/gates.log 2>&1
./chain.sh stages.txt > $L/chain-chromium.log 2>&1
echo "# $(date '+%F %T') queued for the WebKit lock · load $(sysctl -n vm.loadavg)" > $L/wk-queue.log
{ cat stages.txt; echo END; } > wk-stages.txt
$HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- ./wk-queue.sh wk-stages.txt >> $L/wk-queue.log 2>&1
echo "# $(date '+%F %T') guard exit $? · load $(sysctl -n vm.loadavg)" >> $L/wk-queue.log
echo ALL-DONE
