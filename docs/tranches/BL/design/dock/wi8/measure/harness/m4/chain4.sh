#!/usr/bin/env bash
# chain4.sh: MEASURE-4 in order, one guarded run at a time: the pass (pass4.sh), every plant
# (plantrun4.sh), G-14 on the build in both engines (m4/g14.sh), then G-14's restated groups
# under their plants (g14plantrun.sh). Log: logs/m4-chain.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; M="$H/.."; L="$M/logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
rm -rf "$M/rows/m4" "$M/crops-m4"; rm -rf "$M"/rows/plant-*; rm -f "$L"/m4-plant-* "$L"/m4-pass.log "$L"/*.m4.* "$L"/m4-cells.*
echo "== chain start $(date '+%H:%M:%S')" >> "$L/m4-chain.log"
"$H/m4/pass4.sh" all
echo "== pass done $(date '+%H:%M:%S')" >> "$L/m4-chain.log"
P=$(python3 "$H/m4/plants4.py" x list | python3 -c "import json,sys;print(' '.join(k for k in json.load(sys.stdin) if k != 'g4-snap'))")
"$H/m4/plantrun4.sh" $P
echo "== plants done $(date '+%H:%M:%S')" >> "$L/m4-chain.log"
"$H/m4/g14.sh" "$W" build 5413 both
echo "== g14 done $(date '+%H:%M:%S')" >> "$L/m4-chain.log"
"$H/m4/g14plantrun.sh"
echo "== chain done $(date '+%H:%M:%S')" >> "$L/m4-chain.log"
