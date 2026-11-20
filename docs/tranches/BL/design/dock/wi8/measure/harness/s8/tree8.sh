#!/usr/bin/env bash
# tree8.sh <ref> <tree-dir>: the eighth pass's source seat. A `git archive` of <ref> without docs/ in <tree-dir>
# (kept when it is already at the ref), node_modules linked to the main checkout's, as m8/g16fix8.sh archives its
# trees. G-14 runs in it, so a reading is of the ref and never of the worktree's live src.
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; L="$(cd "$(dirname "$0")/../.." && pwd)/logs"
REF="$1"; T="$2"; SHA=$(git -C "$W" rev-parse --short "$REF")
if [ -f "$T/.g16-ref" ] && [ "$(cat "$T/.g16-ref")" = "$SHA" ]; then exit 0; fi
rm -rf "$T"; mkdir -p "$T"
git -C "$W" archive "$REF" -- . ':(exclude)docs' | tar -x -C "$T"
ln -s /Users/mkbabb/Programming/glass-ui/node_modules "$T/node_modules"
echo "$SHA" > "$T/.g16-ref"
echo "$(date '+%F %T') tree8: archived $REF ($SHA) into $T, docs/ left out" >> "$L/s8-disk.log"
