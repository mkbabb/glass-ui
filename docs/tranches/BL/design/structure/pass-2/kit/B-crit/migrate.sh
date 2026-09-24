#!/bin/bash
# migrate.sh OUT — the B migration from the frozen lists and rows, in the order it ran. Every
# move goes through the floor engine (move.mjs); every content edit is an all-or-nothing row.
set -euo pipefail
P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-proto; T=$P/tools; FR=$P/frozen; OUT=$1; mkdir -p $OUT; cd /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-crit/wt
F=docs/tranches/BL/design/structure/floor
mv1(){ node $F/move.mjs $FR/$1 --root . --out $OUT/$1.move.json > $OUT/$1.move.log || { cat $OUT/$1.move.log; exit 1; }; echo "move $1 $(node -e 'const r=require(process.argv[1]);console.log(JSON.stringify({ok:r.ok,pending:r.pending,applied:r.alreadyApplied,filesEdited:r.filesEdited,rewrites:r.rewrites,residue:(r.residue||[]).length,lost:(r.image?.lost||[]).length,gained:(r.image?.gained||[]).length,edges:r.image?r.image.edgesBefore+"->"+r.image.edgesAfter:null}))' $OUT/$1.move.json)"; }
row1(){ node $T/apply-row.mjs $FR/$1 --root . > $OUT/$1.row.log || { cat $OUT/$1.row.log; exit 1; }; echo "row  $1 $(cat $OUT/$1.row.log)"; }
mv_(){ mv1 "$1"; if [ "${TWICE:-0}" = 1 ]; then mv1 "$1"; fi; }
row(){ row1 "$1"; if [ "${TWICE:-0}" = 1 ]; then row1 "$1"; fi; }
if [ "${SKIP_S1:-0}" = 1 ]; then echo "S1 floor rows: skipped (rows/apply.mjs is not re-runnable)"; else node $F/rows/apply.mjs --root . > $OUT/S1.log; echo "S1 floor rows: $(tail -1 $OUT/S1.log)"; fi
mv_ S2-pass-1.json; mv_ S2-pass-2.json; mv_ S2-pass-3.json
mv_ S3-carve.json
row S5-doors-1.json
row S6-unrelay.json
row S7-split.json
mv_ S4-dock-css.json; row S4b-dock-css-doors.json
mv_ S4c-agg-tokens.json; mv_ S4c-agg-typography.json; mv_ S4c-agg-utilities.json
mv_ S4d-tokens-moves.json; row S4d-tokens-doors.json
mv_ S4e-glass-moves.json; row S4e-glass-doors.json
mv_ S4f-styles-moves.json; row S4f-styles-doors.json
mv_ S4i-tokens-entry.json; row S4j-tokens-door.json
mv_ S4k-deck-door.json; row S4l-css-doors.json
row S5b-trim.json
# B-S17: the gate lands with its frozen pin and its npm test wiring
mkdir -p scripts/structure
cp $T/structure/index.mjs $T/structure/seal.mjs $FR/seal-pin.json scripts/structure/
cp $T/wire/seal.test.ts tests/gates/seal.test.ts
echo "S17 gate landed"
row S18-ratchet.json
node $T/digest.mjs . | tee $OUT/digest.json
