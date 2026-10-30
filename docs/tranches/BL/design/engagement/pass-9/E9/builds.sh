#!/bin/zsh
# P-E9 builds, each `build.mjs` in its own guarded call, in the seat's worktree only (the harness's own app, H9's hash):
#   cand9          HEAD + pass-9/P-E9.patch (the candidate: in place under every modality, the per-frame read, the lens laid)
#   plant-noread   cand9 with the per-frame read deleted   (plants.py noread)
#   plant-nolens   cand9 with the lens never laid          (plants.py nolens)
#   plant-loop     cand9 with the loop kept to the exit clock's end (plants.py loop)
#   cand8          HEAD + pass-8/P-E8.patch (the pass-8 candidate: the plant of record for H9's new E-10 cells)
#   probe9         cand8 + the shared loupe items (probe-port.py) = HEAD + pass-9/P-E9-probe.patch, cut here
# The tree goes back to the candidate's after, its src hash checked equal.
E9=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-9/E9
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement; H=$P/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p9/E9/wt; OUT=$WT/.e9out; G=$HOME/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $G --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $E9/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $E9/logs/build-$1.log | cut -c1-120)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · scene app $(shasum $H/scenes/App.vue | cut -c1-12)"
C9=$(th); echo "# candidate src tree $C9 · P-E9.patch $(shasum $P/pass-9/P-E9.patch | cut -c1-12)"
b cand9
cp $ST $OUT/stage.cand9.ts
for x in noread nolens loop; do python3 $E9/plants.py $WT $x && b plant-$x; cp $OUT/stage.cand9.ts $ST; done
echo "after plants: src tree $(th) (candidate $C9)"
git apply -R $P/pass-9/P-E9.patch || exit 3
echo "at HEAD: git diff lines $(git diff HEAD | wc -l | tr -d ' ') · untracked src $(git ls-files -o --exclude-standard src | wc -l | tr -d ' ')"
git apply $P/pass-8/P-E8.patch || exit 4; b cand8
python3 $E9/probe-port.py $WT || exit 5; b probe9
$E9/mkpatch.sh $P/pass-9/P-E9-probe.patch; echo "P-E9-probe.patch $(shasum $P/pass-9/P-E9-probe.patch | cut -c1-12)"
git apply -R $P/pass-9/P-E9-probe.patch || exit 6
echo "at HEAD: git diff lines $(git diff HEAD | wc -l | tr -d ' ') · untracked src $(git ls-files -o --exclude-standard src | wc -l | tr -d ' ')"
git apply $P/pass-9/P-E9.patch || exit 7
echo "back at the candidate: src tree $(th) (expect $C9)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
