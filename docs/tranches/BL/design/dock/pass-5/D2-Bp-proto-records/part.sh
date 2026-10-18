#!/bin/bash
# part.sh: the Playwright WebKit witnesses the guard's 90 min cut left unrun (main: CF L1 FM W2 CASES; dark: CF),
# each stage part in its own guarded slot (battery-part.sh). Logs: battery/.
#   bash part.sh <out>
set -u
OUT=$1; P=$(cd "$(dirname "$0")" && pwd); REC=$P/battery
echo "$(date) start part webkit main · $(uptime)" >> "$REC/chain.log"
BUILD=bp ENG=webkit REC=$REC TMIN=90 PSTAGE=main PWIT="CF L1 FM W2 CASES" bash "$P/battery-part.sh" "$OUT" part >> "$REC/chain-bp-webkit.log" 2>&1
echo "$(date) end part webkit main exit $? · $(uptime)" >> "$REC/chain.log"
echo "$(date) start part webkit dark · $(uptime)" >> "$REC/chain.log"
BUILD=bp ENG=webkit REC=$REC TMIN=90 PSTAGE=dark PTHEME=dark PWIT="CF" bash "$P/battery-part.sh" "$OUT" part >> "$REC/chain-bp-webkit.log" 2>&1
echo "$(date) end part webkit dark exit $? · $(uptime)" >> "$REC/chain.log"
echo "PART-DONE $(date)" >> "$REC/chain.log"
