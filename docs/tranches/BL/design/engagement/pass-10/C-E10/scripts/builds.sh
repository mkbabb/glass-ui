#!/bin/zsh
# C-E10 builds, each harness build.mjs in its own guarded call, in this seat's worktree only.
#   cand10 = HEAD + pass-10/P-E10.patch; plant-<p> = cand10 + one edit (E10/plants.py); cand9 = HEAD + P-E9.patch (H10's plant for the new cells); cand8 = HEAD + P-E8.patch (the idle bar, O-103f (1)).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-10/C-E10
WT=$G/.claude/worktrees/bl/D5/p10/C-E10/wt; OUT=$WT/.ce10out; GD=$HOME/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts; CSS=src/components/slider/styles.css
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-120)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "candidate src tree $C (P-E10 recorded 7a569d9f8d25)"
b cand10
mkdir -p $OUT; cp $ST $OUT/stage.ts; cp $CSS $OUT/styles.css
for p in swap owed nohyst fixed fast zero reducetravel clock exitfrozen noread nolens loop; do
  python3 $P/pass-10/E10/plants.py $WT $p && b plant-$p
  cp $OUT/stage.ts $ST; cp $OUT/styles.css $CSS
done
echo "after plants: src tree $(th) (expect $C)"
git apply -R $P/pass-10/P-E10.patch || exit 2
echo "at HEAD: diff lines $(git diff HEAD | wc -l | tr -d ' ') untracked src $(git ls-files -o --exclude-standard src | wc -l | tr -d ' ')"
git apply $P/pass-9/P-E9.patch || exit 3; echo "cand9 src tree $(th) (recorded 82c3f35a7110)"; b cand9
git apply -R $P/pass-9/P-E9.patch || exit 4
git apply $P/pass-8/P-E8.patch || exit 5; echo "cand8 src tree $(th) (recorded 92f38f424df2)"; b cand8
git apply -R $P/pass-8/P-E8.patch || exit 6
git apply $P/pass-10/P-E10.patch || exit 7
echo "back at candidate: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
