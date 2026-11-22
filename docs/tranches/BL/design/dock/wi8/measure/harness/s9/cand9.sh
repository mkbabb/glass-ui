#!/usr/bin/env bash
# cand9.sh <tree-dir> pages|units: the ninth pass's source seat (MEASURE-9 part S). The item as it stands, as a tree: a
# `git archive` of HEAD without docs/, the worktree's uncommitted src/, tests/ and tests-visual/ files laid over it
# (demo/main.ts never taken), node_modules linked to the main checkout's (s8/cand8.sh's form). `pages`: the measure's pages
# (m9/pages9.sh), served by s9/dev9.sh. `units`: RU-121's tree, docs/ linked read-only to the worktree's, no page in
# demo/__anim; the caller builds dist/ and deletes it after the run. Rebuilt on every call.
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"
T="$1"; MODE="$2"; SHA=$(git -C "$W" rev-parse --short HEAD)
rm -rf "$T"; mkdir -p "$T"
git -C "$W" archive HEAD -- . ':(exclude)docs' | tar -x -C "$T"
CH=$(git -C "$W" diff --name-only HEAD -- src tests tests-visual)
for f in $CH; do if [ -f "$W/$f" ]; then mkdir -p "$T/$(dirname "$f")"; cp "$W/$f" "$T/$f"; else rm -f "$T/$f"; fi; done
ln -s /Users/mkbabb/Programming/glass-ui/node_modules "$T/node_modules"
echo "$SHA+$(echo $CH | wc -w | tr -d ' ')" > "$T/.g16-ref"
case "$MODE" in
  pages) "$H/m9/pages9.sh" "$T" >/dev/null;;
  units) rm -rf "$T/demo/__anim"; ln -s "$W/docs" "$T/docs";;
esac
echo "$(date '+%F %T') cand9: HEAD $SHA with $(echo $CH | wc -w | tr -d ' ') uncommitted files into $T ($MODE)" >> "$L/s9-disk.log"
echo "$T at $SHA+wip ($MODE)"
