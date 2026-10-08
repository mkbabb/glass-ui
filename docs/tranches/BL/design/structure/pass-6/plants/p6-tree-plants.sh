#!/bin/sh
# p6-tree-plants.sh <before|after> <worktree> <log dir> [plant…] — the P6 floor battery (P6-F1..F3,
# REGISTRY §P5-8.3). Each plant gets a fresh cut of HEAD at <worktree> (the seat's own linked
# worktree path):
#   before  HEAD with its own floor and rows (the pass-5 floor, committed)
#   after   HEAD + the P6 floor (the checkout's), cut by the floor chain (r1 first)
# then runs its commands and prints one verdict line per reading: CAUGHT when the floor under test
# did what the P6 item requires, MISSED when it did not. Every command and its output go to
# <log dir>/<arm>/<plant>.log. The worktree is removed after each plant.
# Plants (default: all):
#   F1   P6-F1: the route's Timeline → TimelineMarks split (values kept), listed by its scope
#        declaration and its moved rules, reads GREEN; the same split unlisted reads RED
#   F1v  P6-F1: the split with one value changed under the re-homed scope reads RED (content), listed
#   F1m  P6-F1: a pure move of a scoped SFC (StatusDot.vue, one dir down) reads identical though its
#        scope id re-hashes
#   F2   P6-F2: the chip readback spec carved into chip's slot (testDir ".."), run twice by the arm's
#        own browser seat (base, then with --base-report), counts as FD-4 evidence (covered=true);
#        emits F2g too: the spec then moved out from under the report fails the arm loud
#   F3a  P6-F3 (graph.mjs:37): an absent opaque ledger stops the graph, named
#   F3l  P6-F3 (graph.mjs:37): a malformed opaque ledger stops the graph, named
#   F3r  P6-F3 (recipes.mjs:58, graph.mjs:58): an unreadable src style file stops the graph and
#        classesOf, and the browser selection, instead of reading as no classes
set -u
ARM=$1; WT=$2; S=$3; shift 3
REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
ST=$REPO/docs/tranches/BL/design/structure
P4=$ST/pass-4
P6=$ST/pass-6/plants
FL=docs/tranches/BL/design/structure/floor
PLANTS=${*:-F1 F1v F1m F2 F3a F3l F3r}
OUT=$S/$ARM; mkdir -p "$OUT"
FT=$WT/scripts/structure
SPEC=src/components/chip/__tests__/chip-accent-band.visual.ts

say() { printf '%s\n' "$*" >> "$LOG"; }
run() { say "\$ $*"; ( "$@" ) >> "$LOG" 2>&1; rc=$?; say "[exit $rc]"; return $rc; }
verdict() { printf '%-7s %-4s %s\n' "$1" "$2" "$3"; say "VERDICT $1 $2 — $3"; }
cutwt() {
    if [ "$ARM" = before ]; then run "$P4/tools/fresh.sh" "$WT"; run node "$WT/$FL/rows/apply.mjs" --root "$WT"
    else run "$P4/tools/fresh.sh" "$WT" --floor; run node "$REPO/$FL/rows/apply.mjs" --root "$WT"; fi
}
build() { run npx vite build >/dev/null; }
snap() { build; run node "$FT/cascade.mjs" snapshot --root "$WT" --dist "$WT/dist" --out "$1" --sha "$(git -C "$WT" rev-parse --short HEAD)"; }
kf() { grep -rhoE "feedback-mark-pulse-[0-9a-f]{8}" "$WT/dist" --include='*.css' | sort -u | tr '\n' ' '; }

for PLANT in $PLANTS; do
    LOG=$OUT/$PLANT.log; : > "$LOG"
    say "# $PLANT · arm $ARM · HEAD $(git -C "$REPO" rev-parse --short HEAD) · $(date -u +%FT%TZ) · load $(uptime | sed 's/.*averages: //')"
    cutwt
    cd "$WT" || exit 2
    case $PLANT in
    F1)
        snap "$OUT/F1-base"
        run node "$P6/sfc-split.mjs" "$WT" keep; build
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F1-base" --dist "$WT/dist"; u=$?
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F1-base" --dist "$WT/dist" --reorders "$P6/lists/f1-timeline-split.json"; l=$?
        if [ $l -eq 0 ] && [ $u -ne 0 ]; then verdict CAUGHT F1 "the split listed by scope + moved rules GREEN; unlisted RED (exit $u): $(grep -m1 '^SCOPE ' "$LOG")"
        else verdict MISSED F1 "listed exit $l (want 0), unlisted exit $u (want 1): $(grep -m1 '"verdict": "RED: ' "$LOG" | tr -s ' ')"; fi ;;
    F1v)
        snap "$OUT/F1v-base"
        run node "$P6/sfc-split.mjs" "$WT" value; build
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F1v-base" --dist "$WT/dist" --reorders "$P6/lists/f1-timeline-split.json"; v=$?
        if [ $v -ne 0 ] && grep -q '"verdict": "RED: content changed"' "$LOG"; then verdict CAUGHT F1v "a value changed under the re-homed scope reads RED: content changed, under the split's listing"
        else verdict MISSED F1v "verify exit $v under the listing: a value change under the re-homed scope is accepted"; fi ;;
    F1m)
        snap "$OUT/F1m-base"; k0=$(kf)
        run node "$FT/move.mjs" "$P6/lists/f1m-statusdot-move.json" --root "$WT"; mv=$?
        build; k1=$(kf)
        say "StatusDot's scoped keyframe in dist: base ${k0} -> moved ${k1}"
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/F1m-base" --dist "$WT/dist"; m=$?
        if [ $mv -eq 0 ] && [ $m -eq 0 ] && [ "${k0}" != "${k1}" ]; then verdict CAUGHT F1m "the pure SFC move reads identical; its scope id re-hashed (${k0}-> ${k1})"
        else verdict MISSED F1m "move $mv, verify $m (want 0), scope id ${k0}-> ${k1}"; fi ;;
    F2)
        run node "$P6/carve-spec.mjs" "$WT" carve
        run node "$FT/browser.mjs" --root "$WT" --changed "$SPEC" --select-only --out "$OUT/F2-select.json"
        run node "$FT/browser.mjs" --root "$WT" --changed "$SPEC" --out "$OUT/F2-seat-base.json" --wait 3600
        run node "$FT/browser.mjs" --root "$WT" --changed "$SPEC" --base-report "$OUT/F2-seat-base.json" --out "$OUT/F2-seat.json" --wait 3600
        run node "$P6/fd4-cover.mjs" --root "$WT" --report "$OUT/F2-seat.json"
        if grep -q '^COVER covered=true' "$LOG"; then verdict CAUGHT F2 "the carved readback spec is FD-4 evidence: $(grep -m1 '^evidence ' "$LOG")"
        else verdict MISSED F2 "$(grep -m1 '^COVER ' "$LOG"): the carved spec cannot be evidence"; fi
        run node "$P6/carve-spec.mjs" "$WT" gone
        run node "$P6/fd4-cover.mjs" --root "$WT" --report "$OUT/F2-seat.json"; c=$?
        if [ $c -eq 3 ] && grep -q "^COVER THREW .*$SPEC" "$LOG"; then verdict CAUGHT F2g "the spec moved out from under the report fails the coverage arm loud: $(grep -m1 '^COVER THREW' "$LOG" | cut -c1-150)"
        else verdict MISSED F2g "fd4-cover exit $c: $(grep '^COVER ' "$LOG" | tail -1) (the moved spec read as empty)"; fi ;;
    F3a)
        run rm "$FT/records/opaque-ledger.json"
        run node "$P6/f3-probe.mjs" --root "$WT"
        run node "$FT/graph.mjs" --root "$WT" --quiet
        if grep -q '^GRAPH THREW .*opaque-ledger.json' "$LOG"; then verdict CAUGHT F3a "$(grep -m1 '^GRAPH THREW' "$LOG" | cut -c1-150)"
        else verdict MISSED F3a "the absent ledger read as empty: $(grep -m1 '^GRAPH ' "$LOG")"; fi ;;
    F3l)
        run sh -c "printf '{\"entries\": [' > '$FT/records/opaque-ledger.json'"
        run node "$P6/f3-probe.mjs" --root "$WT"
        run node "$FT/graph.mjs" --root "$WT" --quiet
        if grep -q '^GRAPH THREW .*opaque-ledger.json' "$LOG"; then verdict CAUGHT F3l "$(grep -m1 '^GRAPH THREW' "$LOG" | cut -c1-150)"
        else verdict MISSED F3l "the malformed ledger read as empty: $(grep -m1 '^GRAPH ' "$LOG")"; fi ;;
    F3r)
        F=src/components/chip/accent-tone.css
        run chmod 000 "$F"
        run node "$P6/f3-probe.mjs" --root "$WT" --file "$F"
        run node "$FT/browser.mjs" --root "$WT" --changed "$F" --select-only --out "$OUT/F3r-select.json"; b=$?
        run chmod 644 "$F"
        if grep -q '^GRAPH THREW .*EACCES' "$LOG" && grep -q '^CLASSES THREW .*EACCES' "$LOG" && [ $b -ne 0 ]; then verdict CAUGHT F3r "an unreadable $F stops the graph, classesOf and the selection (exit $b), each naming EACCES"
        else verdict MISSED F3r "$(grep -m1 '^GRAPH ' "$LOG" | cut -c1-90); $(grep -m1 '^CLASSES ' "$LOG"); select-only exit $b"; fi ;;
    esac
    cd "$S" || exit 2
    git -C "$REPO" worktree remove --force "$WT" >> "$LOG" 2>&1
done
