#!/bin/bash
# chain.sh: H5 on the D2-G prototype (pass 5). The battery's four stages (harness/battery.sh main, rest, dark,
# darkrest), each in its own guarded slot, Chromium first, then Playwright WebKit (--exclusive webkit, inside
# battery.sh); then PR + the adapter law (extra). One run at a time. Builds: <out>/builds/g (the worktree) and
# <out>/builds/fv3 (L1's reference: HEAD + pass-4/floor-v3.patch, built from an extracted tree under <out>).
#   bash chain.sh <out> <worktree>
set -u
OUT=$1; WT=$2
D=$(cd "$(dirname "$0")/../.." && pwd); H=$D/harness; REC=$D/pass-5/D2-G-proto-records/battery-g3
mkdir -p "$REC"
for e in ${ENGS:-chromium webkit}; do
  for s in ${STAGES:-main rest dark darkrest}; do
    echo "$(date) start g $e $s · $(uptime)" >> "$REC/chain.log"
    BUILD=g ENG=$e REC=$REC TMIN=90 bash "$H/battery.sh" "$OUT" $s >> "$REC/chain-g-$e.log" 2>&1
    echo "$(date) end g $e $s exit $? · $(uptime)" >> "$REC/chain.log"
  done
done
[ -z "${NOEXTRA:-}" ] && BUILD=g ENG=chromium REC=$REC WT=$WT bash "$H/battery.sh" "$OUT" extra
echo "CHAIN-DONE $(date)" >> "$REC/chain.log"
