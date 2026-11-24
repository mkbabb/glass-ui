#!/bin/bash
# Critic 13 (copied by critic 14): the two trees this seat measures besides the tip, built before any server of this
# seat runs.
#   red = git archive HEAD without docs/, its src/ replaced by git archive v11.1.0 -- src, so it
#         differs from the tip in the library alone: v11.1.0's source under the tip's demo,
#         specs, harnesses and configs (the CommandDialog cells drive the rebuilt Command page,
#         which v11.1.0's own demo does not have)
#   pre = git archive HEAD without docs/, with src/components/command/CommandInput.vue as it was
#         before 4c30732a0 (the merged tip before item (c)'s cure)
# node_modules: one symlink per entry into the worktree's, @mkbabb holding the tree's own
# tests-visual workspace link, and a fresh .vite cache.
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-14/logs
HEAD_SHA=$(git -C $W rev-parse --short HEAD)
mk() {
  local R=$1
  rm -rf $(dirname $R); mkdir -p $R
  git -C $W archive HEAD -- . ':(exclude)docs' | tar -x -C $R
  mkdir -p $R/node_modules/@mkbabb
  for e in $W/node_modules/* $W/node_modules/.bin $W/node_modules/.package-lock.json; do
    n=$(basename $e); [ "$n" = "@mkbabb" ] && continue; [ "$n" = ".vite" ] && continue
    ln -s $e $R/node_modules/$n
  done
  ln -s ../../tests-visual $R/node_modules/@mkbabb/glass-ui-tests-visual
  for p in $W/node_modules/@mkbabb/*; do
    n=$(basename $p); [ "$n" = "glass-ui-tests-visual" ] && continue
    [ -e $R/node_modules/@mkbabb/$n ] || ln -s $p $R/node_modules/@mkbabb/$n
  done
}
RED=$W/.cache/critic14-red/tree
mk $RED
rm -rf $RED/src
git -C $W archive v11.1.0 -- src | tar -x -C $RED
python3 $W/docs/release-11.1.1/critic-14/tools/treecmp.py $W v11.1.0 $RED src/ - > $L/red-src.cmp
# outside src and docs the red tree is the tip's archive, byte for byte
python3 $W/docs/release-11.1.1/critic-14/tools/treecmp.py $W HEAD $RED - docs/,src/ > $L/red-rest.cmp
PRE=$W/.cache/critic14-pre/tree
mk $PRE
git -C $W show 4c30732a0^:src/components/command/CommandInput.vue > $PRE/src/components/command/CommandInput.vue
( cd $PRE && diff <(git -C $W show 80287b971:src/components/command/CommandInput.vue) src/components/command/CommandInput.vue && echo "pre CommandInput = 80287b971's" ) > $L/pre-commandinput.txt
( cd $W && git diff --stat 80287b971 HEAD -- src ) >> $L/pre-commandinput.txt
echo "trees built $(date +%T) head $HEAD_SHA v11.1.0 $(git -C $W rev-parse --short v11.1.0) red src: $(head -1 $L/red-src.cmp); rest: $(head -1 $L/red-rest.cmp); red $(du -sh $RED | cut -f1) pre $(du -sh $PRE | cut -f1)" | tee -a $L/runs.out
# norule = git archive HEAD without docs/, with the controls harness importing demo.css as it
#          did before a50130e48 (the merged tree's page, no scale-on-hover rule), read with the
#          tip's controls spec, so the lift cell's new clause is read where the rule is absent
NORULE=$W/.cache/critic14-norule/tree
mk $NORULE
git -C $W show a50130e48^:tests-visual/release-11-1-1/controls-harness.ts > $NORULE/tests-visual/release-11-1-1/controls-harness.ts
( cd $NORULE && diff <(git -C $W show HEAD:tests-visual/release-11-1-1/controls-harness.ts) tests-visual/release-11-1-1/controls-harness.ts || true; echo "norule controls-harness.ts = a50130e48^'s" ) > $L/norule-harness.txt
echo "norule built $(date +%T) $(du -sh $NORULE | cut -f1)" | tee -a $L/runs.out
