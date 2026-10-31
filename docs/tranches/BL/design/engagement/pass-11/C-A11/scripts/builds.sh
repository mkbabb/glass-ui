#!/bin/zsh
# C-A11 builds, each in its own guarded call, in the seat's worktree only (harness build.mjs, the harness's own app).
#   cand11 = HEAD + pass-11/P-E11.patch (the worktree as it stands); plants: each one edit to the candidate, the sources restored
#   and the src tree read back after each (P-E11's plants.py, my ca11-plants.py, C-A9's plants.py for A's crest and prmY);
#   cand10 = HEAD + pass-10/P-E10.patch (the zoom cells' plant); cand8 = HEAD + pass-8/P-E8.patch (O-103f (1)'s bar).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; R=$P/pass-11/C-A11; H=$P/harness
WT=$G/.claude/worktrees/bl/D5/p11/C-A11/wt; O=$WT/.ca11out; cd $WT || exit 1; mkdir -p $O
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $HOME/.claude/guard/guarded --timeout 30 -- node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg)"; }
ST=src/composables/motion/engage/stage.ts; CSS=src/components/slider/styles.css; SE=src/composables/motion/engage/settle.ts
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "candidate src tree $C (P-E11 recorded 6317ad295579)"
save() { cp $ST $O/stage.ts; cp $CSS $O/styles.css; cp $SE $O/settle.ts; }
rest() { cp $O/stage.ts $ST; cp $O/styles.css $CSS; cp $O/settle.ts $SE; }
for x in "$@"; do
 case $x in
  cand11) b cand11 ;;
  crest|prmY) python3 -I $P/pass-9/C-A9/scripts/plants.py $x apply $WT && b plant-$x; python3 -I $P/pass-9/C-A9/scripts/plants.py $x revert $WT ;;
  nozoom|owedframe|loudthrow|swap|fast|clock|loop) save; python3 -I $P/pass-11/E11/plants.py $WT $x && b plant-$x; rest ;;
  cand10|cand8) PT=$P/pass-10/P-E10.patch; [[ $x == cand8 ]] && PT=$P/pass-8/P-E8.patch
     git apply -R $P/pass-11/P-E11.patch && git clean -fdq src tests && git apply $PT && echo "$x src tree $(th)"; b $x
     git apply -R $PT; git clean -fdq src tests; git apply $P/pass-11/P-E11.patch ;;
  *) save; python3 -I $R/scripts/ca11-plants.py $WT $x && b plant-$x; rest ;;
 esac
 [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
