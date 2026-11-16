#!/usr/bin/env bash
# lines.sh <ref> [...]: MEASURE-7, RU-63's line count, read from a git ref (no checkout): `wc -l` of every .ts, .vue and
# .css under src/components/dock, tests and README aside; then useDockBody.ts's own count, and the lines a ref adds
# outside the directory in the two files the cures touch (_shared/overlay/participation.ts, the tooltip directory)
# against v11.0.2.
set -u
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
cnt() { local n=0 f; for f in $(git -C "$W" ls-tree -r --name-only "$1" -- "$2" | grep -E '\.(ts|vue|css)$' | grep -vE '\.test\.ts$|/__tests__/'); do n=$((n + $(git -C "$W" show "$1:$f" | wc -l))); done; echo $n; }
for r in "$@"; do
  d=$(cnt "$r" src/components/dock); b=$(git -C "$W" show "$r:src/components/dock/composables/useDockBody.ts" 2>/dev/null | wc -l | tr -d ' ')
  p=$(git -C "$W" show "$r:src/components/_shared/overlay/participation.ts" 2>/dev/null | wc -l | tr -d ' '); p0=$(git -C "$W" show "v11.0.2:src/components/_shared/overlay/participation.ts" | wc -l | tr -d ' ')
  t=$(cnt "$r" src/components/tooltip); t0=$(cnt v11.0.2 src/components/tooltip)
  echo "$r: dock $d lines; useDockBody.ts $b; participation.ts $p (v11.0.2 $p0); tooltip $t (v11.0.2 $t0)"
done
