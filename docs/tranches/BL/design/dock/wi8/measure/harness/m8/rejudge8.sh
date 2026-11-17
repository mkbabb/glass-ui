#!/usr/bin/env bash
# rejudge8.sh <rows-dir-name> <log-tag> [engine...]: MEASURE-8 H1, judge8.mjs over a pass's probe rows (the files m7/analyse8.sh
# hands judge7: p3- to p6- rows less the seat, overlay and p6- cells), then m4/gates4.mjs on its JSON. No browser.
# Logs: logs/<tag>-judge8-<engine>.txt|json, logs/<tag>-gates8-<engine>.txt.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; R="$H/../rows/$1"; L="$H/../logs"; T="$2"; shift 2
for E in ${*:-chromium webkit}; do
  all=$(ls "$R"/p[3456]-*.wi8.$E.*.rows.json* 2>/dev/null) || { echo "no rows for $E in $R"; continue; }
  F=$(echo "$all" | grep -vE -- "/p[3456]-seat-|-overlay-|/p6-")
  node "$H/m8/judge8.mjs" $F > "$L/$T-judge8-$E.txt"
  node "$H/m8/judge8.mjs" $F --json > "$L/$T-judge8-$E.json"
  node "$H/m4/gates4.mjs" "$L/$T-judge8-$E.json" > "$L/$T-gates8-$E.txt"
  echo "$E: $(grep -c . "$L/$T-judge8-$E.txt") segments"
done
