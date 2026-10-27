#!/bin/bash
# chain.sh (D2 pass 7, B′ prototype): the H7 battery on `bp`, one battery.sh `theme` slot per engine and theme (H6-10;
# WebKit under --exclusive webkit, queued, never cancelled). Every red cell is re-run twice inside its slot, and FM's
# six B2 cells twice on every run (H7-3). One heavy run at a time.   ENGS=… THEMES=… bash chain.sh
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p7/Bp-proto; OUT=$B/out; WT=$B/wt
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness; REC=$OUT/rec/battery; mkdir -p $REC
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
  L "start bp $e $t"
  BUILD=bp ENG=$e REC=$REC THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/chain-bp-$e.log 2>&1
  L "end bp $e $t exit $?"
done; done
L "CHAIN-DONE ${ENGS:-chromium webkit}"
