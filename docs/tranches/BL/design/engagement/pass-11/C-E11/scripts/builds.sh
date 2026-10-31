#!/bin/zsh
# C-E11 builds, each in its own guarded call, in the seat's worktree only (harness build.mjs). cand11 = HEAD + pass-11/P-E11.patch; plants, each one edit to the
# candidate: P-E11's own (pass-11/E11/plants.py, run independently) and mine (ce11-plants.py); cand10 = HEAD + pass-10/P-E10.patch (the control for my new
# cells); cand8 = HEAD + pass-8/P-E8.patch (O-103f (1)'s bar). The tree is put back on the candidate and its hash read after each step.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; R=$P/pass-11/C-E11; H=$P/harness
WT=$G/.claude/worktrees/bl/D5/p11/C-E11/wt; O=$WT/.ce11out; cd $WT; mkdir -p $O
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $HOME/.claude/guard/guarded --timeout 30 -- node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg)"; }
ST=src/composables/motion/engage/stage.ts; CSS=src/components/slider/styles.css
E11P=$P/pass-11/P-E11.patch
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · base $(git rev-parse --short HEAD)"
C=$(th); echo "candidate src tree $C (P-E11 recorded 6317ad295579)"
for x in "$@"; do
 case $x in
  cand11) b cand11 ;;
  crest|prmY) python3 -I $P/pass-9/C-A9/scripts/plants.py $x apply $WT && b plant-$x; python3 -I $P/pass-9/C-A9/scripts/plants.py $x revert $WT ;;
  sidezoom|spanframe|hostzoom|roomframe) cp $ST $O/stage.ts; python3 $R/scripts/ce11-plants.py $WT $x && b plant-$x; cp $O/stage.ts $ST ;;
  cand10|cand8) PP=$P/pass-10/P-E10.patch; [[ $x == cand8 ]] && PP=$P/pass-8/P-E8.patch
     git apply -R $E11P && git apply $PP && echo "$x src tree $(th)"; b $x; git apply -R $PP && git apply $E11P ;;
  *) cp $ST $O/stage.ts; cp $CSS $O/styles.css; python3 $P/pass-11/E11/plants.py $WT $x && b plant-$x; cp $O/stage.ts $ST; cp $O/styles.css $CSS ;;
 esac
 [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
