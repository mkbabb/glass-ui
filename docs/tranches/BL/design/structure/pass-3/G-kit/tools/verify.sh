#!/bin/sh
# verify.sh <replayed worktree> <out dir> — the P2-6.4 bar on a tree replay.sh left on the final
# digest: build, both vue-tsc programs, demo build, F-3 entries check, the surface pin, the four
# floor gates, the D1-G gate, npm test (vitest; the gate's clauses are its `it`s), and the F-4
# move-only cascade verifier against a base built in a second fresh worktree. Every command's
# exit code goes to <out>/status; the browser seat (F-10) is run separately, since it waits on
# the machine lock. Nothing here writes outside the two worktrees and <out>.
set -u
WT=$1; OUT=$2; mkdir -p "$OUT"
KIT=$(cd "$(dirname "$0")/.." && pwd)
REPO=$(git -C "$KIT" rev-parse --show-toplevel)
: > "$OUT/status"
run() { name=$1; shift; (cd "$WT" && "$@") > "$OUT/$name.log" 2>&1; echo "$name $?" >> "$OUT/status"; }
run build npx vite build
run tsc-app npx vue-tsc --noEmit
run tsc-test npx vue-tsc --noEmit -p tsconfig.test.json
run demo npm run demo:dist:build
run entries node scripts/structure/entries.mjs check
run surface node scripts/structure/surface.mjs check
run gates node scripts/structure/gates.mjs
run eponym node scripts/structure/eponym/eponym.mjs --json "$OUT/eponym.json"
run vitest npx vitest run --reporter=json --outputFile="$OUT/vitest.json"
run bounds node scripts/structure/bounds.mjs
BASE="$WT-base"
if [ -e "$BASE" ]; then git -C "$REPO" worktree remove --force "$BASE"; fi
git -C "$REPO" worktree add --detach "$BASE" HEAD >/dev/null 2>&1
ln -s "$REPO/node_modules" "$BASE/node_modules"; ln -s "$REPO/tests-visual/node_modules" "$BASE/tests-visual/node_modules"
node "$REPO/docs/tranches/BL/design/structure/floor/rows/apply.mjs" --root "$BASE" > /dev/null
(cd "$BASE" && npx vite build > "$OUT/base-build.log" 2>&1 && node scripts/structure/cascade.mjs snapshot --dist dist --out "$OUT/cascade-base" --sha base > /dev/null)
run cascade node scripts/structure/cascade.mjs verify --baseline "$OUT/cascade-base" --dist dist
git -C "$REPO" worktree remove --force "$BASE"
cat "$OUT/status"
