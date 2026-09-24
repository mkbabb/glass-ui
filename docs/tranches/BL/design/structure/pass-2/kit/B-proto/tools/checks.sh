#!/bin/bash
# checks.sh OUT BASE — the toolchain on the migrated tree; every exit code recorded.
set -uo pipefail
P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-proto; T=$P/tools; OUT=$1; BASE=$2; mkdir -p $OUT; cd $P/wt
F=docs/tranches/BL/design/structure/floor
node $F/graph.mjs --root . > $OUT/graph.json; echo "graph=$?"
node $F/entries.mjs check --root . > $OUT/entries.log; echo "entries=$? $(tail -2 $OUT/entries.log | tr '\n' ' ')"
npx vite build > $OUT/build.log 2>&1; echo "build=$?"
node $F/cascade.mjs verify --baseline $BASE/cascade-H --dist dist > $OUT/cascade-floor.json; echo "cascade-floor=$? $(node -e 'const r=require(process.argv[1]);console.log(r.verdict, r.entries.map(e=>e.key+":"+(e.identical?"=":e.class)).join(" "))' $OUT/cascade-floor.json)"
node $T/cascade-fd4.mjs verify --root . --dist dist --baseline $BASE/cascade-H > $OUT/cascade-fd4.json; echo "cascade-fd4=$? $(node -e 'const r=require(process.argv[1]);console.log(r.verdict)' $OUT/cascade-fd4.json)"
node $F/surface.mjs check --root . > $OUT/surface.log; echo "surface=$? $(tail -1 $OUT/surface.log | cut -c1-220)"
npx vue-tsc --noEmit > $OUT/tsc.log 2>&1; echo "tsc-lib=$?"
npx vue-tsc --noEmit -p tsconfig.test.json > $OUT/tsc-test.log 2>&1; echo "tsc-test=$?"
npm run demo:dist:build > $OUT/demo.log 2>&1; echo "demo=$?"
npm pack --dry-run --json > $OUT/pack.json 2>/dev/null; echo "pack=$? $(node $T/packsize.mjs $OUT/pack.json)"
npm run verify:package > $OUT/verify.log 2>&1; echo "verify=$? $(grep -o '"terminal":"[A-Z]*"' $OUT/verify.log | head -1)"
node $F/gates.mjs --root . > $OUT/gates.log; echo "gates=$?"; cat $OUT/gates.log | cut -c1-60
node scripts/structure/seal.mjs --json $OUT/seal.json > $OUT/seal.log; echo "seal=$? $(tail -1 $OUT/seal.log | cut -c1-60)"
node scripts/structure/seal.mjs --slot-arm exempt --json $OUT/seal-exempt.json > /dev/null; echo "seal-exempt=$?"
node $F/bounds.mjs --root . --json $OUT/bounds.json > /dev/null; echo "bounds=$?"
npx vitest run --reporter=json --outputFile=$OUT/vitest.json > $OUT/vitest.log 2>&1; echo "vitest=$?"
