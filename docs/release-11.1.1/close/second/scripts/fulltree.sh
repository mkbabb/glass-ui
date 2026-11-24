#!/bin/zsh
# The 11.1.1 second close: a full `git archive` tree of a ref, docs included (the worktree is a sparse
# checkout without docs/tranches, which some specs read), inside the worktree at
# .cache/close-full/<label>/tree. node_modules is per-entry symlinks into the worktree's, with
# the tree's own tests-visual workspace link, so vite's dep cache stays in the tree.
#   zsh fulltree.sh <label> <ref>
set -u
C=${0:A:h:h}; WT=${C:h:h:h:h}; NM=$WT/node_modules; LABEL=$1; REF=$2
T=$WT/.cache/close-full/$LABEL/tree
rm -rf $T; mkdir -p $T/node_modules/@mkbabb
git -C $WT archive $REF | tar -x -C $T
for e in $NM/*(N) $NM/.bin(N); do [[ ${e:t} = @mkbabb || ${e:t} = .vite ]] && continue; ln -s $e $T/node_modules/${e:t}; done
for e in $NM/@mkbabb/*(N); do [[ ${e:t} = glass-ui-tests-visual ]] && continue; ln -s $e $T/node_modules/@mkbabb/${e:t}; done
ln -s ../../tests-visual $T/node_modules/@mkbabb/glass-ui-tests-visual
echo "$(date '+%F %T') full tree $LABEL: $REF $(git -C $WT rev-parse --short "$REF^{commit}") $(du -sh $T | cut -f1)" | tee -a $C/suite/trees.txt
