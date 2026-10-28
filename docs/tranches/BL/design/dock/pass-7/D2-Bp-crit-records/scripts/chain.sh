#!/bin/bash
# chain.sh (D2 pass 7, B′ critic): the H7 battery on `bp`, one battery.sh `theme` slot per engine and theme (H6-10;
# WebKit under --exclusive webkit, queued, never cancelled). Every red cell re-run twice inside its slot, FM's six B2
# cells twice on every run (H7-3). One heavy run at a time.   ENGS=… THEMES=… bash chain.sh
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p7/Bp-crit; OUT=$B/out; WT=$B/wt
H=$G/docs/tranches/BL/design/dock/harness; REC=$G/docs/tranches/BL/design/dock/pass-7/D2-Bp-crit-records/battery; mkdir -p $REC
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
  L "start bp $e $t"
  BUILD=bp ENG=$e REC=$REC THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/chain-bp-$e.log 2>&1
  L "end bp $e $t exit $?"
done; done
L "CHAIN-DONE ${ENGS:-chromium webkit}"
