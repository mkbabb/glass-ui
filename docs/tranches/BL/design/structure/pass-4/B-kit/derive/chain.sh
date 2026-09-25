#!/bin/bash
# chain.sh <wt> <id>|all — AUTHOR-SIDE: re-derive one step of route D1-B's chain (or the whole
# chain, in order) on a linked worktree, with the command that derives it. This is the record
# of how frozen/SEQUENCE.json was made; the replay (replay.mjs) never runs it.
#   start    the chain's base: the tree's code digest at its HEAD
#   S1       the floor rows (floor/rows/apply.mjs), shared by every route
#   computed steps run their derive tool on the tree as it stands (placement, carve, doors,
#            colocation, consumer entries, the surface pin, the gate's pin)
#   authored steps run the authored input through derive/edits.mjs or derive/apply-moves.mjs
#   S13 S25 S27 S31 land the gate text authored in authored/gate-lands/<id>.json (reland.mjs)
# Steps whose derive tool does not record itself are recorded here with pass 3's `why`, read
# from the committed pass-3 chain.
set -eo pipefail
W=$(cd "$1" && pwd)
K=$(cd "$(dirname "$0")/.." && pwd)
P3SEQ="$K/../../pass-3/B-kit/frozen/SEQUENCE.json"
cd "$K"
why() { node -e "const s=require('$P3SEQ').steps.find((x)=>x.id==='$1'); process.stdout.write(s.why)"; }
rec() { node record-step.mjs --root "$W" --id "$1" --kind "$2" ${3:+--file "$3"} --why "$(why "$1")"; }
E() { node derive/edits.mjs --root "$W" --authored "authored/$2" --id "$1" --out "frozen/$3"; }
AM() { node derive/apply-moves.mjs --root "$W" --authored "authored/$2" --id "$1" --out "frozen/$3"; }
RL() { node derive/reland.mjs --root "$W" --id "$1" --out "frozen/$1-gate.json"; }
ORDER="start S1 S1b S1d S2 S2b S3 S4a S4b S4c S5a S4d S4f S4e S5-1 S5-2 S6 S7 S8 S9 S10 S11 S12 S13 S14 S15 S16 S17 S18 S19 S20 S22 S23 S24 S25 S26 S27 S28 S29 S30 S31 S32 S33 S33b S33c S34 S35 S36 S37"
step() {
case "$1" in
 start) node record-step.mjs --root "$W" --start "$(git -C "$W" rev-parse --short=8 HEAD)";;
 S1) node "$K/../../floor/rows/apply.mjs" --root "$W"; node record-step.mjs --root "$W" --id S1 --kind floor-rows --why "the floor rows r1, f3, f4, m02, m03, f9, fd6, fd7, fd11 (floor/rows/apply.mjs, the P4 floor): the one cut every route starts from";;
 S1b) node derive/unrelay.mjs --root "$W" --out frozen/S1b-unrelay.json; rec S1b row frozen/S1b-unrelay.json;;
 S1d) E S1d overlay-unrelay.mjs S1d-overlay-unrelay.json;;
 S2) node derive/place.mjs --root "$W";;
 S2b) node derive/unrelay.mjs --root "$W" --only src/composables/search/index.ts --step "B-S2b the emptied kernel door composables/search dissolves (LAW §5: a kernel door re-exporting unit files is a shim, B8)" --out frozen/S2b-search-door.json; rec S2b row frozen/S2b-search-door.json;;
 S3) node derive/carve.mjs --root "$W";;
 S4a) AM S4a css-carve.json S4a-css-carve.json;;
 S4b) node derive/rungs.mjs --root "$W" --out frozen/S4b-rungs.json;;
 S4c) node derive/css-doors.mjs --root "$W";;
 S5a) node derive/split-door.mjs --root "$W" --out frozen/S5a-split-doors.json;;
 S4d) AM S4d entry-moves.json S4d-entry-move.json;;
 S4f) node derive/type-homes.mjs --root "$W" --out frozen/S4f-type-homes.json;;
 S4e) node derive/tokens-door.mjs --root "$W" --out frozen/S4e-tokens-door.json;;
 S5-1|S5-2) n=${1#S5-}; node derive/doorify.mjs --root "$W" --step "B-S5 JS doors pass $n (LAW §5)" --out "frozen/S5-doors-$n.json"; rec "$1" row "frozen/S5-doors-$n.json";;
 S6) E S6 test-edits.mjs S6-test-edits.json;;
 S7) E S7 source-directive.mjs S7-source-directive.json;;
 S8) E S8 one-door.mjs S8-one-door.json;;
 S9) E S9 relays.mjs S9-relays.json;;
 S10) AM S10 minify-move.json S10-minify-move.json;;
 S11) E S11 minify-types.mjs S11-minify-types.json;;
 S12) (cd "$W" && npx vite build >/dev/null 2>&1); node derive/repin.mjs --root "$W" --expect authored/one-door.mjs --id S12 --out frozen/S12-surface-pin.json;;
 S13|S25|S27|S31) RL "$1";;
 S14) E S14 test-programs.mjs S14-test-programs.json;;
 S15) node derive/colocate.mjs --root "$W" --out frozen/S15-colocate.json;;
 S16) E S16 test-slots.mjs S16-test-slots.json;;
 S17) E S17 b9-homes.mjs S17-b9-homes.json;;
 S18) E S18 r8-canon-doc.mjs S18-r8-canon-doc.json;;
 S19) AM S19 scripts-moves.json S19-scripts-moves.json;;
 S20) E S20 scripts-doors.mjs S20-scripts-doors.json;;
 S22) E S22 test-home-imports.mjs S22-test-home-imports.json;;
 S23) E S23 test-programs-scripts.mjs S23-test-programs-scripts.json;;
 S24|S26) node derive/colocate-rest.mjs --root "$W" --id "$1" --out "frozen/$1-colocate.json";;
 S28) node derive/test-doors.mjs --root "$W" --id S28 --out frozen/S28-test-doors.json;;
 S29) node derive/consumer-entries.mjs --root "$W" --id S29 --out frozen/S29-consumer-entries.json --partial;;
 S30) E S30 door-readers.mjs S30-door-readers.json;;
 S32) E S32 test-slots-2.mjs S32-test-slots.json;;
 S34) E S34 no-masking.mjs S34-no-masking.json;;
 S35) E S35 b4-cycles.mjs S35-b4-cycles.json;;
 S36) AM S36 names-moves.json S36-names-moves.json;;
 S37) node derive/land-gate.mjs --root "$W" --id S37 --out frozen/S37-gate.json --why "gate re-land (pass 4): B-11 one pin path (no --pin); B4 counts same-directory file cycles; B15 in all five zones; B17 no masking fallback; no holds; the pin after S33-S36";;
 S33) node derive/split-entry.mjs --root "$W" --authored authored/aurora-config.mjs --id S33 --out frozen/S33-aurora-config.json;;
 S33b) node derive/entries-write.mjs --root "$W" --id S33b --why "F-3: package.json follows the entry record (./aurora-config: exports and typesVersions)" --out frozen/S33b-entries.json;;
 S33c) (cd "$W" && npx vite build >/dev/null 2>&1); node derive/repin-reviewed.mjs --root "$W" --expect authored/aurora-config.mjs --from aurora --id S33c --out frozen/S33c-surface-pin.json;;
 *) echo "chain.sh: unknown step $1"; exit 2;;
esac
}
if [ "$2" = all ]; then for s in $ORDER; do echo "== $s"; step "$s"; done; else step "$2"; fi
