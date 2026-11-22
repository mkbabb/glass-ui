#!/bin/zsh
# The 11.1.1 close: a red tree for the exits cells that drive the demo, at .cache/close-red/tree:
# a `git archive` of master's tip (11.1.0's source with the rebuilt demo) without docs/tranches,
# with the worktree's 11.1.1 specs, config and harnesses copied in. node_modules is per-entry
# symlinks into the worktree's, with the tree's own tests-visual workspace link.
#   zsh tree.sh <ref>
set -u
C=${0:A:h}; WT=${C:h:h:h:h}; NM=$WT/node_modules; REF=$1
T=$WT/.cache/close-red/tree
rm -rf $T; mkdir -p $T/node_modules/@mkbabb
git -C $WT archive $REF -- . ':(exclude)docs/tranches' | tar -x -C $T
for e in $NM/*(N) $NM/.bin(N); do [[ ${e:t} = @mkbabb || ${e:t} = .vite ]] && continue; ln -s $e $T/node_modules/${e:t}; done
for e in $NM/@mkbabb/*(N); do [[ ${e:t} = glass-ui-tests-visual ]] && continue; ln -s $e $T/node_modules/@mkbabb/${e:t}; done
ln -s ../../tests-visual $T/node_modules/@mkbabb/glass-ui-tests-visual
rm -rf $T/tests-visual/release-11-1-1
cp -R $WT/tests-visual/release-11-1-1 $T/tests-visual/
cp $WT/tests-visual/release-11-1-1*.spec.ts $WT/tests-visual/release-11-1-1.config.ts $T/tests-visual/
echo "red tree: $REF $(git -C $WT rev-parse --short "$REF^{commit}") src blobs $(git -C $WT ls-tree -r "$REF^{commit}" src | wc -l | tr -d ' '); specs $(shasum $T/tests-visual/release-11-1-1.spec.ts | cut -c1-12) = worktree $(shasum $WT/tests-visual/release-11-1-1.spec.ts | cut -c1-12)"
echo "src differs from v11.1.0 in: $(git -C $WT diff --name-only 'v11.1.0^{commit}' "$REF^{commit}" -- src | tr '\n' ' ')"
