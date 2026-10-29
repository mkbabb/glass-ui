#!/bin/zsh
# C-A7 plant builds: each plant applied, built and reverted in turn; the tree hash is checked back to the candidate's
# after every revert. One guarded call per build. A's plants are P-A7's plants.py, E's are P-E7's, chipfaint is mine.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-A7
P7=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/C-A7b/wt
cd $WT
th() { { git diff HEAD; git status --short; for f in $(git ls-files --others --exclude-standard -- src tests); do cat $f; done; } | shasum | cut -c1-12; }
T0=$(th); echo "# $(date '+%F %T') candidate tree $T0"
for p in ${@}; do
  case $p in chipmute|prmY|crest|thumb|writer) S=$P7/A7/plants.py ;; clip6|loupe6|fling6) S=$P7/E7/plants.py ;; *) S=$C/plants.py ;; esac
  python3 -I $S $p apply $WT || exit 1
  $C/run.sh build-plant-$p --timeout 30 -- node $H/build.mjs $WT --label plant-$p --out $WT/.c7out; rc=$?
  python3 -I $S $p revert $WT
  T=$(th); echo "$(date '+%T') plant $p build exit $rc · tree after revert $T $([[ $T == $T0 ]] && echo '= candidate' || echo 'DIFFERS')"
  [[ $T == $T0 ]] || exit 9
done
rmdir $WT/.a7plant $WT/.e7plant $WT/.c7plant 2>/dev/null; true
