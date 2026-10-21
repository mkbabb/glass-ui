#!/bin/bash
# chain.sh (D2 pass 6, B′ prototype): the H6 battery on the rebased route `bp` (HEAD + floor v5 + this seat's patch):
# one battery.sh `theme` slot per engine and theme (H6-10), Chromium first, then Playwright WebKit under the
# machine-wide lock. Every red cell is re-run twice inside its slot (battery.sh). One heavy run at a time.
#   bash chain.sh            (ENGS / THEMES narrow a resume)
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p6/Bp-proto; OUT=$B/out; WT=$B/wt
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness
REC=$OUT/rec/battery; mkdir -p $REC
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
  L "start bp $e $t"
  BUILD=bp ENG=$e REC=$REC THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/chain-bp-$e.log 2>&1
  L "end bp $e $t exit $?"
done; done
L "CHAIN-DONE"
