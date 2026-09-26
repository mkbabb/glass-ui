#!/bin/sh
# p5-tree-plants.sh <before|after> <scratch dir> [plant…] — the P5 floor battery (P5-F1..F4,
# REGISTRY §P4-8.3). Each plant gets a fresh cut of HEAD in <scratch>/wt:
#   before  HEAD with its own floor and rows (the pass-4 floor, committed)
#   after   HEAD + the P5 floor (the checkout's), cut by the P5 chain (r1 first)
# then runs its commands and prints one verdict line: CAUGHT when the floor under test did
# what the P5 item requires, MISSED when it did not. Every command and its output go to
# <scratch>/<arm>/<plant>.log.
# Plants (default: all but the two regressions):
#   F1   the floor's own runtime has no file cycle (P5-F1, P4-G1)
#   F2   a moved CSS entry ships at its real dist path, no forwarding file (P5-F2, P4-R4 (a))
#   F2d  a record that declares a second dist name is refused by the guard (P5-F2)
#   F3   a reorder outside the listed rung reads RED; the listed rung alone GREEN (P5-F3, P4-G4)
#   F4r  a floor row whose edit leaves a file unparsable is refused, nothing written (P5-F4)
#   F4m  an engine move whose rewrite writes an unparsable file is refused, nothing written (P5-F4)
#   R7   regression, pass 4's F7 re-issued with rule-set listings (after arm only)
#   R48  regression, pass 4's F48 re-issued with the rung-b rule-set listing (after arm; browser)
set -u
ARM=$1; S=$2; shift 2
REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
ST=$REPO/docs/tranches/BL/design/structure
P4=$ST/pass-4
P5=$ST/pass-5/plants
FL=docs/tranches/BL/design/structure/floor
PLANTS=${*:-F1 F2 F2d F3 F4r F4m}
OUT=$S/$ARM; mkdir -p "$OUT"
WT=$S/wt
FT=$WT/scripts/structure

say() { printf '%s\n' "$*" >> "$LOG"; }
run() { say "\$ $*"; ( "$@" ) >> "$LOG" 2>&1; rc=$?; say "[exit $rc]"; return $rc; }
verdict() { printf '%-7s %-4s %s\n' "$1" "$2" "$3"; say "VERDICT $1 $2 — $3"; }
cutwt() {
    if [ "$ARM" = before ]; then run "$P4/tools/fresh.sh" "$1"; run node "$1/$FL/rows/apply.mjs" --root "$1"
    else run "$P4/tools/fresh.sh" "$1" --floor; run node "$REPO/$FL/rows/apply.mjs" --root "$1"; fi
}
# the arm's row transaction: HEAD's own (in the cut's docs copy) or the checkout's
ROWS() { if [ "$ARM" = before ]; then echo "$WT/$FL/rows/lib.mjs"; else echo "$REPO/$FL/rows/lib.mjs"; fi; }
build() { run npx vite build >/dev/null; }
snap() { build; run node "$FT/cascade.mjs" snapshot --root "$WT" --dist "$WT/dist" --out "$1" --sha "$(git -C "$WT" rev-parse --short HEAD)"; }

for PLANT in $PLANTS; do
    LOG=$OUT/$PLANT.log; : > "$LOG"
    say "# $PLANT · arm $ARM · HEAD $(git -C "$REPO" rev-parse --short HEAD) · $(date -u +%FT%TZ)"
    cutwt "$WT"
    cd "$WT" || exit 2
    case $PLANT in
    F1)
        run node "$P5/floor-cycles.mjs" --root "$WT"; c=$?
        if [ $c -eq 0 ]; then verdict CAUGHT F1 "the landed floor's runtime has no file cycle: $(grep -m1 '"sccs"' "$LOG")"; else verdict MISSED F1 "$(grep '^CYCLE' "$LOG" | tr '\n' ';')"; fi ;;
    F2)
        snap "$OUT/F2-base"
        run node "$FT/move.mjs" "$P5/lists/f2-theme-dir.json" --root "$WT"; mv=$?
        run node "$FT/entries.mjs" write --root "$WT"
        build; b=$?
        run node "$FT/gates.mjs" --root "$WT"; g=$?
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F2-base" --dist "$WT/dist"; cv=$?
        key=$(node -e 'console.log(require(process.argv[1]).exports["./styles/theme"])' "$WT/package.json")
        fwd=$([ -e dist/styles/theme.css ] && echo "dist/styles/theme.css $(wc -c < dist/styles/theme.css | tr -d ' ') B: $(tr -d '\n' < dist/styles/theme.css)" || echo none)
        real=$([ -f "${key#./}" ] && echo "$(wc -c < "${key#./}" | tr -d ' ') B" || echo absent)
        say "export ./styles/theme -> $key ($real); file at the old name: $fwd; move $mv build $b gates $g cascade $cv"
        if [ $mv -eq 0 ] && [ $b -eq 0 ] && [ $g -eq 0 ] && [ $cv -eq 0 ] && [ "$key" = ./dist/styles/theme/index.css ] && [ "$real" != absent ] && [ "$fwd" = none ]; then verdict CAUGHT F2 "theme.css -> theme/index.css: ./styles/theme targets $key ($real), no file at the old name, 4 gates PASS, cascade identical"
        else verdict MISSED F2 "./styles/theme -> $key; file at the old name: $fwd; move $mv build $b gates $g cascade $cv"; fi ;;
    F2d)
        run node -e 'const fs=require("fs"),p=process.argv[1],r=JSON.parse(fs.readFileSync(p,"utf8"));const t=r.css.find(([k])=>k==="./styles/theme")[1];t.dist="styles/theme.css";fs.writeFileSync(p,JSON.stringify(r,null,4)+"\n");console.log("record: ./styles/theme declares dist",t.dist)' "$FT/records/entry-record.json"
        run node "$FT/entries.mjs" check --root "$WT" --json; e=$?
        if [ $e -ne 0 ] && grep -q css-dist-declared "$LOG"; then verdict CAUGHT F2d "a declared second dist name is a guard violation (css-dist-declared); entries check exit $e"; else verdict MISSED F2d "entries check exit $e with a dist name declared: the record's forwarding name is accepted"; fi ;;
    F3)
        snap "$OUT/F3-base"
        node "$P5/rung.mjs" "$WT" a >> "$LOG" 2>&1; build
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F3-base" --dist "$WT/dist" --reorders "$P5/listed-rung-a.json"; a=$?
        node "$P5/rung.mjs" "$WT" c >> "$LOG" 2>&1; build
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F3-base" --dist "$WT/dist" --reorders "$P5/listed-rung-a.json"; c=$?
        un=$(grep -c '^UNLISTED ./styles' "$LOG")
        if [ $a -eq 0 ] && [ $c -ne 0 ] && [ "$un" -ge 1 ]; then verdict CAUGHT F3 "the listed rung a GREEN; rung a + the unreviewed rung c under the same listing RED, $un moved rule(s) named UNLISTED"; else verdict MISSED F3 "listed rung a exit $a (want 0); rung a + c exit $c (want 1), unlisted named $un"; fi ;;
    F4r)
        run node "$P5/f4-plant.mjs" row --root "$WT" --rows "$(ROWS)"; r=$?
        git diff --quiet -- scripts/profile-bundle.mjs; d=$?
        run node --check scripts/profile-bundle.mjs; k=$?
        if [ $r -ne 0 ] && [ $d -eq 0 ] && grep -q "do not parse" "$LOG"; then verdict CAUGHT F4r "the row is refused before its first write (profile-bundle.mjs unchanged, node --check $k): $(grep -m1 -o 'scripts/profile-bundle.mjs ([^)]*)' "$LOG")"
        else verdict MISSED F4r "row exit $r; profile-bundle.mjs changed $([ $d -ne 0 ] && echo yes || echo no); node --check exit $k"; fi ;;
    F4m)
        run node "$P5/f4-plant.mjs" seed --root "$WT"
        cp scripts/zz-importer.mjs "$OUT/F4m-importer.before"
        run node "$FT/move.mjs" "$P5/lists/f4-edited-importer.json" --root "$WT"; mv=$?
        same=$(cmp -s scripts/zz-importer.mjs "$OUT/F4m-importer.before" && echo unchanged || echo rewritten)
        leaf=$([ -f scripts/lib/zz-leaf.mjs ] && echo "in place" || echo moved)
        if [ $mv -ne 0 ] && grep -q '"phase": "parse"' "$LOG" && [ "$same" = unchanged ] && [ "$leaf" = "in place" ]; then verdict CAUGHT F4m "the step is refused at parse, nothing written: $(grep -m1 '^PARSE refused' "$LOG" | cut -c1-110)"
        else verdict MISSED F4m "move exit $mv; importer $same; leaf $leaf: the engine wrote a file that does not parse"; fi ;;
    R7)
        snap "$OUT/R7-base"
        node "$P4/plants/rung.mjs" "$WT" a >> "$LOG" 2>&1; build
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/R7-base" --dist "$WT/dist" --reorders "$P5/listed-rung-a.json"; a=$?
        cd "$S" || exit 2; cutwt "$WT"; cd "$WT" || exit 2
        node "$P4/plants/rung.mjs" "$WT" b >> "$LOG" 2>&1; build
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/R7-base" --dist "$WT/dist" --reorders "$P5/listed-rung-b.json"; b=$?
        named=$(grep -c '^RISK ./styles \[--accent-band-strength\] .*glass-chip' "$LOG")
        if [ $a -eq 0 ] && [ $b -ne 0 ] && [ "$named" -ge 1 ]; then verdict CAUGHT R7 "rung a listed by its rule set GREEN; rung b listed by its rule set RED, the pair named on --accent-band-strength"; else verdict MISSED R7 "rung a exit $a (want 0); rung b exit $b (want 1), pair named $named"; fi ;;
    R48)
        cp "$P4/plants/zz-chip-band.spec.ts" tests-visual/zz-chip-band.spec.ts; say "planted tests-visual/zz-chip-band.spec.ts"
        snap "$OUT/R48-base"
        run node "$FT/browser.mjs" --root "$WT" --changed src/components/chip/accent-tone.css --specs zz-chip-band.spec.ts --out "$OUT/R48-seat-base.json" --wait 3600
        node "$P4/plants/rung.mjs" "$WT" b >> "$LOG" 2>&1; build
        run node "$FT/browser.mjs" --root "$WT" --changed src/components/chip/accent-tone.css --specs zz-chip-band.spec.ts --base-report "$OUT/R48-seat-base.json" --out "$OUT/R48-seat.json" --wait 3600
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/R48-base" --dist "$WT/dist" --reorders "$P5/listed-rung-b.json" --browser "$OUT/R48-seat.json"; v=$?
        ref=$(grep -c "REFUTED by zz-chip-band.spec.ts" "$LOG")
        if [ $v -ne 0 ] && [ "$ref" -ge 1 ]; then verdict CAUGHT R48 "the readback spec refutes the rule-set-listed accent-tone rung"; else verdict MISSED R48 "verify exit $v; refuted lines $ref"; fi ;;
    esac
    cd "$S" || exit 2
    git -C "$REPO" worktree remove --force "$WT" >> "$LOG" 2>&1
done
