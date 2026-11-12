#!/bin/zsh
# 10.1.5 fix round 13 queue: each step its own guarded call, one at a time; a refusal ends the queue.
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts; L=docs/release-10.1.5/fix-13; G=~/.claude/guard/guarded
step() { local n=$1; shift; echo "$(date +%H:%M) $n queued" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date +%H:%M) $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date +%H:%M) STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    wk-tip) step wk-tip $G --exclusive webkit --timeout 30 -- zsh $S/witness-fix-13.sh wk tip u1;;
    wk-branch) step wk-branch $G --exclusive webkit --timeout 90 -- zsh $S/witness-fix-13.sh wk branch u1 c13b branch g6-4 g6-3;;
    ch-tip) step ch-tip $G --timeout 30 -- zsh $S/witness-fix-13.sh ch tip u1;;
    ch-branch) step ch-branch $G --timeout 90 -- zsh $S/witness-fix-13.sh ch branch u1 branch g6-4 g6-3;;
    g7) step g7 $G --timeout 60 -- zsh $S/gates-fix-13.sh;;
  esac
done
echo "$(date +%H:%M) queue done: $*" | tee -a $L/queue.txt
