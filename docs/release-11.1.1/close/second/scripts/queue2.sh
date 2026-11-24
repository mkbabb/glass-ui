#!/bin/zsh
# The 11.1.1 second close queue: each group of chunks is one guarded call (multi.sh), one group at a
# time, on the full tree ROOT. A guarded REFUSED ends the queue (exit 3); under 6 GB free ends it
# (exit 4); the kernel zone is logged and left to the guard, which refuses heavy runs at 13M. A group
# that waits more than 60 minutes for the WebKit lock without starting is stopped by its PID,
# recorded, and the queue moves on.
#   ROOT=<tree> zsh queue2.sh <group>...   group: comma-separated chunks, e.g. ch-part-aa,ch-part-ab,
#   or res-<name> (scripts/jobs/res-<name>.sh); a group named wk-* or *-wk* takes the WebKit lock
set -u
C=${0:A:h:h}; S=$C/scripts; L=$C/suite; G=~/.claude/guard/guarded
mkdir -p $L
: ${ROOT:?ROOT must name the tree}; export ROOT
for grp in $@; do
  n=${grp//,/+}; chunks=(${(s:,:)grp})
  free=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}')
  if (( free < 6 )); then echo "$(date '+%F %T') STOP: disk ${free}G free at $n" | tee -a $L/queue.txt; exit 4; fi
  zone=$(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+' | cut -d= -f2)
  ex=(); [[ $grp = wk-* || $grp = *-wk* ]] && ex=(--exclusive webkit)
  echo "$(date '+%F %T') $n queued (disk ${free}G, inuse=${zone}, load $(sysctl -n vm.loadavg | tr -d '{}'))" | tee -a $L/queue.txt
  $G $ex --timeout 90 -- zsh $S/multi.sh $chunks > $L/$n.guard.log 2>&1 &
  gp=$!; t0=$(date +%s)
  while kill -0 $gp 2>/dev/null; do
    sleep 30
    if (( ${#ex} )) && ! grep -q 'multi start' $L/$n.guard.log && (( $(date +%s) - t0 > 3600 )); then
      kill $gp; echo "$(date '+%F %T') $n: waited over 60 minutes for the WebKit lock without starting; stopped by PID $gp, moving on" | tee -a $L/queue.txt; break
    fi
  done
  wait $gp 2>/dev/null; rc=$?
  echo "$(date '+%F %T') $n guard-rc=$rc $(grep -m1 -E '^\[guarded\] REFUSED' $L/$n.guard.log)" | tee -a $L/queue.txt
  if grep -qE '^\[guarded\] REFUSED' $L/$n.guard.log; then echo "$(date '+%F %T') STOP: refused at $n" | tee -a $L/queue.txt; exit 3; fi
done
echo "$(date '+%F %T') queue done: $*" | tee -a $L/queue.txt
