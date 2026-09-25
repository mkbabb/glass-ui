#!/bin/bash
# generate.sh <linked worktree> — GENERATION, run once by the route's author: from a fresh HEAD
# worktree (floor rows applied), compute each step of ../SEQUENCE.json with the landed law and
# the kit's generators, FREEZE it as literal JSON under ../lists and ../rows, and apply it before
# computing the next. The replay (replay.mjs) never runs this: it reads the frozen files only.
# Authored inputs: ../eponym/names.json, ../authored/*, ../lists/12-mirror.json. An authored
# spec named NN-*.json is applied after step 13 in name order; the others are named by their step.
set -euo pipefail
WT=$1
KIT=$(cd "$(dirname "$0")/.." && pwd)
T=$KIT/tools
L=$KIT/lists; R=$KIT/rows; A=$KIT/authored
mkdir -p "$L" "$R"; GT=$(mktemp -d)
cd "$WT"
say() { printf '\n== %s\n' "$*"; }
list() { node "$T/apply-list.mjs" "$1" --root "$WT" | head -1; }
row() { node "$T/fd2-pairs.mjs" --root "$WT" --save "$GT/pairs.json" >/dev/null; node "$T/apply-row.mjs" "$1" --root "$WT"; node "$T/fd2-pairs.mjs" --root "$WT" --against "$GT/pairs.json"; }
say land;              node "$T/land.mjs" --root "$WT"
say "00 stage-1 raw";  node "$T/propose.mjs" --root "$WT" --stage 1 --raw --tag stage1-raw --out "$L/00-stage1-raw.json" | grep '"moves"'
say "01 relay";        node "$T/unrelay.mjs" --root "$WT" --departures "$L/00-stage1-raw.json" --out "$R/01-relay.json" | grep -A3 deleted; row "$R/01-relay.json"
say "02 stage 1";      node "$T/propose.mjs" --root "$WT" --stage 1 --tag stage1 --out "$L/02-stage1.json" | grep '"moves"'; list "$L/02-stage1.json"
say "03 stage 2";      node "$T/propose.mjs" --root "$WT" --stage 2 --tag stage2 --out "$L/03-stage2.json" | grep '"moves"'; list "$L/03-stage2.json"
say "04 css doors";    node "$T/propose.mjs" --root "$WT" --stage 3 --tag css-doors --out "$L/04-css-doors.json" | grep '"moves"'; list "$L/04-css-doors.json"
say "05 seal";         node "$T/doorify.mjs" --root "$WT" --out "$R/05-seal.json" | grep -c '→'; row "$R/05-seal.json"
for x in "src/components/alert/index.ts alert" "src/components/badge/index.ts badge" "src/composables/color/index.ts color"; do
    set -- $x
    to=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1])).purity[process.argv[2]])' "$KIT/eponym/names.json" "$1")
    say "06 purity $2 → $to"; node "$T/extract-door.mjs" --root "$WT" --door "$1" --to "$to" --out "$R/06-purity-$2.json" >/dev/null; row "$R/06-purity-$2.json"
done
say "06 walkers";      node "$T/hunk-row.mjs" "$A/walkers.json" --root "$WT" --out "$R/06-walkers.json"; row "$R/06-walkers.json"
say "07 tests";        node "$T/propose.mjs" --root "$WT" --stage 4 --tag tests --out "$L/07-tests.json" | grep '"moves"'; list "$L/07-tests.json"
say "08 programs";     node "$T/hunk-row.mjs" "$A/programs.json" --root "$WT" --out "$R/08-programs.json"; row "$R/08-programs.json"
say "09 relay scripts"; node "$T/unrelay.mjs" --root "$WT" --zones scripts --out "$R/09-relay-scripts.json" | grep -A2 relays; row "$R/09-relay-scripts.json"
say "10 cross-zone";   node "$T/propose.mjs" --root "$WT" --stage 5 --tag cross-zone --out "$L/10-cross-zone.json" | grep '"moves"'; list "$L/10-cross-zone.json"
say "11 r8 delete";    node "$T/hunk-row.mjs" "$A/r8-delete.json" --root "$WT" --out "$R/11-r8-delete.json"; row "$R/11-r8-delete.json"
say "12 mirror list";  list "$L/12-mirror.json"
say "13 mirror row";   node "$T/hunk-row.mjs" "$A/mirror.json" --root "$WT" --out "$R/13-mirror.json"; row "$R/13-mirror.json"
for spec in "$A"/[1-9][0-9]-*.json; do
    [ -e "$spec" ] || continue
    b=$(basename "$spec"); say "$b"; node "$T/hunk-row.mjs" "$spec" --root "$WT" --out "$R/$b"; row "$R/$b"
done
# ---- pass 3, after the relays, stages, tests and scripts: the ruled surface rows and the carve
door=src/components/dock/styles/controls/index.css
to=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1])).purity[process.argv[2]])' "$KIT/eponym/names.json" "$door")
say "15 css purity → $to"; node "$T/extract-css-door.mjs" --root "$WT" --door "$door" --to "$to" --out "$R/15-purity-controls.json"; row "$R/15-purity-controls.json"
say "16 aurora-config";  node "$T/hunk-row.mjs" "$A/aurora-config.json" --root "$WT" --out "$R/16-aurora-config.json"; row "$R/16-aurora-config.json"
say "17 entries";        node "$T/snap-row.mjs" --root "$WT" --save "$GT/entries.json" --files package.json; node scripts/structure/entries.mjs write --root "$WT"
                         node "$T/snap-row.mjs" --root "$WT" --from "$GT/entries.json" --out "$R/17-entries.json" --step "G P3-R5: package.json exports and typesVersions re-emitted from the entry record (entries.mjs write)"; row "$R/17-entries.json"
say "18 one door";       node "$T/one-door.mjs" --root "$WT" --out "$R/18-one-door.json" --added "$(cat "$A/migration-added.md")" | grep -A9 owners; row "$R/18-one-door.json"
say "19 one-door prose"; node "$T/hunk-row.mjs" "$A/one-door-prose.json" --root "$WT" --out "$R/19-one-door-prose.json"; row "$R/19-one-door-prose.json"
say "20 demo doors";     node "$T/demo-doors.mjs" --root "$WT" --out "$R/20-demo-doors.json" | grep -c 'no entry publishes' || true; row "$R/20-demo-doors.json"
say "23 carve";          node "$T/propose.mjs" --root "$WT" --stage 6 --tag carve --out "$L/23-carve.json" | grep '"moves"'; list "$L/23-carve.json"
say "24 tests follow";   node "$T/propose.mjs" --root "$WT" --stage 4 --tag tests-carve --out "$L/24-tests-carve.json" | grep '"moves"'; list "$L/24-tests-carve.json"
say "25 test pins";      node "$T/hunk-row.mjs" "$A/test-pins.json" --root "$WT" --out "$R/25-test-pins.json"; row "$R/25-test-pins.json"
say "26 surface pin";    npx vite build >/dev/null 2>&1; node "$T/snap-row.mjs" --root "$WT" --save "$GT/pin.json" --files scripts/structure/records/surface-pin.json; node scripts/structure/surface.mjs pin --root "$WT"
                         node "$T/snap-row.mjs" --root "$WT" --from "$GT/pin.json" --out "$R/26-surface-pin.json" --step "G surface pin (F-9): the reviewed diff is the ruled rows only: +./aurora-config (P3-R5); the names that leave their second entry (R-6, P3-R4)"; row "$R/26-surface-pin.json"
say "fixpoint (not frozen): every stage proposes nothing"
for s in 1 2 3 4 5 6; do node "$T/propose.mjs" --root "$WT" --stage $s --out "$GT/fix-$s.json" | grep '"moves"' | sed "s/^/stage $s /"; done
