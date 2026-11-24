#!/bin/bash
# Fix seat 14: the two trees the lift cell is read on besides the tip (the worktree).
#   red    = git archive HEAD without docs/, with this seat's three tests-visual files from the
#            worktree, and src/ replaced by git archive v11.1.0 -- src: v11.1.0's library under
#            the branch's demo, specs and harnesses
#   norule = git archive HEAD without docs/, with this seat's spec only: the harness still
#            imports demo/demo.css, which no longer generates scale-on-hover, so the page has
#            no rule for the tile (the merged tree before this seat's cure, read with the new
#            clause)
# node_modules: one symlink per entry into the worktree's, @mkbabb holding the tree's own
# tests-visual workspace link (critic 13's trees.sh).
set -euo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-14/logs
SPEC=tests-visual/release-11-1-1-controls.spec.ts
HTS=tests-visual/release-11-1-1/controls-harness.ts
HCSS=tests-visual/release-11-1-1/controls-harness.css
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
RED=$W/.cache/fix14-red/tree
mk $RED
cp $W/$SPEC $RED/$SPEC; cp $W/$HTS $RED/$HTS; cp $W/$HCSS $RED/$HCSS
rm -rf $RED/src
git -C $W archive v11.1.0 -- src | tar -x -C $RED
NORULE=$W/.cache/fix14-norule/tree
mk $NORULE
cp $W/$SPEC $NORULE/$SPEC
{
  echo "trees built $(date +%T) from HEAD $(git -C $W rev-parse --short HEAD), v11.1.0 $(git -C $W rev-parse --short v11.1.0)"
  same=0; differ=0
  while read -r mode type sha path; do
    [ "$(git -C $W hash-object $RED/$path)" = "$sha" ] && same=$((same+1)) || differ=$((differ+1))
  done < <(git -C $W ls-tree -r v11.1.0 -- src)
  echo "red src against v11.1.0: $same blobs equal, $differ differ; $(cd $RED && find src -type f | wc -l | tr -d ' ') files in the tree's src"
  for f in $SPEC $HTS $HCSS; do
    for t in red:$RED norule:$NORULE; do
      n=${t%%:*}; d=${t#*:}
      if [ -e $d/$f ]; then cmp -s $W/$f $d/$f && echo "$n $f = worktree" || echo "$n $f = HEAD"; else echo "$n $f absent"; fi
    done
  done
  echo "btn.css lines reading '@media (hover: hover)': red $(grep -c '@media (hover: hover)' $RED/src/styles/utilities/btn.css || true), norule $(grep -c '@media (hover: hover)' $NORULE/src/styles/utilities/btn.css || true)"
} | tee -a $L/trees.txt
