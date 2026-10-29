#!/bin/zsh
# C-E7 harness builds: the candidate (ce7), then each plant applied, built and reverted, the tree hash checked back to the
# candidate's after every revert. E7 plants (clip6 fling6 loupe6) via pass-7/E7/plants.py, A7 plants (chipmute prmY crest
# thumb) via pass-7/A7/plants.py, C-E7's own (clipOnly pvOnly) via C-E7/plants.py. One guarded call per build.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-E7
P7=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/C-E7/wt
cd $WT
th() { { git diff HEAD; git status --short | grep -v -E '\.ce7out|\.e7plant|\.a7plant|\.ce7plant'; for f in $(git ls-files --others --exclude-standard -- src tests); do cat $f; done; } | shasum | cut -c1-12; }
T0=$(th); echo "# $(date '+%F %T') candidate tree $T0 · load $(sysctl -n vm.loadavg)"
for p in ${@}; do
  if [[ $p == ce7 ]]; then $C/run.sh build-ce7 --timeout 30 -- node $H/build.mjs $WT --label ce7 --out $WT/.ce7out; echo "ce7 build exit $?"; continue; fi
  case $p in clip6|fling6|loupe6) PY=$P7/E7/plants.py;; chipmute|prmY|crest|thumb|writer) PY=$P7/A7/plants.py;; *) PY=$C/plants.py;; esac
  python3 $PY $p apply $WT || exit 1
  $C/run.sh build-plant-$p --timeout 30 -- node $H/build.mjs $WT --label plant-$p --out $WT/.ce7out; rc=$?
  python3 $PY $p revert $WT
  T=$(th); echo "plant $p build exit $rc · tree after revert $T $([[ $T == $T0 ]] && echo '= candidate' || echo 'DIFFERS')"
  [[ $T == $T0 ]] || exit 9
done
