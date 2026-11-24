#!/bin/zsh
# The 11.1.1 second close: when the first queue (PID $1) queues the last Chromium chunks, stop it and
# its waiting guarded call by their PIDs, then queue WebKit first and the rest after it.
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}; L=$C/suite; Q=$1
until grep -q "ch-part-aj+ch-part-ak+ch-part-al queued" $L/queue.txt; do sleep 5; done
gp=$(pgrep -P $Q -f guarded)
kill $Q; [[ -n $gp ]] && kill $gp
while [[ -n $gp ]] && kill -0 $gp 2>/dev/null; do sleep 2; done
echo "$(date '+%F %T') the first queue (PID $Q) and its guarded call for ch-part-aj..al (PID ${gp:-none}) stopped by PID, to run WebKit next: the kernel zone grows about 650k an hour and reaches the guard's 13M refusal within about an hour" | tee -a $L/queue.txt >> $C/run.log
grep -h "multi start\|ch-part-aj start" $L/ch-part-aj+ch-part-ak+ch-part-al.guard.log >> $L/queue.txt 2>/dev/null
ROOT=$WT/.cache/close-full/head/tree zsh $C/scripts/queue2.sh wk-proj,wk-rel res-ch-n1,ch-part-aj,ch-part-ak,ch-part-al co-rel co-part-aa,co-part-ab,co-part-ac co-part-ad,co-part-ae,co-part-af co-part-ag,co-part-ah,co-part-ai co-part-aj,co-part-ak,co-part-al > $C/queue3.out 2>&1
echo "$(date '+%F %T') second queue exit $?" >> $C/run.log
