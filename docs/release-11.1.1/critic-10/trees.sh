#!/bin/bash
# Critic 10: the two trees this seat measures besides the tip, built before any server of this
# seat runs (a tsconfig.json landing under a watched root reloads every page that server holds).
#   red   = git archive v11.1.0, with HEAD's 11.1.1 specs, config and harnesses copied in
#   plant = git archive HEAD, with one line of SheetContent.vue changed so a closing Sheet's
#           frost span unmounts once the fade falls below 0.5 (critique 9's plant, made again)
# node_modules: one symlink per entry into the worktree's (the lockfiles differ only in the
# version field), @mkbabb holding the tree's own tests-visual workspace link, and a fresh
# .vite cache per tree.
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-10/logs
mods() {
  local T=$1; mkdir -p $T/node_modules/@mkbabb
  for e in $W/node_modules/* $W/node_modules/.bin $W/node_modules/.package-lock.json; do
    n=$(basename $e); [ "$n" = "@mkbabb" ] && continue; [ "$n" = ".vite" ] && continue
    ln -s $e $T/node_modules/$n
  done
  ln -s ../../tests-visual $T/node_modules/@mkbabb/glass-ui-tests-visual
  ln -s $W/node_modules/@mkbabb/keyframes.js $T/node_modules/@mkbabb/keyframes.js
  ln -s $W/node_modules/@mkbabb/value.js $T/node_modules/@mkbabb/value.js
}
specs() {
  local T=$1
  rm -rf $T/tests-visual/release-11-1-1 $T/tests-visual/release-11-1-1*.ts
  git -C $W archive HEAD tests-visual/release-11-1-1 tests-visual/release-11-1-1.spec.ts \
    tests-visual/release-11-1-1-controls.spec.ts tests-visual/release-11-1-1-reduce.spec.ts \
    tests-visual/release-11-1-1.config.ts | tar -x -C $T
}
R=$W/.cache/critic10-v11.1.0/tree; P=$W/.cache/critic10-plant/tree
rm -rf $W/.cache/critic10-v11.1.0 $W/.cache/critic10-plant
mkdir -p $R $P
git -C $W archive v11.1.0 | tar -x -C $R
git -C $W archive HEAD | tar -x -C $P
mods $R; mods $P
specs $R
( cd $R && shasum tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* ) > $L/redspecs-red.sha
( cd $W && shasum tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* ) > $L/redspecs-head.sha
cmp $L/redspecs-red.sha $L/redspecs-head.sha
# the red tree's src and demo equal v11.1.0's blob for blob
( cd $R && git -C $W ls-tree -r v11.1.0 src demo | awk '{print $3"  "$4}' > $L/red-src-demo.v1110.blobs
  while read b f; do echo "$(git hash-object "$f")  $f"; done < $L/red-src-demo.v1110.blobs > $L/red-src-demo.tree.blobs )
cmp $L/red-src-demo.v1110.blobs $L/red-src-demo.tree.blobs
find $R/src -type f | wc -l > $L/red-src-count.txt
# the plant
F=$P/src/components/sheet/SheetContent.vue
grep -c '            v-if="haloPresent"$' $F
sed -i '' 's|^            v-if="haloPresent"$|            v-if="haloPresent \&\& !(fade !== null \&\& !dialogRoot.open.value \&\& fade < 0.5)"|' $F
diff <(git -C $W show HEAD:src/components/sheet/SheetContent.vue) $F > $L/plant.diff || true
cat $L/plant.diff
echo "trees built $(date +%T) head $(git -C $W rev-parse --short HEAD)"
