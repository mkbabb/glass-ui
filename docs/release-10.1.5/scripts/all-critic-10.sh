#!/bin/zsh
# 10.1.5 critic round 10: the Chromium chain (one guarded browser call) and the WebKit chain
# (two guarded --exclusive webkit calls), then g7, in sequence: one heavy run at a time.
#   zsh docs/release-10.1.5/scripts/all-critic-10.sh   (each step its own guarded call)
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-10
G=~/.claude/guard/guarded
S=docs/release-10.1.5/scripts/chain-critic-10.sh
$G --timeout 90 -- zsh $S ch c10 c10-v1014 branch g6-4 g6-3 c9cells c1cells > $L/chain-ch.guard.log 2>&1; echo "$(date +%H:%M) ch guard rc=$?" >> $L/runs.txt
$G --exclusive webkit --timeout 90 -- zsh $S wk c10 c10-v1014 branch g6-4 > $L/chain-wk1.guard.log 2>&1; echo "$(date +%H:%M) wk1 guard rc=$?" >> $L/runs.txt
$G --exclusive webkit --timeout 90 -- zsh $S wk g6-3 c9cells c1cells > $L/chain-wk2.guard.log 2>&1; echo "$(date +%H:%M) wk2 guard rc=$?" >> $L/runs.txt
echo "$(date +%H:%M) all done" >> $L/runs.txt
$G --timeout 60 -- zsh docs/release-10.1.5/scripts/gates-critic-10.sh > $L/g7.guard.log 2>&1; echo "$(date +%H:%M) g7 guard rc=$?" >> $L/runs.txt
echo "$(date +%H:%M) g7 done" >> $L/runs.txt
