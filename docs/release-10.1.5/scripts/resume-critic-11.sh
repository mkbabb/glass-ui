#!/bin/zsh
# 10.1.5 critic round 11, resume after the 2026-11-09 zone refusal: the WebKit chain (two guarded calls), the D-1
# A/B in both engines, then g7. Each step its own guarded call; a refusal (or any guard stop) ends the queue.
#   zsh docs/release-10.1.5/scripts/resume-critic-11.sh   (run in the background; log critic-11/resume.txt)
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts; L=docs/release-10.1.5/critic-11; G=~/.claude/guard/guarded
step() { local n=$1; shift; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date +%H:%M) $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" | tee -a $L/resume.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date +%H:%M) STOP: refused at $n" | tee -a $L/resume.txt; exit 3; fi; }
step chain-wk2 $G --exclusive webkit --timeout 90 -- zsh $S/chain-critic-11.sh wk c11 c11-v1014 branch
step chain-wk3 $G --exclusive webkit --timeout 90 -- zsh $S/chain-critic-11.sh wk g6-4 g6-3 r10 r10b r10c d1
step d1ab-ch $G --timeout 60 -- zsh $S/d1-ab-critic-11.sh chromium 8
step d1ab-wk $G --exclusive webkit --timeout 60 -- zsh $S/d1-ab-critic-11.sh webkit 8
step g7 $G --timeout 60 -- zsh $S/gates-critic-11.sh
echo "$(date +%H:%M) resume done" | tee -a $L/resume.txt
