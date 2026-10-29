#!/bin/zsh
# C-E8 builds, each in its own guarded call, in the critic's worktree only (harness build.mjs, the harness's own app):
#   cand8 (HEAD + P-E8.patch), probe (cand8 + P-E8-inplace-loupe.patch), plant-cand7 (HEAD + pass-7/P-E7.patch).
# The worktree is left at cand8's bytes; its diff hash is printed after every revert.
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
H=$P/harness; C=$P/pass-8/C-E8
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/C-E8/wt
OUT=$WT/.ce8out; G=$HOME/.claude/guard/guarded
CAND=$P/pass-8/P-E8.patch; PROBE=$P/pass-8/P-E8-inplace-loupe.patch; P7=$P/pass-7/P-E7.patch
cd $WT || exit 1
th() { { git diff HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat; } | shasum | cut -c1-12; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg)"
T0=$(th); echo "cand8 src-diff hash $T0"
$G --timeout 30 -- node $H/build.mjs $WT --label cand8 --out $OUT; echo "cand8 build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
git apply $PROBE || exit 3
$G --timeout 30 -- node $H/build.mjs $WT --label probe --out $OUT; echo "probe build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
git apply -R $PROBE || exit 4
T=$(th); echo "after probe revert $T $([[ $T == $T0 ]] && echo '= cand8' || echo DIFFERS)"; [[ $T == $T0 ]] || exit 9
git apply -R $CAND || exit 6
git apply $P7 || exit 7
$G --timeout 30 -- node $H/build.mjs $WT --label plant-cand7 --out $OUT; echo "plant-cand7 build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
git apply -R $P7 || exit 8; git apply $CAND || exit 8
T=$(th); echo "after cand7 revert $T $([[ $T == $T0 ]] && echo '= cand8' || echo DIFFERS)"; [[ $T == $T0 ]] || exit 9
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
