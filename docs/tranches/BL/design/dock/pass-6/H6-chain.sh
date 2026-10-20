#!/bin/bash
# H6-chain.sh: the H6 baseline (D2 pass 6, H6): floor v4 and B′ on the 38 rows under H6, both engines, both themes.
#   bash H6-chain.sh <out> [builds…]          (default: fv4 bp)
# Every theme of every build is ONE battery.sh `theme` slot (H6-10): Chromium first (a guarded slot each), then
# Playwright WebKit (an --exclusive webkit slot each, queued on the machine-wide lock). One heavy run at a time.
# Records: H6-records/battery/ (stage logs, re-runs, json/, slots.log, chain.log). ENGS / THEMES narrow a resume.
set -u
OUT=$1; shift
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; REC=$D/pass-6/H6-records/battery
mkdir -p "$REC"
for e in ${ENGS:-chromium webkit}; do for b in ${@:-fv4 bp}; do for t in ${THEMES:-light dark}; do
  echo "$(date) start $b $e $t · $(uptime)" >> "$REC/chain.log"
  BUILD=$b ENG=$e REC=$REC THEME=$t TMIN=90 bash "$H/battery.sh" "$OUT" theme >> "$REC/chain-$b-$e.log" 2>&1
  echo "$(date) end $b $e $t exit $? · $(uptime)" >> "$REC/chain.log"
done; done; done
echo "CHAIN-DONE $(date)" >> "$REC/chain.log"
