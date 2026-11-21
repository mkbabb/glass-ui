#!/bin/bash
# Critic 8: put HEAD's 11.1.1 specs, config and harnesses into the v11.1.0 git-archive tree,
# replacing whatever an earlier seat copied there, and record their hashes.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
R=$W/.cache/red-v11.1.0/tree
L=$W/docs/release-11.1.1/critic-8/logs
rm -rf $R/tests-visual/release-11-1-1 $R/tests-visual/release-11-1-1*.ts
git -C $W archive HEAD tests-visual/release-11-1-1 tests-visual/release-11-1-1.spec.ts tests-visual/release-11-1-1-controls.spec.ts \
    tests-visual/release-11-1-1-reduce.spec.ts tests-visual/release-11-1-1.config.ts | tar -x -C $R
( cd $R && shasum tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* ) > $L/redspecs-red.sha
( cd $W && shasum tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* ) > $L/redspecs-head.sha
if cmp -s $L/redspecs-red.sha $L/redspecs-head.sha; then echo "$(date +%T) redspecs equal HEAD $(git -C $W rev-parse --short HEAD)" >> $L/runs.out
else echo "$(date +%T) redspecs DIFFER" >> $L/runs.out; exit 1; fi
