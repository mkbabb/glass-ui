#!/bin/zsh
# P-A7 harness builds: the candidate (a7) and one build per plant, each plant applied, built and reverted in turn, the
# tree hash checked back to the candidate's after every revert. One guarded call per build.
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/A7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/A7/wt
cd $WT
th() { { git diff HEAD; git status --short; for f in $(git ls-files --others --exclude-standard -- src tests); do cat $f; done; } | shasum | cut -c1-12; }
T0=$(th); echo "# candidate tree $T0"
PL=(${@}); (( ${#PL} )) || PL=(chipmute crest thumb prmY)
for p in $PL; do
  python3 $A/plants.py $p apply $WT || exit 1
  $A/run.sh build-plant-$p --timeout 30 -- node $H/build.mjs $WT --label plant-$p --out $WT/.a7out; rc=$?
  python3 $A/plants.py $p revert $WT
  T=$(th); echo "plant $p build exit $rc · tree after revert $T $([[ $T == $T0 ]] && echo '= candidate' || echo 'DIFFERS')"
  [[ $T == $T0 ]] || exit 9
done
