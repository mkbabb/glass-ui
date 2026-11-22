#!/usr/bin/env bash
# withplant.sh <plants> <log> <cmd>: MEASURE-9 part H's counter-test frame. Applies m9/plant9.py's <plants> (names joined
# by `+`) to .m9-tip, whose dev server (runq9.py's `plant`, 127.0.0.1:5444, VITE_DOCK_HOLD=1) reads the tree's src live,
# (`none`: the tree as it is, the tip on the dev server) runs <cmd> from the harness directory (its browser runs guard themselves, m9/g.sh), reverts (also on exit), and checks
# the tree's src equals HEAD (pm/clean.py). Appends to <log>; exits 3 when the tree is not clean after.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.m9-tip
P="$1"; LOG="$2"; CMD="$3"
revert() { if [ -d "$T/.m9-orig/$P" ]; then python3 "$H/m9/plant9.py" "$T" "$P" revert >> "$LOG" 2>&1; fi; }
trap revert EXIT INT TERM
echo "== $P $(date '+%F %T') (load $(sysctl -n vm.loadavg))" >> "$LOG"
if [ "$P" != none ]; then python3 "$H/m9/plant9.py" "$T" "$P" apply >> "$LOG" 2>&1 || { echo "apply failed" >> "$LOG"; trap - EXIT; exit 0; }; fi
sleep 4
(cd "$H" && sh -c "$CMD") >> "$LOG" 2>&1
echo "cmd rc=$?" >> "$LOG"
revert; trap - EXIT INT TERM
python3 "$H/pm/clean.py" "$T" >> "$LOG" 2>&1 || { echo "TREE NOT CLEAN after $P" >> "$LOG"; exit 3; }
echo "== done $P $(date '+%F %T')" >> "$LOG"
