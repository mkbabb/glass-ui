#!/bin/zsh
# P-E8 builds, each in its own guarded call, in the seat's worktree only (harness build.mjs, the harness's own app):
#   cand8        the candidate: HEAD + P-E8.patch (P-A7 + E's part)
#   probe        cand8 + P-E8-inplace-loupe.patch (the measured probe), applied, built, reverted
#   plant-loupe6 cand8 + plants.py loupe6 (E-13 k max's plant), applied, built, reverted
#   plant-cand7  HEAD + pass-7/P-E7.patch (the pass-7 construction: CK-20's and the loupe-edge cell's plant)
# The tree hash is read back to cand8's after every revert.
E8=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/E8
P7=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/E8/wt
OUT=$WT/.e8out; G=$HOME/.claude/guard/guarded
CAND=$1; PROBE=$2   # the two patches (absolute)
cd $WT || exit 1
th() { $E8/mkpatch.sh $OUT/th.patch; shasum $OUT/th.patch | cut -c1-12; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · cand $(shasum $CAND | cut -c1-8) probe $(shasum $PROBE | cut -c1-8)"
T0=$(th); echo "cand8 tree $T0"
$G --timeout 30 -- node $H/build.mjs $WT --label cand8 --out $OUT; echo "cand8 build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
git apply $PROBE || exit 3
$G --timeout 30 -- node $H/build.mjs $WT --label probe --out $OUT; echo "probe build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
git apply -R $PROBE || exit 4
T=$(th); echo "after probe revert $T $([[ $T == $T0 ]] && echo '= cand8' || echo DIFFERS)"; [[ $T == $T0 ]] || exit 9
python3 -I $E8/plants.py loupe6 apply $WT || exit 5
$G --timeout 30 -- node $H/build.mjs $WT --label plant-loupe6 --out $OUT; echo "plant-loupe6 build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
python3 -I $E8/plants.py loupe6 revert $WT; rm -rf $WT/.e8plant
T=$(th); echo "after loupe6 revert $T $([[ $T == $T0 ]] && echo '= cand8' || echo DIFFERS)"; [[ $T == $T0 ]] || exit 9
git apply -R $CAND || exit 6
git apply $P7/P-E7.patch || exit 7
$G --timeout 30 -- node $H/build.mjs $WT --label plant-cand7 --out $OUT; echo "plant-cand7 build exit $? · $(date '+%T') load $(sysctl -n vm.loadavg)"
git apply -R $P7/P-E7.patch && git apply $CAND || exit 8
T=$(th); echo "after cand7 revert $T $([[ $T == $T0 ]] && echo '= cand8' || echo DIFFERS)"; [[ $T == $T0 ]] || exit 9
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
