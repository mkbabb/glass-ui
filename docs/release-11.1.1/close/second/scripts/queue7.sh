#!/bin/zsh
# The 11.1.1 second close, resumed after the reboot of 2026-11-24 10:59: release.yml's battery and
# release.sh's browser half on an archive of the tip (archive.sh), the head tree rebuilt at the tip,
# then the rest of the visual suite on it, one guarded call per group (queue2.sh): chunk aj's two
# titles resolved with Chromium's last two chunks, coarse-touch whole, WebKit's two branch-only
# titles on the red tree; then the exits gate (exits.sh), each part its own guarded call.
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}; G=~/.claude/guard/guarded
echo "$(date '+%F %T') queue7 starts on $(git -C $WT rev-parse --short HEAD), load $(sysctl -n vm.loadavg | tr -d '{}'), zone $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+'), disk $(df -g /System/Volumes/Data | awk 'NR==2{print $4}')G" >> $C/run.log
(cd $WT && $G --timeout 60 -- bash $C/archive.sh resumed > $C/archive-resumed.out 2>&1)
echo "$(date '+%F %T') archive-resumed guarded exit $?" >> $C/run.log
grep -qE '^\[guarded\] REFUSED' $C/archive-resumed.out && { echo "$(date '+%F %T') queue7: archive refused; stop" >> $C/run.log; exit 3; }
zsh $C/scripts/fulltree.sh head HEAD
ROOT=$WT/.cache/close-full/head/tree zsh $C/scripts/queue2.sh res-aj,ch-part-ak,ch-part-al co-rel co-part-aa,co-part-ab,co-part-ac co-part-ad,co-part-ae,co-part-af co-part-ag,co-part-ah,co-part-ai co-part-aj,co-part-ak,co-part-al res-wk-swr
rc=$?
echo "$(date '+%F %T') queue7 suite exit $rc" >> $C/run.log
(( rc == 3 || rc == 4 )) && { echo "$(date '+%F %T') queue7: the queue stopped; the exits gate not started" >> $C/run.log; exit $rc; }
zsh $C/scripts/exits.sh
echo "$(date '+%F %T') queue7 exits exit $?" >> $C/run.log
