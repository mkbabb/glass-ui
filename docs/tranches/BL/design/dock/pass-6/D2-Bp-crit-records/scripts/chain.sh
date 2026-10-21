#!/bin/bash
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p6/Bp-crit; OUT=$B/out; WT=$B/wt
H=$G/docs/tranches/BL/design/dock/harness; REC=$B/rec/battery; mkdir -p $REC
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
  L "start bp $e $t"
  BUILD=bp ENG=$e REC=$REC THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/chain-bp-$e.log 2>&1
  L "end bp $e $t exit $?"
done; done
L "BATTERY-DONE"
if [ -z "${NOF7:-}" ]; then
  L "start F7"
  (uptime; $HOME/.claude/guard/guarded --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $B/rec/F7.log 2>&1
  L "end F7"
fi
L "CHAIN-DONE"
