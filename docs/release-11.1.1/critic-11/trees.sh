#!/bin/bash
# Critic 11: the v11.1.0 tree this seat measures besides the tip, built before any server of
# this seat runs (a tsconfig.json landing under a watched root reloads every page that server
# holds).
#   red = git archive v11.1.0, with HEAD's 11.1.1 specs, config and harnesses copied in
# node_modules: one symlink per entry into the worktree's (the lockfiles differ only in the
# version field), @mkbabb holding the tree's own tests-visual workspace link, and a fresh
# .vite cache.
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-11/logs
R=$W/.cache/critic11-v11.1.0/tree
rm -rf $W/.cache/critic11-v11.1.0; mkdir -p $R
git -C $W archive v11.1.0 | tar -x -C $R
mkdir -p $R/node_modules/@mkbabb
for e in $W/node_modules/* $W/node_modules/.bin $W/node_modules/.package-lock.json; do
  n=$(basename $e); [ "$n" = "@mkbabb" ] && continue; [ "$n" = ".vite" ] && continue
  ln -s $e $R/node_modules/$n
done
ln -s ../../tests-visual $R/node_modules/@mkbabb/glass-ui-tests-visual
ln -s $W/node_modules/@mkbabb/keyframes.js $R/node_modules/@mkbabb/keyframes.js
ln -s $W/node_modules/@mkbabb/value.js $R/node_modules/@mkbabb/value.js
rm -rf $R/tests-visual/release-11-1-1 $R/tests-visual/release-11-1-1*.ts
git -C $W archive HEAD tests-visual/release-11-1-1 tests-visual/release-11-1-1.spec.ts \
  tests-visual/release-11-1-1-controls.spec.ts tests-visual/release-11-1-1-reduce.spec.ts \
  tests-visual/release-11-1-1.config.ts | tar -x -C $R
( cd $R && shasum tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* ) > $L/redspecs-red.sha
( cd $W && shasum tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* ) > $L/redspecs-head.sha
cmp $L/redspecs-red.sha $L/redspecs-head.sha
( cd $R && git -C $W ls-tree -r v11.1.0 src demo | awk '{print $3"  "$4}' > $L/red-src-demo.v1110.blobs
  while read b f; do echo "$(git hash-object "$f")  $f"; done < $L/red-src-demo.v1110.blobs > $L/red-src-demo.tree.blobs )
cmp $L/red-src-demo.v1110.blobs $L/red-src-demo.tree.blobs
echo "tree built $(date +%T) head $(git -C $W rev-parse --short HEAD) v11.1.0 $(git -C $W rev-parse --short v11.1.0) src+demo blobs $(wc -l < $L/red-src-demo.v1110.blobs)"
