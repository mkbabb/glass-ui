#!/bin/zsh
# C-A14 builds (D5 pass 14, wave 4): PE14-records/builds14.sh's method in this critic's worktree only, one guarded call for the set.
# The worktree starts at HEAD. Each build applies its patch, builds through harness/build.mjs, reads the src tree back (th(), the form of
# pass-13/H13c/builds.sh) and reverses. cand14 = HEAD + pass-14/P-E14.patch; cand13/12/11/8 = HEAD + pass-13/12/11/8's patch.
# At the end the worktree is left at cand14 (E-7's and E-12's static arms read the worktree).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-14/C-A14-records
WT=$G/.claude/worktrees/bl/D5/p15/CA14c/wt; O=$WT/.ca14out
E14P=$P/pass-14/P-E14.patch; E13P=$P/pass-13/P-E13.patch; E12P=$P/pass-12/P-E12.patch; E11P=$P/pass-11/P-E11.patch; E8P=$P/pass-8/P-E8.patch
cd $WT || exit 1; mkdir -p $O $R/logs
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { node $H/build.mjs $WT --label $1 --out $O > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-140)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · P-E14 $(shasum $E14P | cut -c1-12) · P-E13 $(shasum $E13P | cut -c1-12) · P-E12 $(shasum $E12P | cut -c1-12) · P-E11 $(shasum $E11P | cut -c1-12) · P-E8 $(shasum $E8P | cut -c1-12) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12)"
C=$(th); echo "HEAD src tree $C"
for x in "$@"; do
  case $x in
    cand14) git apply $E14P && echo "cand14 src tree $(th)" && b cand14; git apply -R $E14P ;;
    cand13) git apply $E13P && echo "cand13 src tree $(th)" && b cand13; git apply -R $E13P ;;
    cand12) git apply $E12P && echo "cand12 src tree $(th)" && b cand12; git apply -R $E12P ;;
    cand11) git apply $E11P && echo "cand11 src tree $(th)" && b cand11; git apply -R $E11P ;;
    cand8)  git apply $E8P && echo "cand8 src tree $(th)" && b cand8; git apply -R $E8P ;;
    head)   echo "head src tree $(th)" && b head ;;
  esac
  [[ $(th) == $C ]] || { echo "TREE DRIFT after $x: $(th)"; git status --short | head; exit 3; }
done
echo "after: src tree $(th) (expect $C)"
git apply $E14P && echo "worktree left at cand14: src tree $(th)"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
