#!/bin/sh
# p4-tree-plants.sh <before|after> <scratch dir> [plant…] — the P4 floor battery (P4-F1..F7,
# and F0, the base pin). Each plant gets a fresh cut of HEAD in <scratch>/wt:
#   before  HEAD with its own floor and rows (the pass-3 floor)
#   after   HEAD + the P4 floor (the checkout's), cut by the P4 chain (r1 first)
# then runs its commands and prints one verdict line: CAUGHT when the floor under test did
# what the P4 item requires, MISSED when it did not. Every command and its output go to
# <scratch>/<arm>/<plant>.log. Plants that need a second tree cut it at <scratch>/wt-base.
# Plants: F0 F1 F2 F2u F3 F4 F5 F6 F7 F47 F48 (default: all; F47 and F48 drive the browser twice).
set -u
ARM=$1; S=$2; shift 2
REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
P4=$REPO/docs/tranches/BL/design/structure/pass-4
FL=docs/tranches/BL/design/structure/floor
LISTS=$P4/plants/lists
PLANTS=${*:-F0 F1 F2 F2u F3 F4 F5 F6 F7 F47 F48}
OUT=$S/$ARM; mkdir -p "$OUT"
WT=$S/wt; WB=$S/wt-base
FT=$WT/scripts/structure
CHIP="css-critical.spec.ts demo-design.spec.ts glass-cal.spec.ts page-chassis.spec.ts storybook-meta.spec.ts"

say() { printf '%s\n' "$*" >> "$LOG"; }
run() { say "\$ $*"; ( "$@" ) >> "$LOG" 2>&1; rc=$?; say "[exit $rc]"; return $rc; }
verdict() { printf '%-7s %-4s %s\n' "$1" "$2" "$3"; say "VERDICT $1 $2 — $3"; }
cutwt() {
    if [ "$ARM" = before ]; then run "$P4/tools/fresh.sh" "$1"; run node "$1/$FL/rows/apply.mjs" --root "$1"
    else run "$P4/tools/fresh.sh" "$1" --floor; run node "$REPO/$FL/rows/apply.mjs" --root "$1"; fi
}
snap() { run npx vite build >/dev/null; run node "$FT/cascade.mjs" snapshot --root "$WT" --dist "$WT/dist" --out "$1" --sha "$(git -C "$WT" rev-parse --short HEAD)"; }

for PLANT in $PLANTS; do
    LOG=$OUT/$PLANT.log; : > "$LOG"
    say "# $PLANT · arm $ARM · HEAD $(git -C "$REPO" rev-parse --short HEAD) · $(date -u +%FT%TZ)"
    cutwt "$WT"
    cd "$WT" || exit 2
    case $PLANT in
    F0)
        run npx vite build >/dev/null
        run node "$FT/gates.mjs" --root "$WT"; rc=$?
        if [ $rc -eq 0 ]; then verdict CAUGHT F0 "the floor's surface pin follows 10.1.0: all four gates PASS on the cut"; else verdict MISSED F0 "gates exit $rc: $(grep '^FAIL' "$LOG" | cut -c1-90 | tr '\n' ';')"; fi ;;
    F1)
        pre=$([ -e scripts/gate-register.mjs ] && echo present || echo retired); say "register after the cut: $pre"
        run node "$FT/move.mjs" "$LISTS/f1-register-path.json" --root "$WT"; mv=$?
        run npx vitest run tests/gates --reporter=json --outputFile="$OUT/F1-vitest.json"
        rf=$(node -e 'const r=require(process.argv[1]);const t=r.testResults.filter(x=>/gate-register\.test\.ts$/.test(x.name));console.log(t.reduce((n,x)=>n+x.assertionResults.filter(a=>a.status==="failed").length,0)+"/"+t.reduce((n,x)=>n+x.assertionResults.length,0))' "$OUT/F1-vitest.json")
        say "gate-register failed/total after the move: $rf"
        if [ "$pre" = retired ] && [ $mv -eq 0 ] && [ "${rf%/*}" = 0 ]; then verdict CAUGHT F1 "the register is retired by the floor cut; the R-3 move of tabs-seam.test.ts applies and no register test reds ($rf)"; else verdict MISSED F1 "register $pre after the cut; move exit $mv; gate-register failed/total $rf"; fi ;;
    F2)
        run node "$FT/move.mjs" "$LISTS/f2-glob-declared.json" --root "$WT"; mv=$?
        tc=1; [ $mv -eq 0 ] && { run npx vue-tsc --noEmit; tc=$?; }
        if [ $mv -eq 0 ] && [ $tc -eq 0 ] && grep -q "GLOB-DELTA carried" "$LOG"; then verdict CAUGHT F2 "isTeleportedTarget.ts leaves _shared with its @source glob delta declared: carried, applied, typecheck 0"; else verdict MISSED F2 "move exit $mv ($(grep -c '^LOST' "$LOG") LOST, rolled back), typecheck $tc: the glob delta cannot be declared"; fi ;;
    F2u)
        run node "$FT/move.mjs" "$LISTS/f2-glob-undeclared.json" --root "$WT"; mv=$?
        dirty=$(git status --short src demo | wc -l | tr -d ' ')
        if [ $mv -ne 0 ] && grep -q "GLOB-DELTA undeclared" "$LOG" && grep -q '"phase": "preflight"' "$LOG"; then verdict CAUGHT F2u "the undeclared glob delta is named at preflight; nothing written ($dirty src/demo changes, the cut's own)"; else verdict MISSED F2u "exit $mv; no undeclared glob delta named at preflight ($(grep -c '^LOST' "$LOG") LOST after a write and a rollback)"; fi ;;
    F3)
        run node "$FT/move.mjs" "$LISTS/f3-generated-root.json" --root "$WT"; mv=$?
        lit=$(cat scripts/structure/lib/scan/resolve.mjs 2>/dev/null | grep -c '"tests-visual/.cache"')
        run node "$FT/graph.mjs" --root "$WT" --quiet; g=$?
        if [ $mv -eq 0 ] && [ "$lit" = 1 ] && [ $g -eq 0 ]; then verdict CAUGHT F3 "resolve.mjs moves; the generated root literal is kept verbatim; graph 0"; else verdict MISSED F3 "move exit $mv; literal kept $lit; $(grep -m1 '^LOST' "$LOG" | cut -c1-110)"; fi ;;
    F4)
        if [ "$ARM" = before ]; then run node "$FT/browser.mjs" --root "$WT" --moved "$LISTS/f4-accent-tone.json" --out "$OUT/F4-seat.json"
        else run node "$FT/browser.mjs" --root "$WT" --moved "$LISTS/f4-accent-tone.json" --select-only --out "$OUT/F4-seat.json"; fi
        got=$(node -e 'const d=require(process.argv[1]);const want=process.argv[2].split(" ");const s=d.specs;console.log(want.filter(w=>s.includes(w)).length+"/"+want.length+" of the chip-paint specs; selected: "+s.join(","))' "$OUT/F4-seat.json" "$CHIP")
        say "$got"
        case $got in 5/5*) verdict CAUGHT F4 "$got" ;; *) verdict MISSED F4 "$got" ;; esac ;;
    F5)
        run node "$FT/move.mjs" "$LISTS/f5-spec-leaves-program.json" --root "$WT"; mv=$?
        if [ $mv -ne 0 ] && grep -q "^LOST tests-visual/playwright.config.ts|test-program|" "$LOG" && [ -f tests-visual/css-critical.spec.ts ]; then verdict CAUGHT F5 "the spec leaving the Playwright program is refused (LOST playwright.config.ts test-program edge), rolled back"; else verdict MISSED F5 "move exit $mv: the spec left tests-visual and the program without a refusal"; fi ;;
    F6)
        cutwt "$WB"; cd "$WT" || exit 2
        run node "$FT/move.mjs" "$LISTS/f6-tokens-door.json" --root "$WT"; mv=$?
        run node "$FT/classify.mjs" --base "$WB" --root "$WT" --moves "$LISTS/f6-tokens-door.json"; c=$?
        eng=$(grep -c '"classified": {' "$LOG")
        if [ $mv -eq 0 ] && [ $c -eq 0 ] && [ "$eng" -ge 1 ]; then verdict CAUGHT F6 "the engine's own join respelling classifies (CLI PASS) and the engine step carries its FD-5 verdict"; else verdict MISSED F6 "move exit $mv; classify exit $c: $(grep -m1 '^UNCLASSIFIED' "$LOG" | cut -c1-110); engine FD-5 fields $eng"; fi
        git -C "$REPO" worktree remove --force "$WB" >> "$LOG" 2>&1 ;;
    F7)
        snap "$OUT/F7-base"
        node "$P4/plants/rung.mjs" "$WT" a >> "$LOG" 2>&1; run npx vite build >/dev/null
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F7-base" --dist "$WT/dist" --reorders "$P4/plants/listed-styles.json"; a=$?
        cd "$S" || exit 2; cutwt "$WT"; cd "$WT" || exit 2
        node "$P4/plants/rung.mjs" "$WT" b >> "$LOG" 2>&1; run npx vite build >/dev/null
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F7-base" --dist "$WT/dist" --reorders "$P4/plants/listed-styles.json"; b=$?
        named=$(grep -c '^RISK ./styles \[--accent-band-strength\] .*glass-chip' "$LOG")
        if [ $a -eq 0 ] && [ $b -ne 0 ] && [ "$named" -ge 1 ]; then verdict CAUGHT F7 "the safe listed rung (card/scroll) GREEN; the accent-tone rung RED, the pair named on --accent-band-strength"; else verdict MISSED F7 "listed card/scroll rung exit $a (want 0); accent-tone rung exit $b (want 1), pair named $named"; fi ;;
    F47)
        # F-10's base-green count on the chip band, then FD-4's evidence arm: the accent-tone
        # rung (rung b) judged with the seat's report of the chip specs on the planted tree
        snap "$OUT/F47-base"
        run node "$FT/browser.mjs" --root "$WT" --changed src/components/chip/accent-tone.css --out "$OUT/F47-seat-base.json" --wait 3600
        node "$P4/plants/rung.mjs" "$WT" b >> "$LOG" 2>&1; run npx vite build >/dev/null
        if [ "$ARM" = before ]; then run node "$FT/browser.mjs" --root "$WT" --changed src/components/chip/accent-tone.css --out "$OUT/F47-seat.json" --wait 3600
        else run node "$FT/browser.mjs" --root "$WT" --changed src/components/chip/accent-tone.css --base-report "$OUT/F47-seat-base.json" --out "$OUT/F47-seat.json" --wait 3600; fi
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F47-base" --dist "$WT/dist" --reorders "$P4/plants/listed-styles.json" --browser "$OUT/F47-seat.json"; v=$?
        band=$(node -e 'const d=require(process.argv[1]);const b=(d.bands||[]).find(x=>x.band==="chip");console.log(b&&typeof b.baseGreen==="number"?`chip band: ${b.specs.length} specs, base-green ${b.baseGreen}, new failures ${b.newFailures.length} (${b.signal})`:"no chip band with a base-green count")' "$OUT/F47-seat.json" 2>/dev/null || echo "no seat report")
        say "$band; cascade verify with the seat report exit $v"
        case $band in chip*) verdict CAUGHT F47 "$band; the accent-tone rung with that report: verify exit $v" ;; *) verdict MISSED F47 "$band; verify exit $v" ;; esac ;;
    F48)
        # FD-4's evidence arm with a spec that READS the property: the planted readback spec
        # (plants/zz-chip-band.spec.ts) joins the chip band; the accent-tone rung must be refuted
        cp "$P4/plants/zz-chip-band.spec.ts" tests-visual/zz-chip-band.spec.ts; say "planted tests-visual/zz-chip-band.spec.ts"
        snap "$OUT/F48-base"
        run node "$FT/browser.mjs" --root "$WT" --changed src/components/chip/accent-tone.css --specs zz-chip-band.spec.ts --out "$OUT/F48-seat-base.json" --wait 3600
        node "$P4/plants/rung.mjs" "$WT" b >> "$LOG" 2>&1; run npx vite build >/dev/null
        if [ "$ARM" = before ]; then run node "$FT/browser.mjs" --root "$WT" --specs zz-chip-band.spec.ts --out "$OUT/F48-seat.json" --wait 3600
        else run node "$FT/browser.mjs" --root "$WT" --changed src/components/chip/accent-tone.css --specs zz-chip-band.spec.ts --base-report "$OUT/F48-seat-base.json" --out "$OUT/F48-seat.json" --wait 3600; fi
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F48-base" --dist "$WT/dist" --reorders "$P4/plants/listed-styles.json" --browser "$OUT/F48-seat.json"; v=$?
        ref=$(grep -c "REFUTED by zz-chip-band.spec.ts" "$LOG")
        if [ $v -ne 0 ] && [ "$ref" -ge 1 ]; then verdict CAUGHT F48 "the readback spec, green at base, fails on the accent-tone rung; FD-4 refuses the listed reorder, REFUTED by it"; else verdict MISSED F48 "verify exit $v; refuted lines $ref"; fi ;;
    esac
    cd "$S" || exit 2
    git -C "$REPO" worktree remove --force "$WT" >> "$LOG" 2>&1
done
