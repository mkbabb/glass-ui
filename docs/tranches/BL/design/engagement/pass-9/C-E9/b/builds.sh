#!/bin/zsh
# C-E9 completion seat (C-E9b) builds, each harness build.mjs in its own guarded call, in this seat's worktree only.
#   cand9 = HEAD + pass-9/P-E9.patch (the candidate); plant-noread / plant-nolens / plant-loop = cand9 + one edit (P-E9's
#   plants.py); cand8 = HEAD + pass-8/P-E8.patch (the plant of record for H9's E-10 cells); probe9 = HEAD + pass-9/P-E9-probe.patch.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-9/C-E9/b
WT=$G/.claude/worktrees/bl/D5/p9/C-E9b/wt; OUT=$WT/.ce9out; GD=$HOME/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-120)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
git apply $P/pass-9/P-E9.patch || exit 2
C9=$(th); echo "candidate src tree $C9 (P-E9 recorded 82c3f35a7110)"
b cand9
cp $ST $OUT/stage.cand9.ts
for x in noread nolens loop; do python3 $P/pass-9/E9/plants.py $WT $x && b plant-$x; cp $OUT/stage.cand9.ts $ST; done
echo "after plants: src tree $(th) (expect $C9)"
git apply -R $P/pass-9/P-E9.patch || exit 3
echo "at HEAD: diff lines $(git diff HEAD | wc -l | tr -d ' ') untracked src $(git ls-files -o --exclude-standard src | wc -l | tr -d ' ')"
git apply $P/pass-8/P-E8.patch || exit 4; echo "cand8 src tree $(th) (recorded 92f38f424df2)"; b cand8
git apply -R $P/pass-8/P-E8.patch || exit 5
git apply $P/pass-9/P-E9-probe.patch || exit 6; echo "probe9 src tree $(th) (first seat b04f59d8e344)"; b probe9
git apply -R $P/pass-9/P-E9-probe.patch || exit 7
git apply $P/pass-9/P-E9.patch || exit 8
echo "back at candidate: src tree $(th) (expect $C9)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
