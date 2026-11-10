#!/bin/bash
# build.sh (D2 pass 14, FRESH CRITIC): every build in ONE guarded heavy slot (build-inner.sh), not one slot per build: the first
# attempt (attempt1/, 15:42-17:02) queued 58 min for fv3's slot alone, with 11 builds to make. Disk is read first.
set -u
REC=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-14/D2-Bp-crit-records; A=$REC/apply.log
a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); echo "disk free $a GB before the build slot $(date '+%F %T') · $(uptime)" > $A
[ "$a" -lt 15 ] && { echo "DISK-STOP" >> $A; exit 3; }
$HOME/.claude/guard/guarded --timeout 75 -- bash $REC/scripts/build-inner.sh > $REC/build-slot.log 2>&1; x=$?
echo "build slot exit $x $(date '+%T')" >> $A
grep -q '^\[guarded\] REFUSED' $REC/build-slot.log && { echo "GUARD-REFUSED at the build slot" >> $A; exit 5; }
exit $x
