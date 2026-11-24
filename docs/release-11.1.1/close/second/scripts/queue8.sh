#!/bin/zsh
# The 11.1.1 second close, resumed by a fourth seat after queue7's seat ended at 13:57 during co-rel:
# the rest of the visual suite on the head tree (b9b96cb76, built by queue7), one guarded call per
# group (queue2.sh): coarse-touch whole, then WebKit's two branch-only titles on the red tree and the
# head tree; then the exits gate (exits.sh), each part its own guarded call.
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}
echo "$(date '+%F %T') queue8 starts on $(git -C $WT rev-parse --short HEAD), load $(sysctl -n vm.loadavg | tr -d '{}'), zone $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+'), disk $(df -g /System/Volumes/Data | awk 'NR==2{print $4}')G" >> $C/run.log
ROOT=$WT/.cache/close-full/head/tree zsh $C/scripts/queue2.sh co-rel co-part-aa,co-part-ab,co-part-ac co-part-ad,co-part-ae,co-part-af co-part-ag,co-part-ah,co-part-ai co-part-aj,co-part-ak,co-part-al res-wk-swr
rc=$?
echo "$(date '+%F %T') queue8 suite exit $rc" >> $C/run.log
(( rc == 3 || rc == 4 )) && { echo "$(date '+%F %T') queue8: the queue stopped; the exits gate not started" >> $C/run.log; exit $rc; }
zsh $C/scripts/exits.sh
echo "$(date '+%F %T') queue8 exits exit $?" >> $C/run.log
