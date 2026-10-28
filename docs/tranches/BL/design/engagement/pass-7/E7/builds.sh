#!/bin/zsh
# P-E7 harness builds of the plants: each plant applied, built and reverted in turn, the tree hash checked back to the
# candidate's after every revert. One guarded call per build. `builds.sh [plants...]` (default clip6 fling6 loupe6).
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/E7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/E7/wt
cd $WT
th() { { git diff HEAD; git status --short; for f in $(git ls-files --others --exclude-standard -- src tests); do cat $f; done; } | shasum | cut -c1-12; }
T0=$(th); echo "# candidate tree $T0"
PL=(${@}); (( ${#PL} )) || PL=(clip6 fling6 loupe6)
for p in $PL; do
  python3 $A/plants.py $p apply $WT || exit 1
  $A/run.sh build-plant-$p --timeout 30 -- node $H/build.mjs $WT --label plant-$p --out $WT/.e7out; rc=$?
  python3 $A/plants.py $p revert $WT
  T=$(th); echo "plant $p build exit $rc · tree after revert $T $([[ $T == $T0 ]] && echo '= candidate' || echo 'DIFFERS')"
  [[ $T == $T0 ]] || exit 9
done
