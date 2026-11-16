#!/usr/bin/env bash
# chain6.sh: MEASURE-6 steps 5 to 7 after the token commits. The whole pass on one build (pass6.sh), G-14 in the three
# projects (m5/g14.sh, tag m6, against master's snapshot by m6/g14cmp.py), every plant on the dev server
# (devserve.sh + plantrun6.sh) and G-14's restated groups under their plants (m5/g14plantrun.sh), then the owner's
# frames (m6/owner.mjs, m5/many-strip.mjs) on the pass's build. Log: logs/m6-chain.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
c() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m6-chain.log"; }
c "pass"; "$H/m6/pass6.sh" all
c "owner frames"; (cd "$H" && for E in chromium webkit; do X=""; [ $E = webkit ] && X="--exclusive webkit"; $G $X --timeout 40 -- ./session2.sh sh -c "node m6/owner.mjs 5401 ../owner-m6 --engine $E ${PLATE:+--plate $PLATE}; node m5/many-strip.mjs 5401 ../owner-m6 $E" > "$L/m6-owner-$E.log" 2>&1; done)
rm -rf "$W/dist-wi8"
c "g14"; "$H/m5/g14.sh" "$W" m6 5413 both; python3 "$H/m6/g14cmp.py" "$L" m6 > "$L/m6-g14cmp.txt" 2>&1
c "plants"; ALLP=($(python3 "$H/m6/plants6.py" x list | python3 -c 'import json,sys;print(" ".join(json.load(sys.stdin)))'))
# the dev server is clamped to 90 min by the guard: one server per eight plants
for ((k=0; k<${#ALLP[@]}; k+=8)); do
  rm -f "$L/m6-devserve.log"; (cd "$H" && $G --light --timeout 88 -- "$H/m6/devserve.sh" 5402 86 > "$L/m6-devserve.log" 2>&1 &)
  for i in $(seq 1 300); do grep -q "dev up" "$L/m6-devserve.log" 2>/dev/null && break; sleep 2; done
  "$H/m6/plantrun6.sh" "${ALLP[@]:k:8}"
  pkill -f "m6/devserve.sh 5402"; sleep 3; pkill -f "port 5402 --strictPort"
done
c "g14 plants"; "$H/m5/g14plantrun.sh"
c "done"
