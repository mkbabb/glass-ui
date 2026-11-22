#!/bin/bash
# Fix seat 12: the two trees this seat reads besides the worktree, built while no server of
# this seat runs (a tsconfig.json landing under a watched root reloads every page that server
# holds).
#   ce5 = git archive ce5f320b7 (the tip critic 11 read), red = git archive v11.1.0, each with
#   HEAD's 11.1.1 specs, config and harnesses copied in
# node_modules: one symlink per entry into the worktree's, @mkbabb holding the tree's own
# tests-visual workspace link, and a fresh .vite cache (critic 11's trees.sh).
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-12/logs
build() {
  local name=$1 ref=$2; local R=$W/.cache/fix12-$name/tree
  rm -rf $W/.cache/fix12-$name; mkdir -p $R
  git -C $W archive $ref | tar -x -C $R
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
  ( cd $R && shasum tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* ) > $L/specs-$name.sha
  ( cd $W && shasum tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* ) > $L/specs-head.sha
  cmp $L/specs-$name.sha $L/specs-head.sha
  ( cd $R && git -C $W ls-tree -r $ref src demo | awk '{print $3"  "$4}' > $L/src-demo-$name.ref.blobs
    while read b f; do echo "$(git hash-object "$f")  $f"; done < $L/src-demo-$name.ref.blobs > $L/src-demo-$name.tree.blobs )
  cmp $L/src-demo-$name.ref.blobs $L/src-demo-$name.tree.blobs
  echo "tree $name built $(date +%T) head $(git -C $W rev-parse --short HEAD) $ref $(git -C $W rev-parse --short $ref) src+demo blobs $(wc -l < $L/src-demo-$name.ref.blobs)"
}
build ce5f320b7 ce5f320b7
build v11.1.0 v11.1.0
