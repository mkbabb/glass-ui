#!/bin/zsh
# 10.1.5 critic round 12 queue after the first Chromium chain: each step its own guarded call (WebKit 2287 under
# --exclusive webkit); a refusal ends the queue.   zsh docs/release-10.1.5/scripts/queue-critic-12.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts; L=docs/release-10.1.5/critic-12; G=~/.claude/guard/guarded
step() { local n=$1; shift; "$@" > $L/$n.guard.log 2>&1; local rc=$?
  echo "$(date +%H:%M) $n guard-rc=$rc $(grep -m1 -E 'REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -q REFUSED $L/$n.guard.log; then echo "$(date +%H:%M) STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi; }
for s in ${@}; do
  case $s in
    ch-c12) step chain-ch2 $G --timeout 90 -- zsh $S/chain-critic-12.sh ch c12 c12-v1014;;
    wk-c12) step chain-wk1 $G --exclusive webkit --timeout 90 -- zsh $S/chain-critic-12.sh wk c12 c12-v1014;;
    wk-rest) step chain-wk2 $G --exclusive webkit --timeout 90 -- zsh $S/chain-critic-12.sh wk branch r11 g6-4 g6-3;;
    g7) step g7 $G --timeout 60 -- zsh $S/gates-critic-12.sh;;
  esac
done
echo "$(date +%H:%M) queue done: $*" | tee -a $L/queue.txt
