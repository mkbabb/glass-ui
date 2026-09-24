#!/bin/bash
# baseline.sh OUT — HEAD measures in a fresh worktree: build, cascade baselines (floor + FD-4),
# surface, bounds, the gate RED at HEAD (law installed, measured, removed), demo build, vitest.
set -uo pipefail
P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-proto; T=$P/tools; OUT=$1; mkdir -p $OUT; cd $P/wt
F=docs/tranches/BL/design/structure/floor; H=$(git rev-parse --short HEAD)
npx vite build > $OUT/H-build.log 2>&1; echo "H build=$?"
node $F/cascade.mjs snapshot --dist dist --out $OUT/cascade-H --sha $H > $OUT/H-cascade.log; echo "H floor-snapshot=$? $(cat $OUT/H-cascade.log)"
node $T/cascade-fd4.mjs snapshot --root . --dist dist --out $OUT/cascade-H --sha $H > $OUT/H-fd4.log; echo "H fd4-snapshot=$? $(cat $OUT/H-fd4.log)"
node $F/surface.mjs check --root . > $OUT/H-surface.log; echo "H surface=$?"
node $F/graph.mjs --root . > $OUT/H-graph.json; echo "H graph=$?"
node $F/bounds.mjs --root . --json $OUT/H-bounds.json > /dev/null; echo "H bounds=$?"
mkdir -p scripts/structure && cp $T/structure/index.mjs $T/structure/seal.mjs scripts/structure/
node scripts/structure/seal.mjs --no-pin --json $OUT/H-seal.json --write-pin $OUT/H-pin.json > $OUT/H-seal.log; echo "H seal=$? $(tail -1 $OUT/H-seal.log | cut -c1-80)"
node scripts/structure/seal.mjs --no-pin --slot-arm exempt --json $OUT/H-seal-exempt.json > /dev/null; echo "H seal-exempt=$?"
rm -rf scripts/structure
npm run demo:dist:build > $OUT/H-demo.log 2>&1; echo "H demo=$?"
npx vitest run --reporter=json --outputFile=$OUT/H-vitest.json > $OUT/H-vitest.log 2>&1; echo "H vitest=$?"
git status --short | grep -v node_modules | wc -l | xargs echo "H dirty-after-baseline:"
