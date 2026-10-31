#!/bin/zsh
# P-E11 builds, each in its own guarded call, in the seat's worktree only (harness build.mjs, the harness's own app):
#   cand11 = the worktree as it stands (HEAD + P-E11.patch), then every plant named on the command line (plants.py), the sources restored
#   after each; the src tree read back at the end. `builds.sh [plant ...]`
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-11/E11
WT=$G/.claude/worktrees/bl/D5/p11/E11/wt; OUT=$WT/.e11out; GD=$HOME/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts; CSS=src/components/slider/styles.css
cd $WT || exit 1; mkdir -p $OUT
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-120)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "candidate src tree $C"
[[ -z "$NOCAND" ]] && b cand11
cp $ST $OUT/stage.ts; cp $CSS $OUT/styles.css
for p in "$@"; do
  python3 $R/plants.py $WT $p && b plant-$p
  cp $OUT/stage.ts $ST; cp $OUT/styles.css $CSS
done
echo "after plants: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
