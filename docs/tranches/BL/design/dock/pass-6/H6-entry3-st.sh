#!/bin/bash
# H6-entry3-st.sh (entry 3): ST again in Playwright WebKit on the three (build, theme) sets whose every ST cell read
# UNMEASURED by H6-4's scale rule on 2026-10-19 (video scale 0.981-0.983), after bp dark read 1.002-1.003 on 2026-10-20.
# One --exclusive webkit slot; records under H6-records/st-e3/ (the baseline's battery/json is left as it is).
#   bash H6-entry3-st.sh <out>
set -u
OUT=$1; P=$(cd "$(dirname "$0")" && pwd); D=$P/..; H=$D/harness; REC=$P/H6-records/st-e3; AD=$D/pass-3/adapter-floor-v2.mjs
mkdir -p "$REC"; export H OUT REC AD
one() { # build theme
  local o="$OUT/webkit-st-e3/$1-$2" log="$REC/$1-$2-ST-webkit.log"
  (uptime; if [ "$2" = dark ]; then DOCK_HARNESS_THEME=dark node "$H/stall.mjs" --build "$OUT/builds/$1" --adapter "$AD" --out "$o" --engine webkit; else node "$H/stall.mjs" --build "$OUT/builds/$1" --adapter "$AD" --out "$o" --engine webkit; fi; echo "exit $?"; uptime) > "$log" 2>&1
  mkdir -p "$REC/json/$1-$2"; find "$o" -name ST.json -exec cp {} "$REC/json/$1-$2/" \;
}
export -f one
echo "$(date) queued · $(uptime)" >> "$REC/slot.log"
~/.claude/guard/guarded --exclusive webkit --timeout 60 -- bash -c 'echo "$(date) admitted · $(uptime)" >> "$REC/slot.log"; one fv4 light; one fv4 dark; one bp light'
echo "$(date) end exit $? · $(uptime)" >> "$REC/slot.log"
echo "ST-E3-DONE $(date)" > "$REC/done.txt"
