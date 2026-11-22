#!/usr/bin/env bash
# proto14.sh: MEASURE-8 part M, question 14's prototype frames on the tip. S7's second-round prototype (s8/ru61b.py,
# form arith: the margin from the extents RU-35 holds, no read of the root after it moves) applied to the measure's tree
# of the tip only, pm/ownerm.mjs --label proto --only q14 read on the tree's dev server (5404) in both engines, the
# prototype reverted (also on exit) and the tree's src checked against HEAD. It never joins the source (question 14's
# default: no overlay in 11.2.0). Log: logs/pm-proto14.log; frames in logs/pm-owner/.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.pm-tip; G=~/.claude/guard/guarded
F="$T/src/components/dock/composables/useDockBody.ts"
revert() { [ -f "$F.s8-orig" ] && python3 "$H/s8/ru61b.py" "$T" arith revert >> "$L/pm-proto14.log" 2>&1; }
trap revert EXIT INT TERM
echo "== proto14 $(date '+%F %T') (load $(sysctl -n vm.loadavg))" > "$L/pm-proto14.log"
python3 "$H/s8/ru61b.py" "$T" arith apply >> "$L/pm-proto14.log" 2>&1 || exit 2
sleep 4
cd "$H"
$G --timeout 20 -- node pm/ownerm.mjs 5404 ../logs/pm-owner --engine chromium --label proto --only q14 >> "$L/pm-proto14.log" 2>&1; echo "chromium rc=$?" >> "$L/pm-proto14.log"
$G --exclusive webkit --timeout 25 -- node pm/ownerm.mjs 5404 ../logs/pm-owner --engine webkit --label proto --only q14 >> "$L/pm-proto14.log" 2>&1; echo "webkit rc=$?" >> "$L/pm-proto14.log"
revert
python3 "$H/pm/clean.py" "$T" >> "$L/pm-proto14.log" 2>&1 || exit 3
echo "== done $(date '+%F %T')" >> "$L/pm-proto14.log"
