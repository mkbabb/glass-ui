#!/bin/bash
# FV4-chain.sh: H5 on floor v4 (D2 pass 5, FLOOR-V4), after H5-chain.sh. One build (fv4), the four battery stages
# (harness/battery.sh main, rest, dark, darkrest), each in its own guarded slot; Playwright WebKit under
# --exclusive webkit, re-queued per stage. Chromium first, then Playwright WebKit. One run at a time.
# Then PR + the adapter law (extra). Logs: FV4-records/battery/. The adapter for fv4 is pass-3/adapter-floor-v2.mjs
# (battery.sh's default for any label other than head and g).
#   bash FV4-chain.sh <out> <worktree>          (<out>/builds/fv4 and <out>/builds/fv3 from FV4-build.sh)
set -u
OUT=$1; WT=$2
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; REC=$D/pass-5/FV4-records/battery
mkdir -p "$REC"
for e in ${ENGS:-chromium webkit}; do
  for s in ${STAGES:-main rest dark darkrest}; do
    echo "$(date) start fv4 $e $s · $(uptime)" >> "$REC/chain.log"
    BUILD=fv4 ENG=$e REC=$REC TMIN=90 bash "$H/battery.sh" "$OUT" $s >> "$REC/chain-fv4-$e.log" 2>&1
    echo "$(date) end fv4 $e $s exit $? · $(uptime)" >> "$REC/chain.log"
  done
done
BUILD=fv4 ENG=chromium REC=$REC WT=$WT bash "$H/battery.sh" "$OUT" extra
echo "CHAIN-DONE $(date)" >> "$REC/chain.log"
