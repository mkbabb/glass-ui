#!/usr/bin/env bash
# sfc-split2.sh <linked worktree> <out dir> — PLANT procedure (pass 7, FP6-4): the two-child SFC
# split (tools/sfc-split2.mjs) judged by the tree's cascade verify against a snapshot of the
# tree's own clean build, the floor's listing procedure (FLOOR-P6 §4.2: verify with `scopes`,
# transcribe the UNLISTED rules with pass-6/tools/listing.mjs, verify with the full listing).
# Expected: no listing RED; one child's scope only RED; both scopes without the moved rules RED;
# the full listing GREEN; a value changed under the second child RED; restored GREEN.
set -u
T="$1"; O="$2"; cd "$T" || exit 9
HERE="$(cd "$(dirname "$0")" && pwd)"; L="$HERE/../../../pass-6/tools/listing.mjs"
mkdir -p "$O"
V() { node scripts/structure/cascade.mjs verify --root . --baseline "$O/snap" --dist dist "$@"; }
npx vite build > "$O/build-clean.log" 2>&1 && node scripts/structure/cascade.mjs snapshot --root . --dist dist --out "$O/snap" > /dev/null
node "$HERE/sfc-split2.mjs" --root . --mode keep > "$O/split-keep.txt"; cat "$O/split-keep.txt"
grep '^SCOPES ' "$O/split-keep.txt" | sed 's/^SCOPES //' > "$O/scopes.json"
grep '^SCOPES-A ' "$O/split-keep.txt" | sed 's/^SCOPES-A //' > "$O/scopes-a.json"
npx vite build > "$O/build-keep.log" 2>&1; echo "build keep $?"
V > "$O/v-none.txt" 2>&1; echo "no listing rc $?"
V --reorders "$O/scopes-a.json" > "$O/v-scope-a.txt" 2>&1; echo "one child's scope rc $?"
V --reorders "$O/scopes.json" > "$O/v-scopes.txt" 2>&1; echo "both scopes, no rung rc $?"
node "$L" "$O/v-scopes.txt" "$O/scopes.json" "$O/listing.json" "pass-7 plant (FP6-4): the two-child SFC split"
V --reorders "$O/listing.json" > "$O/v-listed.txt" 2>&1; echo "full listing rc $?"
node "$HERE/sfc-split2.mjs" --root . --undo .p7-sfc-undo.json; rm .p7-sfc-undo.json
node "$HERE/sfc-split2.mjs" --root . --mode value > "$O/split-value.txt"; cat "$O/split-value.txt" | head -1
npx vite build > "$O/build-value.log" 2>&1; echo "build value $?"
V --reorders "$O/listing.json" > "$O/v-value.txt" 2>&1; echo "value under the second child rc $?"
node "$HERE/sfc-split2.mjs" --root . --undo .p7-sfc-undo.json; rm .p7-sfc-undo.json
npx vite build > "$O/build-restore.log" 2>&1; echo '{}' > "$O/empty.json"
V --reorders "$O/empty.json" > "$O/v-restore.txt" 2>&1; echo "restored rc $?"
