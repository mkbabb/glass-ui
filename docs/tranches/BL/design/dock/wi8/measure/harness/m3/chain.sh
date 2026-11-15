#!/usr/bin/env bash
# chain.sh: MEASURE-3 in order, one guarded run at a time: the pass (pass.sh), every plant
# (plantrun.sh), then G-14 on the build and on the master snapshot (g14.sh). Log: logs/m3-chain.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; M="$H/.."; L="$M/logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
rm -rf "$M/rows/m3" "$M/crops-m3"; rm -rf "$M"/rows/plant-*; rm -f "$L"/m3-* "$L"/clock2.m3.* "$L"/*.m3.*
echo "== chain start $(date '+%H:%M:%S')" >> "$L/m3-chain.log"
"$H/m3/pass.sh" all
echo "== pass done $(date '+%H:%M:%S')" >> "$L/m3-chain.log"
P=$(python3 "$H/m3/plants.py" x list | python3 -c "import json,sys;print(' '.join(json.load(sys.stdin)))")
"$H/m3/plantrun.sh" $P
echo "== plants done $(date '+%H:%M:%S')" >> "$L/m3-chain.log"
"$H/m3/g14.sh" "$W" build 5403
"$H/m3/g14.sh" "$W/.base-master" base 5404
echo "== chain done $(date '+%H:%M:%S')" >> "$L/m3-chain.log"
