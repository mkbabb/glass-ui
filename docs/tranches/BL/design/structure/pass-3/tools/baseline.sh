#!/bin/sh
# baseline.sh <scratch dir> [--at sha] — the whole P3 floor on one commit, from a fresh
# linked worktree: HEAD (default) + the checkout's floor. Every step's command and output go
# to <scratch>/baseline.log; one summary line per step goes to stdout. It never stops early:
# a red step is recorded and the next runs. The worktree is removed at the end.
set -u
OUT=$1; shift
AT=HEAD; [ "${1:-}" = --at ] && AT=$2
REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
P3=$REPO/docs/tranches/BL/design/structure/pass-3
FL=docs/tranches/BL/design/structure/floor
WT=$OUT/wt
LOG=$OUT/baseline.log
mkdir -p "$OUT"; : > "$LOG"
step() { name=$1; shift; printf '\n### %s\n$ %s\n' "$name" "$*" >> "$LOG"; t0=$(date +%s); ( "$@" ) >> "$LOG" 2>&1; rc=$?; printf '[exit %s, %ss]\n' "$rc" "$(( $(date +%s) - t0 ))" >> "$LOG"; printf '%-28s exit %s  %ss\n' "$name" "$rc" "$(( $(date +%s) - t0 ))"; }

step fresh "$P3/tools/fresh.sh" "$WT" --floor --at "$AT"
cd "$WT" || exit 2
echo "commit $(git rev-parse --short HEAD)"
# the floor at its docs home, before the chain
step graph@docs node "$FL/graph.mjs" --root "$WT" --quiet
step plants-59 node "$FL/plants/graph-plants.mjs" --root "$WT"
step plants-p3 node "$P3/plants/p3-graph-plants.mjs" --floor "$WT/$FL" --root "$WT"
# the chain, and its replay
step chain node "$REPO/$FL/rows/apply.mjs" --root "$WT"
step chain-replay node "$REPO/$FL/rows/apply.mjs" --root "$WT"
# the landed floor
F=scripts/structure
step graph node "$F/graph.mjs" --root "$WT" --quiet
step placement node "$F/placement.mjs" --root "$WT"
step placement-none node "$F/placement.mjs" --root "$WT" --anchor none
step bounds node "$F/bounds.mjs" --root "$WT"
step fixpoint-dry node "$F/fixpoint.mjs" --root "$WT" --dry
step scc-per-move node "$P3/tools/scc-per-move.mjs" "$WT"
step build npx vite build
step gates node "$F/gates.mjs" --root "$WT"
step entries node "$F/entries.mjs" check --root "$WT"
step cascade-contract node "$F/cascade.mjs" contract --root "$WT"
step cascade-snapshot node "$F/cascade.mjs" snapshot --root "$WT" --dist "$WT/dist" --out "$OUT/cascade" --sha "$(git rev-parse --short HEAD)"
step cascade-self node "$F/cascade.mjs" verify --root "$WT" --baseline "$OUT/cascade" --dist "$WT/dist"
step surface node "$F/surface.mjs" check --root "$WT"
step vitest npx vitest run
step typecheck npm run typecheck
step demo-build npm run demo:dist:build
step verify-package npm run verify:package
step browser-seat node "$F/browser.mjs" --root "$WT" --out "$OUT/browser-seat.json"
cd "$OUT" || exit 2
git -C "$REPO" worktree remove --force "$WT" >> "$LOG" 2>&1
echo "worktree removed"
