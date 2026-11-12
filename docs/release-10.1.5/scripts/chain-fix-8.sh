#!/bin/zsh
# 10.1.5 fix round 8: the witness arms in Chromium then WebKit 2287 (the WebKit lock is the longer wait) (each the branch, g6 and the
# RED arm), then g7, one guarded run at a time. Stops on a guard refusal.
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-8
G=~/.claude/guard/guarded
step() { local n=$1; shift; "$@" > $L/$n.guard.log 2>&1; local rc=$?; echo "$(date +%H:%M) $n rc=$rc" >> $L/chain.txt; grep -qi 'refus' $L/$n.guard.log && { echo "GUARD REFUSED at $n" >> $L/chain.txt; exit 3; }; }
GLASS_UI_DEMO_PORT=5293 step witness-chromium $G --timeout 90 -- zsh docs/release-10.1.5/scripts/witness-fix-8.sh chromium g6
GLASS_UI_DEMO_PORT=5294 step witness-webkit $G --exclusive webkit --timeout 90 -- zsh docs/release-10.1.5/scripts/witness-fix-8.sh webkit g6
step gates $G --timeout 60 -- zsh docs/release-10.1.5/scripts/gates-fix-8.sh
echo "chain done" >> $L/chain.txt
