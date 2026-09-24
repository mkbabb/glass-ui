#!/bin/bash
# run-r.sh OUT [baseline] — one full replay: fresh worktree at HEAD, [HEAD baseline], migration, checks, plants.
set -uo pipefail
P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-proto; T=$P/tools; OUT=$1
mkdir -p $OUT; date +%T
echo "fresh HEAD=$($T/fresh.sh)"
if [ "${2:-}" = baseline ]; then $T/baseline.sh $OUT; date +%T; fi
$T/migrate.sh $OUT || { echo "MIGRATE FAILED"; exit 1; }
date +%T
if [ "${2:-}" = baseline ]; then $T/checks.sh $OUT $OUT; date +%T
  (cd $P/wt && node $T/plants.mjs --root . --out $OUT/plants.json | tail -3); fi
date +%T
