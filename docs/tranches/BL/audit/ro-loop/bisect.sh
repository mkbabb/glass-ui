#!/usr/bin/env bash
# The bisect over `/`. Each card is skipped alone (the landing's card loop rewritten in
# flight, so the card never renders), then every card, then the docks, then the
# observer variants: useBarShape deferred to the next frame, useBarShape's callback
# swapped for a pure layout read and for nothing, and the card fit observer deferred.
# One node process (one browser) per row, in sequence. Run it under the WebKit lock:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- ./bisect.sh [base] [reps] [cells]
set -u
cd "$(dirname "$0")"
BASE="${1:-https://glass.babb.dev}"
REPS="${2:-2}"
CELLS="${3:-1440:light,390:dark}"
OUT="out/bisect-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$OUT"
run() { local name="$1"; shift; node probe.mjs --base "$BASE" --reps "$REPS" --cells "$CELLS" --out "$OUT/$name.json" "$@" 2>&1 | tee -a "$OUT/summary.txt"; }

ALL=(foundations substrates display forms containers navigation dock data feedback motion compositions)
run baseline
for c in "${ALL[@]}"; do run "skip-$c" --skip "$c"; done
skip_all=(); for c in "${ALL[@]}"; do skip_all+=(--skip "$c"); done
run skip-all "${skip_all[@]}" --label "skip every card"
# Every card but one: does any single card raise it alone?
for c in display containers navigation motion compositions; do
    only=(); for o in "${ALL[@]}"; do [ "$o" != "$c" ] && only+=(--skip "$o"); done
    run "only-$c" "${only[@]}" --label "only card /$c"
done
run no-docks --remove "nav.demo-sidebar-rail" --remove "nav.demo-bottom-dock" --label "remove both docks"
run defer-barshape --defer "useBarShape" --label "useBarShape callback at the next frame"
run swap-barshape-read --swap "useBarShape:read" --label "useBarShape callback = getBoundingClientRect only"
run swap-barshape-noop --swap "useBarShape:noop" --label "useBarShape callback = nothing"
run defer-card --defer "storyTile" --label "card fit observer (SectionPreviewCard) at the next frame"
echo "out: $OUT"
