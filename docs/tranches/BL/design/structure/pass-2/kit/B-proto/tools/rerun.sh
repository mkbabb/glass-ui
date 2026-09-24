#!/bin/bash
# rerun.sh OUT — on a migrated worktree: every frozen list and row applied a second time
# (each must report already-applied, tree digest unchanged), then one placement pass over the
# migrated tree (it must apply 0 moves).
set -uo pipefail
P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-proto; T=$P/tools; OUT=$1; mkdir -p $OUT; cd $P/wt
node $T/digest.mjs . > $OUT/digest-before-rerun.json
SKIP_S1=1 $T/migrate.sh $OUT/rerun > $OUT/rerun.log 2>&1; echo "rerun migrate=$?"
grep -E '^(move|row)' $OUT/rerun.log | grep -vc '"pending":0\|"written":0' | xargs echo "steps that wrote on rerun:"
node $T/digest.mjs . > $OUT/digest-after-rerun.json
cmp -s <(node -e 'const r=require(process.argv[1]);console.log(r.codeDigest)' $OUT/digest-before-rerun.json) <(node -e 'const r=require(process.argv[1]);console.log(r.codeDigest)' $OUT/digest-after-rerun.json) && echo "code digest unchanged by rerun" || echo "CODE DIGEST CHANGED"
cp $P/frozen/holds.json $OUT/holds.json
node $T/place-pass.mjs --root . --out $OUT/replace-pass.json --holds $OUT/holds.json
node $T/digest.mjs . > $OUT/digest-after-place.json; cat $OUT/digest-after-place.json
