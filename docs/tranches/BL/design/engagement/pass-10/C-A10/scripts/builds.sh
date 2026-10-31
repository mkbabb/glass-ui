#!/bin/zsh
# C-A10 builds, each in its own guarded call, in the seat's worktree only. cand10 = HEAD + pass-10/P-E10.patch; plants: each one edit to the candidate
# (P-E10's plants.py run independently for the lens plants; C-A9's plants.py for A's `crest` and `prmY`), the sources restored and the tree hash read back;
# cand8 = HEAD + pass-8/P-E8.patch (O-103f (1)'s bar, E-10's anc plant); then the tree is put back on the candidate.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; R=$P/pass-10/C-A10; H=$P/harness
WT=$G/.claude/worktrees/bl/D5/p10/C-A10/wt; O=$WT/.ca10out; cd $WT; mkdir -p $O
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $HOME/.claude/guard/guarded --timeout 30 -- node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg)"; }
ST=src/composables/motion/engage/stage.ts; CSS=src/components/slider/styles.css
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · base $(git rev-parse --short HEAD)"
C=$(th); echo "candidate src tree $C (P-E10 recorded 7a569d9f8d25)"
for x in "$@"; do
 case $x in
  cand10) b cand10 ;;
  crest|prmY) python3 -I $P/pass-9/C-A9/scripts/plants.py $x apply $WT && b plant-$x; python3 -I $P/pass-9/C-A9/scripts/plants.py $x revert $WT ;;
  zoomcure|loudcure) cp $ST $O/stage.ts; python3 $R/scripts/ca10-plants.py $WT $x && b plant-$x; cp $O/stage.ts $ST ;;
  cand8) git apply -R $P/pass-10/P-E10.patch && git status --short | grep -v '^??' | head -1; git clean -fdq src tests; git apply $P/pass-8/P-E8.patch && echo "cand8 src tree $(th) (recorded 92f38f424df2)"; b cand8; git apply -R $P/pass-8/P-E8.patch; git clean -fdq src tests; git apply $P/pass-10/P-E10.patch ;;
  *) cp $ST $O/stage.ts; cp $CSS $O/styles.css; python3 $P/pass-10/E10/plants.py $WT $x && b plant-$x; cp $O/stage.ts $ST; cp $O/styles.css $CSS ;;
 esac
 [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
