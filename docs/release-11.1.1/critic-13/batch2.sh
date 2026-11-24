#!/bin/bash
# Critic 13: batch.sh's batch 2 alone (the WebKit half of the exits gate on the tip, the red tree
# and the pre tree, and the palette probe in WebKit), run after batch.sh ends: batch 2 was stopped
# while it waited for the machine-wide WebKit lock, so batch 3 could use the wait.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-13; L=$D/logs; G=~/.claude/guard/guarded; J=$D/job.sh
while pgrep -f "critic-13/batch.sh" > /dev/null; do sleep 30; done
echo "BATCH2-START $(date +%T) head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
$G --exclusive webkit --timeout 90 -- bash -c "
  for p in webkit-phone webkit-desktop; do for n in 0 1 2 3; do $J part tip \$p \$n tip-\$p-\$n; done; done
  for p in webkit-phone webkit-desktop; do for n in 0 1 2 3; do $J part red \$p \$n red-\$p-\$n; done; done
  for p in webkit-phone webkit-desktop; do $J part pre \$p CommandDialog pre-\$p; done
  $J probe cmd tip webkit-desktop cmd-tip-wd
  $J probe cmd red webkit-desktop cmd-red-wd
" > $L/batch-2.log 2>&1
grep -q '^\[guarded\] REFUSED' $L/batch-2.log && echo "$(date +%T) REFUSED batch 2" >> $L/runs.out
echo "BATCH2-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
