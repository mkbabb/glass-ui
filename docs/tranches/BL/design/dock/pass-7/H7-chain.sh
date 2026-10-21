#!/bin/bash
# H7 · the pass-7 baseline: B′ (HEAD + pass-6/floor-v5.patch + pass-6/D2-Bp-proto.patch) on the 38 rows under H7, one battery
# `theme` slot per engine and theme (H6-10; WebKit under --exclusive webkit, queued, never cancelled), then PR on the tree.
# F7 is not re-run: H7 changes nothing in f7.mjs and the tree is the pass-6 critic's (no change in src, demo, tests or
# package.json since f29373b01), so the digest reads pass-6/D2-Bp-crit-records/F7-bp/F7.json.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p7/H7; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-7/H7-records/battery; mkdir -p $REC
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
  L "start bp $e $t"
  BUILD=bp ENG=$e REC=$REC THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/chain-bp-$e.log 2>&1
  L "end bp $e $t exit $?"
done; done
if [ -z "${NOPR:-}" ]; then
  L "start PR"
  (uptime; $HOME/.claude/guard/guarded --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $D/pass-7/H7-records/PR.log 2>&1
  mkdir -p $D/pass-7/H7-records/PR-bp; find $OUT/pr -name PR.json -exec cp {} $D/pass-7/H7-records/PR-bp/PR.json \;
  L "end PR"
fi
L "CHAIN-DONE"
