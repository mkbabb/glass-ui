#!/bin/zsh
# The 11.1.1 second close: when the running queue (PID $1) writes "<group> queued" for the group named
# $2, stop it and its waiting guarded call by their PIDs, then queue the groups given after it.
#   requeue.sh <queue pid> <group as the queue names it> <group>...
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}; L=$C/suite; Q=$1; M=$2; shift 2
until grep -qF "$M queued" $L/queue.txt; do kill -0 $Q 2>/dev/null || break; sleep 5; done
gp=$(pgrep -P $Q -f guarded)
kill $Q 2>/dev/null; [[ -n $gp ]] && kill $gp
while [[ -n $gp ]] && kill -0 $gp 2>/dev/null; do sleep 2; done
echo "$(date '+%F %T') the queue (PID $Q) and its guarded call for $M (PID ${gp:-none}) stopped by PID before $M ran; queued next: $*" | tee -a $L/queue.txt >> $C/run.log
ROOT=$WT/.cache/close-full/head/tree zsh $C/scripts/queue2.sh $@ > $C/queue-$(date +%H%M).out 2>&1
echo "$(date '+%F %T') requeued queue exit $?" >> $C/run.log
