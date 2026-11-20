#!/bin/sh
# Drill each named spec, one guarded run each. usage: sh drill.sh <chromium|webkit> <frameDir> <spec>...
# WebKit: launch this script only via  guarded --exclusive webkit -- sh drill.sh webkit ...  (it then runs node directly)
set -u
E="$1"; FR="$2"; shift 2
for s in "$@"; do
  n=$(basename "$s" .json)
  if [ "$E" = webkit ]; then node drill.mjs webkit "specs/$n.json" "../data/drill-$n-webkit.json" "$FR" 2>&1 | grep -E '^ok|Error' | cut -c1-300
  else ~/.claude/guard/guarded --timeout 8 -- node drill.mjs chromium "specs/$n.json" "../data/drill-$n-chromium.json" "$FR" 2>&1 | grep -E '^ok|Error|REFUS' | cut -c1-300; fi
done
