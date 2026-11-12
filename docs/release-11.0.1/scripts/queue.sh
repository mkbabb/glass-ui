#!/bin/zsh
# 11.0.1 witness queue: each chain its own guarded call (WebKit under --exclusive webkit),
# one at a time; a refusal ends the queue.   zsh queue.sh step...
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-11.0.1/scripts; L=docs/release-11.0.1/runs; G=~/.claude/guard/guarded
mkdir -p $L
step() { local n=$1; shift; echo "$(date +%H:%M) $n queued" >> $L/queue.txt; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date +%H:%M) $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" >> $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date +%H:%M) STOP: refused at $n" >> $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    ch) step chain-ch-merged $G --timeout 90 -- zsh $S/chain.sh ch merged owner dara partA partB g6-4 g6-3 ub7;;
    wk) step chain-wk-merged $G --exclusive webkit --timeout 90 -- zsh $S/chain.sh wk merged owner dara partA partB g6-4 g6-3;;
    ch0) step chain-ch-v1100 $G --timeout 90 -- zsh $S/chain.sh ch v1100 owner dara partA partB ub7;;
    wk0) step chain-wk-v1100 $G --exclusive webkit --timeout 90 -- zsh $S/chain.sh wk v1100 owner dara partA partB;;
  esac
done
echo "$(date +%H:%M) queue done: $*" >> $L/queue.txt
