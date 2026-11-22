#!/usr/bin/env bash
# The decisive rows. One stylesheet the landing loads (PresetEditor's) is answered
# HOLD_MS late, so every card's stage mounts while a sheet is still loading: the window
# the live site hits by chance. Then each observer variant under that hold. One node
# process (one browser) per row, in sequence. Run it under the WebKit lock:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- ./hold.sh [base] [reps] [cells] [hold_ms]
set -u
cd "$(dirname "$0")"
BASE="${1:-https://glass.babb.dev}"
REPS="${2:-3}"
CELLS="${3:-1440:light,390:dark}"
HOLD="PresetEditor:${4:-1500}"
OUT="out/hold-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$OUT"
run() { local name="$1"; shift; node probe.mjs --base "$BASE" --reps "$REPS" --cells "$CELLS" --out "$OUT/$name.json" "$@" 2>&1 | tee -a "$OUT/summary.txt"; }

ALL=(foundations substrates display forms containers navigation dock data feedback motion compositions)
skip_all=(); for c in "${ALL[@]}"; do skip_all+=(--skip "$c"); done

run baseline-nohold --label "baseline, no hold"
run baseline --hold-css "$HOLD" --label "baseline"
run skip-all --hold-css "$HOLD" "${skip_all[@]}" --label "skip every card"
run defer-barshape --hold-css "$HOLD" --defer useBarShape --label "useBarShape callback at the next frame"
run read-barshape --hold-css "$HOLD" --swap "useBarShape:read" --label "useBarShape callback = getBoundingClientRect only"
run noop-barshape --hold-css "$HOLD" --swap "useBarShape:noop" --label "useBarShape callback = nothing"
run noop-barshape-card --hold-css "$HOLD" --swap "useBarShape:noop" --swap "storyTile:noop" --label "useBarShape and the card fit observer = nothing"
run entry-barshape --hold-css "$HOLD" --swap "useBarShape:entry" --label "useBarShape from the entry box (no layout read)"
run skip0-barshape --hold-css "$HOLD" --swap "useBarShape:skip0" --label "useBarShape returns on a 0x0 box"
run entry-barshape-card-noop --hold-css "$HOLD" --swap "useBarShape:entry" --swap "storyTile:noop" --label "useBarShape from the entry box; card fit observer = nothing"
echo "out: $OUT"
