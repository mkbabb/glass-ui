#!/usr/bin/env bash
# probe-group.sh <A..F> <engine>: one group of the study's runs, inside one guarded call (the
# engine word puts the call in the guard's browser pool). Every run here is sequential and
# launches its own headless browser.
# Builds: 5391 serves the base (trees/v11.1.1/dist-base); 5392 serves cure v1 (dist-cure:
# segmented strip and tab, sheet columns, the line law with the Select trigger, toggle item,
# timeline); 5393 serves cure v2 (dist-cure2: v1 plus the Dialog plate column and the toast
# body column, and the segmented tab without its own 0 floor, so the coarse touch floor
# holds); 5394 serves cure v3 (dist-cure3: v2 plus the tooltip plate's inline cap). v3 is
# cure.patch.
# A to D ran from chain.sh with the base served on 5391 by a separate guarded serve.sh.
# Groups B, C, E and F start their cure preview inside their own call; E and F start the base
# preview too when 5391 is down, and stop what they started on exit.
#   ~/.claude/guard/guarded --timeout 20 -- tools/probe-group.sh F chromium
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- tools/probe-group.sh E webkit
# Round 2 (value.js's items, cure v5 on 5396): V (Chromium witness), VW (WebKit witness), P5
# (the v5 sweep), K (check-overflow.mjs on base and v5).
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
RAW="$ROOT/record/raw"
INS="$ROOT/record/inspect"
# One route per fault family, and the Filters stress page.
REP="/containers/sheet,/data/timeline,/foundations/colors,/forms/toggle,/display/buttons,/forms/inputs,/forms/labeled-field,/forms/checks,/containers/dropdown-menu,/containers/popover,/forms/select,/containers/command,/containers/accordion,/forms/chip,/containers/expandable-container,/compositions/settings,/compositions/auth-shell,/navigation/pager-dots,/ovf.html"
log() { echo "== $(date +%T) $*"; }
probe() { # engine tag port cell passes routes
    log "probe $*"
    node "$HERE/probe.mjs" --engine "$1" --tag "$2" --port "$3" --cell "$4" --passes "$5" --routes "$6" --out "$RAW" --resume >> "$ROOT/trees/probe-$2-$1-$4.log" 2>&1
    log "exit $?"
}
inspect() { # engine plan out
    log "inspect $*"
    node "$HERE/inspect.mjs" --engine "$1" --plan "$2" --out "$3" > "$ROOT/trees/$(basename "$3" .json).log" 2>&1
    log "exit $?"
}
SRVS=""
trap 'for p in $SRVS; do kill "$p" 2>/dev/null; done' EXIT
# serve <tree> <port> <outdir>: a preview of a tree's build, a child of this guarded call.
serve() {
    if curl -s -o /dev/null "http://127.0.0.1:$2/ovf.html"; then log "$2 already up"; return 0; fi
    ( cd "$ROOT/trees/$1" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$3" --host 127.0.0.1 --port "$2" --strictPort ) > "$ROOT/trees/serve-$2.log" 2>&1 &
    SRVS="$SRVS $!"
    for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$2/ovf.html" && { log "$2 up ($!)"; return 0; }; sleep 1; done
    log "$2 did not come up"
}
serve2() { serve cure 5393 dist-cure2; }
serve3() { serve cure 5394 dist-cure3; }
serveb() { serve v11.1.1 5391 dist-base; }
serve4() { serve v11.1.1 5395 dist-cure4; }
serve3f() { serve v11.1.1 5394 dist-cure3; }
serve5() { serve v11.1.1 5396 dist-cure5; }
CURE_ROUTES="$REP,/containers/dialog,/feedback/toast,/containers/tooltip"
case "$1" in
A)
    inspect chromium "$HERE/plans/witness.json" "$INS/witness.chromium.json"
    inspect chromium "$HERE/plans/triage.json" "$INS/triage.chromium.json"
    probe chromium cure 5392 390t-light base,opens,variants,stress "$REP"
    ;;
B)
    serve2
    inspect webkit "$HERE/plans/witness2.json" "$INS/witness2.webkit.json"
    probe webkit base 5391 390t-light base,opens,variants,stress "$REP"
    probe webkit cure2 5393 390t-light base,opens,variants,stress "$REP"
    probe webkit base 5391 1440-light base,opens,variants,stress "$REP"
    probe webkit cure2 5393 1440-light base,opens,variants,stress "$REP"
    ;;
C)
    serve3
    inspect chromium "$HERE/plans/witness3.json" "$INS/witness3.chromium.json"
    probe chromium cure3 5394 390t-light base,opens,variants,stress "$REP,/containers/dialog,/feedback/toast,/containers/tooltip"
    probe chromium base 5391 1440-light base,opens,variants,stress all
    probe chromium cure3 5394 1440-light base,opens,variants,stress "$REP,/containers/dialog,/feedback/toast,/containers/tooltip"
    ;;
D)
    probe chromium base 5391 390t-dark base all
    probe chromium base 5391 1440-dark base all
    ;;
F)
    serveb
    serve3
    # The Dialog case again in Chromium. The demo page opens the dialog on arrival
    # (dialog.vue: open-on-load), so C's click on the trigger landed on the scrim and
    # closed it; the plan now reads the dialog as the page opens it.
    inspect chromium "$HERE/plans/witness3-dialog.json" "$INS/witness3-dialog.chromium.json"
    ;;
E)
    serveb
    serve3
    inspect webkit "$HERE/plans/witness3-wk.json" "$INS/witness3-wk.webkit.json"
    # The rest of B's base 390 run (stopped by hand at /forms/select, where the page
    # crashed and the probe waited for good), and the v3 routes.
    probe webkit base 5391 390t-light base,opens,variants,stress "$REP,/containers/dialog,/feedback/toast,/containers/tooltip"
    # B's cure2 run at 390 stopped at /forms/select the same way; v3 holds v2, so the
    # WebKit cure reading at 390 is this one, on every route.
    probe webkit cure3 5394 390t-light base,opens,variants,stress "$REP,/containers/dialog,/feedback/toast,/containers/tooltip"
    ;;
G)
    serveb
    serve4
    inspect chromium "$HERE/plans/witness4.json" "$INS/witness4.chromium.json"
    ;;
W)
    # the fold's second witness: vertical swipes that begin on the strip, the long dock
    # run, a toggle label longer than atlas's field, and v3 read on the critique's cells
    serveb
    serve3f
    serve4
    inspect chromium "$HERE/plans/witness4b.json" "$INS/witness4b.chromium.json"
    inspect chromium "$HERE/plans/witness3-fold.json" "$INS/witness3-fold.chromium.json"
    ;;
C4)
    # the fold's third witness: the three parts in a 200 px column, the Label with its
    # stage's field given a 0 floor
    serveb
    serve4
    inspect chromium "$HERE/plans/witness4c.json" "$INS/witness4c.chromium.json"
    ;;
P)
    serveb
    serve4
    for cell in 390t-light 1440-light; do
        log "probe fold page $cell"
        node "$HERE/probe.mjs" --engine chromium --tag base --port 5391 --cell "$cell" --passes base,opens,variants,stress --routes "/ovf.html?fold" --suffix fold --out "$RAW" --resume >> "$ROOT/trees/probe-fold-base-$cell.log" 2>&1
        node "$HERE/probe.mjs" --engine chromium --tag cure4 --port 5395 --cell "$cell" --passes base,opens,variants,stress --routes "/ovf.html?fold" --suffix fold --out "$RAW" --resume >> "$ROOT/trees/probe-fold-cure4-$cell.log" 2>&1
        probe chromium cure4 5395 "$cell" base,opens,variants,stress "$CURE_ROUTES"
    done
    ;;
H)
    serveb
    serve4
    inspect webkit "$HERE/plans/witness4.json" "$INS/witness4.webkit.json"
    inspect webkit "$HERE/plans/witness4c.json" "$INS/witness4c.webkit.json"
    probe webkit cure4 5395 390t-light base,opens,variants,stress "$CURE_ROUTES"
    probe webkit cure4 5395 1440-light base,opens,variants,stress "$REP"
    ;;
V)
    # round 2: value.js's four items on the base, v4 and v5 (cure v5 = v4 with value.js's
    # items, dist-cure5 on 5396), Chromium
    serveb
    serve4
    serve5
    inspect chromium "$HERE/plans/witness5.json" "$INS/witness5.chromium.json"
    ;;
VW)
    # round 2 in Playwright's WebKit: value.js's four items (sideways pans by mouse wheel,
    # as WebKit has no touch-move input), then v4's strip, line law and toggle item, on the
    # base, v4 and v5
    serveb
    serve4
    serve5
    inspect webkit "$HERE/plans/witness5w.json" "$INS/witness5.webkit.json"
    inspect webkit "$HERE/plans/witness-wk5.json" "$INS/witness-wk5.webkit.json"
    ;;
P5)
    # the v5 sweep: the 22 cure routes, and the fold page with round 2's cells on the base
    # and v5 (route /ovf.html?fold&round=2, suffix fold5, so the first fold page's records
    # stay as they were)
    serveb
    serve5
    for cell in 390t-light 1440-light; do
        log "probe fold page, round 2, $cell"
        node "$HERE/probe.mjs" --engine chromium --tag base --port 5391 --cell "$cell" --passes base,opens,variants,stress --routes "/ovf.html?fold&round=2" --suffix fold5 --out "$RAW" >> "$ROOT/trees/probe-fold5-base-$cell.log" 2>&1
        node "$HERE/probe.mjs" --engine chromium --tag cure5 --port 5396 --cell "$cell" --passes base,opens,variants,stress --routes "/ovf.html?fold&round=2" --suffix fold5 --out "$RAW" >> "$ROOT/trees/probe-fold5-cure5-$cell.log" 2>&1
        probe chromium cure5 5396 "$cell" base,opens,variants,stress "$CURE_ROUTES"
    done
    ;;
K)
    # check-overflow.mjs on the base and v5 stress and fold pages, Chromium
    serveb
    serve5
    "$HERE/check-selftest.sh"
    ;;
esac
