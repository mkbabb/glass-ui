#!/bin/zsh
# The 11.1.1 second close, resumed: after the archive battery ends (its exit line in run.log), the
# rest of the visual suite on the full tree of the tip, one guarded call per group (queue2.sh):
# WebKit first (twice cut before), then chunk aj's two titles resolved and Chromium's last two
# chunks, then coarse-touch whole.
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}
until grep -q "archive-final guarded exit" $C/run.log; do sleep 15; done
echo "$(date '+%F %T') queue4 starts on $(git -C $WT rev-parse --short HEAD)" >> $C/run.log
ROOT=$WT/.cache/close-full/head/tree zsh $C/scripts/queue2.sh wk-proj,wk-rel res-aj,ch-part-ak,ch-part-al co-rel co-part-aa,co-part-ab,co-part-ac co-part-ad,co-part-ae,co-part-af co-part-ag,co-part-ah,co-part-ai co-part-aj,co-part-ak,co-part-al
echo "$(date '+%F %T') queue4 exit $?" >> $C/run.log
