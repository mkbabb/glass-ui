#!/usr/bin/env bash
# h3unit.sh: MEASURE-8 H3 (RU-73, C7-M12). G-1 (f)'s unit witness (GlassDock.posture.test.ts, the G-1 describe: the
# test with the tap's FocusEvent on the seat and with no event) on the current build, then under each of its two plants
# (m8/plants8.py g1-presshold, g1-frompress) and under RULINGS-4's retired plant (g1-lift), each reverted after, the
# source checked clean. Log: logs/m8-h3-unit.txt.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs/m8-h3-unit.txt"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
run() { echo "== $1 $(date '+%H:%M:%S') (load $(sysctl -n vm.loadavg))" >> "$L"; (cd "$W" && $G --light --timeout 10 -- node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.posture.test.ts -t "G-1" --maxWorkers=2 --reporter=verbose 2>&1 | grep -E "✓|×|✗|FAIL|Tests |AssertionError|expected" | head -20) >> "$L"; }
: > "$L"
run build
for p in g1-presshold g1-frompress g1-lift; do
  python3 "$H/m8/plants8.py" $p apply >> "$L" 2>&1
  run "plant $p"
  python3 "$H/m8/plants8.py" $p revert >> "$L" 2>&1
  (cd "$W" && git diff --quiet -- src) || { echo "SOURCE NOT CLEAN after $p" >> "$L"; exit 3; }
done
echo "== done" >> "$L"
