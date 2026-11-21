#!/bin/bash
# Fix seat 9: the snapshot tree .cache/fix7-tip/tree takes d0f85bd29's src (the tip critic 8
# read), so the branch's witness reads that source.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
T=$W/.cache/fix7-tip/tree
c=$(git -C $W rev-parse --short d0f85bd29)
rm -rf $T/src && git -C $W archive "$c" src | tar -x -C $T
echo "$c" > $T/TIP-SHA
echo "$(date +%T) sync-d0 $c" >> $W/docs/release-11.1.1/fix-9/logs/runs.out
