#!/bin/zsh
# The 11.1.1 third close: coarse-touch's branch-only titles whose first error is not master's tip's
# (lists/co-res, lists/co-res.grep, written by mkres.py), alone and repeated: three times on the head
# tree, three on the red tree (v11.1.0's src under the same demo and specs), three on the head tree
# again. Called as res-co-head-a.sh, res-co-red-a.sh or res-co-head-b.sh (links to this file) it runs
# that one step, so each step is its own guarded call.
set -u
C=${0:A:h:h:h}; S=$C/scripts; F=${C:h:h:h:h}/.cache/close-full
G=$(<$C/lists/co-res.grep)
step=${${0:t:r}#res-co}; step=${step#-}
if [[ -n $step ]]; then steps=("${step/-/ }"); else steps=("head a" "red a" "head b"); fi
for spec in $steps; do
  set -- ${=spec}
  ROOT=$F/$1/tree zsh $S/suite.sh resolve/co-$1-$2 5355 tests-visual/playwright.config.ts coarse-touch $C/lists/co-res -g "$G" --repeat-each=3
done
