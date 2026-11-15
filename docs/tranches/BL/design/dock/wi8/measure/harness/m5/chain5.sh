#!/usr/bin/env bash
# chain5.sh: MEASURE-5 in order, one guarded run at a time: the pass (pass5.sh), every plant
# (plantrun5.sh), G-14 on the build in both engines (m5/g14.sh), then G-14's restated groups under
# their plants (m5/g14plantrun.sh). Log: logs/m5-chain.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; M="$H/.."; L="$M/logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
rm -rf "$M/rows/m5" "$M/crops-m5"; rm -rf "$M"/rows/plant5-*; rm -f "$L"/m5-plant-* "$L"/m5-pass.log "$L"/*.m5.* "$L"/m5-cells.*
echo "== chain start $(date '+%H:%M:%S')" >> "$L/m5-chain.log"
"$H/m5/pass5.sh" all
echo "== pass done $(date '+%H:%M:%S')" >> "$L/m5-chain.log"
P=$(python3 "$H/m5/plants5.py" x list | python3 -c "import json,sys;print(' '.join(json.load(sys.stdin)))")
"$H/m5/plantrun5.sh" $P
echo "== plants done $(date '+%H:%M:%S')" >> "$L/m5-chain.log"
"$H/m5/g14.sh" "$W" build 5413 both
echo "== g14 done $(date '+%H:%M:%S')" >> "$L/m5-chain.log"
"$H/m5/g14plantrun.sh"
echo "== chain done $(date '+%H:%M:%S')" >> "$L/m5-chain.log"
