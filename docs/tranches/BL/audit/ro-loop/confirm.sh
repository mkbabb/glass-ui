#!/usr/bin/env bash
# The confirmation. Under the stylesheet hold: the cure set emulated together (useBarShape
# reads its box from the entry; the card fit observer and the selection indicator read at
# the next frame), five reps. Then the held baseline and the cure set on WebKit 2287
# (value.js's Playwright 1.60.0) and 2370 (gregg's 1.64.1), read-only installs. Then the
# minimal page (no glass code) on 2311, 2287 and 2370. One node process (one browser) per
# row, in sequence. Run it under the WebKit lock:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- ./confirm.sh
set -u
cd "$(dirname "$0")"
BASE="https://glass.babb.dev"
HOLD="PresetEditor:1500"
OUT="out/confirm-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$OUT"
PW2287=/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs
PW2370=/Users/mkbabb/Programming/gregg/node_modules/playwright/index.mjs
CURE=(--swap "useBarShape:entry" --defer storyTile --defer useSelectionGroup)
PW2311=playwright
run() { local name="$1" pw="$2"; shift 2; PW="$pw" node probe.mjs --base "$BASE" --out "$OUT/$name.json" "$@" 2>&1 | tee -a "$OUT/summary.txt"; }

run cure-2311 "$PW2311" --reps 5 --hold-css "$HOLD" "${CURE[@]}" --label "cure set, WebKit 2311"
run baseline-2287 "$PW2287" --reps 3 --hold-css "$HOLD" --label "baseline, WebKit 2287"
run cure-2287 "$PW2287" --reps 3 --hold-css "$HOLD" "${CURE[@]}" --label "cure set, WebKit 2287"
run baseline-2370 "$PW2370" --reps 3 --hold-css "$HOLD" --label "baseline, WebKit 2370"
run cure-2370 "$PW2370" --reps 3 --hold-css "$HOLD" "${CURE[@]}" --label "cure set, WebKit 2370"
for b in 2311 2287 2370; do
    v="PW$b"
    echo "== minimal page, WebKit $b" | tee -a "$OUT/minimal.txt"
    PW="${!v}" node minimal.mjs --browser webkit --reps 3 2>&1 | tee -a "$OUT/minimal.txt"
done
echo "out: $OUT"
