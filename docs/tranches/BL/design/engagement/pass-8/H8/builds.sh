#!/bin/zsh
# H8 harness builds, each in its own guarded call, in the H8 worktree only:
#   head      the base (HEAD, 10.1.0 src)
#   cand7     the pass-7 candidate: HEAD + pass-7/P-E7.patch (a6c82db1 = F5''' + P-A6 + A7 + E7), the plant P-E8 builds against
#   plant-*   on cand7: clipOnly (C-E7/plants.py), chipfaint (C-A7/plants.py), loupe6 (E7/plants.py); applied, built, reverted,
#             the tree hash checked back to cand7's after every revert
H8=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/H8
P7=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/H8/wt
OUT=$WT/.h8out
G=$HOME/.claude/guard/guarded
cd $WT || exit 1
th() { { git diff HEAD; git status --short | grep -v -E '\.h8out|\.ce7plant|\.c7plant|\.e7plant'; for f in $(git ls-files --others --exclude-standard -- src tests); do cat $f; done; } | shasum | cut -c1-12; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg)"
$G --timeout 30 -- node $H/build.mjs $WT --label head --out $OUT; echo "head build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
git apply $P7/P-E7.patch || exit 8
T0=$(th); echo "cand7 tree $T0 (P-E7.patch sha1 $(shasum $P7/P-E7.patch | cut -c1-8))"
$G --timeout 30 -- node $H/build.mjs $WT --label cand7 --out $OUT; echo "cand7 build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
for p in clipOnly chipfaint loupe6; do
  case $p in clipOnly) PY=$P7/C-E7/plants.py;; chipfaint) PY=$P7/C-A7/plants.py;; loupe6) PY=$P7/E7/plants.py;; esac
  python3 -I $PY $p apply $WT || exit 1
  $G --timeout 30 -- node $H/build.mjs $WT --label plant-$p --out $OUT; rc=$?
  python3 -I $PY $p revert $WT
  T=$(th); echo "plant $p build exit $rc · tree after revert $T $([[ $T == $T0 ]] && echo '= cand7' || echo 'DIFFERS') · $(date '+%T') load $(sysctl -n vm.loadavg)"
  [[ $T == $T0 ]] || exit 9
done
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
