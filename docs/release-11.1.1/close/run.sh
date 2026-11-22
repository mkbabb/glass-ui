#!/bin/bash
# The 11.1.1 close: once the exits parts have finished, the visual suite queue, one guarded step at
# a time, in the 11.1.0 close's order.
C=$(cd "$(dirname "$0")" && pwd)
until grep -q 'rest done' $C/exits/logs/runs.out; do sleep 20; done
echo "$(date '+%F %T') suite queue start on $(git -C $C/../../.. rev-parse --short HEAD); $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+')" >> $C/run.log
zsh $C/scripts/queue.sh wk-proj wk-rel ch-rel co-rel ch-part-aa ch-part-ab ch-part-ac ch-part-ad ch-part-ae ch-part-af ch-part-ag ch-part-ah ch-part-ai ch-part-aj ch-part-ak ch-part-al co-part-aa co-part-ab co-part-ac co-part-ad co-part-ae co-part-af co-part-ag co-part-ah co-part-ai co-part-aj co-part-ak co-part-al
echo "$(date '+%F %T') suite queue exit $?; $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+')" >> $C/run.log
