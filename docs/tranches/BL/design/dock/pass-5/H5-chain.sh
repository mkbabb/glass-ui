#!/bin/bash
# H5-chain.sh: the pass-5 baseline under H5 (D2 pass 5). For each build and engine, the four battery stages
# (harness/battery.sh main, rest, dark, darkrest), EACH in its own guarded slot (Playwright WebKit under
# --exclusive webkit, re-queued per stage, so no slot outlives the 90-min clamp); then the adapter law per build.
# Chromium for every build, then Playwright WebKit for every build. One run at a time. Logs: H5-records/battery/.
#   bash H5-chain.sh <out> [<build>…]      (<out>/builds/<label> from H5-build.sh)
set -u
OUT=$1; shift
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; REC=$D/pass-5/H5-records/battery
mkdir -p "$REC"
BUILDS=${@:-head fv3 bp g}
for e in ${ENGS:-chromium webkit}; do   # every Chromium stage first: the machine-wide WebKit lock is the long queue
  for b in $BUILDS; do
    for s in ${STAGES:-main rest dark darkrest}; do
      echo "$(date) start $b $e $s · $(uptime)" >> "$REC/chain.log"
      BUILD=$b ENG=$e REC=$REC TMIN=90 bash "$H/battery.sh" "$OUT" $s >> "$REC/chain-$b-$e.log" 2>&1
      echo "$(date) end $b $e $s exit $? · $(uptime)" >> "$REC/chain.log"
    done
  done
done
for b in $BUILDS; do BUILD=$b ENG=chromium REC=$REC NOGUARD=1 bash "$H/battery.sh" "$OUT" extra; done
echo "CHAIN-DONE $(date)" >> "$REC/chain.log"
