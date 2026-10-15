#!/bin/bash
# H4-chain-e.sh: the last two stages of entry 5's chain (H4-chain-d.sh rest2 + dark) in ONE guarded admission. The
# second admission (rest1) waited over 80 min for a guard slot (Oct 15 14:50-16:11+, load 84-143), so the remaining
# light witnesses and the dark theme share one. Same scripts, same re-run rule.
#   bash H4-chain-e.sh <out>
set -u
OUT=$1
P=$(cd "$(dirname "$0")" && pwd); REC=$P/H4-records
"$HOME/.claude/guard/guarded" --timeout ${TMIN:-300} -- env GUARD= bash -c "SUB=rest bash '$P/H4-baseline-rest.sh' '$OUT' 'W5 W6 W7 W8 R6' 'fv2 bp g head'; SUB=dark THEME=dark bash '$P/H4-baseline-rest.sh' '$OUT' 'ST FM W1 W3' 'fv2 bp g'"
echo "exit $? · $(date) $(uptime)" > "$REC/chaine-tail.txt"
(cd "$OUT" && find . -name '[A-Z]*.json' -path '*runs*' | while read -r f; do mkdir -p "$REC/json/$(dirname "$f")"; cp "$f" "$REC/json/$f"; done)
