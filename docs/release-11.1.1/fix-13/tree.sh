#!/bin/zsh
# Fix seat 13: a red tree at .cache/fix13-red/tree, a `git archive` of a ref without
# docs/tranches, with the worktree's 11.1.1 specs, config and harnesses copied in (the close's
# exits/tree.sh). Built only while no server of this seat runs: a tsconfig landing under a
# watched root reloads every page that server holds.
#   zsh tree.sh <ref>          build the tree
#   zsh tree.sh --specs        copy the worktree's 11.1.1 specs in again
set -u
C=${0:A:h}; WT=${C:h:h:h}; NM=$WT/node_modules
T=$WT/.cache/fix13-red/tree; L=$C/logs
copy_specs() {
  rm -rf $T/tests-visual/release-11-1-1
  cp -R $WT/tests-visual/release-11-1-1 $T/tests-visual/
  cp $WT/tests-visual/release-11-1-1*.spec.ts $WT/tests-visual/release-11-1-1.config.ts $T/tests-visual/
  echo "$(date +%T) specs $(cd $T && cat tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* | shasum | cut -c1-12) = worktree $(cd $WT && cat tests-visual/release-11-1-1*.ts tests-visual/release-11-1-1/* | shasum | cut -c1-12)" >> $L/tree.out
}
if [[ $1 == --specs ]]; then copy_specs; exit 0; fi
REF=$1
rm -rf $T; mkdir -p $T/node_modules/@mkbabb
git -C $WT archive $REF -- . ':(exclude)docs/tranches' | tar -x -C $T
for e in $NM/*(N) $NM/.bin(N); do [[ ${e:t} = @mkbabb || ${e:t} = .vite ]] && continue; ln -s $e $T/node_modules/${e:t}; done
for e in $NM/@mkbabb/*(N); do [[ ${e:t} = glass-ui-tests-visual ]] && continue; ln -s $e $T/node_modules/@mkbabb/${e:t}; done
ln -s ../../tests-visual $T/node_modules/@mkbabb/glass-ui-tests-visual
copy_specs
echo "$(date +%T) red tree: $REF $(git -C $WT rev-parse --short "$REF^{commit}"); src differs from v11.1.0 in: $(git -C $WT diff --name-only 'v11.1.0^{commit}' "$REF^{commit}" -- src | tr '\n' ' ')" >> $L/tree.out
