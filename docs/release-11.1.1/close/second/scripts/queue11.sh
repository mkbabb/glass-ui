#!/bin/zsh
# The 11.1.1 third close: queue9's reads grouped, one guarded call per group (group.sh runs the
# group's steps in order and voids and reruns any step that spans a sleep), so each group waits once
# in the guard's machine-wide queue. A group with a WebKit step runs under --exclusive webkit. Before
# a group, while the lid reads closed, it waits. A guarded REFUSED ends the queue (exit 3), except one
# naming a stale zone cache, retried once after two minutes; under 6 GB free ends it (exit 4). A WebKit
# group that waits over 60 minutes for the lock without starting is stopped by its PID, recorded, and
# the queue moves on.
#   zsh queue11.sh <step>[+<step>...] ...
set -u
C=${0:A:h:h}; S=$C/scripts; L=$C/suite; G=~/.claude/guard/guarded
lidshut() { ioreg -r -k AppleClamshellState -d 1 | grep -q '"AppleClamshellState" = Yes' }
note() { echo "$(date '+%F %T') $*" | tee -a $L/queue.txt }
state() { echo "load $(sysctl -n vm.loadavg | tr -d '{}' | xargs), zone $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+'), disk $(df -g /System/Volumes/Data | awk 'NR==2{print $4}')G" }
for grp in $@; do
  steps=(${(s:+:)grp}); retried=0
  while true; do
    free=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}')
    (( free < 6 )) && { note "STOP: disk ${free}G free at $grp"; exit 4; }
    if lidshut; then note "$grp: the lid reads closed; waiting"; while lidshut; do sleep 60; done; note "$grp: the lid reads open"; fi
    ex=(); [[ $grp = *wk* || $grp = *ex-webkit-* ]] && ex=(--exclusive webkit)
    glog=$L/g-${grp//+/_}.guard.log; t0=$(date +%s)
    note "group $grp queued ($(state))"
    $G $ex --timeout 90 -- zsh $S/group.sh $steps > $glog 2>&1 &
    gp=$!; stopped=0
    while kill -0 $gp 2>/dev/null; do
      sleep 30
      if (( ${#ex} )) && ! grep -q 'group start' $glog && (( $(date +%s) - t0 > 3600 )); then
        kill $gp; stopped=1; note "$grp: waited over 60 minutes for the WebKit lock without starting; stopped by PID $gp, moving on"; break
      fi
    done
    wait $gp 2>/dev/null; rc=$?
    (( stopped )) && break
    ref=$(grep -m1 -E '^\[guarded\] REFUSED' $glog)
    note "group $grp guard-rc=$rc $(( $(date +%s) - t0 ))s; $(state); $(grep -E ' rc=' $glog | sed -E 's/^[0-9-]+ [0-9:]+ //' | cut -d';' -f1 | tr '\n' ';')${ref:+ $ref}"
    if [[ -n $ref ]]; then
      if [[ $ref = *stale* ]] && (( ! retried )); then retried=1; note "$grp: the refusal names a stale zone cache; retried once after two minutes"; sleep 120; continue; fi
      note "STOP: refused at $grp"; exit 3
    fi
    break
  done
done
note "queue11 done: $*"
