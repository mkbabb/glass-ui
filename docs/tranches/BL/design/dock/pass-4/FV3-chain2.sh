#!/bin/bash
# FV3-chain2.sh: the FLOOR-V3 seat's second chain (redeploy, 2026-10-15): the floor-v2 control on the light
# set H4 did not run, the N-8 probe on floor v2, then the dark set on floor v3. Serial: one heavy run at a time.
#   bash FV3-chain2.sh <out>
P=$(cd "$(dirname "$0")" && pwd); OUT=$1
CTRL_W='W1 W2 W4 W5 W6 W7 W8 R6' bash "$P/FV3-run.sh" "$OUT" ctrl
N8B=fv2 bash "$P/FV3-run.sh" "$OUT" n8
bash "$P/FV3-run.sh" "$OUT" dark
echo "CHAIN2-DONE $(date) $(uptime)" > "$P/FV3-records/chain2.txt"
