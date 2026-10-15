#!/bin/bash
# H4-chain-c.sh: the fifth entry of the H4 seat (2026-10-15). The fourth entry's H4-chain-b.sh died at its first
# browser launch (every log "browserType.launch: Target page, context or browser has been closed", 13:56-14:00
# Oct 14; kept in H4-records/superseded-entry4/ with the W3, ST-fv2 and FM-head logs those launches overwrote).
# The builds were re-made by H4-build.sh (src unchanged since 2e22ae10). Every run goes through the guard.
#   bash H4-chain-c.sh <out> <stage>      stage: main | rest | dark
set -u
OUT=$1; STAGE=$2
P=$(cd "$(dirname "$0")" && pwd); REC=$P/H4-records
case $STAGE in
main)
  bash "$P/H4-selftest.sh" "$OUT/st8" s8 "W3:pass,lanesnap,lanecancel"
  bash "$P/H4-baseline.sh" "$OUT" "W3" "fv2 bp g head"
  bash "$P/H4-baseline.sh" "$OUT" "ST" "fv2"
  bash "$P/H4-baseline.sh" "$OUT" "FM" "head" ;;
rest) SUB=rest bash "$P/H4-baseline-rest.sh" "$OUT" "W1 W2 W4 W5 W6 W7 W8 R6" "fv2 bp g head" ;;
dark) SUB=dark THEME=dark bash "$P/H4-baseline-rest.sh" "$OUT" "ST FM W1 W3" "fv2 bp g" ;;
esac
echo "$(date) $(uptime)" > "$REC/chainc-$STAGE.txt"
