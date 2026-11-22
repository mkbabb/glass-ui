#!/usr/bin/env bash
# h3unit.sh: MEASURE-8 part M, m8/h3unit.sh on the measure's tree of the tip (.pm-tip, pm/plant.py), never the worktree.
# G-1 (f)'s unit witness (GlassDock.posture.test.ts, the G-1 describe: the test with the tap's FocusEvent on the seat and
# with no event) on the tip, then under each of its two plants (g1-presshold, g1-frompress) and RULINGS-4's retired plant
# (g1-lift), each reverted after and the tree's src checked against HEAD. Log: logs/pm-h3-unit.txt.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs/pm-h3-unit.txt"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.pm-tip; G=~/.claude/guard/guarded
tmp="$L.part"
run() { echo "== $1 $(date '+%F %T') (load $(sysctl -n vm.loadavg))" >> "$tmp"; (cd "$T" && $G --light --timeout 10 -- node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.posture.test.ts -t "G-1" --maxWorkers=2 --reporter=verbose 2>&1 | grep -E "✓|×|✗|FAIL|Tests |AssertionError|expected" | head -20) >> "$tmp"; }
: > "$tmp"
run tip
for p in g1-presshold g1-frompress g1-lift; do
  python3 "$H/pm/plant.py" "$T" $p apply >> "$tmp" 2>&1
  run "plant $p"
  python3 "$H/pm/plant.py" "$T" $p revert >> "$tmp" 2>&1
  python3 "$H/pm/clean.py" "$T" >> "$tmp" 2>&1 || { echo "TREE NOT CLEAN after $p" >> "$tmp"; mv "$tmp" "$L"; exit 3; }
done
echo "== done" >> "$tmp"; mv "$tmp" "$L"
