#!/bin/zsh
# 10.1.5 critic round 14 queue: each step its own guarded call (WebKit 2287 under --exclusive webkit), one at a
# time; a refusal ends the queue.   zsh docs/release-10.1.5/scripts/queue-critic-14.sh step...
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts; L=docs/release-10.1.5/critic-14; G=~/.claude/guard/guarded
mkdir -p $L
step() { local n=$1; shift; echo "$(date +%H:%M) $n queued" | tee -a $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date +%H:%M) $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date +%H:%M) STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    ch) step chain-ch $G --timeout 90 -- zsh $S/chain-critic-14.sh ch branch g6-4 g6-3 c12a c12b;;
    wk) step chain-wk $G --exclusive webkit --timeout 90 -- zsh $S/chain-critic-14.sh wk branch g6-4 g6-3;;
    wk2) step chain-wk2 $G --exclusive webkit --timeout 90 -- zsh $S/chain-critic-14.sh wk c12a c12b u1 c13b u1-tip;;
    g7) step g7 $G --timeout 60 -- zsh $S/gates-critic-14.sh;;
  esac
done
echo "$(date +%H:%M) queue done: $*" | tee -a $L/queue.txt
