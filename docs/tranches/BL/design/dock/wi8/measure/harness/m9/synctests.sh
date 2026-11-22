#!/usr/bin/env bash
# synctests.sh <tree-dir>: MEASURE-9 part H (H4). Copies the branch's restated tests and configs (the worktree's, as the
# H4 commit carries them) into a measure tree, so G-14's sites and the restated units run there as they will at the tag.
set -eu
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; T="$1"
for f in tests-visual/release-10-1-2.spec.ts tests-visual/release-10-1-3.spec.ts tests-visual/release-11-0-2.spec.ts \
         tests-visual/webkit-2287.config.ts tests-visual/release-11-0-2.config.ts tests-visual/release-11-0-1.config.ts tests-visual/ro-loop.config.ts \
         tests/components/custom/dock/dock-hover-corner.test.ts tests/components/custom/dock/collapsed-face-content-sized.test.ts; do
  cp "$W/$f" "$T/$f"
done
echo "synced into $T"
