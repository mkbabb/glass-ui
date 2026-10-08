#!/bin/sh
# baseline.sh <worktree> <log dir> [--at sha] — the whole P6 floor on one commit: pass-5/tools/
# baseline.sh's steps on a fresh linked worktree at <worktree> (the seat's own path), HEAD
# (default) + the checkout's floor, plus one P6 reading: the graph the landed P6 floor reads,
# diffed edge for edge against the graph HEAD's own (pass-5) floor reads on a second cut of the
# same commit (tools/graph-dump.mjs, tools/graph-diff.mjs). Every step's command and output go to
# <log dir>/baseline.log; one summary line per step goes to stdout. It never stops early. The demo
# is built before vitest. The worktree is removed at the end.
set -u
WT=$1; OUT=$2; shift 2
AT=HEAD; [ "${1:-}" = --at ] && AT=$2
REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
ST=$REPO/docs/tranches/BL/design/structure
T6=$ST/pass-6/tools
FL=docs/tranches/BL/design/structure/floor
LOG=$OUT/baseline.log
mkdir -p "$OUT"; : > "$LOG"
step() { name=$1; shift; printf '\n### %s\n$ %s\n' "$name" "$*" >> "$LOG"; t0=$(date +%s); ( "$@" ) >> "$LOG" 2>&1; rc=$?; printf '[exit %s, %ss]\n' "$rc" "$(( $(date +%s) - t0 ))" >> "$LOG"; printf '%-28s exit %s  %ss\n' "$name" "$rc" "$(( $(date +%s) - t0 ))"; }

step fresh "$ST/pass-4/tools/fresh.sh" "$WT" --floor --at "$AT"
cd "$WT" || exit 2
echo "commit $(git rev-parse --short HEAD); load $(uptime | sed 's/.*averages: //')"
# the floor at its docs home, before the chain
step graph@docs node "$FL/graph.mjs" --root "$WT" --quiet
step plants-59 node "$FL/plants/graph-plants.mjs" --root "$WT"
step plants-p3 node "$ST/pass-3/plants/p3-graph-plants.mjs" --floor "$WT/$FL" --root "$WT"
# the chain, and its replay
step chain node "$REPO/$FL/rows/apply.mjs" --root "$WT"
step chain-replay node "$REPO/$FL/rows/apply.mjs" --root "$WT"
# the landed floor
F=scripts/structure
step graph node "$F/graph.mjs" --root "$WT" --quiet
step graph-dump-p6 node "$T6/graph-dump.mjs" --root "$WT" --out "$OUT/graph-p6.json"
step floor-cycles node "$ST/pass-5/plants/floor-cycles.mjs" --root "$WT"
step parse-tree node "$ST/pass-5/tools/parse-tree.mjs" --root "$WT"
step placement node "$F/placement.mjs" --root "$WT"
step placement-none node "$F/placement.mjs" --root "$WT" --anchor none
step bounds node "$F/bounds.mjs" --root "$WT"
step fixpoint-dry node "$F/fixpoint.mjs" --root "$WT" --dry
step scc-per-move node "$ST/pass-3/tools/scc-per-move.mjs" "$WT"
step build npx vite build
step css-dist-names sh -c 'for k in ./styles ./styles/fonts ./styles/theme; do v=$(node -e "console.log(require(\"./package.json\").exports[process.argv[1]])" "$k"); printf "%s -> %s %s B\n" "$k" "$v" "$(wc -c < "${v#./}" | tr -d " ")"; done'
step gates node "$F/gates.mjs" --root "$WT"
step entries node "$F/entries.mjs" check --root "$WT"
step cascade-contract node "$F/cascade.mjs" contract --root "$WT"
step cascade-snapshot node "$F/cascade.mjs" snapshot --root "$WT" --dist "$WT/dist" --out "$OUT/cascade" --sha "$(git rev-parse --short HEAD)"
step cascade-self node "$F/cascade.mjs" verify --root "$WT" --baseline "$OUT/cascade" --dist "$WT/dist"
step cascade-labels sh -c "grep -ohE 'data-v-\\([A-Za-z0-9_-]+\\)' '$OUT/cascade/'*.seq | sort | uniq -c | sort -rn; grep -ohE '[a-z-]+-\\([A-Z][A-Za-z]+\\)' '$OUT/cascade/'*.seq | grep -v '^data-v' | sort -u"
step surface node "$F/surface.mjs" check --root "$WT"
step demo-build npm run demo:dist:build
step vitest npx vitest run
step typecheck npm run typecheck
step verify-package npm run verify:package
step browser-select node "$F/browser.mjs" --root "$WT" --changed src/components/chip/accent-tone.css --select-only --out "$OUT/browser-select.json"
step browser-seat node "$F/browser.mjs" --root "$WT" --out "$OUT/browser-seat.json" --wait 3600
step browser-seat-keys node -e 'const d=require(process.argv[1]);console.log(d.$schema,"testDir="+d.testDir,d.verdict,JSON.stringify([...new Set(d.results.map((t)=>t.spec))]))' "$OUT/browser-seat.json"
# the same commit under its own (pass-5) floor: the graph the P6 floor's cures leave unchanged
cd "$OUT" || exit 2
step fresh-p5 "$ST/pass-4/tools/fresh.sh" "$WT" --at "$AT"
step chain-p5 node "$WT/$FL/rows/apply.mjs" --root "$WT"
step graph-dump-p5 node "$T6/graph-dump.mjs" --root "$WT" --out "$OUT/graph-p5.json"
step graph-diff node "$T6/graph-diff.mjs" "$OUT/graph-p5.json" "$OUT/graph-p6.json"
git -C "$REPO" worktree remove --force "$WT" >> "$LOG" 2>&1
echo "worktree removed"
