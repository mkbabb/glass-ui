#!/bin/sh
# verify.sh <tree> <mirror> <out> [--gate] — run the tests-visual chain on a linked worktree,
# in the order the route lands it, and read every check. <tree> is the arm (HEAD + floor rows,
# or the route's replayed tree); <mirror> is a second linked worktree this script overwrites
# with <tree>'s pre-row files (the base rebase.mjs --check reads); <out> takes the derived
# rows and logs. Each step exits non-zero on a miss, and the script stops there.
#   1. carve.mjs      the program row (config, tsconfig.test.json, R-8 deletion, the slotted
#                     spec) and the carve's move list
#   2. rebase --split the moves the engine can respell, and the ones it cannot (residue) or
#                     respells wrong (carve.json rowMoves)
#   3. move.mjs       the engine list, through the tree's own floor engine (image + FD-5)
#   4. rebase --row   the rest as one exact-text row; --check reads its image and FD-5
#   5. split.mjs      B-S11's splits, in place in their modules (parsed before any write);
#                     conserve.mjs reads every source line into the outputs (<mirror> holds
#                     the tree before the split)
#   6. cite.mjs       the comments citing a carved file by its old path (shipped ones in
#                     their own row, P4-R3)
#   7. gate.json      with --gate: the proposed seal-gate row (TEST_FILE, program patterns)
set -e
set -o pipefail
KIT=$(cd "$(dirname "$0")" && pwd)
ROW_LIB=$(cd "$KIT/../../../../../pass-4/B-kit/lib" && pwd)/row.mjs
WT=$1; MIRROR=$2; OUT=$3; GATE=$4
SPLITS=${SPLITS:-$KIT/splits.json}   # an arm whose tree lacks a split source passes a spec without it
mkdir -p "$OUT"
apply() { node --input-type=module -e "import { applyRow } from '$ROW_LIB'; import { readFileSync } from 'node:fs'; console.log(JSON.stringify(applyRow('$WT', JSON.parse(readFileSync('$1', 'utf8')))));"; }
cd "$WT"
node "$KIT/carve.mjs" --root "$WT" --carve "$KIT/carve.json" --splits "$SPLITS" --out-program "$OUT/program-row.json" --out-moves "$OUT/moves.json" | tee "$OUT/carve.log"
apply "$OUT/program-row.json"
node scripts/structure/graph.mjs --quiet | grep '"violations": 0,'
node "$KIT/rebase.mjs" --root "$WT" --carve "$KIT/carve.json" --moves "$OUT/moves.json" --split --out-moves "$OUT/moves-engine.json" --out-residue "$OUT/moves-row.json"
node scripts/structure/move.mjs "$OUT/moves-engine.json" --root "$WT" --out "$OUT/move-report.json" > "$OUT/move.log"
node -e 'const r=require(process.argv[1]); console.log(JSON.stringify({ok:r.ok,pending:r.pending,filesEdited:r.filesEdited,rewrites:r.rewrites,residue:r.residue.length,image:{before:r.image.edgesBefore,after:r.image.edgesAfter,lost:r.image.lost.length,gained:r.image.gained.length},classified:r.classified.counts,violations:r.violations.length,sccGrown:r.scc.grown.length})); if(!r.ok) process.exit(1)' "$OUT/move-report.json"
rsync -a --delete --exclude .git --exclude node_modules --exclude dist --exclude demo/dist "$WT/" "$MIRROR/"
node "$KIT/rebase.mjs" --root "$WT" --carve "$KIT/carve.json" --moves "$OUT/moves-row.json" --row --out-row "$OUT/rebase-row.json"
apply "$OUT/rebase-row.json"
node "$KIT/rebase.mjs" --root "$WT" --carve "$KIT/carve.json" --moves "$OUT/moves-row.json" --check --base "$MIRROR" --applied "$OUT/rebase-row.json" | tee "$OUT/rebase-check.log"
rsync -a --delete --exclude .git --exclude node_modules --exclude dist --exclude demo/dist "$WT/" "$MIRROR/"
node "$KIT/split.mjs" --root "$WT" --spec "$SPLITS" --out "$OUT/split-row.json" --apply | tee "$OUT/split.log"
node "$KIT/conserve.mjs" --row "$OUT/split-row.json" --spec "$SPLITS" --root "$MIRROR" | tee "$OUT/conserve.log"
node "$KIT/cite.mjs" --root "$WT" --carve "$KIT/carve.json" --out "$OUT/cite-row.json" --out-shipped "$OUT/cite-shipped-row.json"
apply "$OUT/cite-row.json"
apply "$OUT/cite-shipped-row.json"
if [ "$GATE" = "--gate" ]; then apply "$KIT/gate.json"; fi
node scripts/structure/graph.mjs --quiet | grep -E '"edges"|"violations"'
node scripts/structure/graph.mjs --quiet | grep '"violations": 0,' > /dev/null
(cd tests-visual && npx playwright test --list --reporter=list > "$OUT/list.txt" 2>&1; tail -1 "$OUT/list.txt")
for f in program-row moves-engine moves-row rebase-row split-row cite-row cite-shipped-row; do shasum -a 256 "$OUT/$f.json" | sed "s|$OUT/||"; done
