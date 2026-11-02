#!/bin/zsh
# C-A11 builds, each in its own guarded call, in the seat's worktree only (harness build.mjs, the harness's own app):
#   cand8 = HEAD + pass-8/P-E8.patch (the idle bar, O-103f (1)); cand11 = HEAD + pass-11/P-E11.patch; then each plant (E11/plants.py or
#   ca11-plants.py), the sources restored after each; the src tree read back at the end.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-11/C-A11/r2
WT=$G/.claude/worktrees/bl/D5/p11/C-A11/wt; OUT=$WT/.ca11out; GD=$HOME/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts; CSS=src/components/slider/styles.css
cd $WT || exit 1; mkdir -p $OUT
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-120)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "candidate src tree $C (P-E11 records 6317ad295579)"
if [[ -z "$NOCAND8" ]]; then
  git apply -R $P/pass-11/P-E11.patch && git apply $P/pass-8/P-E8.patch && echo "cand8 src tree $(th) (C-E10 records 92f38f424df2)" && b cand8
  git apply -R $P/pass-8/P-E8.patch && git apply $P/pass-11/P-E11.patch && echo "back to cand11: $(th)"
fi
[[ -z "$NOCAND" ]] && b cand11
cp $ST $OUT/stage.ts; cp $CSS $OUT/styles.css
for p in "$@"; do
  if [[ $p == listcure || $p == flowone || $p == roomnoframe || $p == glideframe ]]; then python3 $R/scripts/ca11-plants.py $WT $p; else python3 $P/pass-11/E11/plants.py $WT $p; fi && b plant-$p
  cp $OUT/stage.ts $ST; cp $OUT/styles.css $CSS
done
echo "after plants: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
