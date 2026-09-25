#!/bin/sh
# replay.sh <new worktree path> [--twice] — the D1-G migration for a seat that authored none of
# it: a fresh linked worktree at the checkout's HEAD, the node_modules symlinks, the floor rows
# (floor/rows/apply.mjs), then the frozen chain (replay.mjs reads ../SEQUENCE.json and the lists
# and rows it names; it computes nothing). Exit 0 only when the tree ends on the chain's final
# code digest. Run it a second time on the same tree to see the whole-chain no-op.
set -e
KIT=$(cd "$(dirname "$0")/.." && pwd)
REPO=$(git -C "$KIT" rev-parse --show-toplevel)
WT=$1; shift
if [ -e "$WT" ]; then echo "replay.sh: $WT exists; give a new path" >&2; exit 2; fi
git -C "$REPO" worktree add --detach "$WT" HEAD >/dev/null 2>&1
ln -s "$REPO/node_modules" "$WT/node_modules"
ln -s "$REPO/tests-visual/node_modules" "$WT/tests-visual/node_modules"
node "$REPO/docs/tranches/BL/design/structure/floor/rows/apply.mjs" --root "$WT" | tail -1
node "$KIT/tools/replay.mjs" --root "$WT" "$@"
