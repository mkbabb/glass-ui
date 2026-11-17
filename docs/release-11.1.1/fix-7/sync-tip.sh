#!/bin/bash
# Fix seat 7: the tip snapshot tree (.cache/fix7-tip/tree), so witness runs read a
# committed tree while the worktree is edited. It is the v11.1.0 git-archive tree (whose
# demo, index.html, vite and tsconfig files and Playwright base configs equal the tip's)
# with its src and its 11.1.1 specs, config and harnesses taken from a commit.
#   sync-tip.sh <commit>
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
T=$W/.cache/fix7-tip/tree
c=$(git -C $W rev-parse --short "$1")
rm -rf $T/src && git -C $W archive "$c" src | tar -x -C $T
rm -rf $T/tests-visual/release-11-1-1 $T/tests-visual/release-11-1-1*.ts
git -C $W archive "$c" tests-visual/release-11-1-1 tests-visual/release-11-1-1.spec.ts tests-visual/release-11-1-1-controls.spec.ts \
    tests-visual/release-11-1-1-reduce.spec.ts tests-visual/release-11-1-1.config.ts | tar -x -C $T
echo "$c" > $T/TIP-SHA
echo "$(date +%T) sync-tip $c" >> $W/docs/release-11.1.1/fix-7/logs/runs.out
