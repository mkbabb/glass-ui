#!/usr/bin/env bash
# cand8.sh <tree-dir>: the eighth pass's source seat. The item in progress as a tree: a `git archive` of HEAD without
# docs/, the worktree's uncommitted src/ and tests/ files laid over it (demo/main.ts is never taken: pages8.sh wraps the
# tree's own), node_modules linked to the main checkout's. A plant or a candidate value is applied to this tree, never
# to the worktree. Rebuilt on every call, so it is always the item as it stands.
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; L="$(cd "$(dirname "$0")/../.." && pwd)/logs"
T="$1"; SHA=$(git -C "$W" rev-parse --short HEAD)
rm -rf "$T"; mkdir -p "$T"
git -C "$W" archive HEAD -- . ':(exclude)docs' | tar -x -C "$T"
CH=$(git -C "$W" diff --name-only HEAD -- src tests)
for f in $CH; do if [ -f "$W/$f" ]; then mkdir -p "$T/$(dirname "$f")"; cp "$W/$f" "$T/$f"; else rm -f "$T/$f"; fi; done
ln -s /Users/mkbabb/Programming/glass-ui/node_modules "$T/node_modules"
echo "$SHA+wip" > "$T/.g16-ref"
echo "$(date '+%F %T') cand8: HEAD $SHA with $(echo $CH | wc -w | tr -d ' ') uncommitted src/tests files into $T, docs/ left out" >> "$L/s8-disk.log"
