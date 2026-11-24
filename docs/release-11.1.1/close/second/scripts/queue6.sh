#!/bin/zsh
# The 11.1.1 second close, resumed: reorder at a group boundary. When the running queue2 (PID $1,
# under queue4, PID $2) writes "res-aj+ch-part-ak+ch-part-al queued", that is, as WebKit's group
# ends, stop queue4, queue2 and queue2's just-started guarded call by their PIDs, then queue
# coarse-touch whole, then chunk aj's resolution with Chromium's ak and al, then the exits gate.
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}; L=$C/suite; Q=$1; Q4=$2; M="res-aj+ch-part-ak+ch-part-al"
until grep -qF "$M queued" $L/queue.txt; do kill -0 $Q 2>/dev/null || break; sleep 3; done
gp=$(pgrep -P $Q -f guarded)
kill $Q4 2>/dev/null; kill $Q 2>/dev/null; [[ -n $gp ]] && kill $gp
while [[ -n $gp ]] && kill -0 $gp 2>/dev/null; do sleep 2; done
echo "$(date '+%F %T') queue4 (PID $Q4), queue2 (PID $Q) and its guarded call for $M (PID ${gp:-none}) stopped by PID as $M was queued; coarse-touch next" | tee -a $L/queue.txt >> $C/run.log
ROOT=$WT/.cache/close-full/head/tree zsh $C/scripts/queue2.sh co-rel co-part-aa,co-part-ab,co-part-ac co-part-ad,co-part-ae,co-part-af co-part-ag,co-part-ah,co-part-ai co-part-aj,co-part-ak,co-part-al res-aj,ch-part-ak,ch-part-al
echo "$(date '+%F %T') queue6 suite exit $?" >> $C/run.log
grep -qE "STOP: (refused|disk)" $L/queue.txt && tail -1 $L/queue.txt | grep -qE "STOP" && { echo "$(date '+%F %T') queue6: the queue stopped; the exits gate not started" >> $C/run.log; exit 3; }
echo "$(date '+%F %T') queue6: the exits gate starts" >> $C/run.log
zsh $C/scripts/exits.sh
echo "$(date '+%F %T') queue6 exits exit $?" >> $C/run.log
