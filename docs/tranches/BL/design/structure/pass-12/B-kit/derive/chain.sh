#!/bin/bash
# chain.sh <wt> <id>|all|from <id> — AUTHOR-SIDE: re-derive one step of route D1-B's chain (or the whole
# chain, in order) on a linked worktree, with the command that derives it. This is the record
# of how frozen/SEQUENCE.json was made; the replay (replay.mjs) never runs it.
#   start    the chain's base: the tree's code digest at its HEAD
#   S1       the floor rows (floor/rows/apply.mjs), shared by every route
#   computed steps run their derive tool on the tree as it stands (placement, carve, doors,
#            colocation, consumer entries, the surface pin, the gate's pin)
#   authored steps run the authored input through derive/edits.mjs or derive/apply-moves.mjs
#   S13 S25 S27 S31 land the gate text authored in authored/gate-lands/<id>.json (reland.mjs)
# Pass 6: rebase.mjs carried pass 5's chain onto the P6 floor cut (a step whose digest is unchanged
# leaves the chain: S50, S58 and S59), and S60-S70 are pass 6's own steps. Pass 7 re-derives S64-S70
# as P6-R1..P6-R3 rule them (the pass-7 kit's authored inputs) and adds S71-S71d before the gate's
# re-land: useLiquidFlex joins the engine-free core, the selection engine leaves morph for its own
# module and useLiquidReveal joins morph, so no door ./motion-core reads mixes peer classes. S70 stays the one rebind, last.
# Pass 8 adds S72 (scroll-driven.css's citation follows S65's move, P7-G6) and S73-S73c (the dock context
# becomes the dock's sub-module context/, so the root's Slider stops reaching keyframes.js through the
# dock entry's door: B18's names arm, P7-R1) after S71d, and re-derives the
# gate's re-land S69 once, last of the gate steps: the CLI's guard covers module evaluation (S-14), B18
# judges the peer classes (P7-R1), and the pin carries the reviewed peer holds; S69s and S70 re-record
# after it, and the datum rebinds once, at S70.
# Pass 10 adds S74 (P9-R1 (a): LAW §4's base rule moves fourier-field/math.ts, the ./fourier-math entry
# source the child renderer value-reads, into the unit's base module register/), S74b-S74e (the same
# rule for the second module-grain SCC the widened B4 reads, scripts/structure/lib <-> lib/graph: entries.mjs
# names its own path by an explicit URL (S74b), so the engine can carry the move; the floor's tree model
# moves to lib's base module lib/tree/ (S74d) and
# gets its door (S74e)) and S75 (P9-R2 (a): the
# chain's MIGRATION section is headed `## 11.0.0`, and the eight other MIGRATION.md lines naming a
# tranche are re-worded in the same row) after S73c, and re-derives S69 once, last of the gate steps:
# B4 reads every value SCC at module grain, parent<->child included (gate/cycles.mjs), and B18 throws
# on a peer-less declaration row (P8-R3 as ruled); S69s and S70 re-record after it, and the datum
# rebinds once, at S70 (MIGRATION.md ships).
# Pass 11 (P10-R1 (a)): the root-relative `./`-lead cure is the floor's row P11-F1, landed by S1, so the
# chain carries no step that patches its own landed engine (pass 10's S74c left it). rebase.mjs carried
# the pass-10 chain onto the re-cut floor with S74c dropped; every other step's frozen file is
# unchanged.
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
# a hand-authored row (derive/diff-row.mjs froze it from an edited worktree, with a why per
# file in authored/<reasons>.json): re-derivation lands the frozen exact-text row again
FR() { node derive/land-row.mjs --root "$W" --row "frozen/$2" --id "$1" --out "frozen/$2"; }
ORDER="start S1 S1b S1d S2 S2b S3 S4a S4b S4c S5a S4d S4f S4e S5-1 S5-2 S6 S7 S8 S9 S10 S11 S4g S12 S13 S14 S15 S16 S17 S18 S19 S20 S22 S23 S24 S25 S26 S27 S28 S29 S30 S31 S32 S33 S33b S33c S34 S35 S36 S37 S38 S39-01 S39-02m S39-02 S39-03 S39-04 S39-05 S39-06 S39-07 S39-08 S39-09 S39-10 S39-11 S39-12 S39-13 S39-14 S39-15 S40-01 S40-02 S40-03 S41-01 S41-02 S41-03 S41-04 S41-05 S41-06 S41-07 S41-08 S42 S42s S43a S43b S43c S43d S43e S43f S44 S45 S46 S48 S49 S51 S52 S53 S54 S55 S56 S57 S60 S61 S62 S62c S63 S64 S65 S66 S67 S68 S71 S71b S71c S71d S72 S73 S73b S73c S74 S74b S74d S74e S75 S69 S69s S70"
step() {
case "$1" in
 start) node record-step.mjs --root "$W" --start "$(git -C "$W" rev-parse --short=8 HEAD)";;
 S1) node "$K/../../floor/rows/apply.mjs" --root "$W"; node record-step.mjs --root "$W" --id S1 --kind floor-rows --why "the floor rows r1, f3, f4, m02, m03, f9, fd6, fd7, fd11 (floor/rows/apply.mjs, the P5 floor): the one cut every route starts from";;
 S1b) node derive/unrelay.mjs --root "$W" --out frozen/S1b-unrelay.json; rec S1b row frozen/S1b-unrelay.json;;
 S1d) E S1d overlay-unrelay.mjs S1d-overlay-unrelay.json;;
 S2) node derive/place.mjs --root "$W";;
 S2b) node derive/unrelay.mjs --root "$W" --only src/composables/search/index.ts --step "B-S2b the emptied kernel door composables/search dissolves (LAW §5: a kernel door re-exporting unit files is a shim, B8)" --out frozen/S2b-search-door.json; rec S2b row frozen/S2b-search-door.json;;
 S3) node derive/carve.mjs --root "$W";;
 S4a) AM S4a css-carve.json S4a-css-carve.json;;
 S4g) node derive/entries-write.mjs --root "$W" --id S4g --why "F-3 (P5-F2, P4-R4 arm (a)): the ./styles/theme entry source moved to styles/theme/index.css at S4a, so its export key targets the real dist path ./dist/styles/theme/index.css; no forwarding file, and a consumer importing dist/styles/theme.css by path gets a MIGRATION row" --out frozen/S4g-entries.json;;
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
 S45) E S45 alpha-home.mjs S45-alpha-home.json;;
 S48) E S48 chip-readback.mjs S48-chip-readback.json;;
 S49) FR S49 S49-b17-empty-catch.json;;

 S51) FR S51 S51-story-manifest.json;;
 S52) AM S52 story-groups.json S52-story-groups.json;;
 S53) FR S53 S53-b0-harness.json;;
 S54) AM S54 harness-dirs.json S54-harness-dirs.json;;
 S55) FR S55 S55-barrel-prose.json;;
 S56) FR S56 S56-dock-tests-merge.json;;
 S57) node derive/land-gate.mjs --root "$W" --id S57 --out frozen/S57-gate.json --why "gate re-land (pass 5): B0's walk arm reads directory listings from the syntax (walks.mjs, B-S12); B17 reads an empty catch and a skipped suite (S-14); the pin after S48-S56";;
 S60) E S60 p6-s14-cures.mjs S60-s14-cures.json;;
 S61) node authored/p6/gen-style-fold-split.mjs --root "$W"; E S61 p6-style-fold-split.mjs S61-style-fold-split.json;;
 S62) AM S62 p6-names-moves.json S62-names-moves.json;;
 S62c) E S62c p6-names-cite.mjs S62c-names-cite.json;;
 S63) E S63 p6-shader-prose.mjs S63-shader-prose.json;;
 S64) node derive/publish.mjs --root "$W" --authored authored/p6-publish.mjs --id S64 --out frozen/S64-publish.json;;
 S65) E S65 p6-consumer-entries.mjs S65-consumer-entries.json;;
 S66) AM S66 p6-test-homes.json S66-test-homes.json;;
 S67) node derive/compose.mjs --root "$W" --authored authored/p6-test-splits.mjs --id S67 --out frozen/S67-test-splits.json;;
 S68) node derive/compose.mjs --root "$W" --authored authored/p6-kernel-tests.mjs --id S68 --out frozen/S68-kernel-tests.json;;
 S69) node derive/land-gate.mjs --root "$W" --id S69 --out frozen/S69-gate.json --why "gate re-land (pass 6, pass 7, pass 8, pass 10): B17 reads named loaders and every reader the tree defines, a swallowed read and a conditional read or collect; B15 judges provenance stems and test stems; B16 reads a page spec's subject from the stories it opens and checks Playwright-program membership; B6 covers the root configs; the kernel test slot. Pass 7: B11 reads a src door name whose only outside readers are tests as published for a test (P6-R2); the record's files counts the five zones and the root files (P6-G6). Pass 8: the CLI (seal.mjs) imports nothing but node's own, installs its no-verdict guard first and loads the clauses (clauses.mjs) after it, so every throw, while the modules evaluate, in the run or at record write, exits 2 (S-14, P6-R3); B18 judges each declared-free entry's names and files arms against the root barrel's table (peer.mjs, P7-R1), with the root's floor-base breaks as the pin's reviewed peer holds (P7-G5). Pass 10: B4 reads every value SCC at module grain, parent<->child included, in its own reader (cycles.mjs, P9-R1 (a)); B18 throws on a declaration row with no peer and on a peer with no subpath (peer.mjs, P8-R3 as ruled, P9-G2); the pin after S64-S75";;
 S69s) E S69s p6-surface-spec.mjs S69s-surface-spec.json;;
 S71) AM S71 p7-peer-class-moves.json S71-peer-class-moves.json;;
 S71b) E S71b p7-peer-class-doors.mjs S71b-peer-class-doors.json;;
 S71c) AM S71c p7-reveal-move.json S71c-reveal-move.json;;
 S71d) E S71d p7-reveal-doors.mjs S71d-reveal-doors.json;;
 S72) E S72 p8-scroll-cite.mjs S72-scroll-cite.json;;
 S73) E S73 p8-dock-context-label.mjs S73-dock-context-label.json;;
 S73b) AM S73b p8-dock-context-move.json S73b-dock-context-move.json;;
 S73c) E S73c p8-dock-context-doors.mjs S73c-dock-context-doors.json;;
 S70) E S70 p6-datum.mjs S70-datum.json;;
 S74) AM S74 p10-fourier-base-move.json S74-fourier-base-move.json;;
 S74b) E S74b p10-floor-self-url.mjs S74b-floor-self-url.json;;
 S74d) AM S74d p10-floor-base-move.json S74d-floor-base-move.json;;
 S74e) E S74e p10-floor-base-door.mjs S74e-floor-base-door.json;;
 S75) E S75 p10-migration-heading.mjs S75-migration-heading.json;;
 S24|S26|S44|S46) node derive/colocate-rest.mjs --root "$W" --id "$1" --out "frozen/$1-colocate.json";;
 S28) node derive/test-doors.mjs --root "$W" --id S28 --out frozen/S28-test-doors.json;;
 S29) node derive/consumer-entries.mjs --root "$W" --id S29 --out frozen/S29-consumer-entries.json --partial;;
 S30) E S30 door-readers.mjs S30-door-readers.json;;
 S32) E S32 test-slots-2.mjs S32-test-slots.json;;
 S34) E S34 no-masking.mjs S34-no-masking.json;;
 S35) E S35 b4-cycles.mjs S35-b4-cycles.json;;
 S36) AM S36 names-moves.json S36-names-moves.json;;
 S37) node derive/land-gate.mjs --root "$W" --id S37 --out frozen/S37-gate.json --why "gate re-land (pass 4): B-11 one pin path (no --pin); B4 counts same-directory file cycles; B15 in all five zones; B17 no masking fallback; no holds; the pin after S33-S36";;
 S39-02m) AM S39-02m splits/src/02-dock-styles.moves.json S39-02m-src-dock-styles-moves.json;;
 S39-*) r=$(ls authored/splits/src/ | grep "^${1#S39-}-.*\.mjs$"); E "$1" "splits/src/$r" "$1-src-${r%.mjs}.json";;
 S40-*) r=$(ls authored/splits/scripts/p5/ | grep "^${1#S40-}-.*\.mjs$"); E "$1" "splits/scripts/p5/$r" "$1-scripts-${r%.mjs}.json";;
 S41-*) r=$(ls authored/splits/demo/ | grep "^${1#S41-}-.*\.mjs$"); E "$1" "splits/demo/$r" "$1-demo-${r%.mjs}.json";;
 S42) T=$(mktemp -d); (cd "$W" && node "$K/authored/splits/tests/split.mjs" --root "$W" --spec "$K/authored/splits/tests/splits.json" --ledger scripts/structure/records/opaque-ledger.json --out "$T/row.json" --out-shipped "$T/shipped.json" >/dev/null); cp "$T/shipped.json" "$K/frozen/S42s-tests-shipped.pending.json"; node derive/land-row.mjs --root "$W" --row "$T/row.json" --id S42 --out frozen/S42-tests-splits.json; rm -rf "$T";;
 S42s) node derive/land-row.mjs --root "$W" --row frozen/S42s-tests-shipped.pending.json --id S42s --out frozen/S42s-tests-shipped.json; rm -f frozen/S42s-tests-shipped.pending.json;;
 S43a) bash derive/tests-visual.sh "$W" program;;
 S43b) bash derive/tests-visual.sh "$W" engine;;
 S43c) bash derive/tests-visual.sh "$W" rebase;;
 S43d) bash derive/tests-visual.sh "$W" split;;
 S43e) bash derive/tests-visual.sh "$W" cite;;
 S43f) bash derive/tests-visual.sh "$W" citeship;;
 S38) E S38 s14-cures.mjs S38-s14-cures.json;;
 S33) node derive/split-entry.mjs --root "$W" --authored authored/aurora-config.mjs --id S33 --out frozen/S33-aurora-config.json;;
 S33b) node derive/entries-write.mjs --root "$W" --id S33b --why "F-3: package.json follows the entry record (./aurora-config: exports and typesVersions)" --out frozen/S33b-entries.json;;
 S33c) (cd "$W" && npx vite build >/dev/null 2>&1); node derive/repin-reviewed.mjs --root "$W" --expect authored/aurora-config.mjs --from aurora --id S33c --out frozen/S33c-surface-pin.json;;
 *) echo "chain.sh: unknown step $1"; exit 2;;
esac
}
if [ "$2" = all ]; then for s in $ORDER; do echo "== $s"; step "$s"; done
elif [ "$2" = from ]; then on=0; for s in $ORDER; do [ "$s" = "$3" ] && on=1; [ $on = 1 ] || continue; echo "== $s"; step "$s"; done
else step "$2"; fi
